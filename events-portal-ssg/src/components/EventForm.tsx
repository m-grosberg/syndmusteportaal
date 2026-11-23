import { Form, useNavigation } from "react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

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
    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

    // Saatmine, ümbersuunamine ja nimekirja uus laadimine: nupp vabaneb alles pärast kõiki kolme.
    const isSaving = navigation.state !== "idle";

    // Vea korral liigub fookus esimesele vigasele väljale.
    useEffect(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }, [errors, localErrors]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const nextErrors: ValidationErrors = {};

        if (!String(formData.get("title") ?? "").trim()) {
            nextErrors.title = "Pealkiri on kohustuslik.";
        }
        if (!String(formData.get("startsAt") ?? "").trim()) {
            nextErrors.startsAt = "Algusaeg on kohustuslik.";
        }
        if (!String(formData.get("location") ?? "").trim()) {
            nextErrors.location = "Asukoht on kohustuslik.";
        }

        setLocalErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
            event.preventDefault();
        }
    };

    const fieldErrors = { ...errors, ...localErrors };

  return (
    <Form method="post" className="event-form" ref={formRef} onSubmit={handleSubmit}>
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
        aria-invalid={fieldErrors.title ? true : undefined}
        aria-describedby={fieldErrors.title ? "title-error" : undefined}
        />
        {fieldErrors.title && (
            <span id="title-error" className="event-form__error">
                {fieldErrors.title}
            </span>
        )}
      </div>

      <div className="event-form__field">
        <label htmlFor="startsAt">Algus</label>
        <input
          id="startsAt"
          name="startsAt"
          type="datetime-local"
          defaultValue={event?.startsAt?.slice(0, 16)}
          aria-invalid={fieldErrors.startsAt ? true : undefined}
          aria-describedby={fieldErrors.startsAt ? "startsAt-error" : undefined}
        />
        {fieldErrors.startsAt && (
            <span id="startsAt-error" className="event-form__error">
                {fieldErrors.startsAt}
            </span>
        )}
      </div>
      
      <div className="event-form__field">
        <label htmlFor="location">Asukoht</label>
        <input
        id="location"
        name="location"
        defaultValue={event?.location}
        aria-invalid={fieldErrors.location ? true : undefined}
        aria-describedby={fieldErrors.location ? "location-error" : undefined}
        />
        {fieldErrors.location && (
            <span id="location-error" className="event-form__error">
                {fieldErrors.location}
            </span>
        )}
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
        aria-invalid={fieldErrors.imageUrl ? true : undefined}
        aria-describedby={fieldErrors.imageUrl ? "imageUrl-error" : undefined}
        />
        {fieldErrors.imageUrl && (
            <span id="imageUrl-error" className="event-form__error">
                {fieldErrors.imageUrl}
            </span>
        )}
      </div>


      <button type="submit" className="button" disabled={isSaving}>
        {isSaving ? "Salvestan" : submitLabel}
      </button>
    </Form>
  );
};