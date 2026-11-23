import { Form, useNavigation } from "react-router";
import { useEffect, useRef } from "react";

import type { EventItem, ValidationErrors } from "../types/event";

type EventFormProps = {
  event?: EventItem;
  errors?: ValidationErrors;
  message?: string;
  submitLabel: string;
};

export const EventForm = ({ event, errors, message, submitLabel }: EventFormProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const navigation = useNavigation();

    // Saatmine, ümbersuunamine ja nimekirja uus laadimine: nupp vabaneb alles pärast kõiki kolme.
    const isSaving = navigation.state !== "idle";

    // Vea korral liigub fookus esimesele vigasele väljale.
    useEffect(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }, [errors]);

  return (
    <Form method="post" className="event-form" ref={formRef}>
        {message && (
            <p className="event/from__message" role="alert">
                {message}
            </p>
        )}
      <div className="event-form__field">
        <label htmlFor="title">Pealkiri</label>
        <input
        id="title"
        name="title"
        defaultValue={event?.title}
        aria-invalid={errors?.title ? true : undefined}
        aria-describedby={errors?.title ? "title-error" : undefined}
        />
        {errors?.title && (
            <span id="title-error" className="event-form__error">
                {errors.title}
            </span>
        )}
      </div>

      <div className="event-form__field">
        <label htmlFor="startsAt">Algus</label>
        <input
          id="startsAt"
          name="startsAt"
          type="datetime-local"
          defaultValue={event?.startsAt.slice(0, 16)}
          aria-invalid={errors?.title ? true : undefined}
          aria-describedby={errors?.title ? "title-error" : undefined}
        />
        {errors?.title && (
            <span id="title-error" className="event-form__error">
                {errors.title}
            </span>
        )}
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
        aria-invalid={errors?.title ? true : undefined}
        aria-describedby={errors?.title ? "title-error" : undefined}
        />
        {errors?.title && (
            <span id="title-error" className="event-form__error">
                {errors.title}
            </span>
        )}
      </div>


      <button type="submit" className="button" disabled={isSaving}>
        {isSaving ? "Salvestan" : submitLabel}
      </button>
    </Form>
  );
};