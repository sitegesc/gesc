import Link from "next/link";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { AvatarPlaceholder } from "@/components/ui/AvatarPlaceholder";
import { BOLSISTAS } from "@/data/equipe";

export function Equipe() {
  return (
    <section className="bg-white py-20 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>Bolsistas do projeto</SectionTitle>

        <div className="mt-[60px] flex flex-wrap justify-center gap-x-[25px] gap-y-[70px]">
          {BOLSISTAS.map((membro) => (
            <div
              key={membro.nome}
              className="relative w-[250px] rounded-xl border border-[#e0e0e0] bg-white px-5 pt-[60px] pb-[25px] text-center transition duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute -top-[50px] left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full bg-[#f8f9fa] p-[5px] before:absolute before:inset-0 before:rounded-full before:border before:border-[#e0e0e0] before:content-['']">
                <AvatarPlaceholder className="relative z-[2] h-full w-full rounded-full" />
              </div>

              <h3 className="mb-[5px] text-base font-bold text-brand-blue">
                {membro.nome}
              </h3>
              <span className="mb-1 block text-[0.85rem] italic text-[#666]">
                {membro.papel}
              </span>
              <span className="block text-[0.78rem] text-[#999]">
                {membro.linha}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-sm">
          <Link
            href="/equipe"
            className="font-semibold text-brand-blue transition-colors hover:text-brand-red"
          >
            Ver equipe completa →
          </Link>
        </p>
      </div>
    </section>
  );
}
