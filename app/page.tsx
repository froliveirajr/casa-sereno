import Link from "next/link";
import { categories, formatProductPrice, occasions, products } from "./data/catalog";

const whatsappUrl =
  "https://wa.me/5581999982391?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Casa%20Sereno.";

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span>Detalhes não fazem a diferença. Fazem tudo.</span>
        <span className="announcement-dot" aria-hidden="true" />
        <span>Boxes • Tábuas • Artesanais • Experiências personalizadas</span>
      </div>

      <header className="site-header">
        <Link className="brand" href="/" aria-label="Casa Sereno — página inicial">
          <img
            src="/images/casa-sereno-logo.png"
            alt="Casa Sereno"
            width={130}
            height={130}
          />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="#experiencias">Experiências</Link>
          <Link href="#ocasioes">Ocasiões</Link>
          <Link href="#como-funciona">Como funciona</Link>
        </nav>
        <Link className="button button-compact" href="/pedido">Fazer pedido</Link>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Experiências que ficam</p>
          <h1>
            Presentes que
            <span className="hero-highlight">transformam cuidado</span>
            em memória.
          </h1>
          <p className="hero-lead">
            Cada composição nasce das escolhas, do tempo e dos pequenos detalhes —
            para fazer alguém se sentir verdadeiramente especial.
          </p>
          <div className="hero-actions">
            <Link className="button" href="#experiencias">
              Explorar experiências
            </Link>
            <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">
              Pedir ajuda para escolher <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-note">
            <span aria-hidden="true">✦</span>
            <p>
              <strong>Novo catálogo disponível.</strong> Valores, composições e condições
              são confirmados pela equipe antes do pagamento.
            </p>
          </div>
        </div>

        <div className="hero-gallery" aria-label="Composições da Casa Sereno">
          <figure className="hero-photo hero-photo-main">
            <img
              src="/images/catalog/box-essencial.jpg"
              alt="Box Essencial da Casa Sereno"
            />
          </figure>
          <figure className="hero-photo hero-photo-secondary">
            <img
              src="/images/catalog/tabua-frios.jpg"
              alt="Tábua de frios da Casa Sereno"
            />
          </figure>
          <div className="hero-seal">
            <span>Detalhes</span>
            <strong>fazem tudo.</strong>
          </div>
        </div>
      </section>

      <section className="category-strip" aria-labelledby="categorias-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Escolha pelo que deseja transmitir</p>
          <h2 id="categorias-title">Um gesto para cada momento</h2>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <article className="category-card" key={category.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <Link href="/catalogo">Ver no catálogo</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="product-section" id="experiencias" aria-labelledby="experiencias-title">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Experiências em destaque</p>
            <h2 id="experiencias-title">Feitas para permanecer</h2>
          </div>
          <Link className="text-link" href="/catalogo">
            Ver catálogo completo <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 6).map((product) => (
            <article className="product-card" key={product.slug}>
              <Link className="product-image product-detail-link" href={`/catalogo/${product.slug}`} aria-label={`Ver detalhes de ${product.name}`}>
                <img src={product.image} alt={product.imageAlt} loading="lazy" />
                <span className={`status status-${product.statusTone}`}>{product.status}</span>
              </Link>
              <div className="product-body">
                <p className="product-kicker">{product.eyebrow}</p>
                <h3><Link href={`/catalogo/${product.slug}`}>{product.name}</Link></h3>
                <p>{product.description}</p>
                <div className="tag-list" aria-label="Características">
                  {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="product-footer">
                  <span>{formatProductPrice(product.priceCents)}</span>
                  <Link href={`/pedido?produto=${product.slug}`} aria-label={`Pedir ${product.name}`}>
                    Fazer pedido <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="occasion-section" id="ocasioes" aria-labelledby="ocasioes-title">
        <div className="occasion-copy">
          <p className="eyebrow">Presentear é fazer-se presente</p>
          <h2 id="ocasioes-title">Qual sentimento você quer entregar?</h2>
          <p>
            Escolha a ocasião e encontre composições que podem ser personalizadas
            com mensagem, detalhes e a intenção de quem envia.
          </p>
        </div>
        <div className="occasion-list">
          {occasions.map((occasion) => (
            <Link href="/catalogo" key={occasion}>{occasion}<span aria-hidden="true">↗</span></Link>
          ))}
        </div>
      </section>

      <section className="how-section" id="como-funciona" aria-labelledby="como-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Do seu gesto até quem recebe</p>
          <h2 id="como-title">Cuidado em cada etapa</h2>
        </div>
        <ol className="steps">
          <li><span>01</span><div><h3>Escolha</h3><p>Encontre uma composição pela ocasião, estilo ou data desejada.</p></div></li>
          <li><span>02</span><div><h3>Personalize</h3><p>Conte quem recebe, escreva sua mensagem e escolha os detalhes disponíveis.</p></div></li>
          <li><span>03</span><div><h3>Agende</h3><p>Selecione retirada ou entrega dentro das datas e janelas disponíveis.</p></div></li>
          <li><span>04</span><div><h3>Acompanhe</h3><p>Receba a confirmação e acompanhe a preparação até a entrega.</p></div></li>
        </ol>
      </section>

      <section className="story-section">
        <div className="story-photo">
          <img
            src="/images/dia-dos-avos.jpg"
            alt="Composição presenteável com café, caneca, flores e biscoitos"
            loading="lazy"
          />
        </div>
        <blockquote>
          <p>“Não é apenas sobre o que vai dentro da caixa. É sobre o que ela faz quem recebe sentir.”</p>
          <cite>Casa Sereno</cite>
        </blockquote>
      </section>

      <section className="cta-section">
        <p className="eyebrow">Precisa de ajuda para escolher?</p>
        <h2>Conte para nós sobre esse momento.</h2>
        <p>Vamos ajudar a encontrar uma experiência à altura da sua intenção.</p>
        <a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">
          Conversar pelo WhatsApp
        </a>
      </section>

      <footer className="site-footer">
        <div className="brand footer-brand">
          <img src="/images/casa-sereno-logo.png" alt="Casa Sereno" width={140} height={140} loading="lazy" />
        </div>
        <p>Boxes, tábuas, sabores artesanais e experiências personalizadas.</p>
        <nav aria-label="Links do rodapé">
          <a href="https://www.instagram.com/receberbem_decor/" target="_blank" rel="noreferrer">Instagram</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          <Link href="/admin">Área interna</Link>
        </nav>
      </footer>
    </main>
  );
}
