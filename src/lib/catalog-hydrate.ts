import {
  itemsFor,
  products as baseProducts,
  type Item,
  type Product,
} from "@/lib/catalog";
import {
  getCatalog,
  type CatalogMethod,
  type CatalogService,
} from "@/lib/db/server";
import type { WebBrand } from "@/lib/db/types";

export type HydratedItem = Item & { id?: string };

export type HydratedService = {
  product: Product;
  dbServiceId: string | null;
  byProvider: Record<string, HydratedItem[]>;
  billItem: HydratedItem | null;
};

export type Storefront = {
  services: Record<string, HydratedService>;
  methods: CatalogMethod[];
  brand: WebBrand | null;
};

function hydrateService(
  product: Product,
  dbService: CatalogService,
): HydratedService {
  const findProduct = (names: string[]) =>
    dbService.products.find((candidate) => names.includes(candidate.nama));

  if (product.bill) {
    const fixed = dbService.products[0];
    return {
      product,
      dbServiceId: dbService.dbId,
      byProvider: {},
      billItem: fixed
        ? { name: fixed.nama, sub: "", price: fixed.hargaJual, id: fixed.id }
        : null,
    };
  }

  const byProvider: Record<string, HydratedItem[]> = {};
  for (const provider of product.providers) {
    const baseItems = itemsFor(product.slug, provider);
    byProvider[provider] = baseItems.map((item) => {
      const dbProduct = findProduct([
        `${provider} · ${item.name}`,
        item.name,
      ]);
      return dbProduct
        ? { ...item, price: dbProduct.hargaJual, id: dbProduct.id }
        : item;
    });
  }

  return {
    product,
    dbServiceId: dbService.dbId,
    byProvider,
    billItem: null,
  };
}

export async function getStorefront(): Promise<Storefront> {
  const result = await getCatalog();
  if (!result.data) {
    return { services: {}, methods: [], brand: null };
  }

  const bySlug = new Map(
    result.data.services.map((service) => [service.slug, service]),
  );
  const services: Record<string, HydratedService> = {};
  for (const product of Object.values(baseProducts)) {
    const dbService = bySlug.get(product.slug);
    services[product.slug] = dbService
      ? hydrateService(product, dbService)
      : {
          product,
          dbServiceId: null,
          byProvider: {},
          billItem: null,
        };
  }

  return {
    services,
    methods: result.data.methods,
    brand: result.data.brand,
  };
}

export async function getHydratedService(slug: string) {
  const storefront = await getStorefront();
  return {
    service: storefront.services[slug] ?? null,
    services: storefront.services,
    methods: storefront.methods,
    brand: storefront.brand,
  };
}
