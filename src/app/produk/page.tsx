import type { Metadata } from "next";
import { Suspense } from "react";
import { ProdukClient } from "@/components/ProdukClient";

export const metadata: Metadata = {
  title: "Produk",
  description:
    "Pilih layanan thepixcloud: pulsa, paket data, e-wallet, token PLN, voucher game, dan tagihan.",
};

export default function ProdukPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
      <ProdukClient />
    </Suspense>
  );
}
