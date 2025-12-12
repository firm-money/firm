"use client";

import type { ReactNode } from "react";

import { createContext, useContext, useState } from "react";

// Base color palette, adapted to match your design system
export const colors = {
  // Blue (#40E9F2 base - bright cyan-blue)
  "blue:50": "#E6FCFD",
  "blue:100": "#CCF9FB",
  "blue:200": "#99F3F7",
  "blue:300": "#66EDF4",
  "blue:400": "#40E9F2",
  "blue:500": "#33BAC2",
  "blue:600": "#298B91",
  "blue:700": "#1F5C61",
  "blue:800": "#142E30",
  "blue:900": "#0A1718",
  "blue:950": "#050B0C",

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

  // Brand colors (Firm)
  "brand:blue": "#405AE5",
  "brand:lightBlue": "#6D8AED",
  "brand:darkBlue": "#121B44",
  "brand:green": "#81C784",
  "brand:golden": "#F5D93A",
  "brand:cyan": "#95CBF3",
  "brand:coral": "#FB7C59",
  "brand:brown": "#DBB79B",
  
  // Firm Gold scale (#F2B341 base)
  "gold:50": "#FEF9EF",
  "gold:100": "#FDF3DF",
  "gold:200": "#FBE7BF",
  "gold:300": "#F9DB9F",
  "gold:400": "#F6CF7F",
  "gold:500": "#F2B341",
  "gold:600": "#E09B1F",
  "gold:700": "#B67A18",
  "gold:800": "#8C5C12",
  "gold:900": "#623E0C",
  "gold:950": "#382206",
  
  // Firm Beige scale (#EDDBC5 base)
  "beige:50": "#FAF8F5",
  "beige:100": "#F5F1EB",
  "beige:200": "#EDDBC5",
  "beige:300": "#E5C5A0",
  "beige:400": "#DDAF7A",
  "beige:500": "#D59955",
  "beige:600": "#C27E37",
  "beige:700": "#9A632B",
  "beige:800": "#724820",
  "beige:900": "#4A2D14",
  "beige:950": "#22120A",
  
  // Firm Burgundy scale (#7F0A07 base)
  "burgundy:50": "#FEF2F2",
  "burgundy:100": "#FDE5E4",
  "burgundy:200": "#FBCBC9",
  "burgundy:300": "#F7A19D",
  "burgundy:400": "#F26D67",
  "burgundy:500": "#E63E37",
  "burgundy:600": "#C82A23",
  "burgundy:700": "#A0211B",
  "burgundy:800": "#7F0A07",
  "burgundy:900": "#5F0805",
  "burgundy:950": "#3F0503",
};

// The light theme with updated colors
export const lightTheme = {
  name: "light" as const,
  colors: {
    accent: "gold:500",
    accentActive: "gold:600",
    accentContent: "burgundy:800",
    accentHint: "gold:400",
    background: "beige:200",
    backgroundActive: "beige:100",
    border: "beige:300",
    borderSoft: "beige:200",
    content: "burgundy:800",
    contentAlt: "burgundy:700",
    contentAlt2: "burgundy:600",
    controlBorder: "beige:300",
    controlBorderStrong: "burgundy:800",
    controlSurface: "white",
    controlSurfaceAlt: "beige:100",
    hint: "beige:50",
    infoSurface: "beige:50",
    infoSurfaceBorder: "beige:100",
    infoSurfaceContent: "burgundy:800",
    dimmed: "gray:400",
    fieldBorder: "beige:200",
    fieldBorderFocused: "gold:500",
    fieldSurface: "beige:50",
    focused: "gold:500",
    focusedSurface: "beige:100",
    focusedSurfaceActive: "gold:400",
    strongSurface: "burgundy:800",
    strongSurfaceContent: "white",
    strongSurfaceContentAlt: "beige:100",
    strongSurfaceContentAlt2: "beige:50",
    position: "burgundy:800",
    positionContent: "white",
    positionContentAlt: "beige:100",
    interactive: "burgundy:800",
    negative: "red:500",
    negativeStrong: "red:600",
    negativeActive: "red:600",
    negativeContent: "white",
    negativeHint: "red:400",
    negativeSurface: "red:50",
    negativeSurfaceBorder: "red:100",
    negativeSurfaceContent: "red:900",
    negativeSurfaceContentAlt: "red:400",
    negativeInfoSurface: "red:50",
    negativeInfoSurfaceBorder: "red:200",
    negativeInfoSurfaceContent: "black:700",
    negativeInfoSurfaceContentAlt: "gray:600",
    positive: "green:500",
    positiveAlt: "green:400",
    positiveActive: "green:600",
    positiveContent: "white",
    positiveHint: "green:400",
    secondary: "beige:300",
    secondaryActive: "beige:400",
    secondaryContent: "burgundy:800",
    secondaryHint: "beige:200",
    selected: "gold:500",
    separator: "beige:200",
    surface: "white",
    tableBorder: "beige:200",
    warning: "yellow:400",
    warningAlt: "yellow:300",
    warningAltContent: "black:700",
    disabledBorder: "beige:300",
    disabledContent: "gray:500",
    disabledSurface: "beige:100",
    brandBlue: "brand:blue",
    brandBlueContent: "white",
    brandBlueContentAlt: "blue:50",
    brandDarkBlue: "brand:darkBlue",
    brandDarkBlueContent: "white",
    brandDarkBlueContentAlt: "gray:50",
    brandLightBlue: "brand:lightBlue",
    brandGolden: "gold:500",
    brandGoldenContent: "burgundy:800",
    brandGoldenContentAlt: "burgundy:700",
    brandGreen: "brand:green",
    brandGreenContent: "green:950",
    brandGreenContentAlt: "green:800",

    riskGradient1: "#81C784",
    riskGradient2: "#B8E549",
    riskGradient3: "#F1C91E",
    riskGradient4: "#FF7043",
    riskGradient5: "#E57373",

    riskGradientDimmed1: "red:100",
    riskGradientDimmed2: "yellow:100",
    riskGradientDimmed3: "green:100",

    loadingGradient1: "gold:50",
    loadingGradient2: "gold:100",
    loadingGradientContent: "gold:500",

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