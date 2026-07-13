import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/user-store";
import { recipes } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";

export const Route = createFileRoute("/favorites")({
  component: Favorites,
  head: () => ({
    meta: [
      { title: "Your favorite recipes — Savory & Sweet" },
      { name: "description", content: "Every recipe you've hearted, saved in your browser and ready to cook." },
    ],
    links: [{ rel: "canonical", href: "/favorites" }],
  }),
});

function Favorites() {
  const { favorites } = useFavorites();
  const saved = recipes.filter((r) => favorites.includes(r.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <Heart className="h-3.5 w-3.5" /> Saved
          </span>
          <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">Your favorites</h1>
          <p className="mt-2 text-muted-foreground">{saved.length} recipe{saved.length === 1 ? "" : "s"} saved in this browser.</p>
        </div>
      </header>

      {saved.length === 0 ? (
        <div className="glass-card rounded-3xl p-16 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full warm-gradient shadow-warm">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold">No favorites yet</h2>
          <p className="mt-2 text-muted-foreground">Tap the heart on any recipe to save it here.</p>
          <Link
            to="/categories"
            className="mt-6 inline-flex rounded-full warm-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm"
          >
            Browse recipes
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {saved.map((r) => <RecipeCard key={r.slug} recipe={r} />)}
        </div>
      )}
    </div>
  );
}
