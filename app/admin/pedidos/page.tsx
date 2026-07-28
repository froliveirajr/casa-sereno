import { AdminShell, EmptyState, Money } from "../_components/admin-shell";
import { createOrder } from "../actions";
import { getOrders, getProducts } from "../data";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const [orders, products] = await Promise.all([getOrders(), getProducts()]);
  return <AdminShell currentPath="/admin/pedidos">
    <section className="admin-hero"><div><p className="eyebrow">Vendas e atendimento</p><h1>Pedidos em um só lugar.</h1></div></section>
    <div className="admin-workspace">
      <section className="admin-panel"><h2>Novo pedido</h2><form action={createOrder} className="admin-form">
        <label>Cliente<input name="buyerName" required /></label><label>WhatsApp<input name="buyerPhone" required placeholder="(81) 99999-9999" /></label>
        <label>Quem recebe<input name="recipientName" /></label><label>Contato de quem recebe<input name="recipientPhone" /></label>
        <label>Produto<select name="productId" required><option value="">Selecione</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
        <label>Quantidade<input name="quantity" type="number" min="1" defaultValue="1" /></label>
        <label>Modalidade<select name="fulfillmentType"><option value="pickup">Retirada</option><option value="delivery">Entrega</option></select></label>
        <label>Data e horário<input name="fulfillmentAt" type="datetime-local" required /></label>
        <label className="field-wide">Observações<textarea name="notes" rows={3} placeholder="Mensagem, personalização e detalhes da entrega" /></label>
        <button className="button field-wide" type="submit">Criar pedido e reservar por 30 minutos</button>
      </form></section>
      <section className="admin-panel"><h2>Pedidos</h2>{!orders.length ? <EmptyState>Nenhum pedido cadastrado. Cadastre primeiro os produtos e depois registre uma venda.</EmptyState> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Pedido</th><th>Cliente</th><th>Data</th><th>Total</th><th>Status</th></tr></thead><tbody>
        {orders.map((order) => <tr key={order.id}><td><strong>{order.code}</strong><small>{order.fulfillmentType === "delivery" ? "Entrega" : "Retirada"}</small></td><td>{order.buyerName}<small>{order.buyerPhone}</small></td><td>{order.fulfillmentAt.toLocaleString("pt-BR")}</td><td><Money cents={order.totalCents} /></td><td>{order.status}</td></tr>)}
      </tbody></table></div>}</section>
    </div>
  </AdminShell>;
}
