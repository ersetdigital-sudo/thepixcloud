"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_WHATSAPP_URL, products } from "@/lib/catalog";
import { Logo } from "./Logo";

const productLinks = ["pulsa", "paket-data", "e-wallet", "pln", "game", "bpjs"] as const;

export function SiteFooter() {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  const hideOnMobile = pathname === "/produk" || pathname === "/bayar";

  return (
    <footer
      className={`${hideOnMobile ? "hidden lg:block" : ""} mt-20 border-t border-line bg-white`}
    >
      <div className="wrap pb-8 pt-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo size={36} />
            <p className="mt-3.5 max-w-[340px] leading-relaxed text-olive">
              Top up pulsa, data, e-wallet, game, dan bayar tagihan. Cepat, murah,
              nggak pakai drama.
            </p>
            <p className="mono mt-4 text-[11px] font-bold text-tomato">
              QRIS · semua e-wallet &amp; m-banking
            </p>
          </div>

          <div>
            <h4 className="font-display text-base font-extrabold">Produk</h4>
            <ul className="mt-3 space-y-2">
              {productLinks.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/produk/?s=${slug}`}
                    className="text-olive transition-colors hover:text-tomato"
                  >
                    {products[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-extrabold">Bantuan</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/invoice/" className="text-olive transition-colors hover:text-tomato">
                  Cek invoice
                </Link>
              </li>
              <li>
                <Link href="/bantuan/" className="text-olive transition-colors hover:text-tomato">
                  Pusat bantuan
                </Link>
              </li>
              <li>
                <a
                  href={ADMIN_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-olive transition-colors hover:text-tomato"
                >
                  Hubungi kami
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mono mt-10 flex flex-wrap justify-between gap-2 border-t border-line pt-5 text-[11px] text-olive">
          <span>© 2026 thepixcloud. Semua hak dilindungi.</span>
          <span>Dibuat dengan kopi &amp; piksel.</span>
        </div>
      </div>
    </footer>
  );
}
