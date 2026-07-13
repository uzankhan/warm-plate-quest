// Client-side storage helpers for favorites, recently viewed, and theme.
// SSR-safe: all reads happen inside effects, writes are guarded.

import { useEffect, useState, useCallback } from "react";

const FAV_KEY = "ss:favorites";
const RECENT_KEY = "ss:recent";
const THEME_KEY = "ss:theme";

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(`ss:update:${key}`));
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    setFavs(readList(FAV_KEY));
    const handler = () => setFavs(readList(FAV_KEY));
    window.addEventListener(`ss:update:${FAV_KEY}`, handler);
    return () => window.removeEventListener(`ss:update:${FAV_KEY}`, handler);
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = readList(FAV_KEY);
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    writeList(FAV_KEY, next);
    return next.includes(slug);
  }, []);

  return { favorites: favs, toggle, isFav: (slug: string) => favs.includes(slug) };
}

export function pushRecent(slug: string) {
  if (typeof window === "undefined") return;
  const list = readList(RECENT_KEY).filter((s) => s !== slug);
  list.unshift(slug);
  writeList(RECENT_KEY, list.slice(0, 8));
}

export function useRecent() {
  const [recent, setRecent] = useState<string[]>([]);
  useEffect(() => {
    setRecent(readList(RECENT_KEY));
    const handler = () => setRecent(readList(RECENT_KEY));
    window.addEventListener(`ss:update:${RECENT_KEY}`, handler);
    return () => window.removeEventListener(`ss:update:${RECENT_KEY}`, handler);
  }, []);
  return recent;
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as "light" | "dark" | null)
      ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return { theme, toggle };
}
