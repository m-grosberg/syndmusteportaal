import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { ReactNode } from "react";
import { ThemeProvider } from "../src/context/ThemeProvider";
import "../src/index.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="et">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Lehe kuvamisel tekkis viga.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Lehte ei leitud." : error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return (
    <main className="app__main">
      <title>Lehe laadimine ebaõnnestus | LooduseNautijad</title>
      <meta name="description" content={message} />
      <meta property="og:title" content="Lehe laadimine ebaõnnestus | LooduseNautijad" />
      <meta property="og:description" content={message} />
      <h1>Lehe laadimine ebaõnnestus</h1>
      <p role="alert">{message}</p>
      <a href="/">Naase sündmuste kavasse</a>
    </main>
  );
}

export function HydrateFallback() {
  return (
    <main className="app__main">
      <p role="status">Laen…</p>
    </main>
  );
}