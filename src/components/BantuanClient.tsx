"use client";

import Link from "next/link";
import { useState } from "react";
import { ADMIN_WHATSAPP, ADMIN_WHATSAPP_URL } from "@/lib/catalog";

type Faq = {
  category: "Pembayaran" | "Pesanan" | "Refund" | "Akun";
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    category: "Pembayaran",
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "QRIS — bisa dari semua e-wallet dan m-banking.",
  },
  {
    category: "Pembayaran",
    question: "Sudah bayar tapi status belum berubah?",
    answer:
      "Pembayaran QRIS dicek manual oleh admin. Kalau lebih dari 15 menit, kirim kode invoice dan bukti bayar ke WhatsApp kami.",
  },
  {
    category: "Pembayaran",
    question: "Apakah ada biaya tambahan?",
    answer:
      "Harga produk sudah final. Nggak ada biaya metode tambahan di checkout.",
  },
  {
    category: "Pesanan",
    question: "Berapa lama pesanan diproses?",
    answer:
      "Setelah pembayaran dicek, rata-rata sekitar 5 detik. Saat gangguan operator bisa beberapa menit.",
  },
  {
    category: "Pesanan",
    question: "Salah input nomor tujuan, bisa dibatalkan?",
    answer:
      "Transaksi yang sudah sukses tidak bisa dibatalkan. Selalu cek ulang nomor di ringkasan sebelum bayar.",
  },
  {
    category: "Refund",
    question: "Transaksi gagal, uang saya gimana?",
    answer:
      "Dana dikembalikan lewat refund ke metode pembayaran awal. Kalau belum masuk, hubungi admin dengan kode invoice.",
  },
  {
    category: "Refund",
    question: "Berapa lama refund masuk?",
    answer:
      "Refund diproses maksimal 1x24 jam di hari kerja. Sertakan kode invoice saat menghubungi admin.",
  },
  {
    category: "Akun",
    question: "Apakah harus daftar akun?",
    answer:
      "Tidak. Semua transaksi bisa tanpa akun. Simpan kode invoice untuk cek status.",
  },
  {
    category: "Akun",
    question: "Riwayat transaksi saya hilang?",
    answer:
      "Riwayat disimpan di browser. Kalau kamu hapus data browser atau ganti perangkat, riwayat tidak terbawa.",
  },
];

const categories = ["Semua", "Pembayaran", "Pesanan", "Refund", "Akun"] as const;

export function BantuanClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Semua");

  const needle = query.trim().toLowerCase();
  const filtered = faqs.filter((item) => {
    if (category !== "Semua" && item.category !== category) return false;
    if (!needle) return true;
    return `${item.category} ${item.question} ${item.answer}`
      .toLowerCase()
      .includes(needle);
  });

  return (
    <main className="wrap pt-9 md:pt-12">
      <div className="max-w-[720px]">
        <span className="badge">Pusat bantuan</span>
        <h1 className="mt-3 font-display text-[clamp(34px,6vw,60px)] font-extrabold leading-none">
          Ada yang bisa kami bantu?
        </h1>

        <div className="relative mt-[22px]">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-olive"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <label htmlFor="faq-search" className="sr-only">
            Cari pertanyaan
          </label>
          <input
            id="faq-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari pertanyaan, misal: refund"
            autoComplete="off"
            className="inp pl-12 focus-visible:outline-none!"
          />
        </div>

        <div
          className="hscroll mt-3.5"
          role="group"
          aria-label="Filter pertanyaan"
        >
          {categories.map((item) => {
            const isActive = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={isActive}
                className={`tab ${isActive ? "bg-ink text-paper" : "hover:border-tomato"}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="space-y-3">
            {filtered.map((item) => (
              <details key={item.question} className="card px-5">
                <summary className="flex min-h-[76px] cursor-pointer list-none items-center justify-between gap-4">
                  <span>
                    <span className="badge mb-1.5 px-2 py-0.5 text-[10px]">
                      {item.category}
                    </span>
                    <span className="block font-display text-lg font-bold leading-snug">
                      {item.question}
                    </span>
                  </span>
                  <span className="faq-plus grid h-[30px] w-[30px] shrink-0 place-items-center rounded font-extrabold">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-olive">{item.answer}</p>
              </details>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="card p-5 text-center text-olive">
              Nggak ada hasil. Coba kata lain atau hubungi kami.
            </p>
          ) : null}
        </div>

        <aside
          id="kontak"
          className="card card-pop p-6 lg:sticky lg:top-[90px]"
        >
          <h2 className="font-display text-[22px] font-extrabold">Masih bingung?</h2>
          <p className="mt-1 text-sm text-olive">
            Admin membalas secepatnya. Sertakan kode invoice TPC- biar cepat
            dicek.
          </p>

          <div className="mt-4 space-y-2.5">
            <a
              href={ADMIN_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red w-full justify-start"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7.5z" />
                <path d="M8 9.5h8M8 12.5h5" />
              </svg>
              WhatsApp: {ADMIN_WHATSAPP}
            </a>
            <Link href="/invoice/" className="btn btn-ghost w-full justify-start">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z" />
                <path d="M9 8h6M9 12h6" />
              </svg>
              Cek status invoice
            </Link>
            <Link href="/#cara" className="btn btn-ghost w-full justify-start">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" />
                <rect x="14" y="3.5" width="6.5" height="6.5" rx="1" />
                <rect x="3.5" y="14" width="6.5" height="6.5" rx="1" />
                <path d="M14 14h2.5v2.5M20.5 14v6.5H14" />
              </svg>
              Cara bayar QRIS
            </Link>
          </div>

          <p className="mt-3 text-xs text-olive">
            Pembayaran dicek manual oleh admin.
          </p>
        </aside>
      </div>
    </main>
  );
}
