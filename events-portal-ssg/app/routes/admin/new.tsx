import { Link, redirect } from "react-router";
import type { Route } from "./+types/new";
import { createEvent } from "../../../src/api/events";
import { EventForm } from "../../../src/components/EventForm";
import { formDataToDraft } from "../../../src/lib/form";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const result = await createEvent(formDataToDraft(await request.formData()));

  // Ebaõnnestumine jõuab vormile. Väljad jäävad alles, sest neid hoiab brauser.
  if (!result.ok) return result;
  return redirect("/admin");
}

export default function NewEvent({ actionData }: Route.ComponentProps) {
  return (
    <>
      <title>Uus sündmus | Haldus</title>
      <p>
        <Link to="/admin">Tagasi nimekirja</Link>
      </p>
      <h2>Uus sündmus</h2>
      <EventForm
        errors={actionData?.errors}
        message={actionData?.message}
        submitLabel="Lisa sündmus"
      />
    </>
  );
}