import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutClient } from "@/components/CheckoutClient";
import { getStorefront } from "@/lib/catalog-hydrate";

export const metadata: Metadata = {
  title: "Pembayaran",
  description: "Selesaikan pesanan thepixcloud dengan pembayaran QRIS.",
};

export default async function BayarPage() {
  const storefront = await getStorefront();
  const qrisMethod =
    storefront.methods.find(
      (method) => method.name.toLowerCase() === "qris",
    ) ??
    storefront.methods[0] ??
    null;

  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
      <CheckoutClient
        brandSlug={storefront.brand?.slug ?? ""}
        qrisMethodId={qrisMethod?.id ?? null}
        qrisImageUrl={storefront.brand?.qris_image_url ?? null}
      />
    </Suspense>
  );
}
