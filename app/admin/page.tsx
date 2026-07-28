import Link from "next/link";
import { AdminShell } from "./_components/admin-shell";
import { getDashboardMetrics, getInventory, getOrders } from "./data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [metrics, orders, inventory] = await Promise.all([getDashboardMetrics(), getOrders(), getInventory()]);
  const lowStock = inventory.filter((item) => item.currentQuantity <= item.minimumQuantity).slice(0, 5);
  return (
    <AdminShell currentPath="/admin">
      <section className="admin-hero"><div><p className="eyebrow">Visão geral</p><h1>Vamos organizar a produção.</h1></div><span className="live-pill">Operação conectada</span></section>
      <section className="metric-grid" aria-label="Indicadores">
        <article className="metric-card"><span>Pedidos cadastrados</span><strong>{metrics.orders}</strong><small>Histórico operacional</small></article>
        <article className="metric-card"><span>Fornadas</span><strong>{metrics.batches}</strong><small>Planejadas e concluídas</small></article>
        <article className="metric-card"><span>Estoque baixo</span><strong>{metrics.lowStock}</strong><small>Itens no mínimo ou abaixo</small></article>
        <article className="metric-card"><span>Próximas entregas</span><strong>{orders.slice(0, 7).length}</strong><small>Até 7 pedidos na fila</small></article>
      </section>
      <div className="admin-columns">
        <section className="admin-panel"><div className="panel-heading"><h2>Próximos pedidos</h2><Link href="/admin/pedidos">Gerenciar</Link></div><ul className="admin-list">
          {orders.slice(0, 5).map((order) => <li key={order.id}><div><strong>{order.code} · {order.buyerName}</strong><small>{order.fulfillmentType === "delivery" ? "Entrega" : "Retirada"} · {order.fulfillmentAt.toLocaleString("pt-BR")}</small></div><span>{order.status}</span></li>)}
          {!orders.length && <li><div><strong>Nenhum pedido cadastrado</strong><small>Use o módulo Pedidos para registrar o primeiro.</small></div></li>}
        </ul></section>
        <section className="admin-panel"><div className="panel-heading"><h2>Atenção</h2><Link href="/admin/estoque">Ver estoque</Link></div><ul className="admin-list">
          {lowStock.map((item) => <li key={item.id}><div><strong>{item.name}</strong><small>Atual: {item.currentQuantity} · mínimo: {item.minimumQuantity}</small></div><span>Repor</span></li>)}
          {!lowStock.length && <li><div><strong>Estoque sem alertas</strong><small>Cadastre insumos e quantidades mínimas.</small></div></li>}
        </ul><div className="admin-shortcut"><strong>Focaccias</strong><p>Planeje capacidade, reservas e produção por fornada.</p><Link className="button button-compact" href="/admin/fornadas">Nova fornada</Link></div></section>
      </div>
    </AdminShell>
  );
}
