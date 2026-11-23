import { Link } from "react-router";
import type { Route } from "./+types/index";
import { fetchEvents } from "../../../src/api/events";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  return { events: await fetchEvents(request.signal) };
}

export default function AdminIndex({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <title>Haldus | Haapsalu kolledž</title>
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