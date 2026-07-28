import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title: {
      default: "Receber Bem | Presentes e experiências em Recife",
      template: "%s | Receber Bem",
    },
    description:
      "Cestas de café da manhã, boxes, tábuas de frios e focaccias artesanais em Recife e região metropolitana.",
    icons: {
      icon: "/images/receber-bem-logo-oficial.png",
      shortcut: "/images/receber-bem-logo-oficial.png",
    },
    openGraph: {
      title: "Receber Bem",
      description: "Presentes que transformam cuidado em memória.",
      type: "website",
      locale: "pt_BR",
      url: origin,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Receber Bem — presentes e experiências em Recife" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Receber Bem",
      description: "Presentes que transformam cuidado em memória.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
