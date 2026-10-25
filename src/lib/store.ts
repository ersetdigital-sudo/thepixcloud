import type { Slug } from "./catalog";

export type OrderStatus = "processing";

export type Order = {
  id: string;
  slug: Slug;
  product: string;
  provider: string;
  item: string;
  target: string;
  amount: number;
  method: "QRIS";
  status: OrderStatus;
  createdAt: number;
};

const STORAGE_KEY = "thepixcloud_orders";

function readOrders(): Record<string, Order> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, Order>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeOrders(orders: Record<string, Order>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function getOrders(): Order[] {
  return Object.values(readOrders()).sort((a, b) => b.createdAt - a.createdAt);
}

export function findOrder(query: string): Order | null {
  const code = query.trim().toUpperCase();
  if (!code) return null;
  return readOrders()[code] ?? null;
}

export function createOrder(
  input: Omit<Order, "id" | "status" | "method" | "createdAt">,
): Order {
  const order: Order = {
    ...input,
    id: `TPC-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    method: "QRIS",
    status: "processing",
    createdAt: Date.now(),
  };
  const orders = readOrders();
  orders[order.id] = order;
  writeOrders(orders);
  return order;
}
