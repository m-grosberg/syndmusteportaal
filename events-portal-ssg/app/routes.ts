import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Avalik pool: eelrenderdatakse ehitusajal.
  index("routes/home.tsx"),
  route("sundmused/:id", "routes/event.tsx"),
  route("korraldajast", "routes/about.tsx"),

  // Haldusvaade: töötab brauseris, ei eelrenderdata.
  layout("routes/admin/layout.tsx", [
    route("admin", "routes/admin/index.tsx"),
    route("admin/uus", "routes/admin/new.tsx"),
    route("admin/:id", "routes/admin/edit.tsx"),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;