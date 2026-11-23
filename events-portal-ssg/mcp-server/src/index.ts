import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import * as z from "zod/v4";

loadEnvFile(fileURLToPath(new URL("../.env", import.meta.url)));

type EventItem = {
  id: number;
  title: string;
  description: string;
  startsAt: string;
  location: string;
  tags: string[];
  url?: string;
  imageUrl?: string;
};

const API_URL = process.env.EVENTS_API_URL;

const fetchEvents = async (): Promise<EventItem[]> => {
  if (!API_URL) {
    throw new Error("Lisa API aadress mcp-server/.env faili.");
  }

  let response: Response;

  try {
    response = await fetch(API_URL);
  } catch {
    throw new Error("Sündmuste API-ga ei saanud ühendust.");
  }

  if (!response.ok) {
    throw new Error(`Sündmuste API vastas veaga (${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Sündmuste API vastus ei olnud oodatud kujul.");
  }

  return data as EventItem[];
};

const errorResult = (error: unknown) => ({
  isError: true,
  content: [
    {
      type: "text" as const,
      text: error instanceof Error ? error.message : "Andmete laadimine ebaõnnestus.",
    },
  ],
});

const createServer = (): McpServer => {
  const server = new McpServer({ name: "events", version: "1.0.0" });

  server.registerTool(
    "get-events",
    { description: "Tagastab sündmuste kava API-st." },
    async () => {
      try {
        const events = await fetchEvents();

        return {
          content: [{ type: "text", text: JSON.stringify(events, null, 2) }],
        };
      } catch (error) {
        return errorResult(error);
      }
    },
  );

  server.registerTool(
    "search-events",
    {
      description: "Otsib sündmusi pealkirja, kirjelduse ja siltide järgi.",
      inputSchema: z.object({
        query: z.string().trim().min(1).describe("Otsitav sõna või fraas."),
      }),
    },
    async ({ query }) => {
      try {
        const events = await fetchEvents();
        const normalizedQuery = query.toLocaleLowerCase();
        const matches = events.filter((event) =>
          [event.title, event.description, ...event.tags]
            .join(" ")
            .toLocaleLowerCase()
            .includes(normalizedQuery),
        );

        return {
          content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
        };
      } catch (error) {
        return errorResult(error);
      }
    },
  );

  return server;
};

void serveStdio(createServer);