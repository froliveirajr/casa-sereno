import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../data/catalog";
import { CatalogGrid } from "./catalog-grid";

export const metadata: Metadata = { title: "Catálogo" };

export default function CatalogoPage() {
  return (
    <main className="catalog-page">
      <header className="simple-header catalog-header">
        <Link className="brand" href="/">
          <img src="/images/casa-sereno-logo.png" alt="Casa Sereno" width={170} height={170} />
        </Link>
        <Link className="text-link" href="/">← Voltar ao início</Link>
      </header>
      <section className="catalog-hero">
        <p className="eyebrow">Catálogo Casa Sereno</p>
        <h1>Escolha uma experiência para tornar o momento especial.</h1>
        <p>Conheça as composições, valores e possibilidades de personalização do catálogo atual.</p>
      </section>
      <section className="catalog-content" aria-label="Produtos">
        <div className="catalog-warning"><strong>Informação importante:</strong> disponibilidade, frete e eventuais substituições são confirmados pela equipe antes do pagamento.</div>
        <CatalogGrid products={products} />
        <section className="catalog-information" aria-labelledby="catalog-information-title">
          <div className="section-heading compact-heading">
            <p className="eyebrow">Antes de confirmar</p>
            <h2 id="catalog-information-title">Informações importantes</h2>
          </div>
          <div className="catalog-info-grid">
            <article><span>01</span><h3>Personalização</h3><p>Flores, balões, cartões, fotografias, presentes, bebidas e doces podem compor experiências exclusivas.</p></article>
            <article><span>02</span><h3>Entregas</h3><p>As entregas são organizadas por período — manhã ou tarde — conforme a disponibilidade da agenda.</p></article>
            <article><span>03</span><h3>Cancelamentos</h3><p>Solicite com até quatro dias úteis de antecedência. Casos excepcionais são avaliados pela equipe.</p></article>
          </div>
        </section>
      </section>
    </main>
  );
}
