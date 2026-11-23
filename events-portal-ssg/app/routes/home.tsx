import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { fetchEvents } from "../../src/api/events";
import { EventPortal } from "../../src/components/EventPortal";

export const loader = async ({ request }: Route.LoaderArgs) => ({
  events: await fetchEvents(request.signal)
});

export default function Home() {
  const { events } = useLoaderData<typeof loader>();

  return (
    <>
        <title>Sündmuste kava | LooduseNautijad</title>
        <meta name="description" content="Vaata LooduseNautijate sündmuste kava."/>
        <meta property="og:title" content="Sündmuste kava | LooduseNautijad"/>
        <meta property="og:description" content="Vaata LooduseNautijate sündmuste kava."/>
        <EventPortal events={events} />
        </>
    );
}
