"use client";

import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "@/components/providers";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white/80 text-muted-foreground transition hover:text-primary hover:bg-white",
        "dark:bg-[#1e1e24]/80 dark:hover:bg-[#1e1e24] dark:border-[#2a2a32] dark:text-muted-foreground dark:hover:text-primary",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" weight="regular" />
      ) : (
        <Moon className="h-4 w-4" weight="regular" />
      )}
    </button>
  );
}
