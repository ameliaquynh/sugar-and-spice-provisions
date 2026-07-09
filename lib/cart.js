export function summarizeCartForOrder(items) {
  if (!items || items.length === 0) return "";
  return items
    .map((item) => {
      const base = `${item.quantity}x ${item.name}`;
      return item.notes ? `${base} (${item.notes})` : base;
    })
    .join("\n");
}
