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
