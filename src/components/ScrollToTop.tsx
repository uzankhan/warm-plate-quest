import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "no-print fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full warm-gradient text-primary-foreground shadow-warm transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4",
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
