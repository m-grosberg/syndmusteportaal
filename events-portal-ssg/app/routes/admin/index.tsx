import { Link, type ShouldRevalidateFunctionArgs } from "react-router";
import type { Route } from "./+types/index";
import { deleteEvent, fetchEvents } from "../../../src/api/events";

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

export default function AdminIndex({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <title>Haldus | LooduseNautijad</title>
      <h2>Sündmused</h2>
      <Link className="button" to="/admin/uus">Lisa sündmus</Link>
      <ul>
        {loaderData.events.map((event) => (
          <li key={event.id}>
            <Link to={`/admin/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}