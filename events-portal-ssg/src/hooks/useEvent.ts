import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "../api/events";

export const useEvent = (id: number) =>
  useQuery({
    queryKey: ["event", id],
    queryFn: ({ signal }) => fetchEvent(id, signal),
    retry: false,
    networkMode: "always",
  });