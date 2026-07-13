import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Heart, Moon, Sun, ChefHat } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme, useFavorites } from "@/lib/user-store";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { favorites } = useFavorites();
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-card border-b border-border/40"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-10 w-10 place-items-center rounded-2xl warm-gradient shadow-warm">
            <ChefHat className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-black tracking-tight">Savory &amp; Sweet</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">cook · bake · share</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent/40",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/favorites"
            aria-label={`Favorites (${favorites.length})`}
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-accent/40 transition-colors"
          >
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent/40 transition-colors"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-accent/40 transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden animate-fade-in border-t border-border/40 bg-background/95 backdrop-blur">
          <ul className="mx-auto max-w-7xl px-4 py-3 space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block px-4 py-3 rounded-xl text-base font-medium hover:bg-accent/40"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
