import Papa from "papaparse";
import localMenu from "@/data/menu.json";

// How often the Google Sheet menu is re-fetched (Next.js ISR), in seconds.
const REVALIDATE_SECONDS = 300;

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseBoolean(value) {
  const v = String(value ?? "").trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

function splitList(value) {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function rowToItem(row, index) {
  const name = row.name?.trim();
  if (!name) return null;

  return {
    id: row.id?.trim() || slugify(name) || `item-${index}`,
    name,
    description: row.description?.trim() || "",
    price: row.price?.trim() || "",
    category: row.category?.trim() || "Other",
    ingredients: splitList(row.ingredients),
    allergens: splitList(row.allergens),
    photo: row.photo?.trim() || "",
    available: parseBoolean(row.available),
  };
}

// Loads the menu from the published Google Sheet CSV (MENU_SHEET_CSV_URL)
// when configured, refreshing every REVALIDATE_SECONDS via Next.js ISR.
// Falls back to the local data/menu.json any time the Sheet isn't set up
// yet, or a fetch/parse fails, so the site never breaks because of it.
export async function getMenuItems() {
  const csvUrl = process.env.MENU_SHEET_CSV_URL;

  if (!csvUrl) {
    return localMenu;
  }

  try {
    const res = await fetch(csvUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      throw new Error(`Sheet fetch failed with status ${res.status}`);
    }

    const csvText = await res.text();
    const { data, errors } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors?.length) {
      console.warn("Menu sheet CSV parse warnings:", errors.slice(0, 3));
    }

    const items = data.map(rowToItem).filter(Boolean);
    if (items.length === 0) {
      throw new Error("Sheet returned no usable rows");
    }

    return items;
  } catch (err) {
    console.warn(
      `Falling back to local menu.json — could not load MENU_SHEET_CSV_URL: ${err.message}`
    );
    return localMenu;
  }
}
