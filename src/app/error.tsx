"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <p className="text-6xl font-bold tracking-tight text-brand-blue">Ops</p>
      <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
        Algo deu errado
      </h1>
      <p className="max-w-md text-sm text-zinc-500">
        Ocorreu um erro ao carregar esta página. Você pode tentar novamente ou
        voltar para o início.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-brand-blue px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-brand-red"
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          className="rounded border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-brand-blue hover:text-brand-blue"
        >
          Ir para o início
        </Link>
      </div>
    </main>
  );
}
