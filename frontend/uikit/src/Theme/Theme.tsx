"use client";

import type { ReactNode } from "react";

import { createContext, useContext, useState } from "react";

// Base color palette, adapted to match your design system
export const colors = {
  // Blue (#2256FC base - primary blue)
  "blue:50": "#E8EEFF",
  "blue:100": "#D1DDFF",
  "blue:200": "#A3BBFF",
  "blue:300": "#7599FF",
  "blue:400": "#4777FF",
  "blue:500": "#2256FC",
  "blue:600": "#1B45CA",
  "blue:700": "#143497",
  "blue:800": "#0E2365",
  "blue:900": "#071132",
  "blue:950": "#030919",

  // Gray - Updated to match "Ancestral Snowberry" palette
  "gray:50": "#FAFAFA",
  "gray:100": "#F5F5F5",
  "gray:200": "#EEEEEE",
  "gray:300": "#E0E0E0",
  "gray:400": "#BDBDBD",
  "gray:500": "#9E9E9E",
  "gray:600": "#757575",
  "gray:700": "#616161",
  "gray:800": "#424242",
  "gray:900": "#212121",
  "gray:950": "#121212",

  // Yellow (#F2B342 base - matches gold)
  "yellow:50": "#FEF9EF",
  "yellow:100": "#FDF3DF",
  "yellow:200": "#FBE7BF",
  "yellow:300": "#F9DB9F",
  "yellow:400": "#F6CF7F",
  "yellow:500": "#F2B342",
  "yellow:600": "#E09B1F",
  "yellow:700": "#B67A18",
  "yellow:800": "#8C5C12",
  "yellow:900": "#623E0C",
  "yellow:950": "#382206",

  // Green (#35A862 base)
  "green:50": "#E8F7EE",
  "green:100": "#D1EFDD",
  "green:200": "#A3DFBB",
  "green:300": "#75CF99",
  "green:400": "#47BF77",
  "green:500": "#35A862",
  "green:600": "#2A864E",
  "green:700": "#20643B",
  "green:800": "#154227",
  "green:900": "#0B2114",
  "green:950": "#05100A",

  // Red
  "red:50": "#FFEBEE",
  "red:100": "#FFCDD2",
  "red:200": "#EF9A9A",
  "red:300": "#E57373",
  "red:400": "#EF5350",
  "red:500": "#F44336",
  "red:600": "#E53935",
  "red:700": "#D32F2F",
  "red:800": "#C62828",
  "red:900": "#B71C1C",
  "red:950": "#8B0000",

  // Black - Updated to match "Optophobia Black" and "Eerie Rider"
  "black:50": "#2A2A2A",
  "black:100": "#1F1F1F",
  "black:200": "#1A1A1A",
  "black:300": "#141414",
  "black:400": "#0F0F0F",
  "black:500": "#0A0A0A",
  "black:600": "#050505",
  "black:700": "#000000",

  // Hydargyrum (Mercury/Silver)
  "silver:100": "#B8B8B8",
  "silver:200": "#A0A0A0",
  "silver:300": "#888888",

  // brown
  "brown:50": "#F8F6F4",

  // desert
  "desert:50": "#FAF9F7",
  "desert:100": "#EFECE5",
  "desert:950": "#2C231E",

  // White
  "white": "#FFFFFF",

  // Dark background
  "dark:background": "#141821",
  "dark:surface": "#1C2029",
  "dark:surfaceAlt": "#242830",

  // Brand colors (Firm)
  "brand:blue": "#2256FC",
  "brand:lightBlue": "#4777FF",
  "brand:darkBlue": "#141821",
  "brand:green": "#81C784",
  "brand:golden": "#F2B342",
  "brand:cyan": "#95CBF3",
  "brand:coral": "#FB7C59",
  "brand:brown": "#DBB79B",
  
  // Gold/Yellow scale (#F2B342 base - secondary color)
  "gold:50": "#FEF9EF",
  "gold:100": "#FDF3DF",
  "gold:200": "#FBE7BF",
  "gold:300": "#F9DB9F",
  "gold:400": "#F6CF7F",
  "gold:500": "#F2B342",
  "gold:600": "#E09B1F",
  "gold:700": "#B67A18",
  "gold:800": "#8C5C12",
  "gold:900": "#623E0C",
  "gold:950": "#382206",
};

// The light theme with updated colors (now dark theme with blue/yellow)
export const lightTheme = {
  name: "light" as const,
  colors: {
    accent: "blue:500",
    accentActive: "blue:600",
    accentContent: "white",
    accentHint: "blue:400",
    background: "dark:background",
    backgroundActive: "dark:surface",
    border: "blue:800",
    borderSoft: "blue:900",
    content: "white",
    contentAlt: "gray:200",
    contentAlt2: "gray:300",
    controlBorder: "blue:700",
    controlBorderStrong: "blue:500",
    controlSurface: "dark:surface",
    controlSurfaceAlt: "dark:surfaceAlt",
    hint: "gray:400",
    infoSurface: "dark:surface",
    infoSurfaceBorder: "blue:800",
    infoSurfaceContent: "white",
    dimmed: "gray:500",
    fieldBorder: "blue:800",
    fieldBorderFocused: "blue:500",
    fieldSurface: "dark:surface",
    focused: "blue:500",
    focusedSurface: "dark:surfaceAlt",
    focusedSurfaceActive: "blue:600",
    strongSurface: "blue:500",
    strongSurfaceContent: "white",
    strongSurfaceContentAlt: "blue:100",
    strongSurfaceContentAlt2: "blue:50",
    position: "blue:500",
    positionContent: "white",
    positionContentAlt: "blue:100",
    interactive: "blue:500",
    negative: "red:500",
    negativeStrong: "red:600",
    negativeActive: "red:600",
    negativeContent: "white",
    negativeHint: "red:400",
    negativeSurface: "red:900",
    negativeSurfaceBorder: "red:800",
    negativeSurfaceContent: "white",
    negativeSurfaceContentAlt: "red:300",
    negativeInfoSurface: "red:900",
    negativeInfoSurfaceBorder: "red:700",
    negativeInfoSurfaceContent: "white",
    negativeInfoSurfaceContentAlt: "gray:300",
    positive: "green:500",
    positiveAlt: "green:400",
    positiveActive: "green:600",
    positiveContent: "white",
    positiveHint: "green:400",
    secondary: "gold:500",
    secondaryActive: "gold:600",
    secondaryContent: "dark:background",
    secondaryHint: "gold:400",
    selected: "blue:500",
    separator: "blue:800",
    surface: "dark:surface",
    tableBorder: "blue:800",
    warning: "yellow:400",
    warningAlt: "yellow:300",
    warningAltContent: "dark:background",
    disabledBorder: "gray:700",
    disabledContent: "gray:500",
    disabledSurface: "dark:surfaceAlt",
    brandBlue: "brand:blue",
    brandBlueContent: "white",
    brandBlueContentAlt: "blue:100",
    brandDarkBlue: "brand:darkBlue",
    brandDarkBlueContent: "white",
    brandDarkBlueContentAlt: "gray:200",
    brandLightBlue: "brand:lightBlue",
    brandGolden: "gold:500",
    brandGoldenContent: "dark:background",
    brandGoldenContentAlt: "dark:surface",
    brandGreen: "brand:green",
    brandGreenContent: "white",
    brandGreenContentAlt: "green:100",

    riskGradient1: "#81C784",
    riskGradient2: "#B8E549",
    riskGradient3: "#F1C91E",
    riskGradient4: "#FF7043",
    riskGradient5: "#E57373",

    riskGradientDimmed1: "red:900",
    riskGradientDimmed2: "yellow:900",
    riskGradientDimmed3: "green:900",

    loadingGradient1: "blue:900",
    loadingGradient2: "blue:800",
    loadingGradientContent: "blue:400",

    brandCyan: "brand:cyan",
    brandCoral: "brand:coral",
    brandBrown: "brand:brown",
  } satisfies Record<string, (keyof typeof colors) | `#${string}`>,
} as const;

export type ThemeDescriptor = {
  name: "light"; // will be "light" | "dark" once dark mode is added
  colors: typeof lightTheme.colors; // lightTheme acts as a reference for types
};
export type ThemeColorName = keyof ThemeDescriptor["colors"];

export function themeColor(theme: ThemeDescriptor, name: ThemeColorName) {
  const themeColor = theme.colors[name];

  if (themeColor.startsWith("#")) {
    return themeColor;
  }

  if (themeColor in colors) {
    return colors[themeColor as keyof typeof colors];
  }

  throw new Error(`Color ${themeColor} not found in theme`);
}

const ThemeContext = createContext({
  theme: lightTheme,
  setTheme: (_: ThemeDescriptor) => {},
});

export function useTheme() {
  const { theme, setTheme } = useContext(ThemeContext);
  return {
    color: (name: ThemeColorName) => themeColor(theme, name),
    setTheme,
    theme,
  };
}

export function Theme({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeDescriptor>(lightTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}