import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-black text-primary">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold">Recipe not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like this dish is off the menu. Let's get you back to the kitchen.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full warm-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold">Something burned in the oven</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try again or head back to the home page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full warm-gradient px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-input bg-background px-6 py-2.5 text-sm font-semibold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Savory & Sweet — Cooking & Baking Recipes You'll Actually Cook" },
      { name: "description", content: "Fluffy pancakes, sourdough loaves, weeknight dinners and slow-Sunday baking. Search 50+ tested recipes with step-by-step guides." },
      { name: "author", content: "Savory & Sweet" },
      { name: "theme-color", content: "#f5893b" },
      { property: "og:title", content: "Savory & Sweet — Cooking & Baking Recipes You'll Actually Cook" },
      { property: "og:description", content: "Fluffy pancakes, sourdough loaves, weeknight dinners and slow-Sunday baking. Search 50+ tested recipes with step-by-step guides." },
      { property: "og:site_name", content: "Savory & Sweet" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Savory & Sweet — Cooking & Baking Recipes You'll Actually Cook" },
      { name: "twitter:description", content: "Fluffy pancakes, sourdough loaves, weeknight dinners and slow-Sunday baking. Search 50+ tested recipes with step-by-step guides." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5e7588ad-8880-4536-bb01-3372aead65c2/id-preview-b955ccb5--4eab2ff8-ebee-4e1e-a08d-20af7cbe1ee8.lovable.app-1783950412166.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5e7588ad-8880-4536-bb01-3372aead65c2/id-preview-b955ccb5--4eab2ff8-ebee-4e1e-a08d-20af7cbe1ee8.lovable.app-1783950412166.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster position="bottom-right" />
      </div>
    </QueryClientProvider>
  );
}
