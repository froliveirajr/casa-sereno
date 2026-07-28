import { AdminShell, EmptyState, Money } from "../_components/admin-shell";
import { createProduct } from "../actions";
import { getProducts } from "../data";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();
  return <AdminShell currentPath="/admin/produtos">
    <section className="admin-hero"><div><p className="eyebrow">Catálogo operacional</p><h1>Produtos e focaccias.</h1></div></section>
    <div className="admin-workspace">
      <section className="admin-panel"><h2>Novo produto</h2><form action={createProduct} className="admin-form">
        <label>Nome<input name="name" required placeholder="Ex.: Focaccia de alecrim" /></label>
        <label>Categoria<input name="category" defaultValue="Focaccias" /></label>
        <label className="field-wide">Descrição<textarea name="description" rows={3} placeholder="Composição e apresentação" /></label>
        <label>Operação<select name="operationalType"><option value="batch">Produção por fornada</option><option value="made_to_order">Sob encomenda</option></select></label>
        <label>Antecedência (horas)<input name="minimumLeadHours" type="number" min="0" defaultValue="24" /></label>
        <label>Preço (R$)<input name="price" inputMode="decimal" placeholder="0,00" /></label>
        <label>Custo (R$)<input name="cost" inputMode="decimal" placeholder="0,00" /></label>
        <button className="button field-wide" type="submit">Cadastrar produto</button>
      </form></section>
      <section className="admin-panel"><h2>Produtos cadastrados</h2>{!products.length ? <EmptyState>Nenhum produto real cadastrado.</EmptyState> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Produto</th><th>Categoria</th><th>Operação</th><th>Preço</th><th>Status</th></tr></thead><tbody>
        {products.map((product) => <tr key={product.id}><td><strong>{product.name}</strong></td><td>{product.category}</td><td>{product.operationalType === "batch" ? "Fornada" : "Encomenda"}</td><td><Money cents={product.priceCents} /></td><td>{product.status}</td></tr>)}
      </tbody></table></div>}</section>
    </div>
  </AdminShell>;
}
