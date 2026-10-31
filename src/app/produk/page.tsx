import type { Metadata } from "next";
import { Suspense } from "react";
import { ProdukClient } from "@/components/ProdukClient";
import { isSlug } from "@/lib/catalog";
import { getHydratedService } from "@/lib/catalog-hydrate";

export const metadata: Metadata = {
  title: "Produk",
  description:
    "Pilih layanan thepixcloud: pulsa, paket data, e-wallet, token PLN, voucher game, dan tagihan.",
};

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = Array.isArray(params.s) ? params.s[0] : params.s;
  const slug = isSlug(requested) ? requested : "pulsa";
  const { service } = await getHydratedService(slug);

  if (!service) {
    return <div className="min-h-[60vh]" aria-hidden="true" />;
  }

  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
      <ProdukClient key={slug} service={service} />
    </Suspense>
  );
}
