"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ADMIN_WHATSAPP,
  ADMIN_WHATSAPP_URL,
  formatRupiah,
} from "@/lib/catalog";
import { getRecentInvoices, type RecentInvoice } from "@/lib/store";
import { CheckIcon } from "./ServiceIcon";

const pixelPattern = [
  "d", "d", "b", "d", "d",
  "d", "b", "d", "b", "d",
  "b", "d", "t", "d", "b",
  "d", "b", "d", "b", "d",
  "d", "d", "b", "d", "d",
];

type PublicStatus = "success" | "processing" | "pending" | "expired";

type ApiOrder = {
  inv: string;
  status: PublicStatus;
  service: string;
  product: string;
  lines: [string, string][];
  method: string;
  total: number;
  sn: string;
  label: string;
  created: number;
  updated: number;
  paidAt?: number;
};

const statusText: Record<PublicStatus, string> = {
  pending: "Menunggu pembayaran",
  processing: "Sedang diproses",
  success: "Selesai",
  expired: "Dibatalkan",
};

const steps = [
  { label: "Pesanan dibuat", copy: "Tercatat di sistem" },
  { label: "Dicek admin", copy: "Pembayaran QRIS dicek manual" },
  { label: "Diproses", copy: "Setelah pembayaran terverifikasi" },
];

export function InvoiceClient() {
  const params = useSearchParams();
  const initialId = params.get("id") ?? "";
  const [query, setQuery] = useState(initialId);
  const [result, setResult] = useState<ApiOrder | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<RecentInvoice[]>([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHistory(getRecentInvoices());
  }, []);

  const show = useCallback(async (value: string) => {
    const id = value.trim().toUpperCase();
    setQuery(value);
    if (!id) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });
      setResult(
        response.ok ? ((await response.json()) as ApiOrder) : null,
      );
    } catch {
      setResult(null);
    } finally {
      setSearched(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialId) void show(initialId);
  }, [initialId, show]);

  function selectHistory(entry: RecentInvoice) {
    void show(entry.ref);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    consoleRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  async function copyCode(id: string) {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="wrap pb-16 pt-10 md:pt-14">
      <header className="grid items-end gap-8 lg:grid-cols-[1fr_290px]">
        <div>
          <p className="mono text-[11px] text-olive">04 / Lacak pesanan</p>
          <h1 className="mt-3 font-display text-[clamp(44px,8vw,84px)] font-extrabold leading-[0.92] tracking-[-0.05em]">
            Pesananmu,
            <br />
            <span className="mk">terlihat jelas.</span>
          </h1>
          <p className="mt-4 max-w-[520px] text-[clamp(15px,1.7vw,18px)] leading-relaxed text-olive">
            Masukkan kode invoice TPC- buat lihat posisi, detail, dan total pesanan
            kamu. Semua dari satu layar.
          </p>
        </div>

        <div className="hidden lg:block">
          <StatusKey />
        </div>
      </header>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <section
          ref={consoleRef}
          className="tracker-console scroll-mt-24"
          aria-label="Konsol lacak pesanan"
        >
          <div className="relative z-10 flex items-center justify-between gap-3 border-b border-paper/15 px-5 py-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 bg-tomato" />
              <span className="h-2.5 w-2.5 bg-butter" />
              <span className="h-2.5 w-2.5 bg-paper/40" />
            </div>
            <p className="mono text-[10px] text-paper/45">thepixcloud://tracker</p>
            <span className="mono flex items-center gap-1.5 text-[9px] text-butter">
              <span className="h-1.5 w-1.5 bg-tomato" />
              live
            </span>
          </div>

          <div className="tracker-grid" aria-hidden="true" />

          <div className="relative z-10 p-5 md:p-6">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (query.trim()) void show(query);
                else inputRef.current?.focus();
              }}
            >
              <label
                htmlFor="track-query"
                className="mono block text-[10px] font-bold text-paper/55"
              >
                Masukkan kode invoice
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input
                  ref={inputRef}
                  id="track-query"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="TPC-XXXXXX"
                  autoComplete="off"
                  spellCheck={false}
                  className="tracker-input flex-1 focus-visible:outline-none!"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn min-h-[52px] border-butter bg-tomato text-paper shadow-[3px_3px_0_#FFFCB0] hover:bg-tomato-dark disabled:opacity-60"
                >
                  {loading ? "Mencari…" : "Lacak →"}
                </button>
              </div>
              <p className="mono mt-2 text-[10px] text-paper/35">
                TPC-XXXXXX · pembayaran dicek manual oleh admin
              </p>
            </form>

            <div className="mt-6" aria-live="polite">
              {!searched ? (
                <EmptyState />
              ) : loading ? (
                <div className="flex min-h-[300px] items-center justify-center border-2 border-dashed border-paper/15 px-6 py-12 text-center">
                  <p className="mono text-[11px] font-bold text-butter">
                    [ Mencari transaksi… ]
                  </p>
                </div>
              ) : result ? (
                <Receipt
                  order={result}
                  copied={copied}
                  onCopy={() => copyCode(result.inv)}
                />
              ) : (
                <NotFound
                  query={query}
                  onRetry={() => {
                    inputRef.current?.focus();
                    inputRef.current?.select();
                  }}
                />
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-[90px]">
          <div className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="mono text-[10px] font-bold text-olive">Log riwayat</p>
              <span className="mono text-[10px] text-olive/60">
                {String(history.length).padStart(2, "0")} / 05
              </span>
            </div>

            <div className="mt-3 border-t-2 border-ink">
              {history.length ? (
                history.map((entry, index) => {
                  const active = result?.inv === entry.ref;
                  return (
                    <button
                      key={entry.ref}
                      type="button"
                      onClick={() => selectHistory(entry)}
                      className={`block w-full border-b border-dashed border-ink/20 px-2 py-3 text-left transition hover:bg-butter/60 ${
                        active ? "bg-butter" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="mono text-[9px] text-olive">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mono text-[9px] font-bold text-tomato">
                          ● invoice
                        </span>
                        <span className="price ml-auto text-sm">
                          {formatRupiah(entry.amount)}
                        </span>
                      </div>
                      <p className="mt-1 font-display text-base font-bold leading-tight">
                        {entry.label}
                      </p>
                      <p className="mono mt-0.5 truncate text-[9px] text-olive">
                        {entry.ref} · {formatShort(entry.createdAt)}
                      </p>
                    </button>
                  );
                })
              ) : (
                <p className="py-4 text-sm text-olive">
                  Belum ada transaksi di perangkat ini.{" "}
                  <Link href="/produk/?s=pulsa" className="font-bold text-tomato">
                    Mulai top up
                  </Link>
                </p>
              )}
            </div>
            <p className="mono mt-3 text-[9px] leading-relaxed text-olive/70">
              Riwayat tersimpan di browser ini. Status pesanan tetap dicek ke server.
            </p>
          </div>

          <div className="border-2 border-ink bg-butter p-5 shadow-[4px_4px_0_#191F06]">
            <p className="mono text-[10px] font-bold text-tomato">Butuh bantuan?</p>
            <p className="mt-2 font-display text-2xl font-extrabold leading-tight">
              Chat admin.
            </p>
            <p className="mt-1 text-sm text-olive">
              Sertakan kode invoice biar pengecekan lebih cepat.
            </p>
            <a
              href={ADMIN_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red mt-4 w-full"
            >
              WhatsApp {ADMIN_WHATSAPP}
            </a>
            <Link
              href="/bantuan/"
              className="mt-2 block text-center text-xs font-bold text-ink underline decoration-ink/30 underline-offset-4"
            >
              Buka pusat bantuan →
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

function StatusKey() {
  return (
    <div className="rotate-[-1.5deg] border-2 border-ink bg-butter p-5 shadow-[4px_4px_0_#191F06]">
      <p className="mono text-[10px] font-bold">Status key</p>
      <div className="mt-3 space-y-3">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-start gap-3">
            <span
              className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center border-2 border-ink ${
                index === 0 ? "bg-ink" : index === 1 ? "bg-tomato" : "bg-paper"
              }`}
              aria-hidden="true"
            >
              {index === 0 ? (
                <CheckIcon className="h-2.5 w-2.5 text-paper" />
              ) : index === 1 ? (
                <span className="h-1.5 w-1.5 bg-paper" />
              ) : null}
            </span>
            <div>
              <p className="mono text-[9.5px] font-bold">{step.label}</p>
              <p className="text-[11px] leading-snug text-olive">{step.copy}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-ink/20 pt-3 text-[11px] leading-snug text-olive">
        QRIS dicek manual sebelum pesanan diproses.
      </p>
    </div>
  );
}

function PixelTarget() {
  return (
    <div className="grid grid-cols-5 gap-1.5" aria-hidden="true">
      {pixelPattern.map((tone, index) => (
        <span
          key={index}
          className={`h-2.5 w-2.5 ${
            tone === "b" ? "bg-butter" : tone === "t" ? "bg-tomato" : "bg-paper/20"
          }`}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center border-2 border-dashed border-paper/15 px-6 py-12 text-center">
      <PixelTarget />
      <p className="mono mt-5 text-[11px] font-bold text-butter">
        [ Menunggu kode ]
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/55">
        Masukkan kode invoice di atas buat lihat posisi dan detail pesanan.
      </p>
      <p className="mono mt-5 text-[9px] text-paper/30">STATUS: STANDBY</p>
    </div>
  );
}

function NotFound({ query, onRetry }: { query: string; onRetry: () => void }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center border-2 border-dashed border-paper/15 px-6 py-12 text-center">
      <PixelTarget />
      <p className="mono mt-5 text-[11px] font-bold text-butter">
        [ Kode nggak ketemu ]
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/55">
        Kode <b className="text-paper">{query.trim().toUpperCase()}</b> nggak
        ditemukan. Cek lagi atau tanya admin.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={onRetry}
          className="btn border-paper/25 bg-white/5 text-paper hover:border-butter"
        >
          Coba lagi
        </button>
        <a
          href={ADMIN_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn border-butter bg-tomato text-paper shadow-[3px_3px_0_#FFFCB0]"
        >
          Chat admin
        </a>
      </div>
    </div>
  );
}

function stepState(
  index: number,
  status: PublicStatus,
): "done" | "current" | "muted" {
  if (index === 0) return "done";
  if (index === 1) {
    if (status === "processing" || status === "success") return "done";
    if (status === "pending") return "current";
    return "muted";
  }
  if (status === "success") return "done";
  if (status === "processing") return "current";
  return "muted";
}

function Receipt({
  order,
  copied,
  onCopy,
}: {
  order: ApiOrder;
  copied: boolean;
  onCopy: () => void;
}) {
  const target =
    order.lines.find(([label]) => /tujuan/i.test(label))?.[1] ?? "-";
  const waUrl = `${ADMIN_WHATSAPP_URL}?text=${encodeURIComponent(
    `Halo admin thepixcloud, saya ingin cek transaksi ${order.inv}.`,
  )}`;

  return (
    <div className="border-2 border-ink bg-paper p-5 text-ink shadow-[6px_6px_0_#E43E00] md:p-6">
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 26 }).map((_, index) => (
          <span key={index} className="h-1 w-1 bg-ink/70" />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mono text-[9px] text-olive">
            INVOICE / {formatDate(order.created)}
          </p>
          <p className="font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
            {order.inv}
          </p>
          <button
            type="button"
            onClick={onCopy}
            className="mono mt-1 text-[9px] font-bold text-tomato underline decoration-tomato/30 underline-offset-4"
          >
            {copied ? "Tersalin ✓" : "Salin kode"}
          </button>
        </div>
        <span className="inline-flex w-fit items-center gap-2 border-2 border-ink bg-butter px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.04em]">
          <span className="dot-live" />
          {statusText[order.status]}
        </span>
      </div>

      <div className="relative mt-5">
        <div
          className="absolute left-[16.66%] right-[16.66%] top-[9px] border-t-2 border-dashed border-ink/20"
          aria-hidden="true"
        />
        <div className="relative grid grid-cols-3 gap-2">
          {steps.map((step, index) => {
            const state = stepState(index, order.status);
            return (
              <div key={step.label} className="text-center sm:text-left">
                <span
                  className={`mx-auto grid h-5 w-5 place-items-center border-2 border-ink sm:mx-0 ${
                    state === "done"
                      ? "bg-ink"
                      : state === "current"
                        ? "bg-tomato"
                        : "bg-paper"
                  }`}
                  aria-hidden="true"
                >
                  {state === "done" ? (
                    <CheckIcon className="h-3 w-3 text-paper" />
                  ) : state === "current" ? (
                    <span className="h-1.5 w-1.5 bg-paper" />
                  ) : (
                    <span className="h-1.5 w-1.5 bg-ink/25" />
                  )}
                </span>
                <p className="mono mt-2 text-[9px] font-bold">{step.label}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-olive">
                  {step.copy}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 border-t-2 border-dashed border-ink/20 pt-4 text-sm">
        <div>
          <p className="mono text-[9px] text-olive">Layanan</p>
          <p className="font-bold">{order.service}</p>
        </div>
        <div>
          <p className="mono text-[9px] text-olive">Item</p>
          <p className="font-bold">{order.product}</p>
        </div>
        <div>
          <p className="mono text-[9px] text-olive">Tujuan</p>
          <p className="break-all font-bold">{target}</p>
        </div>
        <div>
          <p className="mono text-[9px] text-olive">Metode</p>
          <p className="font-bold">{order.method}</p>
        </div>
        <div>
          <p className="mono text-[9px] text-olive">Dibuat</p>
          <p className="font-bold">{formatShort(order.created)}</p>
        </div>
        <div>
          <p className="mono text-[9px] text-olive">Status</p>
          <p className="font-bold">{statusText[order.status]}</p>
        </div>
      </div>

      {order.sn ? (
        <div className="mt-4 border-2 border-ink bg-butter p-4">
          <p className="mono text-[9px] font-bold text-tomato">{order.label}</p>
          <p className="mt-1 break-all font-display text-xl font-extrabold">
            {order.sn}
          </p>
        </div>
      ) : null}

      <div className="mt-4 flex items-end justify-between border-t-2 border-dashed border-ink/20 pt-3">
        <span className="mono text-[10px] text-olive">Total bayar</span>
        <span className="price text-3xl">{formatRupiah(order.total)}</span>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <Barcode code={order.inv} />
          <p className="mono mt-1 text-[9px] tracking-[0.18em] text-olive">
            {order.inv}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-red justify-center"
          >
            Chat admin
          </a>
          <Link href="/bantuan/" className="btn btn-ghost justify-center">
            Bantuan
          </Link>
        </div>
      </div>

      <p className="mt-4 border-t border-dashed border-ink/20 pt-3 text-[11px] leading-relaxed text-olive">
        Pembayaran QRIS dicek manual oleh admin. Status berubah setelah pembayaran
        terverifikasi.
      </p>
    </div>
  );
}

function Barcode({ code }: { code: string }) {
  return (
    <div className="flex h-10 items-end gap-[2px]" aria-hidden="true">
      {Array.from({ length: 44 }).map((_, index) => {
        const value = code.charCodeAt(index % code.length) + index * 7;
        return (
          <span
            key={index}
            className="block bg-ink"
            style={{
              width: index % 4 === 0 ? 3 : 2,
              height: `${8 + (value % 4) * 5}px`,
            }}
          />
        );
      })}
    </div>
  );
}

function formatDate(value: number) {
  return `${new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  })} WIB`;
}

function formatShort(value: number) {
  return new Date(value).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
