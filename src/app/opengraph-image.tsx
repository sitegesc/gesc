import { ImageResponse } from "next/og";

// Imagem padrão de compartilhamento (Open Graph / Twitter) para todo o
// site. Gerada no build. Para trocar por uma arte fixa, basta adicionar
// um arquivo `opengraph-image.png` nesta mesma pasta.

export const alt = "GESC — Grupo de Engenharia de Sistemas Complexos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#002266",
          color: "#ffffff",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          GESC
        </div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 12,
            background: "#bd1e20",
            marginTop: 8,
            marginBottom: 44,
            borderRadius: 3,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 42,
            lineHeight: 1.3,
            color: "rgba(255,255,255,0.92)",
            maxWidth: 940,
          }}
        >
          Grupo de Engenharia de Sistemas Complexos
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 18,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Faculdade de Tecnologia · UNICAMP · Limeira
        </div>
      </div>
    ),
    { ...size },
  );
}
