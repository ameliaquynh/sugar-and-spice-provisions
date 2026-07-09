// Menu prices are display strings (e.g. "$3 each / $15 dozen") since they
// can describe more than one unit. For cart math we use the first dollar
// amount found as the per-unit price — good enough for an informational
// subtotal, not meant to be exact for every pricing tier.
export function parsePrice(priceString) {
  const match = String(priceString ?? "").match(/\$([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}
