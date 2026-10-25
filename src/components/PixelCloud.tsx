const blocks: { col: number; row: number; red?: boolean }[] = [
  { col: 4, row: 1 },
  { col: 5, row: 1 },
  { col: 3, row: 2 },
  { col: 4, row: 2 },
  { col: 5, row: 2 },
  { col: 6, row: 2 },
  { col: 8, row: 2, red: true },
  { col: 2, row: 3 },
  { col: 3, row: 3 },
  { col: 4, row: 3 },
  { col: 5, row: 3 },
  { col: 6, row: 3 },
  { col: 7, row: 3 },
  ...Array.from({ length: 8 }, (_, index) => ({ col: index + 1, row: 4 })),
  ...Array.from({ length: 8 }, (_, index) => ({ col: index + 1, row: 5 })),
];

export function PixelCloud() {
  return (
    <div className="pixcloud mx-auto" aria-hidden="true">
      {blocks.map((block, index) => (
        <i
          key={`${block.col}-${block.row}`}
          className={block.red ? "red" : ""}
          style={{
            gridColumn: block.col,
            gridRow: block.row,
            animationDelay: `${index * 0.03}s`,
          }}
        />
      ))}
    </div>
  );
}
