import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/events";

export const useEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: ({ signal }) => fetchEvents(signal),
    retry: false,
    networkMode: "always",
  });