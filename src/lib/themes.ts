import type { TenantTheme } from "@/lib/supabase/types";

/**
 * Pre-defined theme presets for quick onboarding
 */
export const themePresets: Record<string, TenantTheme> = {
  executive: {
    preset: "executive",
    primaryColor: "#0f172a",
    accentColor: "#d4af37",
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  "health-executive": {
    preset: "health-executive",
    primaryColor: "#1e312b", // Deep Professional Green (Sabrina's signature)
    accentColor: "#2d4a3e", // Forest Green accent
    fontHeading: "Playfair Display",
    fontBody: "Inter",
  },
  healthcare: {
    preset: "healthcare",
    primaryColor: "#0d9488",
    accentColor: "#06b6d4",
    fontHeading: "Montserrat",
    fontBody: "Inter",
  },
  corporate: {
    preset: "corporate",
    primaryColor: "#1e3a5f",
    accentColor: "#3b82f6",
    fontHeading: "Roboto Slab",
    fontBody: "Roboto",
  },
  minimal: {
    preset: "minimal",
    primaryColor: "#18181b",
    accentColor: "#71717a",
    fontHeading: "Inter",
    fontBody: "Inter",
  },
  vibrant: {
    preset: "vibrant",
    primaryColor: "#7c3aed",
    accentColor: "#ec4899",
    fontHeading: "Outfit",
    fontBody: "Inter",
  },
};

/**
 * Generate CSS custom properties from theme
 */
export function generateThemeCSS(theme: TenantTheme): string {
  return `
    --color-primary: ${theme.primaryColor};
    --color-accent: ${theme.accentColor};
    --font-heading: "${theme.fontHeading}", serif;
    --font-body: "${theme.fontBody}", sans-serif;
  `;
}

/**
 * Get Google Fonts import URL for theme
 */
export function getThemeFontsURL(theme: TenantTheme): string {
  const fonts = [theme.fontHeading, theme.fontBody]
    .filter((f, i, arr) => arr.indexOf(f) === i) // unique
    .map((f) => f.replace(/ /g, "+"))
    .join("&family=");
  
  return `https://fonts.googleapis.com/css2?family=${fonts}:wght@400;500;600;700&display=swap`;
}

export default themePresets;
