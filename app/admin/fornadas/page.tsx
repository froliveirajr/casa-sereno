import { AdminShell, EmptyState } from "../_components/admin-shell";
import { createBatch } from "../actions";
import { getBatches, getProducts } from "../data";

export const dynamic = "force-dynamic";

export default async function BatchesPage() {
  const [batches, products] = await Promise.all([getBatches(), getProducts()]);
  const batchProducts = products.filter((product) => product.operationalType === "batch");
  return <AdminShell currentPath="/admin/fornadas">
    <section className="admin-hero"><div><p className="eyebrow">Focaccias</p><h1>Planejamento por fornada.</h1></div></section>
    <div className="admin-workspace">
      <section className="admin-panel"><h2>Nova fornada</h2><form action={createBatch} className="admin-form">
        <label className="field-wide">Nome<input name="name" placeholder="Fornada de sábado" /></label>
        <label className="field-wide">Focaccia<select name="productId" required><option value="">Selecione</option>{batchProducts.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
        <label>Abre encomendas<input name="opensAt" type="datetime-local" required /></label><label>Encerra encomendas<input name="closesAt" type="datetime-local" required /></label>
        <label>Produção/retirada<input name="productionAt" type="datetime-local" required /></label><label>Capacidade (unidades)<input name="capacity" type="number" min="1" required /></label>
        <button className="button field-wide" type="submit">Planejar fornada</button>
      </form><p className="form-hint">A capacidade será compartilhada entre reservas e pagamentos confirmados. Pedidos excedentes entrarão na futura lista de espera.</p></section>
      <section className="admin-panel"><h2>Fornadas planejadas</h2>{!batches.length ? <EmptyState>Cadastre uma focaccia como “produção por fornada” e crie o primeiro lote.</EmptyState> : <div className="batch-grid">
        {batches.map((batch) => { const occupancy = Math.round((batch.reservedTotal / batch.capacityTotal) * 100); return <article className="batch-card" key={batch.id}><div><span>{batch.status}</span><h3>{batch.name}</h3><p>{batch.productName ?? "Focaccia"} · {batch.productionAt.toLocaleString("pt-BR")}</p></div><div className="capacity-bar" aria-label={`${occupancy}% reservado`}><i style={{ width: `${Math.min(100, occupancy)}%` }} /></div><footer><strong>{batch.reservedTotal}/{batch.capacityTotal} reservadas</strong><small>{batch.paidTotal} pagas</small></footer></article>; })}
      </div>}</section>
    </div>
  </AdminShell>;
}
