import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[70vh] w-[min(var(--max-width),calc(100%-2rem))] place-items-center max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      <section className="grid max-w-[760px] gap-5 rounded-[36px] border border-white/70 bg-white/85 px-8 py-10 text-center shadow-[var(--shadow)]">
        <span className="section-heading__eyebrow mx-auto">Not Found</span>
        <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4rem)] leading-[0.95]">
          The page you asked for is not part of this starter.
        </h1>
        <p className="m-0 text-[var(--muted-text)]">
          Use this screen as your default 404 state, or reshape it for your own
          product voice and support flow.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Open sandbox login</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
