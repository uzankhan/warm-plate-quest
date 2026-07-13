import { Link } from "@tanstack/react-router";
import { ChefHat, Instagram, Youtube, Twitter, Facebook } from "lucide-react";
import { CATEGORY_LIST } from "@/data/recipes";

export function Footer() {
  return (
    <footer className="no-print mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl warm-gradient shadow-warm">
              <ChefHat className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-xl font-black">Savory &amp; Sweet</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Recipes for every kitchen — from weeknight dinners to weekend baking projects.
          </p>
          <div className="mt-6 flex gap-2">
            {[Instagram, Youtube, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full bg-background hover:warm-gradient hover:text-primary-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
            <li><Link to="/categories" className="text-muted-foreground hover:text-primary">All categories</Link></li>
            <li><Link to="/favorites" className="text-muted-foreground hover:text-primary">Favorites</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">Our story</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">Popular</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {CATEGORY_LIST.slice(0, 8).map((c) => (
              <li key={c}>
                <Link
                  to="/categories"
                  search={{ category: c }}
                  className="text-muted-foreground hover:text-primary"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">Weekly digest</h4>
          <p className="mt-4 text-sm text-muted-foreground">
            One handpicked recipe delivered every Sunday.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-3 flex overflow-hidden rounded-full border border-border bg-background"
          >
            <input
              type="email"
              placeholder="you@kitchen.com"
              className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
              aria-label="Email"
            />
            <button className="warm-gradient px-4 text-sm font-semibold text-primary-foreground">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Savory &amp; Sweet. Cooked with heart.
      </div>
    </footer>
  );
}
