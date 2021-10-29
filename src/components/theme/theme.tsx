import { ColorMode, ThemeUIContextValue, useThemeUI } from "theme-ui";
import { additionalTheme } from "./additionalTheme";
import { baseTheme } from "./baseTheme";

export const theme = { ...baseTheme, ...additionalTheme };

type CustomTheme = typeof theme;

interface ExactContextValue extends Omit<ThemeUIContextValue, "theme"> {
  theme: Omit<CustomTheme, "rawColors" | "colors"> & {
    rawColors: {
      [P in keyof ColorMode]: string;
    };
    colors: {
      [P in keyof ColorMode]: string;
    };
  };
}

export const useTheme = useThemeUI as unknown as () => ExactContextValue;
