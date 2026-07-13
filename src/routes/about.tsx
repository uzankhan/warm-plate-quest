import { createFileRoute } from "@tanstack/react-router";
import { Flame, Heart, BookOpen, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About us — Savory & Sweet" },
      { name: "description", content: "Why Savory & Sweet exists: honest recipes, tested twice, written for real weeknight kitchens." },
      { property: "og:title", content: "About Savory & Sweet" },
      { property: "og:description", content: "Why Savory & Sweet exists: honest recipes, tested twice." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const values = [
  { icon: Flame, title: "Tested twice", body: "Every recipe is developed, then re-tested by a second cook before it ships." },
  { icon: Heart, title: "Written for real kitchens", body: "No 800-word essays before the recipe. Just what to buy and what to do." },
  { icon: BookOpen, title: "Technique first", body: "We teach the why so you can improvise. Recipes are starting points, not scripts." },
  { icon: Leaf, title: "Seasonal & sensible", body: "We favour ingredients you can actually find, and portions you can actually finish." },
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        Our story
      </span>
      <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl">
        Cooking should feel like coming home.
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
        Savory &amp; Sweet started in a small kitchen with a cast-iron skillet and a stack of
        stained cookbooks. We publish the recipes we actually cook — the weeknight ones we
        rely on, the Sunday ones we look forward to, and the occasional showstopper for when
        friends come over.
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="glass-card rounded-3xl p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl warm-gradient shadow-warm">
              <v.icon className="h-6 w-6 text-primary-foreground" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold">{v.title}</h3>
            <p className="mt-2 text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>

      <section className="mt-20 rounded-3xl warm-gradient p-10 text-primary-foreground shadow-warm sm:p-16">
        <h2 className="font-display text-3xl font-black sm:text-4xl">Our promise</h2>
        <p className="mt-4 max-w-2xl text-primary-foreground/90">
          If a recipe here doesn't work for you, tell us. We'll re-test it, fix it, and
          publish the update. Cooking is generous — our recipes should be too.
        </p>
      </section>
    </div>
  );
}
