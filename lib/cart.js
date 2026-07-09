import { parsePrice, formatPrice } from "@/lib/parsePrice";

// Builds the readable order text sent to Formspree (and Mom's inbox) from
// the structured cart — customers see the itemized UI, this is what she
// actually reads in the email.
export function summarizeCartForOrder(items) {
  if (!items || items.length === 0) return "";

  const lines = items.map((item) => {
    const lineTotal = parsePrice(item.price) * item.quantity;
    const base = `${item.quantity}x ${item.name} — ${formatPrice(lineTotal)}`;
    return item.notes ? `${base} (${item.notes})` : base;
  });

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  lines.push(`Subtotal (informational only): ${formatPrice(subtotal)}`);

  return lines.join("\n");
}
