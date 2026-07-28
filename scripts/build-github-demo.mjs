import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "docs");
const base = "/casa-sereno";
const siteUrl = "https://froliveirajr.github.io/casa-sereno";
const slugs = [
  "box-afeto", "box-essencial", "box-carinho", "box-alegria", "box-luxo", "box-celebrar",
  "tabua-frios-25", "tabua-frios-30", "caponata-berinjela", "focaccia-artesanal", "bolo-laranja",
  "bolo-milho", "cocada-artesanal", "pudim-artesanal", "balao-bubble", "nuvem-balao",
  "vela-personalizada", "foto-polaroid", "caneca-oxford",
];
const routes = ["/", "/catalogo", "/pedido", "/admin", "/admin/produtos", "/admin/estoque", "/admin/pedidos", "/admin/fornadas", ...slugs.map((slug) => `/catalogo/${slug}`)];

await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, "assets"), { recursive: true });
await mkdir(path.join(output, "images"), { recursive: true });
await cp(path.join(root, "public", "images", "catalog"), path.join(output, "images", "catalog"), { recursive: true });
for (const image of ["casa-sereno-logo.png", "casa-sereno-sublogo.png", "dia-dos-avos.jpg"]) {
  await cp(path.join(root, "public", "images", image), path.join(output, "images", image));
}
for (const file of ["og.png", "favicon.svg"]) {
  try { await cp(path.join(root, "public", file), path.join(output, file)); } catch {}
}

let css = await readFile(path.join(root, "app", "globals.css"), "utf8");
css = css.replace(/^@import\s+"tailwindcss";\s*/m, "");
await writeFile(path.join(output, "assets", "style.css"), css);
await cp(path.join(root, "scripts", "github-demo.js"), path.join(output, "assets", "demo.js"));
await writeFile(path.join(output, ".nojekyll"), "");

for (const route of routes) {
  const response = await fetch(`http://localhost:3000${route}`);
  if (!response.ok) throw new Error(`Falha ao gerar ${route}: ${response.status}`);
  let html = await response.text();
  html = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<link\s+rel="modulepreload"[^>]*>/gi, "")
    .replace(/<link\s+rel="stylesheet"[^>]*>/gi, `<link rel="stylesheet" href="${base}/assets/style.css"/>`)
    .replaceAll("http://localhost:3000", siteUrl)
    .replace(/(href|src)="\/(?!\/|casa-sereno\/)/g, `$1="${base}/`)
    .replace(new RegExp(`${base}/signout-with-chatgpt\\?return_to=%2F`, "g"), `${base}/`)
    .replace(/>Sair<\/a>/g, ">Voltar ao site</a>")
    .replace("</body>", `<script src="${base}/assets/demo.js"></script></body>`);
  const directory = route === "/" ? output : path.join(output, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}

await writeFile(path.join(output, "404.html"), await readFile(path.join(output, "index.html"), "utf8"));
console.log(`Demonstração gerada em ${output}`);
