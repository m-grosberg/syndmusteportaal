import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, onThemeChange } = useTheme();
  const label = theme === "light" ? "Dark mode" : "Light mode";
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => onThemeChange(nextTheme)}
    >
      {label}
    </button>
  );
};
