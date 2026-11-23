import { useParams } from "react-router";
import { useEvent } from "../hooks/useEvent";

export const EventDetail = () => {
  const { id } = useParams();

  const eventId = Number(id);

  const { data: event, isLoading, error } = useEvent(eventId);

  if (!id || Number.isNaN(eventId) || eventId <= 0) {
    return <h1>Sündmust ei leitud</h1>;
  }

  if (isLoading) {return <p>Laadimine...</p>;
  }

  if (error) {return <h1>Sündmust ei leitud</h1>;
  }

  if (!event) {return <h1>Sündmust ei leitud</h1>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </div>
  );
};