# Events Portal SSG

Sündmuste portaali staatilise genereerimise (SSG) versioon.

SSG versioonis genereeritakse HTML buildi ajal.

Sündmuste andmed on olemas HTML-is juba enne JavaScripti käivitumist. Kui API andmed muutuvad, ei jõua muudatused kasutajani enne uut buildi ja uut juurutamist.

## Tehnoloogiad

- React Router Framework Mode
- TypeScript
- Cloudflare Workers
- Static Site Generation (SSG)

## Paigaldamine
```bash
npm install
```

### Arendusserver
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

### Tüübikontroll
```bash
npm run typecheck
```

### Build
```bash
npm run build
```

***Build genereerib eelrenderdatud HTML-failid:***
```text
build/client
```

Näiteks:
```text
build/client/index.html
build/client/korraldajast/index.html
build/client/sundmused/6/index.html
```

## Kohalik kontroll

```bash
npm run worker:dev -- --port 8789
```

Ava:

```text
http://localhost:8789
```

## Marsruudid

Avaleht:

```text
/
```

Korraldajast:

```text
/korraldajast
```

Olemasolev sündmus(garanteeritud):

```text
/sundmused/6
```

Puuduv sündmus(garanteeritud):

```text
/sundmused/9999
```

Tundmatu tee(garanteeritud):

```text
/pole-leht
```

## Avalik portaal
```text
https://events-portal-seminar-4-ssg.loodusenautijad.workers.dev/
```

## Staatiline genereerimine

Rakendus kasutab **prerender()** funktsiooni.


Buildi ajal tehakse API päring ning genereeritakse automaatselt kõik detaillehed.

Näide:

```ts
return [
  "/",
  "/korraldajast",
  ...events.map((event) => `/sundmused/${event.id}`),
];
```

## Kontrollitud tulemused

```text
/sundmused/6      -> HTTP 200
/sundmused/9999   -> HTTP 404
/pole-leht        -> HTTP 404
```