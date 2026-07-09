import MenuCard from "@/components/MenuCard";

export default function MenuGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-center text-espresso/60 py-16">
        Nothing on the menu just yet — check back soon!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
