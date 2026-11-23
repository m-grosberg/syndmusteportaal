import type { EventDraft } from "../types/event";

// Vormi väljad on alati tekst. Siin teisendatakse need API andmekujule.
export const formDataToDraft = (formData: FormData): EventDraft => {
  const url = String(formData.get("url") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    startsAt: String(formData.get("startsAt") ?? ""),
    location: String(formData.get("location") ?? "").trim(),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    ...(url ? { url } : {}),
    ...(imageUrl ? { imageUrl } : {}),
  };
};