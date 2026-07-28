import Link from "next/link";

export const metadata = { title: "Pedido recebido | Casa Sereno" };

export default async function OrderConfirmedPage({ searchParams }: { searchParams: Promise<{ codigo?: string }> }) {
  const code = (await searchParams).codigo ?? "Recebido";
  return <main className="order-confirmed">
    <img src="/images/casa-sereno-logo.png" alt="Casa Sereno" width="150" height="150" />
    <span className="confirmation-mark" aria-hidden="true">✓</span>
    <p className="eyebrow">Pedido enviado com carinho</p>
    <h1>Recebemos os seus detalhes.</h1>
    <p className="confirmation-code">Código <strong>{code}</strong></p>
    <p>A equipe da Casa Sereno agora verificará disponibilidade, personalização, entrega e valor. A confirmação será feita pelo WhatsApp informado.</p>
    <div><Link className="button" href="/">Voltar ao início</Link><Link className="text-link" href="/catalogo">Ver catálogo</Link></div>
  </main>;
}
