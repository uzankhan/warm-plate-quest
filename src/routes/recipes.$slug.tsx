import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, Flame, Star, Users, Heart, Printer, Share2, ChevronLeft, ThermometerSun, ChefHat, Utensils } from "lucide-react";
import { toast } from "sonner";
import { getRecipe, getRelated } from "@/data/recipes";
import { useFavorites, pushRecent } from "@/lib/user-store";
import { RecipeCard } from "@/components/RecipeCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recipes/$slug")({
  component: RecipeDetail,
  loader: ({ params }) => {
    const recipe = getRecipe(params.slug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.recipe;
    if (!r) return { meta: [{ title: "Recipe — Savory & Sweet" }] };
    return {
      meta: [
        { title: `${r.name} — Savory & Sweet` },
        { name: "description", content: r.description },
        { property: "og:title", content: r.name },
        { property: "og:description", content: r.description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: r.image },
        { property: "og:url", content: `/recipes/${r.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: r.image },
      ],
      links: [{ rel: "canonical", href: `/recipes/${r.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Recipe",
          name: r.name,
          image: [r.image],
          description: r.description,
          recipeCategory: r.category,
          recipeCuisine: r.category,
          totalTime: `PT${r.cookingTime}M`,
          recipeIngredient: r.ingredients,
          recipeInstructions: r.steps.map((s) => ({ "@type": "HowToStep", text: s })),
          aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviews },
          nutrition: {
            "@type": "NutritionInformation",
            calories: `${r.nutrition.calories} kcal`,
            proteinContent: `${r.nutrition.protein} g`,
            carbohydrateContent: `${r.nutrition.carbs} g`,
            fatContent: `${r.nutrition.fat} g`,
          },
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-black">Recipe not found</h1>
      <p className="mt-2 text-muted-foreground">This one may have moved to a new page.</p>
      <Link to="/categories" className="mt-6 inline-flex rounded-full warm-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground">Browse recipes</Link>
    </div>
  ),
});

function RecipeDetail() {
  const { recipe } = Route.useLoaderData();
  const related = getRelated(recipe.slug);
  const { isFav, toggle } = useFavorites();
  const fav = isFav(recipe.slug);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  useEffect(() => {
    pushRecent(recipe.slug);
    window.scrollTo({ top: 0 });
  }, [recipe.slug]);

  const onFav = () => {
    const added = toggle(recipe.slug);
    toast(added ? "Saved to favorites" : "Removed from favorites", { description: recipe.name });
  };

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try { await navigator.share({ title: recipe.name, text: recipe.description, url }); return; }
      catch { /* cancelled */ }
    }
    if (url) {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  return (
    <article className="pb-24">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={recipe.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
          <Link to="/categories" className="inline-flex items-center gap-1 text-sm font-semibold text-foreground/70 hover:text-primary">
            <ChevronLeft className="h-4 w-4" /> All recipes
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                {recipe.category}
              </span>
              <h1 className="mt-4 font-display text-5xl font-black leading-tight sm:text-6xl">
                {recipe.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-foreground/80">{recipe.description}</p>

              <div className="mt-6 flex flex-wrap gap-3 no-print">
                <button
                  onClick={onFav}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                    fav ? "warm-gradient text-primary-foreground shadow-warm" : "bg-background border border-border hover:bg-accent"
                  )}
                >
                  <Heart className={cn("h-4 w-4", fav && "fill-current")} />
                  {fav ? "Saved" : "Save"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
                >
                  <Printer className="h-4 w-4" /> Print
                </button>
                <button
                  onClick={onShare}
                  className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-5 py-2.5 text-sm font-semibold hover:bg-accent"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>

            <div className="glass-card grid grid-cols-2 gap-4 rounded-3xl p-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Stat icon={Clock} label="Time" value={`${recipe.cookingTime} min`} />
              <Stat icon={Flame} label="Difficulty" value={recipe.difficulty} />
              <Stat icon={Star} label="Rating" value={`${recipe.rating}`} />
              <Stat icon={Users} label="Serves" value="4" />
              {recipe.bakingTemp && (
                <Stat icon={ThermometerSun} label="Bake" value={`${recipe.bakingTemp}°F`} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        {/* Ingredients + equipment */}
        <aside className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
              <Utensils className="h-5 w-5 text-primary" /> Ingredients
            </h2>
            <ul className="mt-5 space-y-2.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-accent/40">
                    <input
                      type="checkbox"
                      checked={checked.has(i)}
                      onChange={() => toggleCheck(i)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span className={cn("text-sm", checked.has(i) && "line-through text-muted-foreground")}>
                      {ing}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
              <ChefHat className="h-5 w-5 text-primary" /> Equipment
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {recipe.equipment.map((e) => (
                <li key={e} className="flex gap-2">
                  <span className="text-primary">•</span> {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h2 className="font-display text-2xl font-bold">Nutrition</h2>
            <p className="mt-1 text-xs text-muted-foreground">Per serving, approximate.</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Calories", `${recipe.nutrition.calories}`],
                ["Protein", `${recipe.nutrition.protein}g`],
                ["Carbs", `${recipe.nutrition.carbs}g`],
                ["Fat", `${recipe.nutrition.fat}g`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-background/50 p-3">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-display text-xl font-bold text-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* Steps + tips + video */}
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-3xl font-black">Method</h2>
            <ol className="mt-6 space-y-6">
              {recipe.steps.map((step, i) => (
                <li key={i} className="glass-card flex gap-5 rounded-3xl p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl warm-gradient font-display text-xl font-black text-primary-foreground shadow-warm">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base leading-relaxed">{step}</p>
                    <img
                      src={recipe.image}
                      alt={`Step ${i + 1}`}
                      loading="lazy"
                      className="mt-4 aspect-video w-full rounded-2xl object-cover"
                    />
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-display text-3xl font-black">Watch it made</h2>
            <div className="mt-4 aspect-video overflow-hidden rounded-3xl shadow-warm">
              <iframe
                src={`https://www.youtube.com/embed/${recipe.youtubeId}`}
                title={`${recipe.name} video tutorial`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <TipCard title="Cooking tips" items={recipe.tips} />
            {recipe.bakingTips && <TipCard title="Baking tips" items={recipe.bakingTips} />}
            <TipCard title="Storage" items={[recipe.storage]} />
            <TipCard title="Serving suggestions" items={[recipe.serving]} />
          </div>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-black">You might also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <RecipeCard key={r.slug} recipe={r} />)}
          </div>
        </section>
      )}
    </article>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex flex-col items-start">
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-display text-lg font-black">{value}</div>
    </div>
  );
}

function TipCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-foreground/80">
        {items.map((t, i) => <li key={i} className="flex gap-2"><span className="text-primary">→</span> {t}</li>)}
      </ul>
    </div>
  );
}
