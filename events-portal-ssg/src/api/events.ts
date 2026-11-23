import type { EventDraft, EventItem, ValidationErrors } from "../types/event";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

export const fetchEvents = async (signal?: AbortSignal): Promise<EventItem[]> => {
  if (!API_URL) throw new Error("Lisa API aadress .env faili muutujale VITE_API_URL.");
  
  let response: Response;
  
  try {
    response = await fetch(`${API_URL}/api/events`, { signal });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new Error("API-ga ei saanud ühendust. Kontrolli aadressi ja kas API töötab.");
  }
  if (response.status === 404) throw new Error("Sundmust ei leitud!");

  if (!response.ok) throw new Error(`API vastas veaga (${response.status}).`);
  return (await response.json()) as EventItem[];
};



export const fetchEvent = async (id: number, signal?: AbortSignal): Promise<EventItem> => {
  if (!API_URL) {throw new Error("Lisa API aadress .env faili muutujale VITE_API_URL.");
  }

  let response: Response;

  try {response = await fetch(`${API_URL}/api/events/${id}`, { signal });
  } catch (error) {
    if (signal?.aborted) throw error;

    throw new Error("API-ga ei saanud ühendust. Kontrolli aadressi ja kas API töötab.");
  }

  if (response.status === 404) {throw new Error("Sündmust ei leitud");
  }

  if (!response.ok) {throw new Error(`API vastas veaga (${response.status}).`);
  }
  return (await response.json()) as EventItem;
};

// Ebaõnnestunud salvestamine ei ole erind: tulemus jõuab vormile ja sisestus jääb alles.
export type SaveFailure = {
  ok: false;
  errors: ValidationErrors;
  message?: string;
};

export type SaveResult = { ok: true; event: EventItem } | SaveFailure;

const CONNECTION_ERROR = "API-ga ei saanud ühendust. Sinu sisestus on alles, proovi hetke pärast uuesti.";

const saveEvent = async (
  path: string,
  method: "POST" | "PUT",
  draft: EventDraft,
): Promise<SaveResult> => {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
  } catch {
    return { ok: false, errors: {}, message: CONNECTION_ERROR };
  }

  // 422 on ootuspärane vastus: API ütleb, millised väljad on vigased.
  if (response.status === 422) {
    const body = (await response.json()) as { errors: ValidationErrors };
    return { ok: false, errors: body.errors };
  }
  if (!response.ok) {
    return { ok: false, errors: {}, message: `API vastas veaga (${response.status}). Sinu sisestus on alles.` };
  }
  return { ok: true, event: (await response.json()) as EventItem };
};

export const createEvent = (draft: EventDraft) => saveEvent("/api/events", "POST", draft);

export const updateEvent = (id: number, draft: EventDraft) =>
  saveEvent(`/api/events/${id}`, "PUT", draft);

export type DeleteResult = { ok: true } | { ok: false; message: string };

export const deleteEvent = async (id: number): Promise<DeleteResult> => {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/events/${id}`, { method: "DELETE" });
  } catch {
    return { ok: false, message: "API-ga ei saanud ühendust. Sündmus on alles, proovi hetke pärast uuesti." };
  }
  if (!response.ok) {
    return { ok: false, message: `Kustutamine ebaõnnestus: API vastas veaga (${response.status}).` };
  }
  return { ok: true };
};