export const QRIS_IMAGE =
  "https://res.cloudinary.com/dqjh7utdb/image/upload/v1792161327/camhvfeu1lcm0ps8ieiz.jpg";

export const ADMIN_WHATSAPP = "085711172317";
export const ADMIN_WHATSAPP_URL = "https://wa.me/6285711172317";

export type Slug =
  | "pulsa"
  | "paket-data"
  | "e-wallet"
  | "pln"
  | "pdam"
  | "tv-internet"
  | "game"
  | "bpjs"
  | "multifinance";

export type Group = "isi" | "tagihan" | "hiburan";

export type Product = {
  slug: Slug;
  name: string;
  group: Group;
  cat: string;
  icon: Slug;
  desc: string;
  label: string;
  ph: string;
  detect?: boolean;
  type: "tel" | "num" | "text";
  bill?: boolean;
  providers: string[];
};

export type Item = {
  name: string;
  sub: string;
  price: number;
  id?: string;
};

export const groupLabels: Record<Group, string> = {
  isi: "Isi ulang",
  tagihan: "Tagihan",
  hiburan: "Hiburan",
};

const OPS: [string, string[]][] = [
  ["Telkomsel", ["0811", "0812", "0813", "0821", "0822", "0823", "0851", "0852", "0853"]],
  ["Indosat", ["0814", "0815", "0816", "0855", "0856", "0857", "0858"]],
  ["XL", ["0817", "0818", "0819", "0859", "0877", "0878"]],
  ["Axis", ["0831", "0832", "0833", "0838"]],
  ["Tri", ["0895", "0896", "0897", "0898", "0899"]],
  ["Smartfren", ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"]],
];

const GAMES: Record<string, [string, number][]> = {
  "Mobile Legends": [
    ["86 Diamonds", 24500],
    ["172 Diamonds", 48500],
    ["257 Diamonds", 72000],
    ["344 Diamonds", 97000],
    ["706 Diamonds", 198000],
    ["Weekly Diamond Pass", 34900],
  ],
  "Free Fire": [
    ["70 Diamonds", 10900],
    ["140 Diamonds", 21500],
    ["355 Diamonds", 51000],
    ["720 Diamonds", 101000],
    ["1450 Diamonds", 196000],
  ],
  "PUBG Mobile": [
    ["60 UC", 17500],
    ["325 UC", 80500],
    ["660 UC", 167000],
  ],
};

const BPJS: Record<string, number> = {
  "Kelas 1": 150000,
  "Kelas 2": 100000,
  "Kelas 3": 35000,
};

const PULSA_BASE: [number, number][] = [
  [5000, 6200],
  [10000, 11000],
  [20000, 20900],
  [25000, 25800],
  [50000, 50800],
  [100000, 100200],
];

const DATA_BASE: [string, number][] = [
  ["3GB · 7 hari", 15000],
  ["8GB · 30 hari", 39000],
  ["15GB · 30 hari", 62000],
  ["25GB · 30 hari", 85000],
  ["40GB · 30 hari", 115000],
  ["Unlimited harian · 30 hari", 99000],
];

const OP_ADJ: Record<string, number> = {
  Telkomsel: 0,
  Indosat: -150,
  XL: 100,
  Axis: 50,
  Tri: -200,
  Smartfren: -250,
};

export function formatRupiah(value: number) {
  return `Rp${Math.round(value).toLocaleString("id-ID")}`;
}

export function compactNominal(value: number) {
  return value >= 1000 ? `${value / 1000}rb` : String(value);
}

export function normalizePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("62")) digits = `0${digits.slice(2)}`;
  else if (digits.startsWith("8")) digits = `0${digits}`;
  return digits;
}

export function detectOperator(raw: string): string | null {
  const number = normalizePhone(raw);
  if (number.length < 4) return null;
  const prefix = number.slice(0, 4);
  const found = OPS.find(([, prefixes]) => prefixes.includes(prefix));
  return found ? found[0] : null;
}

export function providerInitials(name: string) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const operatorNames = OPS.map(([name]) => name);

export const products: Record<Slug, Product> = {
  pulsa: {
    slug: "pulsa",
    name: "Pulsa",
    group: "isi",
    cat: "Isi ulang",
    icon: "pulsa",
    desc: "Isi pulsa semua operator, masuk dalam hitungan detik.",
    label: "Nomor HP",
    ph: "0812 3456 7890",
    detect: true,
    type: "tel",
    providers: operatorNames,
  },
  "paket-data": {
    slug: "paket-data",
    name: "Paket Data",
    group: "isi",
    cat: "Isi ulang",
    icon: "paket-data",
    desc: "Kuota internet harian sampai bulanan, tinggal pilih.",
    label: "Nomor HP",
    ph: "0812 3456 7890",
    detect: true,
    type: "tel",
    providers: operatorNames,
  },
  "e-wallet": {
    slug: "e-wallet",
    name: "E-Wallet",
    group: "isi",
    cat: "Isi ulang",
    icon: "e-wallet",
    desc: "Top up DANA, OVO, GoPay, ShopeePay, LinkAja.",
    label: "Nomor HP terdaftar",
    ph: "0812 3456 7890",
    type: "tel",
    providers: ["DANA", "OVO", "GoPay", "ShopeePay", "LinkAja"],
  },
  pln: {
    slug: "pln",
    name: "Token PLN",
    group: "tagihan",
    cat: "Tagihan",
    icon: "pln",
    desc: "Beli token listrik prabayar, kode langsung dikirim.",
    label: "Nomor meter / ID pelanggan",
    ph: "5123 4567 8901",
    type: "num",
    providers: ["PLN Prabayar"],
  },
  pdam: {
    slug: "pdam",
    name: "PDAM",
    group: "tagihan",
    cat: "Tagihan",
    icon: "pdam",
    desc: "Bayar tagihan air bulanan tanpa ke loket.",
    label: "ID pelanggan PDAM",
    ph: "1234567890",
    type: "num",
    bill: true,
    providers: ["PAM Jaya", "PDAM Surya Sembada", "PDAM Tirtawening", "PDAM Tirta Moedal"],
  },
  "tv-internet": {
    slug: "tv-internet",
    name: "TV & Internet",
    group: "tagihan",
    cat: "Tagihan",
    icon: "tv-internet",
    desc: "IndiHome, Biznet, First Media, MNC Play.",
    label: "Nomor pelanggan",
    ph: "1220 0123 4567",
    type: "num",
    bill: true,
    providers: ["IndiHome", "Biznet", "First Media", "MNC Play"],
  },
  game: {
    slug: "game",
    name: "Voucher Game",
    group: "hiburan",
    cat: "Hiburan",
    icon: "game",
    desc: "Diamonds, UC, dan pass favorit, langsung ke akun.",
    label: "User ID (Zone ID)",
    ph: "12345678 (1234)",
    type: "text",
    providers: Object.keys(GAMES),
  },
  bpjs: {
    slug: "bpjs",
    name: "BPJS Kesehatan",
    group: "tagihan",
    cat: "Tagihan",
    icon: "bpjs",
    desc: "Iuran BPJS per kelas, bisa bayar beberapa bulan sekaligus.",
    label: "Nomor VA keluarga",
    ph: "8888 8012 3456 7890",
    type: "num",
    providers: ["Kelas 1", "Kelas 2", "Kelas 3"],
  },
  multifinance: {
    slug: "multifinance",
    name: "Multifinance",
    group: "tagihan",
    cat: "Tagihan",
    icon: "multifinance",
    desc: "Cicilan Adira, FIF, BAF, WOM Finance.",
    label: "Nomor kontrak",
    ph: "0101 2345 6789",
    type: "num",
    bill: true,
    providers: ["Adira Finance", "FIF Group", "BAF", "WOM Finance"],
  },
};

export const productSlugs: Slug[] = [
  "pulsa",
  "paket-data",
  "e-wallet",
  "pln",
  "game",
  "pdam",
  "tv-internet",
  "bpjs",
  "multifinance",
];

export const productTabs: { value: "all" | Group; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "isi", label: "Isi ulang" },
  { value: "tagihan", label: "Tagihan" },
  { value: "hiburan", label: "Hiburan" },
];

export const productsList = productSlugs.map((slug) => products[slug]);

export function isSlug(value: string | null | undefined): value is Slug {
  return !!value && value in products;
}

export function itemsFor(slug: Slug, provider: string | null): Item[] {
  switch (slug) {
    case "pulsa": {
      const op = provider ?? "Telkomsel";
      const adj = OP_ADJ[op] ?? 0;
      return PULSA_BASE.map(([nominal, price]) => ({
        name: `Pulsa ${compactNominal(nominal)}`,
        sub: op,
        price: price + adj * (nominal >= 50000 ? 2 : 1),
      }));
    }
    case "paket-data": {
      const op = provider ?? "Telkomsel";
      const adj = OP_ADJ[op] ?? 0;
      return DATA_BASE.map(([name, price]) => ({
        name,
        sub: op,
        price: price + adj * 8,
      }));
    }
    case "e-wallet":
      return [20000, 25000, 50000, 100000, 150000, 200000].map((nominal) => ({
        name: `Saldo ${compactNominal(nominal)}`,
        sub: `Admin ${formatRupiah(1500)}`,
        price: nominal + 1500,
      }));
    case "pln":
      return [20000, 50000, 100000, 200000, 500000].map((nominal) => ({
        name: `Token ${compactNominal(nominal)}`,
        sub: `Admin ${formatRupiah(2500)}`,
        price: nominal + 2500,
      }));
    case "game": {
      const selected = provider && GAMES[provider] ? provider : "Mobile Legends";
      return GAMES[selected].map(([name, price]) => ({
        name,
        sub: selected,
        price,
      }));
    }
    case "bpjs": {
      const base = BPJS[provider ?? "Kelas 3"] ?? BPJS["Kelas 3"];
      return [1, 2, 3, 6, 12].map((months) => ({
        name: `${months} bulan`,
        sub: `${formatRupiah(base)}/bln + admin`,
        price: base * months + 2500,
      }));
    }
    default:
      return [];
  }
}
