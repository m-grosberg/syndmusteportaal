export type EventItem = {
  id: number;
  title: string;
  description: string;
  /** ISO 8601, näiteks "2026-10-14T18:00" */
  startsAt: string;
  location: string;
  tags: string[];
  url?: string;
  imageUrl?: string;
};

// Vorm saadab sündmuse ilma id-ta. Id annab server.
export type EventDraft = Omit<EventItem, "id">;

// Vead väljade kaupa, nagu API need koodiga 422 tagastab.
export type ValidationErrors = Partial<Record<keyof EventDraft, string>>;