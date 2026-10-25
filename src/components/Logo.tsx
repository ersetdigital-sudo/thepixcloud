import Link from "next/link";

const creamBlocks: [number, number][] = [
  [16, 13], [20, 13],
  [12, 17], [16, 17], [20, 17], [24, 17],
  [8, 21], [12, 21], [16, 21], [20, 21], [24, 21], [28, 21],
  [8, 25], [12, 25], [16, 25], [20, 25], [24, 25], [28, 25],
];

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center gap-2.5" aria-label="thepixcloud beranda">
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="#191F06" />
        {creamBlocks.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4.4" height="4.4" fill="#FFFCB0" />
        ))}
        <rect x="28" y="11" width="4.4" height="4.4" rx=".6" fill="#E43E00" />
      </svg>
      <span
        className="font-display font-extrabold tracking-[-0.05em] text-ink"
        style={{ fontSize: `${Math.round(size * 0.64)}px` }}
      >
        thepix<span className="text-tomato">cloud</span>
      </span>
    </Link>
  );
}
