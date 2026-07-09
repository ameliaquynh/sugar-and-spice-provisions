import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="bg-cream">
      <hr className="hairline" />
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <p className="eyebrow mb-3">Follow Along</p>
        <h2 className="font-serif text-2xl md:text-3xl italic mb-4">
          {siteConfig.instagramHandle}
        </h2>
        <p className="text-sm text-espresso/70 max-w-md mx-auto">
          Instagram handle coming soon — Mom and Millie will add a link here
          once the account is set up.
        </p>
      </div>
      <hr className="hairline" />
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-espresso/70">
        <p>
          &copy; {new Date().getFullYear()} Sugar &amp; Spice Provisions. Made
          with love (and flour). Questions?{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="hover:text-cinnamon transition-colors"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
        <div className="flex gap-6">
          <Link href="/menu" className="hover:text-cinnamon transition-colors">
            Menu
          </Link>
          <Link href="/order" className="hover:text-cinnamon transition-colors">
            Order
          </Link>
        </div>
      </div>
    </footer>
  );
}
