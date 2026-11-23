import { useState } from "react";
import { FilterChip } from "./FilterChip";

type FilterBarProps = {
  search: string;
  onSearchChange: (next: string) => void;

  tags: string[];

  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;

  upcomingOnly: boolean;
  onUpcomingOnlyChange: (next: boolean) => void;
};

export const FilterBar = ({
  search,
  onSearchChange,
  tags,
  selectedTags,
  onTagToggle,
  onClearTags,
  upcomingOnly,
  onUpcomingOnlyChange,
}: FilterBarProps) => {
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="filter-card">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Otsi sündmust"
      />

      <button
        type="button"
        className={`tag-dropdown-button ${
          showTags ? "tag-dropdown-button--open" : ""}`}
        onClick={() => setShowTags(!showTags)}
      >
        <span>Kategooriad ({selectedTags.length})</span>

        <span className="dropdown-arrow">
          ▼
        </span>
      </button>

      {showTags && (
        <div className={`tag-dropdown-menu ${
          showTags ? "tag-dropdown-menu--open" : ""}`}>
          <FilterChip
            label="Kõik"
            selected={selectedTags.length === 0}
            onClick={onClearTags}
          />

          {tags.map((tag) => (
            <FilterChip
              key={tag}
              label={tag}
              selected={selectedTags.includes(tag)}
              onClick={() => onTagToggle(tag)}
            />
          ))}
        </div>
      )}

      <label className="toggle">
        <input
          type="checkbox"
          checked={upcomingOnly}
          onChange={(e) =>
            onUpcomingOnlyChange(e.target.checked)
          }
        />
        Ainult tulevased
      </label>
    </div>
  );
};
