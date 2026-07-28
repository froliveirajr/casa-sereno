"use client";

import Link from "next/link";
import { useState } from "react";
import { formatProductPrice, type Product, type ProductCategory } from "../data/catalog";

const filters: Array<"Todos" | ProductCategory> = ["Todos", "Boxes", "Tábuas", "Artesanais", "Complementos"];

export function CatalogGrid({ products }: { products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Todos");
  const visibleProducts = activeFilter === "Todos" ? products : products.filter((product) => product.category === activeFilter);

  return (
    <>
      <div className="catalog-filters" aria-label="Filtrar produtos por categoria">
        {filters.map((filter) => (
          <button type="button" key={filter} className={activeFilter === filter ? "is-active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
            {filter}
          </button>
        ))}
      </div>
      <p className="catalog-result-count" aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? "produto" : "produtos"}</p>
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.slug}>
            <Link className="product-image product-detail-link" href={`/catalogo/${product.slug}`} aria-label={`Ver detalhes de ${product.name}`}>
              <img src={product.image} alt={product.imageAlt} loading="lazy" />
              <span className={`status status-${product.statusTone}`}>{product.status}</span>
            </Link>
            <div className="product-body">
              <p className="product-kicker">{product.eyebrow}</p>
              <h3><Link href={`/catalogo/${product.slug}`}>{product.name}</Link></h3>
              <p>{product.description}</p>
              <div className="tag-list">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="product-footer"><span>{formatProductPrice(product.priceCents)}</span><Link href={`/catalogo/${product.slug}`}>Ver detalhes →</Link></div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
