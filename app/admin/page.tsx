import Image from "next/image";
import Link from "next/link";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  return (
    <main className="admin-page">
      <header className="simple-header admin-header">
        <Link className="brand" href="/">
          <Image src="/images/logo-reference.jpg" alt="Receber Bem" width={50} height={50} />
          <span><strong>Receber Bem</strong><small>painel operacional</small></span>
        </Link>
        <div className="admin-user"><strong>{user.displayName}</strong><a href={chatGPTSignOutPath("/")}>Sair</a></div>
      </header>
      <div className="admin-shell">
        <section className="admin-hero">
          <div><p className="eyebrow">Visão geral</p><h1>Olá, vamos organizar o dia.</h1></div>
          <span className="demo-pill">Dados demonstrativos</span>
        </section>
        <section className="metric-grid" aria-label="Indicadores">
          <article className="metric-card"><span>Pedidos hoje</span><strong>08</strong><small>3 aguardando Pix</small></article>
          <article className="metric-card"><span>Capacidade</span><strong>68%</strong><small>Dentro do planejado</small></article>
          <article className="metric-card"><span>Entregas</span><strong>05</strong><small>2 janelas operacionais</small></article>
          <article className="metric-card"><span>Lista de espera</span><strong>04</strong><small>Interesses na próxima data</small></article>
        </section>
        <div className="admin-columns">
          <section className="admin-panel">
            <h2>Próximos pedidos</h2>
            <ul className="admin-list">
              <li><div><strong>#RB-1024 · Box Essencial</strong><small>Entrega · Boa Viagem · 08:00–10:00</small></div><span>Confirmado</span></li>
              <li><div><strong>#RB-1025 · Tábua artesanal</strong><small>Retirada · 11:00–12:00</small></div><span>Em produção</span></li>
              <li><div><strong>#RB-1026 · Cesta presenteável</strong><small>Entrega · Casa Forte · 14:00–16:00</small></div><span>Aguardando Pix</span></li>
            </ul>
          </section>
          <section className="admin-panel">
            <h2>Atenção</h2>
            <ul className="admin-list">
              <li><div><strong>2 reservas expiram hoje</strong><small>Capacidade será liberada automaticamente</small></div><span>Ver</span></li>
              <li><div><strong>Fornada demonstrativa</strong><small>Encerramento em 1 dia</small></div><span>72%</span></li>
              <li><div><strong>Catálogo pendente</strong><small>Preços e composições aguardam validação</small></div><span>Revisar</span></li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
