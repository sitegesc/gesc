import Image from "next/image";
import Link from "next/link";

import heroImg from "@/imgs/hero.webp";

export function Hero() {
  return (
    <section className="relative flex min-h-[440px] items-center overflow-hidden bg-brand-blue md:h-[520px]">
      <Image
        src={heroImg}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/70 to-brand-blue/40" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-16 text-white">
        <p className="mb-4 inline-block border-b-2 border-brand-red pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/90">
          UNICAMP · Faculdade de Tecnologia
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Grupo de Engenharia de Sistemas Complexos
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          Pesquisa interdisciplinar em modelagem, simulação e otimização de
          sistemas complexos — da física estatística à engenharia aplicada.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#linhas-pesquisa"
            className="rounded bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue transition-colors duration-300 hover:bg-brand-red hover:text-white"
          >
            Linhas de pesquisa
          </Link>
          <Link
            href="/sobre"
            className="rounded border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-brand-blue"
          >
            Sobre o GESC
          </Link>
        </div>
      </div>
    </section>
  );
}
