import type { ReactNode } from "react";
import type { Slug } from "@/lib/catalog";

const paths: Record<Slug, ReactNode> = {
  pulsa: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  "paket-data": (
    <>
      <path d="M2.5 9a14 14 0 0 1 19 0" />
      <path d="M5.5 12.5a9.5 9.5 0 0 1 13 0" />
      <path d="M8.7 16a5 5 0 0 1 6.6 0" />
      <circle cx="12" cy="19.3" r=".6" />
    </>
  ),
  "e-wallet": (
    <>
      <path d="M4 7.5V6a2 2 0 0 1 2-2h11v3.5" />
      <rect x="3" y="7.5" width="18" height="13" rx="2.5" />
      <path d="M16 14h2.5" />
    </>
  ),
  pln: <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z" />,
  pdam: <path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z" />,
  "tv-internet": (
    <>
      <rect x="3" y="5" width="18" height="12.5" rx="2.5" />
      <path d="M8 21h8M12 17.5V21" />
    </>
  ),
  game: (
    <>
      <path d="M7 8h10a4.5 4.5 0 0 1 4.3 5.8l-1 3.3a2.5 2.5 0 0 1-4.3.9L14.5 16h-5L8 18a2.5 2.5 0 0 1-4.3-.9l-1-3.3A4.5 4.5 0 0 1 7 8z" />
      <path d="M8 11v3M6.5 12.5h3" />
      <circle cx="16" cy="12" r=".6" />
    </>
  ),
  bpjs: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.6 3.2 8.4 7.5 10 4.3-1.6 7.5-5.4 7.5-10v-6z" />
      <path d="M12 9v5M9.5 11.5h5" />
    </>
  ),
  multifinance: (
    <>
      <path d="M5 16.5V12l2-5h10l2 5v4.5" />
      <path d="M3.5 12h17v4.5h-17z" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </>
  ),
};

export function ServiceIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: Slug;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[slug]}
    </svg>
  );
}

export function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
