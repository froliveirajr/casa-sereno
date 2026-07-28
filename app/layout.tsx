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
      default: "Casa Sereno | Experiências que ficam",
      template: "%s | Casa Sereno",
    },
    description:
      "Boxes, tábuas de frios, focaccias e experiências personalizadas para celebrar momentos especiais.",
    icons: {
      icon: "/images/casa-sereno-sublogo.png",
      shortcut: "/images/casa-sereno-sublogo.png",
    },
    openGraph: {
      title: "Casa Sereno",
      description: "Experiências que ficam.",
      type: "website",
      locale: "pt_BR",
      url: origin,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Casa Sereno — experiências que ficam" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Casa Sereno",
      description: "Experiências que ficam.",
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
