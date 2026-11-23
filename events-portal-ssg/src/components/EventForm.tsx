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
      
      <div className="event-form__field">
        <label htmlFor="location">Asukoht</label>
        <input
        id="location"
        name="location"
        defaultValue={event?.location}
        />
      </div>

      <div className="event-form__field">
        <label htmlFor="description">Kirjeldus</label>
        <textarea
        id="description"
        name="description"
        rows={6}
        defaultValue={event?.description}
        />
      </div>

      <div className="event-form__field">
        <label htmlFor="tags">Sildid, komadega eraldatud</label>
        <input
        id="tags"
        name="tags"
        defaultValue={event?.tags.join(", ")}
        />
      </div>

      <div className="event-form__field">
        <label htmlFor="url">Registreerumislink, valikuline</label>
        <input
        id="url"
        name="url"
        type="url"
        defaultValue={event?.url}
        />
      </div>
      
      <div className="event-form__field">
        <label htmlFor="imageUrl">Pildi aadress, valikuline</label>
        <input
        id="imageUrl"
        name="imageUrl"
        type="url"
        defaultValue={event?.imageUrl}
        />
      </div>


      <button type="submit" className="button">{submitLabel}</button>
    </Form>
  );
};