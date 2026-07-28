import Link from "next/link";
import { chatGPTSignOutPath, requireChatGPTUser } from "../../chatgpt-auth";

const links = [
  ["Visão geral", "/admin"],
  ["Produtos", "/admin/produtos"],
  ["Estoque", "/admin/estoque"],
  ["Pedidos", "/admin/pedidos"],
  ["Fornadas", "/admin/fornadas"],
] as const;

export async function AdminShell({ currentPath, children }: { currentPath: string; children: React.ReactNode }) {
  const user = await requireChatGPTUser(currentPath);
  return (
    <main className="admin-page">
      <header className="simple-header admin-header">
        <Link className="brand" href="/admin">
          <img className="admin-brand-logo" src="/images/casa-sereno-sublogo.png" alt="Casa Sereno" width={88} height={88} />
          <span><strong>Casa Sereno</strong><small>painel operacional</small></span>
        </Link>
        <div className="admin-user"><strong>{user.displayName}</strong><a href={chatGPTSignOutPath("/")}>Sair</a></div>
      </header>
      <nav className="admin-nav" aria-label="Módulos operacionais">
        {links.map(([label, href]) => <Link key={href} href={href} aria-current={currentPath === href ? "page" : undefined}>{label}</Link>)}
      </nav>
      <div className="admin-shell">{children}</div>
    </main>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="admin-empty">{children}</div>;
}

export function Money({ cents }: { cents: number | null }) {
  return <>{cents == null ? "—" : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100)}</>;
}
