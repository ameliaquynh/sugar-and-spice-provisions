import { siteConfig } from "@/lib/siteConfig";

export default function OrderCadenceBanner() {
  return (
    <p className="inline-block eyebrow bg-blush/40 px-4 py-2 rounded-full mx-auto">
      {siteConfig.orderCadence}
    </p>
  );
}
