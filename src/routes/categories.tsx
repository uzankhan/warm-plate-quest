import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { recipes, CATEGORY_LIST, type Difficulty } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { z } from "zod";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/categories")({
  component: Categories,
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Browse all recipes — Savory & Sweet" },
      { name: "description", content: "Filter 50+ recipes by category, cooking time, and difficulty. Find breakfast, baking, mains, salads, soups, drinks and more." },
      { property: "og:title", content: "Browse all recipes — Savory & Sweet" },
      { property: "og:description", content: "Filter 50+ recipes by category, cooking time, and difficulty." },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
});

const TIME_BUCKETS = [
  { label: "Any time", value: 9999 },
  { label: "≤ 20 min", value: 20 },
  { label: "≤ 45 min", value: 45 },
  { label: "≤ 90 min", value: 90 },
];
const DIFFS: (Difficulty | "All")[] = ["All", "Easy", "Medium", "Hard"];

function Categories() {
  const search = Route.useSearch();
  const [query, setQuery] = useState(search.q ?? "");
  const [category, setCategory] = useState<string>(search.category ?? "All");
  const [maxTime, setMaxTime] = useState(9999);
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (difficulty !== "All" && r.difficulty !== difficulty) return false;
      if (r.cookingTime > maxTime) return false;
      if (q && !(
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q))
      )) return false;
      return true;
    });
  }, [query, category, maxTime, difficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          Recipe library
        </span>
        <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">Browse every recipe</h1>
        <p className="mt-2 text-muted-foreground">Filter by category, time and difficulty — {recipes.length} in total.</p>
      </header>

      <div className="glass-card sticky top-20 z-30 grid gap-4 rounded-3xl p-4 sm:p-6 mb-8">
        <div className="flex items-center gap-3 rounded-full border border-border bg-background px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, category, or ingredient…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORY_LIST].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                category === c
                  ? "warm-gradient text-primary-foreground shadow-warm"
                  : "bg-background hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Refine
          </span>
          <div className="flex flex-wrap gap-1.5">
            {TIME_BUCKETS.map((t) => (
              <button
                key={t.label}
                onClick={() => setMaxTime(t.value)}
                className={`rounded-full px-3 py-1 font-medium ${
                  maxTime === t.value ? "bg-primary/15 text-primary" : "bg-background hover:bg-accent"
                }`}
              >{t.label}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {DIFFS.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-full px-3 py-1 font-medium ${
                  difficulty === d ? "bg-primary/15 text-primary" : "bg-background hover:bg-accent"
                }`}
              >{d}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> recipe{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-16 text-center">
          <p className="font-display text-2xl font-bold">Nothing matches your filters.</p>
          <p className="mt-2 text-muted-foreground">Try loosening the time or difficulty.</p>
          <Link
            to="/categories"
            onClick={() => { setQuery(""); setCategory("All"); setMaxTime(9999); setDifficulty("All"); }}
            className="mt-6 inline-flex rounded-full warm-gradient px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            Reset filters
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((r) => <RecipeCard key={r.slug} recipe={r} />)}
        </div>
      )}
    </div>
  );
}
