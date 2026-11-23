import type { ReactNode } from "react";
import { Link, Outlet, isRouteErrorResponse, useRouteError } from "react-router";
import { AppHeader } from "../../../src/components/AppHeader";
import { Footer } from "../../../src/components/Footer";
import { useTheme } from "../../../src/hooks/useTheme";

// Sama paigutus nagu avalikel lehtedel: teema, päis ja jalus. Lisaks noindex ja hoiatus.
const AdminFrame = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div className={`app theme-${theme}`}>
      {/* Palub otsingumootoril mitte indekseerida. Andmeid see ei kaitse. */}
      <meta name="robots" content="noindex, nofollow" />
      <AppHeader />
      <main className="app__main">
        <h1>Haldus</h1>
        <p>Sündmuste lisamine, muutmine ja kustutamine.</p>
        <p className="admin-warning" role="note">
          Haldusvaatel ei ole autentimist: igaüks, kes aadressi teab, saab kava muuta.
          Avalik kava uueneb alles pärast uut buildi ja juurutust.
        </p>
        {children}
      </main>
      <Footer organization="Tallinna Ülikooli Haapsalu kolledž" />
    </div>
  );
};

// Outlet näitab parajasti avatud haldusmarsruuti.
export default function AdminLayout() {
  return (
    <AdminFrame>
      <Outlet />
    </AdminFrame>
  );
}

// Näitab selget teadet, kui API on maas või sündmust ei ole.
export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Haldusvaate laadimine ebaõnnestus.";
  if (isRouteErrorResponse(error) && error.status === 404) {
    message = "Sündmust ei leitud.";
  } else if (error instanceof Error) {
    message = error.message;
  }
  return (
    <AdminFrame>
      <title>Viga | Haldus</title>
      <p role="alert">{message}</p>
      <Link to="/admin">Tagasi nimekirja</Link>
    </AdminFrame>
  );
}