import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "../data/catalog";

export const metadata: Metadata = { title: "Catálogo" };

export default function CatalogoPage() {
  return (
    <main className="catalog-page">
      <header className="simple-header">
        <Link className="brand" href="/">
          <Image src="/images/logo-reference.jpg" alt="Receber Bem" width={58} height={58} />
          <span><strong>Receber Bem</strong><small>presentes & experiências</small></span>
        </Link>
        <Link className="text-link" href="/">← Voltar ao início</Link>
      </header>
      <section className="catalog-hero">
        <p className="eyebrow">Catálogo demonstrativo</p>
        <h1>Escolha uma experiência para tornar o momento especial.</h1>
        <p>Esta primeira versão valida a organização do catálogo. Produtos, composições, preços e datas serão publicados após aprovação.</p>
      </section>
      <section className="catalog-content" aria-label="Produtos">
        <div className="catalog-filters" aria-label="Filtros demonstrativos">
          <span>Todos</span><span>Cestas</span><span>Boxes</span><span>Tábuas</span><span>Focaccias</span><span>Sazonais</span>
        </div>
        <div className="catalog-warning"><strong>Versão de homologação:</strong> nenhum item abaixo está disponível para compra e nenhum preço foi inferido do Instagram.</div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.slug}>
              <div className="product-image">
                <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 760px) 92vw, 30vw" />
                <span className={`status status-${product.statusTone}`}>{product.status}</span>
              </div>
              <div className="product-body">
                <p className="product-kicker">{product.eyebrow}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="tag-list">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="product-footer"><span>Preço em validação</span><Link href="/">Voltar ao início</Link></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
