import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Onest } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3008"),
  title: {
    default: "thepixcloud · Top up lebih murah, masuk 5 detik",
    template: "%s · thepixcloud",
  },
  description:
    "thepixcloud: top up pulsa, kuota, e-wallet, voucher game, dan bayar tagihan lewat QRIS tanpa akun.",
  openGraph: {
    title: "thepixcloud · Top up lebih murah, masuk 5 detik",
    description:
      "thepixcloud: top up pulsa, kuota, e-wallet, voucher game, dan bayar tagihan lewat QRIS tanpa akun.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${onest.variable} ${jetbrains.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
