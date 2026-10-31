export type RecentInvoice = {
  ref: string;
  label: string;
  amount: number;
  createdAt: number;
};

const STORAGE_KEY = "thepixcloud_invoices";

export function rememberInvoice(entry: RecentInvoice) {
  if (typeof window === "undefined") return;
  const ref = entry.ref.trim().toUpperCase();
  if (!ref) return;
  try {
    const list = read();
    const next = [
      { ...entry, ref },
      ...list.filter((item) => item.ref !== ref),
    ].slice(0, 5);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([{ ...entry, ref }]));
  }
}

export function getRecentInvoices(): RecentInvoice[] {
  if (typeof window === "undefined") return [];
  return read();
}

function read(): RecentInvoice[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const row = item as Record<string, unknown>;
      if (typeof row.ref !== "string") return [];
      return [
        {
          ref: row.ref,
          label: typeof row.label === "string" ? row.label : "-",
          amount: Number(row.amount) || 0,
          createdAt: Number(row.createdAt) || Date.now(),
        },
      ];
    });
  } catch {
    return [];
  }
}
