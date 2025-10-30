// utils/scrollToSection.ts
export function scrollToSection(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 69; // adjust for nav height
  window.scrollTo({ top: y, behavior: "smooth" });
}
