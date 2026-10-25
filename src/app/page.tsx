import Link from "next/link";
import { CatalogList } from "@/components/CatalogList";
import { PixelCloud } from "@/components/PixelCloud";
import { Reveal } from "@/components/Reveal";

const transactions = [
  ["0812•••4521", "Pulsa 50rb", "Telkomsel"],
  ["ML 9921•••", "172 Diamonds", "Mobile Legends"],
  ["5123•••8901", "Token 100rb", "PLN"],
  ["0857•••1180", "15GB · 30 hari", "Indosat"],
  ["0896•••3307", "Saldo 50rb", "DANA"],
  ["FF 4410•••", "355 Diamonds", "Free Fire"],
  ["8888•••7890", "2 bulan", "BPJS Kelas 2"],
  ["0878•••6612", "Pulsa 25rb", "XL"],
];

const faqs = [
  {
    question: "Berapa lama sampai masuk?",
    answer:
      "Setelah pembayaran dicek admin, rata-rata sekitar 5 detik. Saat operator sibuk bisa beberapa menit.",
  },
  {
    question: "Wajib daftar akun?",
    answer:
      "Nggak. Isi tujuan, bayar, beres. Simpan kode invoice buat cek status.",
  },
  {
    question: "Kalau gagal, uangnya ke mana?",
    answer:
      "Balik utuh ke metode pembayaran asal, atau kami proses manual maksimal 1x24 jam.",
  },
  {
    question: "Bisa bayar pakai apa?",
    answer: "QRIS — bisa dari semua e-wallet dan m-banking.",
  },
];

const steps = [
  {
    label: "[ klik 1 ]",
    title: "Ketik tujuan",
    copy: "Nomor HP, ID pelanggan, atau User ID game. Operator kebaca sendiri.",
  },
  {
    label: "[ klik 2 ]",
    title: "Scan QRIS",
    copy: "Bayar dari e-wallet atau m-banking apa pun. Satu kode untuk semua.",
  },
  {
    label: "[ klik 3 ]",
    title: "Masuk otomatis",
    copy: "Sekitar 5 detik setelah pembayaran dicek. Gagal? Uang balik utuh.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b-2 border-ink bg-paper">
        <div className="wrap pb-[clamp(40px,6vw,72px)] pt-[clamp(40px,7vw,80px)] text-center">
          <PixelCloud />

          <h1 className="mx-auto mt-7 max-w-[1000px] font-display text-[clamp(40px,7.6vw,96px)] font-extrabold leading-[0.95] tracking-[-0.05em]">
            <span className="w" style={{ animationDelay: "0.05s" }}>
              Top
            </span>{" "}
            <span className="w" style={{ animationDelay: "0.1s" }}>
              up
            </span>{" "}
            <span className="w" style={{ animationDelay: "0.15s" }}>
              <span className="mk">lebih murah,</span>
            </span>
            <br />
            <span className="w" style={{ animationDelay: "0.25s" }}>
              masuk
            </span>{" "}
            <span className="w" style={{ animationDelay: "0.3s" }}>
              dalam
            </span>{" "}
            <span
              className="w whitespace-nowrap text-tomato"
              style={{ animationDelay: "0.35s" }}
            >
              5 detik.
            </span>
          </h1>

          <p className="mx-auto mt-[22px] max-w-[600px] text-[clamp(16px,2vw,19px)] leading-relaxed text-olive">
            Harga dekat modal, proses cepat setelah pembayaran dicek, dan uang
            balik utuh kalau gagal. Tanpa daftar, tanpa ribet.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/produk/?s=pulsa"
              className="btn btn-red min-h-[54px] px-[26px]"
            >
              Mulai top up →
            </Link>
            <Link href="#layanan" className="btn btn-ghost min-h-[54px] px-[26px]">
              Lihat 9 layanan
            </Link>
          </div>

          <div className="vgrid mt-[clamp(40px,6vw,64px)]">
            <div className="v">
              <b>
                ±5<small>dtk</small>
              </b>
              <span>Setelah dicek, langsung masuk</span>
            </div>
            <div className="v">
              <b>
                100<small>%</small>
              </b>
              <span>Refund kalau transaksi gagal</span>
            </div>
            <div className="v hot">
              <b>Rp0</b>
              <span>Biaya daftar. Nggak perlu akun</span>
            </div>
            <div className="v">
              <b>QRIS</b>
              <span>Satu scan, semua e-wallet &amp; m-banking</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mq" aria-label="Transaksi terbaru">
        <div className="mq-t">
          {[...transactions, ...transactions].map(([target, item, provider], index) => (
            <div
              key={`${target}-${index}`}
              className="flex shrink-0 items-center gap-3 px-[26px] py-3.5"
              aria-hidden={index >= transactions.length}
            >
              <span className="h-2 w-2 shrink-0 bg-tomato" />
              <span className="font-display font-bold">{item}</span>
              <span className="mono text-[11px] text-paper/60">
                {provider} · {target}
              </span>
              <span className="mono text-[11px] text-butter">✓ ok</span>
            </div>
          ))}
        </div>
      </div>

      <CatalogList />

      <section className="wrap pt-24">
        <Reveal>
          <span className="mono text-[12px] text-olive">02 / Cara kerja</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-2.5 font-display text-[clamp(36px,6vw,68px)] font-extrabold leading-[0.95]">
            Tiga klik. Selesai.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 100}
              className={`tile ${index === 2 ? "bg-butter shadow-[4px_4px_0_#191F06]" : ""}`}
            >
              <span className="mono text-[12px] text-tomato">{step.label}</span>
              <h3 className="font-display text-[26px] font-extrabold">{step.title}</h3>
              <p className="leading-relaxed text-olive">{step.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap grid gap-10 pt-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <span className="mono text-[12px] text-olive">03 / Tanya jawab</span>
          <h2 className="mt-2.5 font-display text-[clamp(36px,5vw,56px)] font-extrabold leading-[0.95]">
            Masih ragu?
          </h2>
          <Link href="/bantuan/" className="btn btn-ghost mt-[22px]">
            Semua pertanyaan →
          </Link>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={100}>
          <div className="border-t-2 border-ink">
            {faqs.map((item, index) => (
              <details key={item.question} className="faq" open={index === 0}>
                <summary>
                  {item.question}
                  <span className="pl" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="wrap pt-24">
        <Reveal className="flex flex-col justify-between gap-6 rounded-[10px] border-2 border-ink bg-tomato p-[clamp(24px,5vw,48px)] text-white shadow-[6px_6px_0_#191F06] md:flex-row md:items-center">
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-[0.95]">
            Saldo tipis?
            <br />
            Isi sekarang.
          </h2>
          <Link
            href="/produk/?s=pulsa"
            className="btn min-h-[56px] border-ink bg-ink px-[28px] text-paper hover:bg-ink/90"
          >
            Mulai top up →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
