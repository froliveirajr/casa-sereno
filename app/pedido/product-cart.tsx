"use client";

import { useMemo, useState } from "react";
import { formatProductPrice, type Product } from "../data/catalog";

type Cart = Record<string, number>;

export function ProductCart({ products, initialSlug }: { products: Product[]; initialSlug?: string }) {
  const [cart, setCart] = useState<Cart>(() => initialSlug && products.some((product) => product.slug === initialSlug) ? { [initialSlug]: 1 } : {});
  const selectedItems = useMemo(
    () => products.filter((product) => (cart[product.slug] ?? 0) > 0).map((product) => ({ product, quantity: cart[product.slug] })),
    [cart, products],
  );
  const knownTotal = selectedItems.reduce((total, item) => total + (item.product.priceCents ?? 0) * item.quantity, 0);
  const hasConsultationItem = selectedItems.some((item) => item.product.priceCents == null);

  function setQuantity(slug: string, quantity: number) {
    setCart((current) => {
      if (quantity <= 0) {
        const next = { ...current };
        delete next[slug];
        return next;
      }
      return { ...current, [slug]: Math.min(20, quantity) };
    });
  }

  return (
    <div className="product-cart">
      <input type="hidden" name="cartJson" value={JSON.stringify(selectedItems.map(({ product, quantity }) => ({ slug: product.slug, quantity })))} />
      <div className="order-product-options">
        {products.map((product) => {
          const quantity = cart[product.slug] ?? 0;
          return (
            <article className={`order-product-option${quantity ? " is-selected" : ""}`} key={product.slug}>
              <img src={product.image} alt={product.imageAlt} />
              <div className="order-product-card-body">
                <span><strong>{product.name}</strong><small>{formatProductPrice(product.priceCents)}</small></span>
                {quantity === 0 ? (
                  <button type="button" className="cart-add-button" onClick={() => setQuantity(product.slug, 1)}>Adicionar ao carrinho</button>
                ) : (
                  <div className="quantity-control quantity-control-card" aria-label={`Quantidade de ${product.name}`}>
                    <button type="button" aria-label={quantity === 1 ? `Retirar ${product.name} do carrinho` : `Diminuir ${product.name}`} onClick={() => setQuantity(product.slug, quantity - 1)}>−</button>
                    <output aria-label={`Quantidade atual de ${product.name}`}>{quantity}</output>
                    <button type="button" aria-label={`Aumentar ${product.name}`} onClick={() => setQuantity(product.slug, quantity + 1)}>+</button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <aside className="cart-summary" aria-label="Carrinho do pedido">
        <div className="cart-summary-heading">
          <div>
            <p className="eyebrow">Seu carrinho</p>
            {selectedItems.length > 0 && <h3>{`${selectedItems.length} ${selectedItems.length === 1 ? "item escolhido" : "itens escolhidos"}`}</h3>}
          </div>
          {selectedItems.length > 0 && <button type="button" onClick={() => setCart({})}>Limpar carrinho</button>}
        </div>
        {selectedItems.length === 0 ? (
          <p className="cart-empty">Você pode adicionar vários produtos e definir uma quantidade diferente para cada um.</p>
        ) : (
          <div className="cart-items">
            {selectedItems.map(({ product, quantity }) => (
              <div className="cart-item" key={product.slug}>
                <img src={product.image} alt="" />
                <div><strong>{product.name}</strong><small>{formatProductPrice(product.priceCents)}</small></div>
                <div className="quantity-control" aria-label={`Quantidade de ${product.name}`}>
                  <button type="button" aria-label={quantity === 1 ? `Retirar ${product.name} do carrinho` : `Diminuir ${product.name}`} onClick={() => setQuantity(product.slug, quantity - 1)}>−</button>
                  <input aria-label={`Quantidade de ${product.name}`} type="number" min="1" max="20" value={quantity} onChange={(event) => setQuantity(product.slug, Number(event.target.value) || 0)} />
                  <button type="button" aria-label={`Aumentar ${product.name}`} onClick={() => setQuantity(product.slug, quantity + 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-total">
          <span>Total dos itens com preço publicado</span>
          <strong>{formatProductPrice(knownTotal)}</strong>
          {hasConsultationItem && <small>+ itens com valor sob consulta</small>}
        </div>
      </aside>
    </div>
  );
}
