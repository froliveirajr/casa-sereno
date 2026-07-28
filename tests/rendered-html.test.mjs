import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Casa Sereno storefront", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Casa Sereno/);
  assert.match(html, /Presentes que/);
  assert.match(html, /transformam cuidado/);
  assert.match(html, /Box Essencial/);
  assert.match(html, /Novo catálogo disponível/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the current catalog", async () => {
  const response = await render("/catalogo");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Catálogo Casa Sereno/);
  assert.match(html, /Focaccia artesanal/);
  assert.match(html, /R\$ 275,00/);
  assert.match(html, /disponibilidade, frete e eventuais substituições/);
});
