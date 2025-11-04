export type CardItem = { id: string; title: string; image: string };
export type TabKey = "floorPlans" | "amenities" | "elevation";
export type GalleriesByTab = Record<TabKey, CardItem[]>;

// ✅ keep WEBSITE_ID server-side (no NEXT_PUBLIC)
const BASE_URL = process.env.NEXT_PUBLIC_SMB_API_URL || "https://smb.mantracollab.com/api/v1";
const WEBSITE_ID = process.env.NEXT_PUBLIC_WEBSITE_ID!;
const TOKEN = process.env.CHOTHANI_API_TOKEN!;
// ✅ Compose the full API endpoint dynamically
const API_URL = `${BASE_URL}/websites/${WEBSITE_ID}/galleries`;

const mapCategoryToTab = (cat?: string): TabKey | null => {
  if (!cat) return null;
  const raw = cat.trim().toLowerCase();
  const flat = raw.replace(/[\s_-]+/g, "");
  if (raw.includes("elevation")) return "elevation";
  if (raw.includes("amenit")) return "amenities";
  if (flat.includes("floorplans") || raw.includes("floor plan") || raw.startsWith("floor")) return "floorPlans";
  return null;
};

export async function fetchGalleriesByTab(): Promise<GalleriesByTab> {
  if (!WEBSITE_ID || !TOKEN) throw new Error("Missing MANTRA env vars");

  console.log("API_URL===>>>", API_URL);
  

  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: process.env.NODE_ENV === "production" ? "force-cache" : "no-store",
  });

  if (!res.ok) throw new Error(`Galleries HTTP ${res.status}`);
  const json = await res.json();
  console.log("json===>>>", json);
  

  const next: GalleriesByTab = { floorPlans: [], amenities: [], elevation: [] };
  for (const d of (json?.data ?? []) as any[]) {
    const tab = mapCategoryToTab(d?.category);
    if (!tab || !d?.url) continue;
    next[tab].push({ id: d?.id || d?._id, title: d?.title || "Untitled", image: d?.url });
  }
  return next;
}
