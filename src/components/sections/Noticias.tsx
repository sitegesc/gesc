// Conteúdo provisório (mock). No futuro os `href` apontam para os posts
// reais do blog do GESC.
const featured = {
  date: "15 MAR 2024",
  title: "Projeto IDEIA da FT-Unicamp ganha destaque nacional",
  excerpt:
    "Iniciativa focada no desenvolvimento de estudantes com altas habilidades recebe prêmio de inovação educacional.",
  href: "#",
};

const noticias = [
  { title: "Novo artigo publicado na IEEE", href: "#" },
  { title: "Workshop de Sistemas Complexos", href: "#" },
  { title: "GESC expande parcerias internacionais", href: "#" },
];

const btnLink =
  "mt-auto self-start border-b-2 border-brand-blue pb-[5px] text-[0.85rem] font-bold text-brand-blue transition-colors duration-300 hover:border-brand-red hover:text-brand-red";

function ImagePlaceholder({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-gradient-to-br from-[#cdd8ec] to-[#a9bcdd] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white/60">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    </div>
  );
}

export function Noticias() {
  return (
    <section
      id="noticias"
      className="bg-white py-20 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]"
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="relative mb-[30px] inline-block pb-[15px] text-[2.2rem] font-bold text-brand-blue after:mt-2.5 after:block after:h-1 after:w-[60px] after:rounded-sm after:bg-brand-red after:content-['']">
          Novidades e Artigos
        </h2>

        <div className="grid grid-cols-1 gap-[30px] min-[992px]:grid-cols-3">
          <article className="flex flex-col min-[992px]:col-span-3 min-[992px]:flex-row min-[992px]:items-stretch">
            <ImagePlaceholder className="min-h-[400px] w-full min-[992px]:w-[60%]" />
            <div className="flex w-full flex-col justify-center bg-[#eef2f9] px-10 py-[50px] min-[992px]:w-[40%]">
              <small className="mb-[15px] text-[0.8rem] font-bold tracking-[1px] text-[#444]">
                {featured.date}
              </small>
              <h3 className="mb-5 text-[1.8rem] font-bold leading-[1.2] text-[#111]">
                {featured.title}
              </h3>
              <p className="mb-[30px] leading-[1.6] text-[#555]">
                {featured.excerpt}
              </p>
              <a href={featured.href} className={btnLink}>
                Ler Matéria Completa →
              </a>
            </div>
          </article>

          {noticias.map((noticia) => (
            <article key={noticia.title} className="flex flex-col">
              <ImagePlaceholder className="h-[220px] w-full" />
              <div className="flex flex-grow flex-col bg-[#eef2f9] px-5 py-[25px]">
                <h4 className="mb-[25px] text-[1.1rem] font-bold leading-[1.4] text-[#222]">
                  {noticia.title}
                </h4>
                <a href={noticia.href} className={btnLink}>
                  Ler mais →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
