# Receber Bem

Aplicação web mobile-first para catálogo, encomendas, fornadas, pagamentos, produção e entrega da Receber Bem.

## Estado atual

- vitrine institucional responsiva;
- catálogo demonstrativo com referências públicas do Instagram;
- área administrativa protegida para homologação;
- modelo relacional inicial e primeira migração D1;
- armazenamento R2 reservado para futuras fotos originais;
- testes de renderização das rotas públicas.

Os produtos e preços ainda não representam o catálogo comercial aprovado. Nenhum dado fictício deve ser publicado como oferta real.

## Requisitos

- Node.js `>=22.13.0`
- npm

## Execução

```bash
npm install
npm run dev
```

## Validação

```bash
npm run build
npm test
```

## Banco de dados

O esquema fica em `db/schema.ts` e as migrações geradas em `drizzle/`.

```bash
npm run db:generate
```

## Conteúdo pendente

Antes do catálogo real, validar logomarca de alta resolução, fotos originais, produtos, composições, preços, capacidades, áreas de entrega, políticas, Pix e alergênicos.
