import { Link } from "@tanstack/react-router";
import { Heart, Clock, Star, Flame } from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "@/lib/user-store";
import type { Recipe } from "@/data/recipes";
import { cn } from "@/lib/utils";

interface Props {
  recipe: Recipe;
  priority?: boolean;
}

export function RecipeCard({ recipe, priority }: Props) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(recipe.slug);

  const onFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(recipe.slug);
    toast(added ? "Added to favorites" : "Removed from favorites", {
      description: recipe.name,
    });
  };

  return (
    <Link
      to="/recipes/$slug"
      params={{ slug: recipe.slug }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
          {recipe.category}
        </span>
        <button
          onClick={onFav}
          aria-label={fav ? "Remove favorite" : "Add favorite"}
          className={cn(
            "absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur transition-transform hover:scale-110",
            fav && "text-primary",
          )}
        >
          <Heart className={cn("h-4 w-4", fav && "fill-current")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-butter text-butter" />
            <span className="font-semibold text-foreground">{recipe.rating}</span>
            <span>({recipe.reviews})</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {recipe.cookingTime} min</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> {recipe.difficulty}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            View recipe →
          </span>
          <span className="text-xs text-muted-foreground">{recipe.nutrition.calories} cal</span>
        </div>
      </div>
    </Link>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-soft">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/2 rounded skeleton" />
        <div className="h-5 w-3/4 rounded skeleton" />
        <div className="h-3 w-full rounded skeleton" />
      </div>
    </div>
  );
}
