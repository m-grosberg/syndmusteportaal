type FilterChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export const FilterChip = ({
  label,
  selected,
  onClick,
}: FilterChipProps) => {
  return (
    <button
      type="button"
      className={
        selected
          ? "filter-chip filter-chip--selected"
          : "filter-chip"
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};