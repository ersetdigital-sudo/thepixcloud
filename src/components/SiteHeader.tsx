"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const navigation = [
  { href: "/", label: "Beranda" },
  { href: "/produk/?s=pulsa", label: "Produk" },
  { href: "/invoice/", label: "Cek Invoice" },
  { href: "/bantuan/", label: "Bantuan" },
];

function activeLabel(pathname: string) {
  if (pathname === "/") return "Beranda";
  if (pathname.startsWith("/produk")) return "Produk";
  if (pathname.startsWith("/invoice")) return "Cek Invoice";
  if (pathname.startsWith("/bantuan")) return "Bantuan";
  return "";
}

export function SiteHeader() {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  const active = activeLabel(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="wrap relative flex h-[68px] items-center justify-between gap-4">
        <Logo />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 min-[900px]:flex"
          aria-label="Menu utama"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active === item.label ? "page" : undefined}
              className={`mono border-b-2 pb-1.5 pt-1.5 text-[12.5px] font-bold transition-colors ${
                active === item.label
                  ? "border-tomato text-tomato"
                  : "border-transparent text-ink hover:text-tomato"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/produk/?s=pulsa"
            className="btn btn-red hidden min-[900px]:inline-flex"
          >
            Top up →
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink bg-butter text-ink min-[900px]:hidden"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="mnav-open border-t-2 border-ink px-5 pb-5 min-[900px]:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active === item.label ? "page" : undefined}
              className={`block border-b-2 border-dashed py-3.5 font-display text-3xl font-extrabold tracking-[-0.03em] ${
                active === item.label ? "text-tomato" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/produk/?s=pulsa"
            onClick={() => setOpen(false)}
            className="btn btn-red mt-4 w-full min-h-[54px]"
          >
            Top up sekarang →
          </Link>
        </div>
      ) : null}
    </header>
  );
}
