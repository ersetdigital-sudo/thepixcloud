"use client";

import Link from "next/link";
import { useState } from "react";
import {
  productSlugs,
  productsList,
  productTabs,
  type Group,
} from "@/lib/catalog";
import { ServiceIcon } from "./ServiceIcon";

type Filter = "all" | Group;

export function CatalogList() {
  const [filter, setFilter] = useState<Filter>("all");
  const rows = productsList.filter(
    (product) => filter === "all" || product.group === filter,
  );

  return (
    <section id="layanan" className="wrap scroll-mt-24 pt-[88px]">
      <div className="grid items-end gap-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <span className="mono text-olive" style={{ fontSize: 12 }}>
            01 / Layanan
          </span>
          <h2 className="mt-2.5 font-display text-[clamp(36px,6vw,68px)] font-extrabold leading-[0.95]">
            Pilih yang mau
            <br />
            kamu beresin.
          </h2>
        </div>

        <div className="flex min-w-0 lg:col-span-5 lg:justify-end">
          <div
            className="hscroll"
            role="group"
            aria-label="Filter layanan"
          >
            {productTabs.map((tab) => {
              const isActive = filter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setFilter(tab.value)}
                  aria-pressed={isActive}
                  className={`tab ${isActive ? "bg-ink text-paper" : "hover:border-tomato"}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-7 border-t-2 border-ink">
        {rows.map((product) => {
          const index = productSlugs.indexOf(product.slug);
          const hot = product.slug === "pulsa";

          return (
            <Link
              key={product.slug}
              href={`/produk/?s=${product.slug}`}
              className={`row-svc ${hot ? "bg-tomato px-3.5 text-paper hover:bg-tomato" : "hover:bg-butter"}`}
            >
              <span
                className={`mono w-7 text-[12px] ${hot ? "text-butter" : "text-olive"}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="flex min-w-0 flex-col gap-1 md:flex-row md:items-center md:gap-6">
                <span className="font-display text-[clamp(22px,3.4vw,34px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                  {product.name}
                </span>
                <span
                  className={`text-sm ${hot ? "text-paper/85" : "text-olive"}`}
                >
                  {product.desc}
                </span>
              </span>

              <span className={`arr ${hot ? "border-white" : ""}`}>
                <ServiceIcon slug={product.icon} className="h-5 w-5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
