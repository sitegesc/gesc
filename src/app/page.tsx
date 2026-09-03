import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <p className="text-sm text-zinc-500">
          Refatoração em andamento — Next.js + TypeScript.
        </p>
      </section>
    </main>
  );
}
