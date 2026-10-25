import type { Metadata } from "next";
import { Suspense } from "react";
import { InvoiceClient } from "@/components/InvoiceClient";

export const metadata: Metadata = {
  title: "Lacak Pesanan",
  description:
    "Lacak pesanan thepixcloud dengan kode invoice TPC- dan lihat status pembayaran QRIS.",
};

export default function InvoicePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
      <InvoiceClient />
    </Suspense>
  );
}
