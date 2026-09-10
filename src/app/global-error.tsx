"use client";

// Substitui o layout raiz quando o erro acontece no próprio layout.
// Não tem acesso ao CSS global, então usa estilos inline.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          margin: 0,
          color: "#171717",
        }}
      >
        <main
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "5rem 1.5rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "1.25rem", margin: 0 }}>Algo deu errado</h1>
          <p style={{ maxWidth: "28rem", fontSize: "0.875rem", color: "#666" }}>
            Ocorreu um erro inesperado{error?.digest ? ` (ref. ${error.digest})` : ""}.
            Tente recarregar a página.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#002266",
              color: "#fff",
              border: 0,
              borderRadius: "0.25rem",
              padding: "0.625rem 1.25rem",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
        </main>
      </body>
    </html>
  );
}
