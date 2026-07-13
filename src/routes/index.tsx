import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, TrendingUp, Clock, ArrowRight, Star, Quote } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";
import { recipes, CATEGORY_LIST } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Savory & Sweet — Cooking & Baking Recipes You'll Actually Cook" },
      { name: "description", content: "Fluffy pancakes, sourdough loaves, weeknight dinners and slow-Sunday baking. Search 50+ tested recipes with step-by-step guides." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return recipes
      .filter((r) =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [query]);

  const featured = recipes.filter((r) => r.featured);
  const trending = recipes.filter((r) => r.trending).slice(0, 4);
  const latest = recipes.slice(-8).reverse();

  const categoryCounts = CATEGORY_LIST.map((c) => ({
    name: c,
    count: recipes.filter((r) => r.category === c).length,
    image: recipes.find((r) => r.category === c)?.image ?? "",
  }));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt=""
            width={1600}
            height={900}
            className="h-full w-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/80" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Cook · Bake · Share
            </span>
            <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] sm:text-7xl lg:text-8xl">
              Recipes for the way
              <span className="block bg-gradient-to-r from-primary via-butter to-paprika bg-clip-text text-transparent">
                you actually cook.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/80">
              From five-minute breakfasts to laminated croissants — 50+ tested recipes with
              step-by-step guides, nutrition info, and video tutorials.
            </p>

            <div className="relative mt-8 max-w-xl">
              <div className="glass-card flex items-center gap-3 rounded-full px-5 py-3 shadow-warm">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  type="search"
                  placeholder="Search recipes, ingredients, categories…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
                <Link
                  to="/categories"
                  className="hidden sm:inline-flex items-center gap-1 rounded-full warm-gradient px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Browse all
                </Link>
              </div>

              {filtered.length > 0 && (
                <div className="absolute inset-x-0 top-full mt-3 z-20 glass-card rounded-3xl overflow-hidden shadow-warm animate-fade-in">
                  {filtered.map((r) => (
                    <Link
                      key={r.slug}
                      to="/recipes/$slug"
                      params={{ slug: r.slug }}
                      className="flex items-center gap-3 border-b border-border/40 px-4 py-3 last:border-0 hover:bg-accent/40"
                    >
                      <img src={r.image} alt="" className="h-12 w-12 rounded-xl object-cover" loading="lazy" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.category} · {r.cookingTime} min</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm">
              {[
                { n: "50+", l: "Tested recipes" },
                { n: "10", l: "Categories" },
                { n: "4.7★", l: "Average rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-black text-primary">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <Section
        eyebrow="Featured"
        icon={<Sparkles className="h-4 w-4" />}
        title="This week's kitchen picks"
        subtitle="Recipes we can't stop making — vetted, photographed, and endlessly reheated."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r, i) => (
            <RecipeCard key={r.slug} recipe={r} priority={i < 3} />
          ))}
        </div>
      </Section>

      {/* CATEGORIES */}
      <Section
        eyebrow="Explore"
        icon={<Clock className="h-4 w-4" />}
        title="Popular categories"
        subtitle="Pick a mood — from a quick breakfast to a Sunday baking project."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categoryCounts.map((c) => (
            <Link
              key={c.name}
              to="/categories"
              search={{ category: c.name }}
              className="group relative aspect-square overflow-hidden rounded-3xl shadow-soft"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="font-display text-lg font-bold">{c.name}</h3>
                <p className="text-xs opacity-90">{c.count} recipes</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* TRENDING */}
      <Section
        eyebrow="Trending"
        icon={<TrendingUp className="h-4 w-4" />}
        title="What everyone's cooking right now"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((r) => <RecipeCard key={r.slug} recipe={r} />)}
        </div>
      </Section>

      {/* LATEST */}
      <Section
        eyebrow="Fresh"
        icon={<Sparkles className="h-4 w-4" />}
        title="Latest recipes"
        subtitle="New additions to the kitchen, always tested twice."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((r) => <RecipeCard key={r.slug} recipe={r} />)}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Loved by home cooks
          </span>
          <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl">
            The kitchen is happier around here.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { q: "The sourdough guide finally cracked it for me. My loaves have an ear now!", n: "Amelia R.", r: "Home baker · Boston" },
            { q: "I made the Tuscan chicken three times last week. My family thinks I'm a chef.", n: "Marcus T.", r: "Dad of three · Austin" },
            { q: "Clean layout, great pictures, no life story before the recipe. Thank you.", n: "Priya S.", r: "Weeknight warrior · London" },
          ].map((t) => (
            <div key={t.n} className="glass-card rounded-3xl p-8">
              <Quote className="h-8 w-8 text-primary/60" />
              <p className="mt-4 text-lg leading-relaxed">"{t.q}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full warm-gradient text-sm font-bold text-primary-foreground">
                  {t.n.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.n}</p>
                  <p className="text-xs text-muted-foreground">{t.r}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-butter text-butter" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] warm-gradient p-10 sm:p-16 shadow-warm">
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-4xl font-black text-primary-foreground sm:text-5xl">
                One recipe. Every Sunday. Zero fluff.
              </h2>
              <p className="mt-4 max-w-lg text-primary-foreground/90">
                Get a handpicked recipe with photos, timings, and a shopping list — delivered
                to your inbox before you plan the week.
              </p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="flex flex-col gap-3 sm:flex-row lg:flex-col"
            >
              <input
                type="email"
                required
                placeholder="you@kitchen.com"
                className="flex-1 rounded-full bg-background/95 px-5 py-3.5 text-base outline-none placeholder:text-muted-foreground"
              />
              <button className="rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-background transition-transform hover:scale-105">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({
  eyebrow, icon, title, subtitle, children,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {icon} {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
        </div>
        <Link
          to="/categories"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
        >
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}
