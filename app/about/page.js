import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About — Sugar & Spice Provisions",
  description: "The story behind Sugar & Spice Provisions — a mom and daughter home bakery.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
        <p className="eyebrow mb-4">About Us</p>
        <h1 className="font-serif text-4xl md:text-5xl italic">
          Mom &amp; Millie&rsquo;s Story
        </h1>
      </section>

      <hr className="hairline max-w-6xl mx-auto" />

      <section className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
          <Image
            src="/images/about/about-1.svg"
            alt="Millie and her mom in the kitchen"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-3xl mb-6">Who We Are</h2>
          <p className="text-espresso/80 leading-relaxed mb-4">
            We&rsquo;re Mom and Millie &mdash; a baking team of two. Millie is
            in charge of taste-testing (very seriously) and decorating, and
            Mom handles the ovens and the recipes she grew up with.
          </p>
          <p className="text-espresso/80 leading-relaxed">
            Everything we make is baked in small batches, from scratch, in
            our own kitchen &mdash; nothing store-bought, nothing rushed.
          </p>
        </div>
      </section>

      <hr className="hairline max-w-6xl mx-auto" />

      <section className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="font-serif text-3xl mb-6">Why We Started</h2>
          <p className="text-espresso/80 leading-relaxed mb-4">
            It began as a weekend project &mdash; baking together on Saturday
            mornings just because we loved it. Friends and neighbors started
            asking for extras, and Sugar &amp; Spice Provisions was born.
          </p>
          <p className="text-espresso/80 leading-relaxed">
            We still bake the same way we started: together, with good
            ingredients, and a lot of taste-testing along the way.
          </p>
        </div>
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden order-1 md:order-2">
          <Image
            src="/images/about/about-2.svg"
            alt="Fresh baked goods from Sugar & Spice Provisions"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <hr className="hairline max-w-6xl mx-auto" />

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-serif text-3xl italic mb-6">
          Ready to Try Something?
        </h2>
        <Link href="/order" className="btn-pill">
          Place an Order
        </Link>
      </section>
    </div>
  );
}
