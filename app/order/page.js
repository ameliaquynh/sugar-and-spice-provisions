import OrderForm from "@/components/OrderForm";
import OrderCadenceBanner from "@/components/OrderCadenceBanner";

export const metadata = {
  title: "Order — Sugar & Spice Provisions",
  description: "Place an order with Sugar & Spice Provisions for pickup or delivery.",
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="text-center mb-12">
        <p className="eyebrow mb-4">Order</p>
        <h1 className="font-serif text-4xl md:text-5xl italic mb-6">
          Let&rsquo;s Get Baking
        </h1>
        <div className="mb-6">
          <OrderCadenceBanner />
        </div>
        <p className="text-espresso/70">
          Fill out the form below and we&rsquo;ll be in touch to confirm your
          order.
        </p>
      </div>

      <OrderForm />
    </div>
  );
}
