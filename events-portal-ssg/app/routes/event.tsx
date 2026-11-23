import { Link, useLoaderData, isRouteErrorResponse, useRouteError } from "react-router";
import type { Route } from "./+types/event";
import { fetchEvent } from "../../src/api/events";
import { PageHeader } from "../../src/components/AppHeader";
import { EventCard } from "../../src/components/EventCard";
import { Footer } from "../../src/components/Footer";
import { useTheme } from "../../src/hooks/useTheme";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const id = params.id;
  if (!id || !/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) {
    throw new Response("Sündmust ei leitud.", { status: 404 });
  }
  try {
    return { event: await fetchEvent(Number(id), request.signal) };
  } catch (error) {
    if (error instanceof Error && error.message === "Sellist sündmust ei leitud.") {
      throw new Response("Sündmust ei leitud.", { status: 404 });
    }
    throw error;
  }
};


export function ErrorBoundary() {
  const error = useRouteError();
  const { theme } = useTheme();
  const notFound = isRouteErrorResponse(error) && error.status === 404;


  return (
    <>
      <title>{notFound ? "Sündmust ei leitud" : "Sündmuse laadimine ebaõnnestus"}</title>
      <meta name="description" content="Sündmuse andmeid ei saanud laadida." />
      <div className={`app theme-${theme}`}>
      <PageHeader />
      <main className="app__main">
        <h1>{notFound ? "Sündmust ei leitud" : "Sündmuse laadimine ebaõnnestus"}</h1>
        <p role="alert">{notFound ? "Kontrolli aadressi või ava kava." : "API-ga ei saanud ühendust. Proovi hiljem uuesti."}</p>
        <Link to="/">Tagasi sündmuste kavasse</Link>
      </main>
      <Footer organization="LooduseNautijad" />
      </div>
    </>
  );
}

export default function EventRoute() {
  const { event } = useLoaderData<typeof loader>();
  const { theme } = useTheme();
  const title = `${event.title} | LooduseNautijad`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={event.description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={event.description} />
      <div className={`app theme-${theme}`}>
      <PageHeader />
      <main className="app__main">
        <p><Link to="/">Tagasi sündmuste kavasse</Link></p>
        <EventCard event={event} />
      </main>
      <Footer organization="LooduseNautijad" />
      </div>
    </>
  );
}

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