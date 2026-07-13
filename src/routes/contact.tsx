import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Savory & Sweet" },
      { name: "description", content: "Send us a recipe request, a correction, or say hi. We read every message." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent!", { description: "We'll reply within two days." });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        Say hi
      </span>
      <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl">Let's talk food.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Recipe request, tip that worked, correction — we read every note.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, title: "Email", body: "hello@savoryandsweet.co" },
            { icon: MapPin, title: "Kitchen HQ", body: "Portland, Oregon" },
            { icon: MessageCircle, title: "Response time", body: "Within 2 business days" },
          ].map((c) => (
            <div key={c.title} className="glass-card flex items-start gap-4 rounded-2xl p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl warm-gradient text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold">{c.title}</p>
                <p className="truncate text-sm text-muted-foreground">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="glass-card rounded-3xl p-8 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input required className="input-base" placeholder="Julia Child" />
            </Field>
            <Field label="Email">
              <input required type="email" className="input-base" placeholder="you@kitchen.com" />
            </Field>
          </div>
          <Field label="Subject">
            <input required className="input-base" placeholder="A recipe suggestion" />
          </Field>
          <Field label="Message">
            <textarea required rows={6} className="input-base resize-none" placeholder="Tell us about it…" />
          </Field>
          <button
            type="submit"
            disabled={sent}
            className="inline-flex items-center gap-2 rounded-full warm-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-105 disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {sent ? "Sent" : "Send message"}
          </button>
        </form>
      </div>

      <style>{`
        .input-base {
          width: 100%;
          border-radius: 0.75rem;
          background: var(--background);
          border: 1px solid var(--border);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input-base:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 20%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
