import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <p className="text-7xl font-bold tracking-tight text-brand-blue">404</p>
      <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
        Página não encontrada
      </h1>
      <p className="max-w-md text-sm text-zinc-500">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-2 rounded bg-brand-blue px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-brand-red"
      >
        Voltar para a página inicial
      </Link>
    </main>
  );
}
