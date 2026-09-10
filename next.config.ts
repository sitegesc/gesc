import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CSP relativamente permissiva (Next injeta scripts/estilos inline sem
// nonce). Revisar/apertar antes de produção — em especial trocar
// 'unsafe-inline' de script por nonce se for adotar middleware.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "connect-src 'self'",
  // iframe do Google Maps na página de contato
  "frame-src https://www.google.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
