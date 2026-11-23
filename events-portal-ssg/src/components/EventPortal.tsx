import { useState } from "react";


import { Footer } from "./Footer";
import { PageHeader } from "./AppHeader";
import { Panel } from "./Panel";
import { FilterBar } from "./FilterBar";
import { EventList } from "./EventList";
import { EscapeListener } from "./EscapeListener";
import { useTheme } from "../hooks/useTheme";
import type { EventItem } from "../types/event";

type EventPortalProps = {
  events: EventItem[];
};

const ORGANIZATION = "Loodus NordOÜ";

export const EventPortal = ({events}: EventPortalProps) => {
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [upcomingOnly, setUpcomingOnly] = useState(true);

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) => 
      currentTags.includes(tag)
        ? currentTags.filter(
          (currentTag) => currentTag !== tag
          )
        : [...currentTags, tag]
      );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedTags([]);
    setUpcomingOnly(true);
  };

  const normalizedSearch = search.trim().toLowerCase();
  const tags = [...new Set(events.flatMap((event) => event.tags))].sort();
  const now = new Date();

  const filteredEvents = events
    .filter((event) => event.title.toLowerCase().includes(normalizedSearch))
    .filter(
      (event) => 
        selectedTags.length === 0 ||
        selectedTags.some((tag) => 
          event.tags.includes(tag)))
    .filter((event) => !upcomingOnly || new Date(event.startsAt) >= now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <div className={`app theme-${theme}`}>
      <EscapeListener onEscape={clearFilters} />

      <header className="app__header">
        <PageHeader />
      </header>

      <main className="app__main">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          onClearTags={() => setSelectedTags([])}
          upcomingOnly={upcomingOnly}
          onUpcomingOnlyChange={setUpcomingOnly}
        />

        <p className="result-count">Leitud {filteredEvents.length} sündmust</p>

        <Panel 
          title={`Kava (${filteredEvents.length} sündmust)`}
          >
          <EventList events={filteredEvents} />
        </Panel>
      </main>

      <Footer organization={ORGANIZATION} />
    </div>
  );
};
