import { AdminShell, EmptyState, Money } from "../_components/admin-shell";
import { createInventoryItem, registerStockMovement } from "../actions";
import { getInventory } from "../data";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const items = await getInventory();
  return <AdminShell currentPath="/admin/estoque">
    <section className="admin-hero"><div><p className="eyebrow">Insumos e embalagens</p><h1>Estoque sob controle.</h1></div></section>
    <div className="admin-workspace admin-workspace-three">
      <section className="admin-panel"><h2>Novo item</h2><form action={createInventoryItem} className="admin-form form-single">
        <label>Nome<input name="name" required placeholder="Farinha italiana" /></label><label>SKU<input name="sku" placeholder="FAR-001" /></label>
        <label>Tipo<select name="kind"><option value="ingredient">Ingrediente</option><option value="packaging">Embalagem</option><option value="finished_good">Produto pronto</option></select></label>
        <label>Unidade<select name="unit"><option value="gram">Gramas</option><option value="milliliter">Mililitros</option><option value="unit">Unidades</option></select></label>
        <label>Quantidade atual<input name="currentQuantity" type="number" defaultValue="0" /></label><label>Estoque mínimo<input name="minimumQuantity" type="number" defaultValue="0" /></label>
        <label>Custo unitário (R$)<input name="unitCost" inputMode="decimal" placeholder="0,00" /></label><button className="button" type="submit">Cadastrar item</button>
      </form></section>
      <section className="admin-panel"><h2>Movimentar estoque</h2><form action={registerStockMovement} className="admin-form form-single">
        <label>Item<select name="itemId" required><option value="">Selecione</option>{items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        <label>Movimento<select name="type"><option value="entry">Entrada</option><option value="consumption">Consumo</option><option value="loss">Perda</option><option value="adjustment">Ajuste positivo</option></select></label>
        <label>Quantidade<input name="quantity" type="number" min="1" required /></label><label>Motivo<input name="reason" placeholder="Compra, produção, perda..." /></label>
        <button className="button" type="submit">Registrar movimento</button>
      </form></section>
      <section className="admin-panel workspace-list"><h2>Posição atual</h2>{!items.length ? <EmptyState>Cadastre farinha, azeite, fermento, embalagens e outros insumos.</EmptyState> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Item</th><th>Saldo</th><th>Mínimo</th><th>Custo</th></tr></thead><tbody>
        {items.map((item) => <tr className={item.currentQuantity <= item.minimumQuantity ? "row-alert" : ""} key={item.id}><td><strong>{item.name}</strong><small>{item.sku}</small></td><td>{item.currentQuantity}</td><td>{item.minimumQuantity}</td><td><Money cents={item.averageUnitCostCents} /></td></tr>)}
      </tbody></table></div>}</section>
    </div>
  </AdminShell>;
}
