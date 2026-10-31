"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ADMIN_WHATSAPP,
  ADMIN_WHATSAPP_URL,
  formatRupiah,
  isSlug,
  products,
  QRIS_IMAGE,
} from "@/lib/catalog";
import { createOrder } from "@/lib/db/client";
import { toPublicError } from "@/lib/db/errors";
import { rememberInvoice } from "@/lib/store";
import { ServiceIcon } from "./ServiceIcon";

function clock(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(
    total % 60,
  ).padStart(2, "0")}`;
}

export function CheckoutClient({
  brandSlug,
  qrisMethodId,
  qrisImageUrl,
}: {
  brandSlug: string;
  qrisMethodId: string | null;
  qrisImageUrl: string | null;
}) {
  const params = useSearchParams();
  const requested = params.get("s");
  const slug = isSlug(requested) ? requested : null;
  const product = slug ? products[slug] : null;
  const provider = params.get("p") ?? "";
  const item = params.get("i") ?? "";
  const target = params.get("n") ?? "";
  const amount = Number(params.get("a")) || 0;
  const serviceId = params.get("sid") ?? "";
  const productId = params.get("pid") ?? "";
  const valid = !!product && !!provider && !!item && !!target && amount > 0;

  const [inv, setInv] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [expiresAt, setExpiresAt] = useState(0);
  const [left, setLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [creating, setCreating] = useState(false);
  const [payError, setPayError] = useState("");
  const [paid, setPaid] = useState(false);
  const createdRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function create() {
    if (!product || !valid) return;
    if (!serviceId || !productId) {
      setPayError("Data pesanan belum lengkap. Ulangi dari halaman produk.");
      createdRef.current = false;
      return;
    }
    if (!brandSlug || !qrisMethodId) {
      setPayError("Pembayaran belum tersedia. Coba lagi sebentar.");
      createdRef.current = false;
      return;
    }

    setCreating(true);
    setPayError("");
    try {
      const created = await createOrder({
        brandSlug,
        serviceId,
        productId,
        nomorTujuan: target.trim(),
        input: { provider, item, nomor_tujuan: target.trim() },
        paymentMethodId: qrisMethodId,
      });
      const expiry = new Date(created.expires_at).getTime();
      setInv(created.ref);
      setOrderTotal(created.total);
      setExpiresAt(expiry);
      setLeft(Math.max(1, Math.ceil((expiry - Date.now()) / 1000)));
      setTimedOut(false);
      rememberInvoice({
        ref: created.ref,
        label: item,
        amount: created.total,
        createdAt: Date.now(),
      });
    } catch (failure) {
      setPayError(toPublicError(failure).message);
      createdRef.current = false;
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    if (!valid || createdRef.current) return;
    createdRef.current = true;
    void create();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid]);

  useEffect(() => {
    if (!expiresAt || paid) return;
    const tick = () => {
      const next = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setLeft(next);
      if (next <= 0) setTimedOut(true);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [expiresAt, paid]);

  if (!product || !valid) {
    return (
      <main className="wrap pt-9 pb-16 md:pt-14">
        <Link href="/produk/?s=pulsa" className="text-sm font-semibold text-olive hover:text-tomato">
          ← Kembali
        </Link>
        <div className="mx-auto mt-8 max-w-[520px] rounded-[8px] border-2 border-ink bg-white p-10 text-center shadow-[4px_4px_0_#191F06]">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-[18px] bg-butter text-tomato">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z" />
              <path d="M9 8h6M9 12h6" />
            </svg>
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold">Belum ada pesanan</h1>
          <p className="mt-2 text-olive">
            Pilih produk dulu, nanti ringkasannya muncul di sini.
          </p>
          <Link href="/produk/?s=pulsa" className="btn btn-red mt-5">
            Pilih produk
          </Link>
        </div>
      </main>
    );
  }

  const displayTotal = inv ? orderTotal : amount;
  const waConfirm = `${ADMIN_WHATSAPP_URL}?text=${encodeURIComponent(
    `Halo admin thepixcloud, saya sudah bayar QRIS${inv ? ` untuk invoice ${inv}` : "."}`,
  )}`;
  const payDisabled = creating || !inv || timedOut;

  return (
    <main className="pb-bar">
      <section className="wrap pt-7">
        <Link
          href={`/produk/?s=${slug}`}
          className="text-sm font-semibold text-olive transition-colors hover:text-tomato"
        >
          ← Kembali
        </Link>
        <h1 className="mt-2 font-display text-[clamp(32px,6vw,52px)] font-extrabold leading-none">
          Pembayaran
        </h1>
      </section>

      <section className="wrap mt-6 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {paid ? (
            <div className="card p-[22px] md:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] bg-tomato text-paper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <div>
                  <p aria-live="polite" className="font-display text-2xl font-extrabold leading-tight">
                    Terima kasih, pembayaran Anda sedang diproses
                  </p>
                  <p className="mt-2 text-sm text-olive">
                    Admin akan memverifikasi pembayaran QRIS Anda secara manual.
                    Simpan kode invoice untuk melacak pesanan.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[8px] border-2 border-ink bg-[#FFFCE0] p-5">
                <p className="mono text-xs text-olive">Kode invoice</p>
                <p className="mt-1 font-display text-2xl font-extrabold">
                  {inv || "—"}
                </p>
                <p className="mt-2 text-sm text-olive">
                  Total {formatRupiah(displayTotal)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/invoice/?id=${inv}`}
                    className="btn btn-red"
                  >
                    Cek status
                  </Link>
                  <a
                    href={waConfirm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    Konfirmasi via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-[22px] md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-extrabold">
                    Pembayaran QRIS
                  </h2>
                  <p className="mt-1 text-sm text-olive">
                    Scan dari e-wallet atau m-banking apa pun.
                  </p>
                </div>
                <span className="badge">QRIS</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[6px] border-2 border-ink bg-paper px-4 py-3">
                <div>
                  <p className="mono text-[10px] text-olive">Kode invoice</p>
                  <p className="font-display text-lg font-extrabold">
                    {inv || (creating ? "Menyiapkan…" : "—")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="mono text-[10px] text-olive">Selesaikan dalam</p>
                  <p className="font-display text-lg font-extrabold">
                    {!inv ? "—" : timedOut ? "Waktu habis" : clock(left)}
                  </p>
                </div>
              </div>

              {payError ? (
                <div className="mt-4 rounded-[6px] border-2 border-tomato bg-[#FFF5F0] p-4 text-xs text-tomato">
                  <p className="font-bold">{payError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (!creating) {
                        createdRef.current = true;
                        void create();
                      }
                    }}
                    className="mono mt-2 rounded border-2 border-tomato px-3 py-1.5 font-bold"
                  >
                    Coba lagi
                  </button>
                </div>
              ) : null}

              <div className="mt-5 grid items-center gap-6 rounded-[8px] border-2 border-ink bg-paper p-4 sm:grid-cols-[220px_1fr] sm:p-5">
                <div className="rounded-[6px] bg-white p-3">
                  <img
                    src={qrisImageUrl || QRIS_IMAGE}
                    alt="QRIS pembayaran thepixcloud"
                    width={440}
                    height={440}
                    className="h-auto w-full"
                  />
                </div>
                <div>
                  <p className="mono text-xs text-olive">Total bayar</p>
                  <p className="price mt-1 text-4xl">{formatRupiah(displayTotal)}</p>
                  <ol className="mt-4 space-y-2 text-sm text-olive">
                    <li>1. Buka e-wallet atau m-banking.</li>
                    <li>2. Scan QRIS di samping.</li>
                    <li>3. Bayar sesuai nominal.</li>
                    <li>4. Tekan “Saya sudah bayar”.</li>
                  </ol>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Semua e-wallet", "Semua m-banking", "Dicek admin"].map((label) => (
                  <span
                    key={label}
                    className="mono rounded border border-ink/20 bg-paper px-3 py-1.5 text-[11px] font-bold"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPaid(true)}
                disabled={payDisabled}
                className="btn btn-red mt-4 hidden w-full min-h-[54px] disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
              >
                {creating ? "Menyiapkan…" : "Saya sudah bayar"}
              </button>

              <p className="mt-4 rounded-[6px] border border-dashed border-ink/25 p-4 text-xs text-olive">
                Bayar sesuai nominal agar mudah diverifikasi. Kalau status belum
                berubah, kirim bukti bayar ke WhatsApp admin.
              </p>
            </div>
          )}

          <div className="card p-[22px]">
            <h3 className="font-display text-lg font-extrabold">Butuh bantuan?</h3>
            <p className="mt-1 text-sm text-olive">
              Admin thepixcloud siap bantu cek pembayaran atau kendala pesanan.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={ADMIN_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-red"
              >
                WhatsApp {ADMIN_WHATSAPP}
              </a>
              <Link href="/invoice/" className="btn btn-ghost">
                Cek invoice
              </Link>
            </div>
          </div>
        </div>

        <aside className="card card-pop p-6 lg:sticky lg:top-[90px]">
          <h3 className="font-display text-xl font-extrabold">Ringkasan pesanan</h3>

          <div className="mt-4 flex items-center gap-3 rounded-[6px] bg-paper p-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[6px] bg-tomato text-paper">
              <ServiceIcon slug={product.slug} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <b className="block truncate">{item}</b>
              <div className="truncate text-[13px] text-olive">
                {product.name} · {provider}
              </div>
            </div>
          </div>

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-olive">Tujuan</dt>
              <dd className="break-all text-right font-bold">{target}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-olive">Harga</dt>
              <dd className="font-bold">{formatRupiah(amount)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-olive">Metode</dt>
              <dd className="font-bold">QRIS</dd>
            </div>
          </dl>

          <div className="my-4 border-t border-dashed border-ink/25" />
          <div className="flex items-end justify-between">
            <span className="font-semibold text-olive">Total bayar</span>
            <span className="price text-[28px]">{formatRupiah(displayTotal)}</span>
          </div>

          {paid || inv ? (
            <div className="mt-4 rounded-[6px] border-2 border-ink bg-[#FFFCE0] p-4">
              <p className="mono text-xs text-olive">Status</p>
              <p className="mt-1 inline-flex items-center gap-2 font-bold">
                <span className="dot-live" />
                {paid ? "Sedang diproses" : "Menunggu pembayaran"}
              </p>
              {inv ? (
                <p className="mono mt-1 text-[10px] text-olive">Invoice {inv}</p>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPaid(true)}
              disabled={payDisabled}
              className="btn btn-red mt-[18px] hidden w-full min-h-[54px] disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
            >
              {creating ? "Menyiapkan…" : "Saya sudah bayar"}
            </button>
          )}

          <p className="mt-2.5 text-center text-xs text-olive">
            Pembayaran dicek manual oleh admin.
          </p>
        </aside>
      </section>

      {paid ? null : (
        <div className="fbar lg:hidden">
          <div className="min-w-0 flex-1">
            <div className="text-xs opacity-70">Total bayar</div>
            <div className="font-display text-lg font-extrabold">
              {formatRupiah(displayTotal)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPaid(true)}
            disabled={payDisabled}
            className="btn border-ink bg-ink text-paper shadow-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? "Menyiapkan…" : "Saya sudah bayar"}
          </button>
        </div>
      )}
    </main>
  );
}
