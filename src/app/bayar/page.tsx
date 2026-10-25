import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutClient } from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Pembayaran",
  description: "Selesaikan pesanan thepixcloud dengan pembayaran QRIS.",
};

export default function BayarPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
      <CheckoutClient />
    </Suspense>
  );
}
