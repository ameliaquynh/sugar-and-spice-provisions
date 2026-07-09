import Link from "next/link";
import MenuGrid from "@/components/MenuGrid";
import menu from "@/data/menu.json";

export const metadata = {
  title: "Menu — Sugar & Spice Provisions",
  description: "Everything Sugar & Spice Provisions has on offer this week.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center mb-14">
        <p className="eyebrow mb-4">This Week&rsquo;s Menu</p>
        <h1 className="font-serif text-4xl md:text-5xl italic mb-6">
          Everything We&rsquo;re Baking
        </h1>
        <p className="text-espresso/70 max-w-xl mx-auto">
          Made in small batches, so a few items may sell out. Ready to order?
          Head to the{" "}
          <Link href="/order" className="text-cinnamon underline">
            Order page
          </Link>{" "}
          and tell us what you&rsquo;d like.
        </p>
      </div>

      <MenuGrid items={menu} />
    </div>
  );
}
