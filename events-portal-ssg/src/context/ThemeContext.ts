import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextValue = {
  theme: Theme;
  onThemeChange: (next: Theme) => void;
};

export const ThemeContext = 
    createContext<ThemeContextValue | null>(null);