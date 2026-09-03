import { SectionTitle } from "@/components/ui/SectionTitle";
import { socialIcons } from "@/lib/socialIcons";

type Membro = { name: string; role: string };

const membros: Membro[] = [
  { name: "Nome do Pesquisador", role: "Doutorando em Tecnologia" },
  { name: "Nome do Pesquisador", role: "Mestrando em Eng." },
  { name: "Nome do Pesquisador", role: "Pesquisador Associado" },
  { name: "Nome do Pesquisador", role: "Aluno de Iniciação Científica" },
  { name: "Nome do Pesquisador", role: "Cargo" },
  { name: "Nome do Pesquisador", role: "Cargo" },
  { name: "Nome do Pesquisador", role: "Cargo" },
  { name: "Nome do Pesquisador", role: "Cargo" },
  { name: "Nome do Pesquisador", role: "Cargo" },
  { name: "Nome do Pesquisador", role: "Cargo" },
  { name: "Nome do Pesquisador", role: "Cargo" },
  { name: "Nome do Pesquisador", role: "Cargo" },
];

export function Equipe() {
  return (
    <section className="bg-white py-20 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>Nossa Equipe</SectionTitle>

        <div className="mt-[60px] flex flex-wrap justify-center gap-x-[25px] gap-y-[70px]">
          {membros.map((membro, index) => (
            <div
              key={`${membro.role}-${index}`}
              className="relative w-[250px] rounded-xl border border-[#e0e0e0] bg-white px-5 pt-[60px] pb-[25px] text-center transition duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute -top-[50px] left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full bg-[#f8f9fa] p-[5px] before:absolute before:inset-0 before:rounded-full before:border before:border-[#e0e0e0] before:content-['']">
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                  className="relative z-[2] h-full w-full rounded-full"
                >
                  <rect width="100" height="100" fill="#e9edf2" />
                  <circle cx="50" cy="38" r="17" fill="#aab4c0" />
                  <path
                    d="M18 86c2-18 15-28 32-28s30 10 32 28z"
                    fill="#aab4c0"
                  />
                </svg>
              </div>

              <h3 className="mb-[5px] text-base font-bold text-brand-blue">
                {membro.name}
              </h3>
              <span className="mb-5 block text-[0.85rem] italic text-[#666]">
                {membro.role}
              </span>

              <div className="flex justify-center gap-[15px]">
                {socialIcons.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={`${social.label} de ${membro.name}`}
                    className="text-base text-[#222] transition-colors duration-300 hover:text-brand-red"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-[1em] w-[1em] fill-current"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
