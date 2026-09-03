import Image from "next/image";
import Link from "next/link";

import heroImg from "@/imgs/hero.webp";

export function Hero() {
  return (
    <section className="relative flex min-h-[360px] items-center overflow-hidden bg-brand-blue md:h-[440px]">
      <Image
        src={heroImg}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/70 via-brand-blue/25 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
        <p className="mb-3 inline-block border-b-2 border-brand-red pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/90">
          UNICAMP · Faculdade de Tecnologia
        </p>
        <h1 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
          Grupo de Engenharia de Sistemas Complexos
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
          Pesquisa interdisciplinar em modelagem e otimização de sistemas
          complexos.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/#linhas-pesquisa"
            className="rounded bg-white px-4 py-2 text-sm font-semibold text-brand-blue transition-colors duration-300 hover:bg-brand-red hover:text-white"
          >
            Linhas de pesquisa
          </Link>
          <Link
            href="/sobre"
            className="rounded border border-white/70 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-brand-blue"
          >
            Sobre o GESC
          </Link>
        </div>
      </div>
    </section>
  );
}
