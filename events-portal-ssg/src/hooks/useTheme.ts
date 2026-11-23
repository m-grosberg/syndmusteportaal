import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import type { ThemeContextValue } from "../context/ThemeContext";

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme peab olema ThemeProvideri sees.");
  }
  return context;
};
