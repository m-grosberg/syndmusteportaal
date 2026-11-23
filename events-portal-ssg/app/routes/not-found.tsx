import { Link, isRouteErrorResponse, useRouteError } from "react-router";

export default function NotFound() {
  return (
    <>
      <title>Lehte ei leitud | LooduseNautijad</title>
      <main className="app__main">
        <h1>Lehte ei leitud</h1>
        <p>See aadress ei vasta avalikule eelrenderdatud lehele.</p>
        <Link to="/">Ava sündmuste kava</Link>
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <>
    <title>Lehte ei leitud | LooduseNautijad</title>
    <meta name="description" content="Otsitud lehte ei leitud. Ava LooduseNautijate sündmuste kava." />
    <meta property="og:title" content="Lehte ei leitud | LooduseNautijad" />
    <meta property="og:description" content="Otsitud lehte ei leitud. Ava LooduseNautijate sündmuste kava." />
    <main className="app__main">
      <h1>{notFound ? "Lehte ei leitud" : "Lehe laadimine ebaõnnestus"}</h1>
      <p>See aadress ei vasta ühelegi lehele.</p>
      <Link to="/">Ava sündmuste kava</Link>
    </main>
    </>
  );
}