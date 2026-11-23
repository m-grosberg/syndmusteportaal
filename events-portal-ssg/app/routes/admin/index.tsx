import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Link, useFetcher, type ShouldRevalidateFunctionArgs } from "react-router";
import type { Route } from "./+types/index";
import { deleteEvent, fetchEvents } from "../../../src/api/events";
import type { EventItem } from "../../../src/types/event";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  return { events: await fetchEvents(request.signal) };
}

// Kustutatava sündmuse id tuleb vormi peidetud väljast.
export async function clientAction({ request }: Route.ClientActionArgs) {
  const id = Number((await request.formData()).get("id"));
  return deleteEvent(id);
}

// Ebaõnnestunud kustutamine ei muutnud serveris midagi. Uus laadimine oleks asjatu
// ja API vea korral viskaks see kasutaja veaekraanile ning rea teade kaoks.
export function shouldRevalidate({ actionResult, defaultShouldRevalidate }: ShouldRevalidateFunctionArgs) {
  if (actionResult?.ok === false) return false;
  return defaultShouldRevalidate;
}
const AdminRow = ({ event }: { event: EventItem }) => {
  // Igal real on oma fetcher: ühe rea kustutamine ei sega teisi.
  const fetcher = useFetcher<typeof clientAction>();
  const [isConfirming, setIsConfirming] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const isDeleting = fetcher.state !== "idle";

  // Nupp tuleb enne DOM-i tagasi tuua, alles siis saab sellele fookuse viia.
  const handleCancel = () => {
    flushSync(() => setIsConfirming(false));
    deleteButtonRef.current?.focus();
  };

  // Viga näidatakse ainult siis, kui uut katset parajasti ei käi.
  const error = !isDeleting && fetcher.data?.ok === false ? fetcher.data.message : undefined;

  return (
    <li className="admin-list__row">
      <Link to={`/admin/${event.id}`}>{event.title}</Link>
      {isDeleting ? (
        <span role="status">Kustutan…</span>
      ) : isConfirming ? (
        <fetcher.Form method="post" className="admin-list__confirm">
          <input type="hidden" name="id" value={event.id} />
          <span>Kas kustutada?</span>
          <button type="submit" className="button">Jah, kustuta</button>
          <button type="button" className="button" onClick={handleCancel} autoFocus>
            Loobu
          </button>
        </fetcher.Form>
      ) : (
        <button
          type="button"
          className="button"
          ref={deleteButtonRef}
          onClick={() => setIsConfirming(true)}
        >
          Kustuta
        </button>
      )}
      {error && <p role="alert">{error}</p>}
    </li>
  );
};
export default function AdminIndex({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <title>Haldus | LooduseNautijad</title>
      <h2>Sündmused</h2>
      <Link className="button" to="/admin/uus">Lisa sündmus</Link>
      <ul>
        {loaderData.events.map((event) => (
          <AdminRow key={event.id} event={event} />
        ))}
      </ul>
    </>
  );
}