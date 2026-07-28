import Image from "next/image";
import Link from "next/link";
import { categories, occasions, products } from "./data/catalog";

const whatsappUrl =
  "https://wa.me/5581999982391?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Receber%20Bem.";

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span>Detalhes não fazem a diferença. Fazem tudo.</span>
        <span className="announcement-dot" aria-hidden="true" />
        <span>Cestas • Boxes • Tábuas • Focaccias</span>
      </div>

      <header className="site-header">
        <Link className="brand" href="/" aria-label="Receber Bem — página inicial">
          <Image
            src="/images/logo-reference.jpg"
            alt="Receber Bem"
            width={64}
            height={64}
            priority
          />
          <span>
            <strong>Receber Bem</strong>
            <small>presentes & experiências</small>
          </span>
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="#experiencias">Experiências</Link>
          <Link href="#ocasioes">Ocasiões</Link>
          <Link href="#como-funciona">Como funciona</Link>
        </nav>
        <a className="button button-compact" href={whatsappUrl} target="_blank" rel="noreferrer">
          Falar no WhatsApp
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Cestas, tábuas e sabores feitos com intenção</p>
          <h1>Presentes que transformam cuidado em memória.</h1>
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
              <strong>Catálogo em preparação.</strong> Os produtos desta versão são
              demonstrativos e os preços ainda estão em validação.
            </p>
          </div>
        </div>

        <div className="hero-gallery" aria-label="Composições da Receber Bem">
          <figure className="hero-photo hero-photo-main">
            <Image
              src="/images/box-essencial.jpg"
              alt="Box Essencial com frutas, biscoitos, café e itens delicadamente organizados"
              fill
              sizes="(max-width: 860px) 82vw, 36vw"
              priority
            />
          </figure>
          <figure className="hero-photo hero-photo-secondary">
            <Image
              src="/images/tabua-artesanal.jpg"
              alt="Tábua artesanal com queijos, frutas, frios e castanhas"
              fill
              sizes="(max-width: 860px) 42vw, 18vw"
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
                <div className="tag-list" aria-label="Características">
                  {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="product-footer">
                  <span>Preço em validação</span>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Consultar ${product.name} no WhatsApp`}>
                    Consultar <span aria-hidden="true">→</span>
                  </a>
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
          <Image
            src="/images/dia-dos-avos.jpg"
            alt="Composição presenteável com café, caneca, flores e biscoitos"
            fill
            sizes="(max-width: 760px) 100vw, 48vw"
          />
        </div>
        <blockquote>
          <p>“Não é apenas sobre o que vai dentro da caixa. É sobre o que ela faz quem recebe sentir.”</p>
          <cite>Receber Bem</cite>
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
          <Image src="/images/logo-reference.jpg" alt="" width={54} height={54} />
          <span><strong>Receber Bem</strong><small>Detalhes não fazem a diferença. Fazem tudo.</small></span>
        </div>
        <p>Cestas de café da manhã, boxes, tábuas e focaccias artesanais.</p>
        <nav aria-label="Links do rodapé">
          <a href="https://www.instagram.com/receberbem_decor/" target="_blank" rel="noreferrer">Instagram</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
          <Link href="/admin">Área interna</Link>
        </nav>
      </footer>
    </main>
  );
}
