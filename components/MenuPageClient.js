"use client";

import { useMemo, useState } from "react";
import MenuGrid from "@/components/MenuGrid";

export default function MenuPageClient({ items }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.category)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [items]);

  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All"
      ? items
      : items.filter((item) => item.category === selected);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelected(category)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
              selected === category
                ? "bg-cinnamon text-cream"
                : "bg-blush/40 text-espresso hover:bg-blush/70"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <MenuGrid items={filtered} />
    </div>
  );
}
