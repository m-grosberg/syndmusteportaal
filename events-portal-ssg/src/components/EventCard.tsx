import type { EventItem } from "../types/event";
import { Link } from "react-router";

type EventCardProps = {
  event: EventItem;
};

export const EventCard = ({ event }: EventCardProps) => {
  const isPast = new Date(event.startsAt) < new Date();

  function formatDateTime(startsAt: string): import("react").ReactNode {
    return new Date(startsAt).toLocaleString("et-EE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <article className={isPast ? "event-card event-card--past" : "event-card"}>
      {event.imageUrl && (
        <img
          className="event-card__image"
          src={event.imageUrl}
          alt={`Sündmuse „${event.title}” foto`}
          loading="lazy"
        />
      )}
      <time className="event-card__time" dateTime={event.startsAt}>
        {formatDateTime(event.startsAt)}
      </time>

      <h3 className="event-card__title">
        <Link to={`/sundmused/${event.id}`}>
          {event.title}
        </Link>
      </h3>
      <p className="description">{event.description}</p>
      <p className="location">{event.location}</p>
      <p className="date">
        {new Date(event.startsAt).toLocaleDateString("et-EE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="tags">
        {event.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </p>
    </article>
  );
};
