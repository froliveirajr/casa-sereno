import Link from "next/link";
import { products } from "../data/catalog";
import { createPublicOrder } from "./actions";
import { CardStylePicker } from "./card-style-picker";
import { ProductCart } from "./product-cart";

export const metadata = { title: "Fazer pedido | Casa Sereno" };

export default async function OrderPage({ searchParams }: { searchParams: Promise<{ produto?: string }> }) {
  const selected = (await searchParams).produto;
  return <main className="order-page">
    <header className="order-header">
      <Link href="/" aria-label="Voltar ao início"><img src="/images/casa-sereno-logo.png" alt="Casa Sereno" width="110" height="110" /></Link>
      <div><span>Pedido personalizado</span><strong>Monte seu presente</strong></div>
      <Link className="text-link" href="/catalogo">← Voltar ao catálogo</Link>
    </header>

    <section className="order-intro">
      <p className="eyebrow">Seu gesto, do seu jeito</p>
      <h1>Vamos preparar algo especial?</h1>
      <p>Conte os detalhes abaixo. A Casa Sereno confirmará disponibilidade, valor e entrega pelo WhatsApp antes do pagamento.</p>
    </section>

    <form action={createPublicOrder} className="customer-order-form">
      <section className="order-form-section">
        <div className="order-step"><span>01</span><div><h2>Monte seu carrinho</h2><p>Adicione quantos produtos quiser e escolha a quantidade de cada um.</p></div></div>
        <ProductCart products={products} initialSlug={selected} />
      </section>

      <section className="order-form-section">
        <div className="order-step"><span>02</span><div><h2>Personalize</h2><p>A intenção é parte do presente.</p></div></div>
        <div className="order-fields-grid">
          <label className="order-field">Ocasião<select name="occasion"><option>Aniversário</option><option>Agradecimento</option><option>Carinho</option><option>Receber em casa</option><option>Outra ocasião</option></select></label>
          <label className="order-field">Preferências ou restrições<input name="customization" placeholder="Ex.: sem açúcar, tons claros, sem vinho" /></label>
        </div>
        <CardStylePicker />
      </section>

      <section className="order-form-section">
        <div className="order-step"><span>03</span><div><h2>Quem envia e quem recebe</h2><p>Usaremos estes dados apenas para organizar o pedido.</p></div></div>
        <div className="order-fields-grid">
          <label className="order-field">Seu nome<input name="buyerName" required /></label>
          <label className="order-field">Seu WhatsApp<input name="buyerPhone" inputMode="tel" placeholder="(81) 99999-9999" required /></label>
          <label className="order-field">Nome de quem recebe<input name="recipientName" /></label>
          <label className="order-field">Contato de quem recebe<input name="recipientPhone" inputMode="tel" /></label>
        </div>
      </section>

      <section className="order-form-section">
        <div className="order-step"><span>04</span><div><h2>Entrega ou retirada</h2><p>Informe quando e onde deseja receber.</p></div></div>
        <div className="order-fields-grid">
          <label className="order-field">Modalidade<select name="fulfillmentType"><option value="delivery">Entrega</option><option value="pickup">Retirada</option></select></label>
          <label className="order-field">Data e horário desejados<input name="fulfillmentAt" type="datetime-local" required /></label>
          <label className="order-field order-field-wide">Endereço de entrega<input name="address" placeholder="Rua, número, complemento e bairro" /></label>
          <label className="order-field">Ponto de referência<input name="reference" /></label>
          <label className="order-field">Observações finais<input name="notes" /></label>
        </div>
      </section>

      <section className="order-submit">
        <div><strong>Nenhuma cobrança será feita agora.</strong><p>Depois do envio, a equipe confirma disponibilidade, frete e valor pelo WhatsApp.</p></div>
        <button className="button" type="submit">Enviar pedido para confirmação</button>
      </section>
    </form>
  </main>;
}
