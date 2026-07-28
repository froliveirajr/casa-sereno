import Link from "next/link";
import { formatProductPrice, getProduct, getProductImages } from "../../data/catalog";
import { ProductGallery } from "./product-gallery";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);

  if (!product) {
    return (
      <main className="catalog-page product-not-found">
        <p className="eyebrow">Casa Sereno</p>
        <h1>Produto não encontrado.</h1>
        <Link className="button" href="/catalogo">Voltar ao catálogo</Link>
      </main>
    );
  }

  return (
    <main className="catalog-page">
      <header className="simple-header catalog-header product-detail-header">
        <Link className="brand" href="/" aria-label="Casa Sereno — página inicial">
          <img src="/images/casa-sereno-logo.png" alt="Casa Sereno" width={170} height={170} />
        </Link>
        <Link className="text-link" href="/catalogo">← Voltar ao catálogo</Link>
      </header>

      <article className="product-detail">
        <ProductGallery images={getProductImages(product)} productName={product.name} status={product.status} statusTone={product.statusTone} />
        <div className="product-detail-copy">
          <p className="eyebrow">{product.category} · {product.eyebrow}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">{formatProductPrice(product.priceCents)}</p>
          <div className="tag-list">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="product-detail-actions">
            <Link className="button" href={`/pedido?produto=${product.slug}`}>Fazer pedido</Link>
            <Link className="text-link" href="/catalogo">Ver outros produtos →</Link>
          </div>
        </div>
      </article>

      <section className="product-specifications" aria-labelledby="composition-title">
        <div>
          <p className="eyebrow">Ficha completa</p>
          <h2 id="composition-title">O que acompanha</h2>
          <p>Composição informada no catálogo de preços da Casa Sereno.</p>
        </div>
        <ul className="product-composition">
          {product.details.map((detail) => <li key={detail}><span aria-hidden="true">✦</span>{detail}</li>)}
        </ul>
      </section>

      <section className="product-notes" aria-labelledby="notes-title">
        <p className="eyebrow">Importante</p>
        <h2 id="notes-title">Detalhes do pedido</h2>
        <ul>{product.notes.map((note) => <li key={note}>{note}</li>)}</ul>
        <p>Disponibilidade, personalizações, eventuais substituições e frete são confirmados pela equipe antes do pagamento.</p>
      </section>
    </main>
  );
}
