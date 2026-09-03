import { AreasAtuacao } from "@/components/sections/AreasAtuacao";
import { Coordenadores } from "@/components/sections/Coordenadores";
import { Equipe } from "@/components/sections/Equipe";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { PortalIntro } from "@/components/sections/PortalIntro";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Partners />
      <PortalIntro />
      <AreasAtuacao />
      <Coordenadores />
      <Equipe />
    </main>
  );
}
