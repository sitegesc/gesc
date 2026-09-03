import Image, { type StaticImageData } from "next/image";

import ft from "@/imgs/logos/ft.webp";
import usp from "@/imgs/logos/usp.webp";
import ita from "@/imgs/logos/ita.webp";
import imes from "@/imgs/logos/imes.webp";
import sciences from "@/imgs/logos/sciences.webp";

const partners: { src: StaticImageData; alt: string; height: string }[] = [
  { src: ft, alt: "FT UNICAMP", height: "h-[65px]" },
  { src: usp, alt: "POLI USP", height: "h-[125px]" },
  { src: ita, alt: "ITA", height: "h-[70px]" },
  { src: imes, alt: "IMES", height: "h-[125px]" },
  { src: sciences, alt: "Sciences Po Paris", height: "h-[120px]" },
];

export function Partners() {
  return (
    <section className="border-b border-[#eaeaea] bg-[#f8f9fa] py-10 text-center font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto my-20 max-w-[1200px] px-5">
        <p className="text-[1.8rem] font-bold text-[#333]">
          Grupo de Engenharia de Sistemas Complexos
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-10 max-md:mt-10 max-md:gap-5">
          {partners.map((partner) => (
            <Image
              key={partner.alt}
              src={partner.src}
              alt={partner.alt}
              sizes="250px"
              className={`${partner.height} w-auto object-contain transition-transform duration-300 hover:scale-105 max-md:scale-[0.8] max-md:hover:scale-[0.85]`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
