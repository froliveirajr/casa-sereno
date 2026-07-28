export type ProductCategory = "Boxes" | "Tábuas" | "Artesanais" | "Complementos";

export type Product = {
  slug: string;
  category: ProductCategory;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  priceCents: number | null;
  status: string;
  statusTone: string;
  details: string[];
  notes: string[];
};

export const categories = [
  { name: "Boxes", description: "Composições completas para presentear com afeto, presença e significado." },
  { name: "Tábuas", description: "Frios, frutas, queijos e acompanhamentos para compartilhar." },
  { name: "Artesanais", description: "Focaccias, antepastos, bolos e sabores preparados com cuidado." },
  { name: "Complementos", description: "Balões, fotografias, canecas, velas e outros detalhes especiais." },
];

export const occasions = ["Aniversário", "Agradecimento", "Celebração", "Estou pensando em você", "Receber em casa", "Datas sazonais"];

export const products: Product[] = [
  {
    slug: "box-afeto", category: "Boxes" as ProductCategory, name: "Box Afeto", eyebrow: "Gestos cheios de significado",
    description: "Uma composição delicada para demonstrar afeto em cada detalhe.", image: "/images/catalog/box-afeto.jpg", imageAlt: "Box Afeto da Casa Sereno",
    tags: ["Caneca personalizada", "Cartão incluso", "Finalização artesanal"], priceCents: 24900, status: "Catálogo 2026", statusTone: "demo",
    details: ["Mini coração", "Waffle", "Pães de queijo", "Frutas da estação", "Drip coffee", "Biscoito decorado", "Caneca personalizada com a inicial", "Bombom de chocolate", "Geleia artesanal", "Flor de lombo canadense", "Queijo branco"],
    notes: ["Acompanha cartão para mensagem.", "Finalizada com papel celofane e barbante."],
  },
  {
    slug: "box-essencial", category: "Boxes" as ProductCategory, name: "Box Essencial", eyebrow: "Presentear com presença",
    description: "Café da manhã completo para tornar o começo do dia verdadeiramente especial.", image: "/images/catalog/box-essencial.jpg", imageAlt: "Box Essencial da Casa Sereno",
    tags: ["Café da manhã", "Cartão incluso", "Papel celofane e barbante"], priceCents: 27500, status: "Catálogo 2026", statusTone: "demo",
    details: ["Croissant", "Geleia artesanal", "Bolo do dia", "Pão de queijo", "Frutas da estação", "Bombom de chocolate", "Lombo canadense", "Drip coffee", "Sachê de chá", "Waffle", "Iogurte", "Queijo branco", "Suco de uva", "Mini pretzels", "Biscoito"],
    notes: ["Acompanha cartão para mensagem.", "Finalizada com papel celofane e barbante."],
  },
  {
    slug: "box-carinho", category: "Boxes" as ProductCategory, name: "Box Carinho", eyebrow: "Cuidado em cada detalhe",
    description: "Uma experiência abundante, delicada e pensada para envolver quem recebe.", image: "/images/catalog/box-carinho.jpg", imageAlt: "Box Carinho da Casa Sereno",
    tags: ["Experiência completa", "Cartão incluso", "Sob encomenda"], priceCents: 29000, status: "Catálogo 2026", statusTone: "demo",
    details: ["Croissant", "Geleia artesanal", "Bolo do dia", "Pães de queijo", "Frutas da estação", "Bombom de chocolate", "Lombo canadense", "Requeijão cremoso", "Drip coffee", "Waffle", "Iogurte", "Queijo branco", "Suco de uva", "Mini pretzels", "Biscoito", "Granola", "Madeleine", "Stroopwafel"],
    notes: ["Acompanha cartão para mensagem.", "Finalizada com papel celofane e barbante."],
  },
  {
    slug: "box-alegria", category: "Boxes" as ProductCategory, name: "Box Alegria", eyebrow: "A magia da infância",
    description: "Uma composição divertida e colorida para celebrar momentos infantis.", image: "/images/catalog/box-alegria.jpg", imageAlt: "Box Alegria da Casa Sereno",
    tags: ["Infantil", "Celebrações", "Cartão incluso"], priceCents: 24000, status: "Catálogo 2026", statusTone: "demo",
    details: ["Croissant", "Leite fermentado", "Bolo do dia", "Pães de queijo", "Frutas da estação", "Achocolatado", "Leite condensado", "Chocolates diversos", "Nutella", "Fini", "Iogurte infantil", "Mini pretzels", "Biscoito", "Froot Loops", "Madeleine", "Marshmallow"],
    notes: ["Acompanha cartão para mensagem.", "Finalizada com papel celofane e barbante."],
  },
  {
    slug: "box-luxo", category: "Boxes" as ProductCategory, name: "Box Luxo", eyebrow: "Uma experiência inesquecível",
    description: "Sabores refinados e apresentação premium em uma caixa cartonada com gaveta e fechamento em ímã.", image: "/images/catalog/box-luxo.jpg", imageAlt: "Box Luxo da Casa Sereno",
    tags: ["Espumante", "Queijos especiais", "Caixa premium"], priceCents: 34500, status: "Catálogo 2026", statusTone: "demo",
    details: ["Espumante Freixenet Prosecco DOC 200 ml", "Torradinhas canapé", "Queijo Mini Brie Île de France", "Queijo Parmesão Faixa Azul", "Uva Thompson", "Morangos", "Physalis", "Geleia francesa ou pastinha salgada", "Mix de nuts", "Potinho de mel", "Salame italiano", "Lombo canadense", "Bombom fino Alpino ou Ferrero Rocher", "Lâminas de chocolate belga e pistache", "Decoração com frutas desidratadas e ervas"],
    notes: ["Caixa cartonada em formato de maleta, com gaveta e fechamento em ímã.", "Finalização com papel de seda dourado e fita de cetim."],
  },
  {
    slug: "box-celebrar", category: "Boxes" as ProductCategory, name: "Box Celebrar", eyebrow: "Para celebrar o amor",
    description: "Uma experiência completa em box de MDF com detalhes especiais e mini buquê.", image: "/images/catalog/box-celebrar.jpg", imageAlt: "Box Celebrar da Casa Sereno",
    tags: ["Vinho", "Mini buquê", "Focaccia artesanal"], priceCents: 39000, status: "Catálogo 2026", statusTone: "demo",
    details: ["Tábua de frios na box de acrílico", "Focaccia artesanal", "Geleia artesanal de frutas vermelhas", "Caponata de berinjela artesanal", "Coração com bombons de chocolate", "Vinho Carménère Família Viu 375 ml", "Mini buquê"],
    notes: ["Caixa em MDF com alça em couro, recorte de coração e detalhe em tela de palhinha.", "Acompanha cartão para mensagem."],
  },
  {
    slug: "tabua-frios-25", category: "Tábuas" as ProductCategory, name: "Tábua de Frios 25 cm", eyebrow: "Para compartilhar",
    description: "Uma seleção completa em tábua de MDF reutilizável.", image: "/images/catalog/tabua-frios.jpg", imageAlt: "Tábua de frios de 25 centímetros da Casa Sereno",
    tags: ["Tábua reutilizável", "Personalizável", "Cartão incluso"], priceCents: 27500, status: "Catálogo 2026", statusTone: "demo",
    details: ["Salame hamburguês", "Flor de pepperoni", "Queijo do Reino", "Queijo Gouda", "Queijo Parmesão Faixa Azul", "Queijo Brie Île de France", "Uvas", "Morangos", "Blueberry", "Physalis", "Geleia", "Torradas", "Torradas finas Slim Toast", "Castanhas de caju", "Mix de nuts caramelizados", "Pistache", "Mini pretzels", "Chocolate Alpino ou Ferrero Rocher", "Lâminas de chocolate belga com amêndoas ou damasco"],
    notes: ["Acompanha cartão para mensagem e é finalizada com plástico filme.", "Blueberry e physalis estão sujeitos à disponibilidade. Itens podem ser personalizados e substituídos mediante consulta."],
  },
  {
    slug: "tabua-frios-30", category: "Tábuas" as ProductCategory, name: "Tábua de Frios 30 cm", eyebrow: "Mais espaço para celebrar",
    description: "A versão ampliada da tábua de frios, servida em base de MDF reutilizável.", image: "/images/catalog/tabua-frios.jpg", imageAlt: "Tábua de frios de 30 centímetros da Casa Sereno",
    tags: ["30 cm", "Tábua reutilizável", "Sob encomenda"], priceCents: 32500, status: "Catálogo 2026", statusTone: "demo",
    details: ["Salame", "Flor de pepperoni", "Queijo do Reino", "Queijo Gouda", "Queijo Parmesão Faixa Azul", "Queijo Brie Île de France", "Uvas", "Morangos", "Blueberry", "Physalis", "Geleia", "Torradas", "Torradas finas Slim Toast", "Castanhas de caju", "Mix de nuts caramelizados", "Pistache", "Mini pretzels", "Chocolate Alpino ou Ferrero Rocher", "Lâminas de chocolate belga com amêndoas ou damasco"],
    notes: ["Acompanha cartão para mensagem e é finalizada com plástico filme.", "Blueberry e physalis estão sujeitos à disponibilidade. Itens podem ser personalizados e substituídos mediante consulta."],
  },
  {
    slug: "caponata-berinjela", category: "Artesanais" as ProductCategory, name: "Caponata de Berinjela", eyebrow: "Antepasto artesanal",
    description: "Berinjelas marinadas com pimentões, cebolas, azeitonas, uvas-passas, azeite extravirgem e especiarias.", image: "/images/catalog/caponata.jpg", imageAlt: "Caponata de berinjela artesanal da Casa Sereno",
    tags: ["Serve 2 pessoas", "Artesanal", "Antepasto"], priceCents: 4500, status: "Catálogo 2026", statusTone: "demo",
    details: ["Berinjela", "Pimentões amarelos e vermelhos", "Cebola", "Azeitonas", "Uvas-passas", "Azeite extravirgem", "Especiarias"],
    notes: ["Serve duas pessoas.", "Entregue em embalagem plástica com tampa e finalizada com plástico filme."],
  },
  {
    slug: "focaccia-artesanal", category: "Artesanais" as ProductCategory, name: "Focaccia artesanal", eyebrow: "Produção por fornada",
    description: "Preparada à mão, respeitando o tempo da fermentação e a capacidade de cada fornada.", image: "/images/catalog/focaccia.jpg", imageAlt: "Focaccia artesanal da Casa Sereno",
    tags: ["Fermentação artesanal", "Agenda própria", "Sob consulta"], priceCents: null, status: "Sob encomenda", statusTone: "soon",
    details: ["Produção artesanal", "Fermentação respeitada", "Sabores e tamanhos confirmados pela equipe"], notes: ["Disponibilidade conforme a agenda de fornadas."],
  },
  {
    slug: "bolo-laranja", category: "Artesanais" as ProductCategory, name: "Bolo de Laranja", eyebrow: "Sabor artesanal",
    description: "Bolo artesanal de laranja para complementar boxes e experiências.", image: "/images/catalog/bolo-laranja.jpg", imageAlt: "Bolo de laranja artesanal da Casa Sereno",
    tags: ["Bolo artesanal", "Complemento", "Sob consulta"], priceCents: null, status: "Sob consulta", statusTone: "soon",
    details: ["Bolo artesanal sabor laranja", "Tamanho e apresentação confirmados no atendimento"], notes: ["Disponibilidade mediante encomenda."],
  },
  {
    slug: "bolo-milho", category: "Artesanais" as ProductCategory, name: "Bolo de Milho", eyebrow: "Sabor artesanal",
    description: "Bolo artesanal de milho para complementar boxes e experiências.", image: "/images/catalog/bolo-milho.jpg", imageAlt: "Bolo de milho artesanal da Casa Sereno",
    tags: ["Bolo artesanal", "Complemento", "Sob consulta"], priceCents: null, status: "Sob consulta", statusTone: "soon",
    details: ["Bolo artesanal sabor milho", "Tamanho e apresentação confirmados no atendimento"], notes: ["Disponibilidade mediante encomenda."],
  },
  {
    slug: "cocada-artesanal", category: "Artesanais" as ProductCategory, name: "Cocada artesanal", eyebrow: "Doce para complementar",
    description: "Cocada artesanal para compor presentes e experiências personalizadas.", image: "/images/catalog/cocada.jpg", imageAlt: "Cocada artesanal da Casa Sereno",
    tags: ["Doce artesanal", "Complemento", "Sob consulta"], priceCents: null, status: "Sob consulta", statusTone: "soon",
    details: ["Cocada artesanal", "Quantidade e apresentação confirmadas no atendimento"], notes: ["Disponibilidade mediante encomenda."],
  },
  {
    slug: "pudim-artesanal", category: "Artesanais" as ProductCategory, name: "Pudim artesanal", eyebrow: "Doce para celebrar",
    description: "Pudim artesanal para complementar celebrações e presentes.", image: "/images/catalog/pudim.jpg", imageAlt: "Pudim artesanal da Casa Sereno",
    tags: ["Sobremesa", "Complemento", "Sob consulta"], priceCents: null, status: "Sob consulta", statusTone: "soon",
    details: ["Pudim artesanal", "Tamanho e apresentação confirmados no atendimento"], notes: ["Disponibilidade mediante encomenda."],
  },
  ...[
    ["balao-bubble", "Balão Bubble", "Balão personalizado", "/images/catalog/balao-bubble.jpg", "Balão Bubble personalizado da Casa Sereno"],
    ["nuvem-balao", "Nuvem de Balões", "Decoração afetiva", "/images/catalog/nuvem-balao.jpg", "Nuvem de balões da Casa Sereno"],
    ["vela-personalizada", "Vela", "Detalhe para celebrar", "/images/catalog/vela.jpg", "Vela personalizada da Casa Sereno"],
    ["foto-polaroid", "Foto Polaroid", "Memória dentro do presente", "/images/catalog/foto-polaroid.jpg", "Foto Polaroid para presentes da Casa Sereno"],
    ["caneca-oxford", "Caneca Oxford", "Complemento para boxes", "/images/catalog/caneca-oxford.jpg", "Caneca Oxford da Casa Sereno"],
  ].map(([slug, name, eyebrow, image, imageAlt]) => ({
    slug, category: "Complementos" as ProductCategory, name, eyebrow, image, imageAlt,
    description: `${name} para personalizar e tornar a experiência ainda mais especial.`,
    tags: ["Personalizável", "Complemento", "Sob consulta"], priceCents: null, status: "Sob consulta", statusTone: "soon",
    details: [`${name} conforme a referência apresentada`, "Modelo, quantidade e personalização confirmados no atendimento"], notes: ["Disponibilidade mediante encomenda."],
  })),
];

export function formatProductPrice(priceCents: number | null) {
  return priceCents == null ? "Valor sob consulta" : new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(priceCents / 100);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

const productGallery: Record<string, string[]> = {
  "box-afeto": ["/images/catalog/gallery/box-afeto-1.jpeg", "/images/catalog/gallery/box-afeto-2.jpeg", "/images/catalog/gallery/box-afeto-3.jpeg"],
  "box-essencial": ["/images/catalog/gallery/box-essencial-1.jpeg", "/images/catalog/gallery/box-essencial-2.jpeg", "/images/catalog/gallery/box-essencial-3.jpeg", "/images/catalog/gallery/box-essencial-4.jpeg", "/images/catalog/gallery/box-essencial-5.jpeg"],
  "box-carinho": ["/images/catalog/gallery/box-carinho-1.jpeg", "/images/catalog/gallery/box-carinho-2.jpeg", "/images/catalog/gallery/box-carinho-3.jpeg", "/images/catalog/gallery/box-carinho-4.jpeg", "/images/catalog/gallery/box-carinho-5.jpeg"],
  "box-alegria": ["/images/catalog/gallery/box-alegria-1.jpeg", "/images/catalog/gallery/box-alegria-2.jpeg"],
  "box-celebrar": ["/images/catalog/gallery/box-celebrar-1.jpeg", "/images/catalog/gallery/box-celebrar-2.jpeg", "/images/catalog/gallery/box-celebrar-3.jpeg", "/images/catalog/gallery/box-celebrar-4.jpeg", "/images/catalog/gallery/box-celebrar-5.jpeg"],
  "tabua-frios-25": ["/images/catalog/gallery/tabua-frios-1.jpeg", "/images/catalog/gallery/tabua-frios-2.jpeg", "/images/catalog/gallery/tabua-frios-3.jpeg", "/images/catalog/gallery/tabua-frios-4.jpeg", "/images/catalog/gallery/tabua-frios-5.jpeg"],
  "tabua-frios-30": ["/images/catalog/gallery/tabua-frios-1.jpeg", "/images/catalog/gallery/tabua-frios-2.jpeg", "/images/catalog/gallery/tabua-frios-3.jpeg", "/images/catalog/gallery/tabua-frios-4.jpeg", "/images/catalog/gallery/tabua-frios-5.jpeg"],
  "focaccia-artesanal": ["/images/catalog/gallery/focaccia-1.jpeg", "/images/catalog/gallery/focaccia-2.jpeg", "/images/catalog/gallery/focaccia-3.jpeg", "/images/catalog/gallery/focaccia-4.jpeg", "/images/catalog/gallery/focaccia-5.jpeg"],
  "bolo-laranja": ["/images/catalog/gallery/bolo-laranja-1.jpg", "/images/catalog/gallery/bolo-laranja-2.jpg", "/images/catalog/gallery/bolo-laranja-3.jpg"],
  "bolo-milho": ["/images/catalog/gallery/bolo-milho-1.png", "/images/catalog/gallery/bolo-milho-2.png", "/images/catalog/gallery/bolo-milho-3.png"],
  "cocada-artesanal": ["/images/catalog/gallery/cocada-1.jpeg", "/images/catalog/gallery/cocada-2.jpeg", "/images/catalog/gallery/cocada-3.jpeg", "/images/catalog/gallery/cocada-4.jpeg"],
};

export function getProductImages(product: Product) {
  return productGallery[product.slug] ?? [product.image];
}
