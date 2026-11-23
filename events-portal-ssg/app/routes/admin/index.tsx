import { useEffect, useRef, useState } from "react";
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
    <article className="admin-event-card">
      <Link className="admin-event-title" to={`/admin/${event.id}`}>{event.title}</Link>
      {isDeleting ? (
        <span role="status">Kustutan…</span>
      ) : isConfirming ? (
        <fetcher.Form method="post" className="admin-event-confirm">
          <input type="hidden" name="id" value={event.id} />
          <span>Kas kustutada?</span>
          <button type="submit" className="admin-event-delete">Jah, kustuta</button>
          <button type="button" className="admin-event-delete" onClick={handleCancel} autoFocus>
            Loobu
          </button>
        </fetcher.Form>
      ) : (
        <button
          type="button"
          className="admin-event-delete"
          ref={deleteButtonRef}
          onClick={() => setIsConfirming(true)}
        >
          Kustuta
        </button>
      )}
      {error && <p role="alert">{error}</p>}
    </article>
  );
};

export default function AdminIndex({ loaderData }: Route.ComponentProps) {
  const count = loaderData.events.length;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousCount = useRef(count);

  // Kustutatud rida kadus koos fookusega. Fookus läheb pealkirjale, kus on uus arv.
  useEffect(() => {
    if (count < previousCount.current) headingRef.current?.focus();
    previousCount.current = count;
  }, [count]);

  return (
    <>
      <title>Haldus | Loodusenautijad</title>
      <h2 ref={headingRef} tabIndex={-1}>Sündmused ({count})</h2>
      <Link className="admin-add-button" to="/admin/uus">
        Lisa sündmus
      </Link>
      
      <div className="admin-event-list">
        {loaderData.events.map((event) => (
          <AdminRow event={event} key={event.id} />
        ))}
      </div>
    </>
  );
}