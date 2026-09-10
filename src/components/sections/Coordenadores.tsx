import Image from "next/image";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { COORDENADORES } from "@/data/equipe";

export function Coordenadores() {
  return (
    <section
      id="coordenacao"
      className="scroll-mt-24 bg-[#f8f9fa] py-20 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]"
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>Coordenadores</SectionTitle>

        <div className="mx-auto max-w-[900px] rounded-[20px] bg-white p-[60px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] max-md:px-5 max-md:py-[30px]">
          {COORDENADORES.map((coord, index) => (
            <div
              key={coord.nome}
              className={`mb-[60px] flex flex-col items-center gap-[30px] text-center last:mb-0 md:flex-row md:gap-[50px] md:text-left ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full max-w-[280px] md:w-auto md:max-w-none md:flex-[0_0_300px]">
                <Image
                  src={coord.foto}
                  alt={coord.nome}
                  placeholder="blur"
                  sizes="(max-width: 768px) 280px, 300px"
                  className="h-[320px] w-full rounded-2xl object-cover shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
                />
              </div>

              <div className="flex-1">
                <h3 className="mb-[5px] text-[1.1rem] font-extrabold tracking-[1px] text-[#34495e]">
                  {coord.papel}
                </h3>
                <h4 className="mb-5 text-[0.95rem] font-bold text-[#111]">
                  {coord.nome}
                </h4>
                {coord.bio.map((paragraph, i) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className={`text-[0.9rem] leading-[1.7] text-[#444] text-center md:text-justify ${
                      i === coord.bio.length - 1 ? "" : "mb-[25px]"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
