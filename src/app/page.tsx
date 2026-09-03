import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { PortalIntro } from "@/components/sections/PortalIntro";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Partners />
      <PortalIntro />
    </main>
  );
}
