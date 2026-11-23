import type { EventItem } from "../types/event";
import { EventCard } from "./EventCard";
import { useTheme } from "../hooks/useTheme";

type EventListProps = {
  events: EventItem[];
};

export const EventList = ({ events }: EventListProps) => {
  const { theme } = useTheme();

  if (events.length === 0) {
    return <p>Ühtegi sündmust ei leitud.</p>;
  }

  return (
    <div className={`cards shadow-${theme}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
