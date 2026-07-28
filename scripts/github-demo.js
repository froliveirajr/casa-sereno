(() => {
  const categories = {
    Boxes: ["Box Afeto", "Box Essencial", "Box Carinho", "Box Alegria", "Box Luxo", "Box Celebrar"],
    Tábuas: ["Tábua de Frios 25 cm", "Tábua de Frios 30 cm"],
    Artesanais: ["Caponata de Berinjela", "Focaccia artesanal", "Bolo de Laranja", "Bolo de Milho", "Cocada artesanal", "Pudim artesanal"],
    Complementos: ["Balão Bubble", "Nuvem de Balões", "Vela", "Foto Polaroid", "Caneca Oxford"],
  };

  const filterBar = document.querySelector(".catalog-filters");
  if (filterBar) {
    const cards = [...document.querySelectorAll(".catalog-content .product-card")];
    const count = document.querySelector(".catalog-result-count");
    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const filter = button.textContent.trim();
      filterBar.querySelectorAll("button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      let visible = 0;
      cards.forEach((card) => {
        const name = card.querySelector("h3")?.textContent.trim();
        const show = filter === "Todos" || categories[filter]?.includes(name);
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = `${visible} ${visible === 1 ? "produto" : "produtos"}`;
    });
  }

  const gallery = document.querySelector(".product-gallery");
  if (gallery) {
    const mainImage = gallery.querySelector(".product-detail-visual > img");
    gallery.querySelector(".product-thumbnails")?.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      const image = button?.querySelector("img");
      if (!button || !image || !mainImage) return;
      mainImage.src = image.src;
      gallery.querySelectorAll(".product-thumbnails button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
    });
  }

  const cartRoot = document.querySelector(".product-cart");
  if (cartRoot) {
    const cart = new Map();
    const cards = [...cartRoot.querySelectorAll(".order-product-option")];
    const summary = cartRoot.querySelector(".cart-summary");
    const money = (cents) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
    const details = cards.map((card) => {
      const name = card.querySelector("strong").textContent.trim();
      const priceText = card.querySelector("small").textContent.trim();
      const numeric = priceText.includes("consulta") ? null : Math.round(Number(priceText.replace(/[^0-9,]/g, "").replace(",", ".")) * 100);
      return { card, name, price: numeric, image: card.querySelector("img").src };
    });
    function change(name, delta) {
      const next = Math.max(0, Math.min(20, (cart.get(name) || 0) + delta));
      next ? cart.set(name, next) : cart.delete(name);
      render();
    }
    function render() {
      details.forEach(({ card, name }) => {
        const quantity = cart.get(name) || 0;
        card.classList.toggle("is-selected", quantity > 0);
        const body = card.querySelector(".order-product-card-body");
        body.querySelector(".cart-add-button, .quantity-control-card")?.remove();
        const control = document.createElement(quantity ? "div" : "button");
        if (!quantity) {
          control.type = "button"; control.className = "cart-add-button"; control.textContent = "Adicionar ao carrinho";
          control.onclick = () => change(name, 1);
        } else {
          control.className = "quantity-control quantity-control-card";
          control.innerHTML = `<button type="button" aria-label="Diminuir">−</button><output>${quantity}</output><button type="button" aria-label="Aumentar">+</button>`;
          control.children[0].onclick = () => change(name, -1);
          control.children[2].onclick = () => change(name, 1);
        }
        body.append(control);
      });
      const entries = details.filter(({ name }) => cart.has(name));
      const total = entries.reduce((sum, item) => sum + (item.price || 0) * cart.get(item.name), 0);
      summary.innerHTML = `<div class="cart-summary-heading"><div><p class="eyebrow">Seu carrinho</p><h3>${entries.length ? `${entries.length} ${entries.length === 1 ? "item escolhido" : "itens escolhidos"}` : "Escolha os produtos"}</h3></div>${entries.length ? '<button type="button">Limpar carrinho</button>' : ""}</div><div class="cart-items">${entries.map((item) => `<div class="cart-item"><img src="${item.image}" alt=""><div><strong>${item.name}</strong><small>${item.price == null ? "Valor sob consulta" : money(item.price)}</small></div><div class="quantity-control"><button type="button" data-name="${item.name}" data-delta="-1">−</button><output>${cart.get(item.name)}</output><button type="button" data-name="${item.name}" data-delta="1">+</button></div></div>`).join("")}</div><div class="cart-total"><span>Total demonstrativo</span><strong>${money(total)}</strong></div>`;
      summary.querySelector(".cart-summary-heading > button")?.addEventListener("click", () => { cart.clear(); render(); });
      summary.querySelectorAll("[data-name]").forEach((button) => button.addEventListener("click", () => change(button.dataset.name, Number(button.dataset.delta))));
    }
    render();
    document.querySelector(".customer-order-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Demonstração concluída. Na versão comercial, este pedido será enviado para a equipe Casa Sereno.");
    });
  }

  const message = document.querySelector('[name="cardMessage"]');
  message?.addEventListener("input", () => document.querySelectorAll(".card-live-message").forEach((preview) => { preview.textContent = message.value || "Sua mensagem aparecerá aqui"; }));

  document.querySelectorAll(".admin-form").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Modo demonstração: na versão comercial, esta informação será salva no sistema.");
  }));
})();
