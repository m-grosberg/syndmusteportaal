import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

const readStoredTheme = (): Theme => {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Brauseri eelistus loetakse pärast eelrenderdatud HTML-i hüdratsiooni.
    // oxlint-disable-next-line react/set-state-in-effect
    setTheme(readStoredTheme());
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext value={{ theme, onThemeChange: setTheme }}>
      {children}
    </ThemeContext>
  );
};
