// Envio do formulário de contato — MOCK.
//
// Hoje só simula a chamada de rede; quando houver backend do GESC, este
// é o único ponto a trocar (mesmo padrão de src/lib/inscricoes.ts).

export async function submitContato(
  payload: Record<string, unknown>,
): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[contato]", payload);
  }

  await new Promise((resolve) => setTimeout(resolve, 800));
}
