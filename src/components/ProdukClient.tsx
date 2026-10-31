"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  detectOperator,
  formatRupiah,
  normalizePhone,
  type Item,
} from "@/lib/catalog";
import type { HydratedService } from "@/lib/catalog-hydrate";
import { CheckIcon, ServiceIcon } from "./ServiceIcon";

function ChipIcon({ type }: { type: "bolt" | "refund" | "clock" }) {
  if (type === "bolt") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z" />
      </svg>
    );
  }
  if (type === "refund") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M4 12a8 8 0 1 0 2.5-5.8" />
        <path d="M4 4v4.5h4.5" />
      </svg>
    );
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function ProdukClient({ service }: { service: HydratedService }) {
  const router = useRouter();
  const product = service.product;
  const slug = product.slug;

  const [target, setTarget] = useState("");
  const [provider, setProvider] = useState<string | null>(
    product.detect
      ? null
      : product.providers.length === 1
        ? product.providers[0]
        : null,
  );
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    document.title = `${product.name} · thepixcloud`;
  }, [product.name]);

  const digits = target.replace(/\D/g, "");
  const valid =
    product.type === "text"
      ? target.trim().length >= 5
      : product.detect || product.type === "tel"
        ? normalizePhone(target).length >= 10
        : digits.length >= 6;

  const billItem: Item | null =
    product.bill && provider && valid ? service.billItem : null;
  const list = product.bill ? [] : service.byProvider[provider ?? ""] ?? [];
  const item: Item | null = product.bill
    ? billItem
    : selected !== null
      ? list[selected] ?? null
      : null;
  const canPay = valid && !!provider && !!item;

  const operator = product.detect ? detectOperator(target) : null;
  const unknownOperator =
    product.detect && digits.length >= 4 && !operator;

  function handleTarget(value: string) {
    setTarget(value);
    if (!product.detect) return;
    const detected = detectOperator(value);
    if (detected !== provider) {
      setProvider(detected);
      setSelected(null);
    }
  }

  function handleProvider(name: string) {
    setProvider(name);
    setSelected(null);
  }

  function pay() {
    if (!canPay || !provider || !item) return;
    const next = new URLSearchParams({
      s: slug,
      p: provider,
      i: item.name,
      n: target.trim(),
      a: String(item.price),
      sid: service.dbServiceId ?? "",
      pid: item.id ?? "",
    });
    router.push(`/bayar/?${next.toString()}`);
  }

  const step3Title = product.bill
    ? "Tagihan kamu"
    : slug === "bpjs"
      ? "Pilih jumlah bulan"
      : "Pilih nominal";

  const summary: [string, string][] = [
    ["Produk", product.name],
    ["Provider", provider ?? "–"],
    ["Item", item?.name ?? "–"],
    ["Tujuan", target.trim() || "–"],
  ];

  const footerStatus = !valid
    ? `Isi ${product.detect ? "nomor HP" : product.label.toLowerCase()} dulu`
    : !provider
      ? "Pilih provider dulu"
      : !item
        ? product.bill
          ? "Menunggu tagihan"
          : "Pilih nominal dulu"
        : item.name;

  return (
    <main className="pb-bar">
      <section className="wrap pt-5">
        <Link
          href="/#layanan"
          className="text-sm font-semibold text-olive transition-colors hover:text-tomato"
        >
          ← Semua layanan
        </Link>

        <div className="relative mt-3 overflow-hidden rounded-[10px] border-2 border-ink bg-ink p-6 text-paper shadow-[6px_6px_0_#E43E00] md:p-8">
          <div
            className="absolute -right-8 -top-8 h-40 w-40 rotate-[18deg] rounded-[40px] bg-butter/15"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[18px] bg-paper text-tomato">
              <ServiceIcon slug={product.icon} className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-paper/75">
                {product.cat}
              </p>
              <h1 className="mt-1 font-display text-[clamp(32px,6vw,48px)] font-extrabold leading-none">
                {product.name}
              </h1>
              <p className="mt-2 max-w-[560px] text-paper/85">{product.desc}</p>
              <div className="mt-3.5 flex flex-wrap gap-2 text-[13px] font-semibold">
                {[
                  ["bolt", "Proses ±5 detik"],
                  ["refund", "Gagal = refund"],
                  ["clock", "Buka 24 jam"],
                ].map(([icon, label]) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-paper/25 bg-paper/10 px-3 py-1.5"
                  >
                    <ChipIcon type={icon as "bolt" | "refund" | "clock"} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap mt-6 grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="card p-[22px]">
            <div className={`step ${valid ? "done" : ""}`}>
              <span className="n">1</span>
              <div>
                <h3 className="font-display text-[19px] font-extrabold">Isi tujuan</h3>
                <p className="text-[13.5px] text-olive">
                  {product.detect
                    ? "Operator terdeteksi otomatis."
                    : "Pastikan data sudah benar."}
                </p>
              </div>
            </div>
            <label className="lbl" htmlFor="target">
              {product.detect ? "Nomor HP" : product.label}
            </label>
            <div className="relative">
              <input
                id="target"
                value={target}
                onChange={(event) => handleTarget(event.target.value)}
                type={product.type === "tel" ? "tel" : "text"}
                inputMode={product.type === "text" ? "text" : "numeric"}
                autoComplete="off"
                placeholder={product.ph}
                className={`inp focus-visible:outline-none! ${product.detect && provider ? "pr-[120px]" : ""}`}
              />
              {product.detect && provider ? (
                <span className="badge absolute right-2.5 top-1/2 max-w-[110px] -translate-y-1/2 truncate">
                  {provider}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-[12.5px] text-olive">
              {unknownOperator
                ? "Operator nggak dikenali. Cek 4 digit awal nomor kamu."
                : product.detect
                  ? "Operator kebaca otomatis dari nomor."
                  : "Data dipakai untuk mengirim produk."}
            </p>
          </div>

          {product.detect ? null : (
            <div className="card p-[22px]">
              <div className={`step ${provider ? "done" : ""}`}>
                <span className="n">2</span>
                <div>
                  <h3 className="font-display text-[19px] font-extrabold">
                    Pilih provider
                  </h3>
                  <p className="text-[13.5px] text-olive">Geser untuk lihat semua.</p>
                </div>
              </div>
              <div className="hscroll">
                {product.providers.map((name) => {
                  const isActive = provider === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => handleProvider(name)}
                      aria-pressed={isActive}
                      className={`chip ${isActive ? "border-tomato bg-[#FFFCE0]" : ""}`}
                    >
                      <span
                        className={`av ${isActive ? "bg-tomato text-paper" : ""}`}
                      >
                        {name
                          .replace(/[^A-Za-z0-9 ]/g, "")
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="card p-[22px]">
            <div className={`step ${item ? "done" : ""}`}>
              <span className="n">{product.detect ? "2" : "3"}</span>
              <div>
                <h3 className="font-display text-[19px] font-extrabold">
                  {step3Title}
                </h3>
                <p className="text-[13.5px] text-olive">
                  {product.bill
                    ? "Nominal tagihan dari katalog, dicek admin."
                    : "Harga sudah termasuk biaya admin."}
                </p>
              </div>
            </div>

            {product.bill ? (
              billItem ? (
                <div className="mt-2 rounded-[18px] border-2 border-tomato bg-[#FFFCE0] p-[18px] shadow-[4px_4px_0_#FFFCB0]">
                  <div className="flex justify-between gap-3">
                    <div>
                      <div className="text-[12.5px] text-olive">Nominal tagihan</div>
                      <div className="text-[17px] font-extrabold">{billItem.name}</div>
                    </div>
                    <span className="badge">Belum dibayar</span>
                  </div>
                  <div className="mt-3.5 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-[12.5px] text-olive">Provider</div>
                      <b>{provider}</b>
                    </div>
                    <div>
                      <div className="text-[12.5px] text-olive">Tujuan</div>
                      <b className="break-all">{target.trim()}</b>
                    </div>
                  </div>
                  <div className="mt-3.5 flex items-end justify-between border-t border-dashed border-ink/25 pt-3">
                    <span className="text-olive">Total</span>
                    <span className="price text-2xl">{formatRupiah(billItem.price)}</span>
                  </div>
                  <p className="mt-2 text-[11.5px] text-olive">
                    Nominal dari katalog. Dicek admin sebelum diproses.
                  </p>
                </div>
              ) : (
                <p className="mt-1 rounded-2xl border-2 border-dashed border-ink/25 p-5 text-center text-sm text-olive">
                  {!provider
                    ? "Pilih provider dulu."
                    : "Isi ID pelanggan untuk menampilkan tagihan."}
                </p>
              )
            ) : !provider ? (
              <p className="mt-1 rounded-2xl border-2 border-dashed border-ink/25 p-5 text-center text-sm text-olive">
                {product.detect
                  ? "Ketik nomor HP, nominal muncul sesuai operator."
                  : "Pilih provider dulu."}
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2 md:grid-cols-3">
                {list.map((option, index) => {
                  const isActive = selected === index;
                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setSelected(index)}
                      aria-pressed={isActive}
                      className={`nom mt-1 ${
                        isActive
                          ? "border-ink bg-[#FFFCE0] shadow-[3px_3px_0_#E43E00]"
                          : ""
                      }`}
                    >
                      {index === 2 ? <span className="pop">Populer</span> : null}
                      <span
                        className={`ck absolute right-2.5 top-2.5 h-[22px] w-[22px] place-items-center ${
                          isActive ? "grid" : "hidden"
                        }`}
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <div className="pr-5 text-[15px] font-extrabold leading-tight">
                        {option.name}
                      </div>
                      <div className="mt-0.5 text-[12px] text-olive">{option.sub}</div>
                      <div className="price mt-2 text-base">
                        {formatRupiah(option.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <aside className="card card-pop sticky top-[90px] hidden p-6 lg:block">
          <h3 className="font-display text-xl font-extrabold">Ringkasan</h3>
          <dl className="mt-4 space-y-3 text-sm">
            {summary.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-olive">{label}</dt>
                <dd className="break-words text-right font-bold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="my-[18px] border-t border-dashed border-ink/25" />
          <div className="flex items-end justify-between">
            <span className="font-semibold text-olive">Total</span>
            <span className="price text-[28px]">
              {item ? formatRupiah(item.price) : "Rp0"}
            </span>
          </div>
          <button
            type="button"
            onClick={pay}
            disabled={!canPay}
            className="btn btn-red mt-[18px] w-full min-h-[54px]"
          >
            Lanjut bayar
          </button>
          <p className="mt-2.5 text-center text-xs text-olive">
            Tanpa akun. Gagal = refund.
          </p>
        </aside>
      </section>

      <div className="fbar lg:hidden">
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs opacity-70">{footerStatus}</div>
          <div className="font-display text-lg font-extrabold">
            {item ? formatRupiah(item.price) : "Rp0"}
          </div>
        </div>
        <button
          type="button"
          onClick={pay}
          disabled={!canPay}
          className="btn border-ink bg-ink text-paper shadow-none disabled:cursor-not-allowed disabled:opacity-40"
        >
          Bayar
        </button>
      </div>
    </main>
  );
}
