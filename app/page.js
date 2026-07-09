import Image from "next/image";
import Link from "next/link";
import MenuGrid from "@/components/MenuGrid";
import menu from "@/data/menu.json";

export default function Home() {
  const featured = menu.slice(0, 3);

  return (
    <div>
      <section className="relative h-[80vh] min-h-[480px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/hero.svg"
          alt="Millie and her mom baking together in the kitchen"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/25" />
        <div className="relative z-10 text-center px-6">
          <p className="eyebrow text-cream mb-4">A Mom &amp; Daughter Home Bakery</p>
          <h1 className="font-serif text-cream text-4xl sm:text-5xl md:text-6xl leading-tight mb-8">
            Sugar &amp; Spice Provisions
          </h1>
          <Link href="/menu" className="btn-pill">
            See This Week&rsquo;s Menu
          </Link>
        </div>
      </section>

      <hr className="hairline" />

      <section className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 md:order-1">
          <Image
            src="/images/about/about-1.svg"
            alt="Millie and her mom in the kitchen"
            fill
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="font-serif text-3xl md:text-4xl italic mb-6">
            Baked with Love, One Batch at a Time
          </h2>
          <p className="text-espresso/80 leading-relaxed mb-8">
            It started with a well-worn recipe box and a Saturday morning
            tradition. Now Millie and her mom bake small batches of cookies,
            breads, and treats for neighbors and friends &mdash; made fresh,
            made together.
          </p>
          <Link
            href="/about"
            className="eyebrow text-cinnamon border-b border-cinnamon pb-1"
          >
            Read Our Story
          </Link>
        </div>
      </section>

      <hr className="hairline" />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="eyebrow mb-4">This Week&rsquo;s Menu</p>
          <h2 className="font-serif text-3xl md:text-4xl italic">
            Fresh From Our Kitchen
          </h2>
        </div>

        <MenuGrid items={featured} />

        <div className="text-center mt-12">
          <Link href="/menu" className="btn-pill">
            See Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
