"use client";

import { createContext, useContext, useEffect } from "react";
import type { TenantTheme } from "@/lib/supabase/types";

interface ThemeContextValue {
  theme: TenantTheme | null;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: null });

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  theme: TenantTheme | null;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    // Apply theme CSS variables
    root.style.setProperty("--theme-primary", theme.primaryColor);
    root.style.setProperty("--theme-accent", theme.accentColor);
    root.style.setProperty("--theme-font-heading", `"${theme.fontHeading}", serif`);
    root.style.setProperty("--theme-font-body", `"${theme.fontBody}", sans-serif`);

    // Also update the primary color for components
    root.style.setProperty("--primary", theme.primaryColor);
    root.style.setProperty("--accent", theme.accentColor);

    // Load Google Fonts
    const fontLink = document.createElement("link");
    fontLink.href = `https://fonts.googleapis.com/css2?family=${theme.fontHeading.replace(/ /g, "+")}:wght@400;500;600;700&family=${theme.fontBody.replace(/ /g, "+")}:wght@400;500;600;700&display=swap`;
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(fontLink);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
