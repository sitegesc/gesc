// Envio de inscrições — MOCK.
//
// O site antigo mandava os dados direto para uma planilha (SheetDB).
// Aqui a chamada é apenas simulada: no futuro isto vira um POST para o
// backend do GESC. É o único ponto a trocar quando o backend existir.

export type TipoInscricao = "pais" | "professores";

export async function submitInscricao(
  tipo: TipoInscricao,
  payload: Record<string, unknown>,
): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    // Ajuda a conferir o que seria enviado enquanto não há backend.
    console.info(`[inscricao:${tipo}]`, payload);
  }

  // Simula a latência de uma requisição.
  await new Promise((resolve) => setTimeout(resolve, 800));
}
