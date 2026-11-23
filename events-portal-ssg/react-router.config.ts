import type { Config } from "@react-router/dev/config";
import { loadEnv } from "vite";

const env = loadEnv("production", process.cwd(), "");
const API_URL = process.env.VITE_API_URL ?? env.VITE_API_URL ?? "http://localhost:8787";

export default {
  ssr: false,
  
  async prerender() {
    const response = await fetch(`${API_URL.replace(/\/+$/, "")}/api/events`);
    if (!response.ok) throw new Error(`Eelrenderdamine ebaõnnestus: API vastas veaga ${response.status}.`);
    const events = (await response.json()) as Array<{ id: number }>;
    return ["/", "/korraldajast", ...events.map((event) => `/sundmused/${event.id}`)];
  },
} satisfies Config;