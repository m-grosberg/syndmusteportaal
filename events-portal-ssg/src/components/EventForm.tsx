import { Form } from "react-router";
import type { EventItem } from "../types/event";

type EventFormProps = {
  event?: EventItem;
  submitLabel: string;
};

export const EventForm = ({ event, submitLabel }: EventFormProps) => {
  return (
    <Form method="post" className="event-form">
      <div className="event-form__field">
        <label htmlFor="title">Pealkiri</label>
        <input id="title" name="title" defaultValue={event?.title} />
      </div>
      <div className="event-form__field">
        <label htmlFor="startsAt">Algus</label>
        <input
          id="startsAt"
          name="startsAt"
          type="datetime-local"
          defaultValue={event?.startsAt.slice(0, 16)}
        />
      </div>
      <button type="submit" className="button">{submitLabel}</button>
    </Form>
  );
};