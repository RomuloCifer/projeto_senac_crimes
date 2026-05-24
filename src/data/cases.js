/** @typedef {import('../types/case').MapCase} MapCase */

// =============================================================================
// CASOS — adicione novos casos aqui seguindo o modelo abaixo.
//
// Campos obrigatórios:
//   id          → string única, ex: 'crime-nome-do-caso'
//   title       → nome exibido no mapa e na lista
//   category    → 'crime' | 'lenda' | 'assombracao' | 'misterio'
//   city        → cidade onde ocorreu
//   state       → sigla do estado, ex: 'SP'
//   year        → ano ou período, ex: '1977' ou 'Anos 90'
//   latitude    → coordenada decimal, ex: -23.5454
//   longitude   → coordenada decimal, ex: -46.6465
//   imageUrl    → URL de uma imagem representativa (Unsplash, etc.)
//   description → texto descritivo do caso
//   curiosity   → detalhe curioso ou informação extra
//
// Dica: use https://www.google.com/maps para obter latitude/longitude.
//   Clique com botão direito num ponto do mapa → o primeiro item é "lat, lng".
// =============================================================================

/** @type {MapCase[]} */
export const CASES = [
  {
    id: 'assombracao-edificio-joelma',
    title: 'Edifício Joelma',
    category: 'assombracao',
    city: 'São Paulo',
    state: 'SP',
    year: '1974',
    latitude: -23.5489,
    longitude: -46.6361,
    imageUrl: '/cases/assombracao-edificio-joelma/1.jpeg',
    description: 'Um incêndio em 1974 matou 187 pessoas após se espalhar rapidamente pelos andares. Muitas vítimas ficaram presas ou saltaram do prédio. Após o desastre, surgiram relatos de gritos, vultos e elevadores funcionando sozinhos. Funcionários afirmam sentir presenças estranhas até hoje.',
    curiosity: 'As "Treze Almas" viraram objeto de devoção popular e são lembradas em missas realizadas no local até hoje.',
    canVisit: '⚠️ Sim — prédio em funcionamento. Acesso público à área térrea.',
    images: [
      '/cases/assombracao-edificio-joelma/1.jpeg',
      '/cases/assombracao-edificio-joelma/2.jpeg',
      '/cases/assombracao-edificio-joelma/3.jpeg',
    ],
  },
  {
    id: 'castelinho-apa',
    title: 'Castelinho da Rua Apa',
    category: 'crime',
    city: 'São Paulo',
    state: 'SP',
    year: 'Anos 1930',
    latitude: -23.5305,
    longitude: -46.6503,
    imageUrl: '/cases/castelinho-apa/1.jpg',
    description: 'Nos anos 1930, uma família foi encontrada morta a tiros dentro do casarão. O crime nunca foi totalmente esclarecido e gerou várias teorias. Com o abandono do local, começaram relatos de sons estranhos, luzes e sombras à noite.',
    curiosity: 'Considerado um dos locais mais mal-assombrados do Brasil.',
    canVisit: '❌ Não — acesso proibido.',
    images: ['/cases/castelinho-apa/1.jpg'],
  },
  {
    id: 'operacao-prato',
    title: 'Operação Prato',
    category: 'misterio',
    city: 'Colares',
    state: 'PA',
    year: 'Anos 70',
    latitude: -0.9369,
    longitude: -48.2797,
    imageUrl: '/cases/operacao-prato/1.jpg',
    description: 'Nos anos 70, moradores relataram ataques de luzes que causavam queimaduras e fraqueza. O fenômeno foi chamado de "chupa-chupa". A Força Aérea investigou o caso e registrou diversos relatos. Mesmo assim, nunca houve explicação definitiva.',
    curiosity: 'Parte dos documentos foi liberada anos depois.',
    canVisit: '⚠️ Sim — cidade acessível.',
    images: ['/cases/operacao-prato/1.jpg'],
  },
  {
    id: 'arco-teles',
    title: 'Arco do Teles',
    category: 'lenda',
    city: 'Rio de Janeiro',
    state: 'RJ',
    year: 'Período colonial até hoje',
    latitude: -22.9035,
    longitude: -43.1729,
    imageUrl: '/cases/arco-teles/1.jpg',
    description: 'Região histórica ligada a crimes antigos e histórias sombrias. Pessoas relatam ouvir passos, vozes e ver aparições durante a madrugada. Uma figura feminina é frequentemente associada aos fenômenos.',
    curiosity: 'A lenda envolve Bárbara dos Prazeres.',
    canVisit: '✅ Sim — área pública.',
    images: ['/cases/arco-teles/1.jpg'],
  },
  {
    id: 'vilas-boas',
    title: 'Caso Vilas-Boas',
    category: 'misterio',
    city: 'São Francisco de Sales',
    state: 'MG',
    year: '1957',
    latitude: -19.8650,
    longitude: -49.7720,
    imageUrl: '/cases/vilas-boas/1.jpg',
    description: 'Em 1957, um agricultor afirmou ter sido levado por seres extraterrestres após ver uma luz intensa. Ele relatou experiências dentro de uma nave antes de ser devolvido ao local. O caso ganhou repercussão internacional. Nunca foi comprovado.',
    curiosity: 'É um dos primeiros relatos de abdução do mundo.',
    canVisit: '⚠️ Parcial — área rural.',
    images: ['/cases/vilas-boas/1.jpg'],
  },
  {
    id: 'opala-preto',
    title: 'Opala Preto do Túnel Rebouças',
    category: 'lenda',
    city: 'Rio de Janeiro',
    state: 'RJ',
    year: 'Relatos contemporâneos',
    latitude: -22.9430,
    longitude: -43.2110,
    imageUrl: '/cases/opala-preto/1.jpg',
    description: 'Motoristas relatam um carro preto que surge à noite e se aproxima rapidamente. Em alguns casos, o veículo desaparece sem explicação. A lenda surgiu após um acidente fatal envolvendo um carro semelhante.',
    curiosity: 'Existem várias versões da história.',
    canVisit: '✅ Sim — via pública.',
    images: ['/cases/opala-preto/1.jpg'],
  },
  {
    id: 'loira-banheiro',
    title: 'Loira do Banheiro',
    category: 'lenda',
    city: 'Guaratinguetá',
    state: 'SP',
    year: 'Popularizada no século XX',
    latitude: -22.8167,
    longitude: -45.1930,
    imageUrl: '/cases/loira-banheiro/1.jpg',
    description: 'Espírito de uma jovem que aparece em banheiros escolares após rituais. Relatos descrevem uma figura pálida surgindo de forma repentina. A história se espalhou por todo o Brasil com várias versões.',
    curiosity: 'Muito popular entre estudantes.',
    canVisit: '⚠️ Sim — escolas comuns.',
    images: ['/cases/loira-banheiro/1.jpg'],
  },
  {
    id: 'corpo-seco',
    title: 'Corpo Seco',
    category: 'lenda',
    city: 'Interior (várias regiões)',
    state: 'BR',
    year: 'Tradição oral',
    latitude: -14.2350,
    longitude: -51.9253,
    imageUrl: '/cases/corpo-seco/1.jpg',
    description: 'Homem cruel que, após morrer, foi rejeitado pela terra e condenado a vagar. Ele teria aparência deformada e assustadora. A lenda diz que ataca ou assusta quem encontra.',
    curiosity: 'Dizem que se esconde em árvores.',
    canVisit: '❌ Não — sem local definido.',
    images: ['/cases/corpo-seco/1.jpg'],
  },
  {
    id: 'inst-penal-candido',
    title: 'Instituto Penal Cândido Mendes',
    category: 'crime',
    city: 'Angra dos Reis',
    state: 'RJ',
    year: '1903-1994',
    latitude: -23.1535,
    longitude: -44.2440,
    imageUrl: '/cases/inst-penal-candido/1.jpg',
    description: 'Presídio famoso por violência extrema, rebeliões e mortes brutais. Após ser desativado, visitantes começaram a relatar passos, vozes e sensação de estar sendo observado. O clima no local é considerado pesado.',
    curiosity: 'Funcionou por quase 100 anos.',
    canVisit: '⚠️ Sim — ruínas abertas na trilha.',
    images: ['/cases/inst-penal-candido/1.jpg'],
  },
  {
    id: 'sete-alem',
    title: 'Sete Além',
    category: 'misterio',
    city: 'Relatos em várias regiões',
    state: 'BR',
    year: 'Era da internet',
    latitude: -15.3500,
    longitude: -52.6000,
    imageUrl: '/cases/sete-alem/1.jpg',
    description: 'Pessoas afirmam ter ido parar em um lugar estranho chamado "Sete Além", onde tudo parece vazio e sombrio. Os habitantes seriam silenciosos e perturbadores. Os relatos surgiram principalmente na internet.',
    curiosity: 'Não há provas concretas, apenas testemunhos.',
    canVisit: '❌ Não — localização desconhecida.',
    images: ['/cases/sete-alem/1.jpg'],
  },
  {
    id: 'igreja-nossa-senhora',
    title: 'Igreja de Nossa Senhora do Rosário dos Pretos',
    category: 'assombracao',
    city: 'Salvador',
    state: 'BA',
    year: 'Século XVIII',
    latitude: -12.9718,
    longitude: -38.5108,
    imageUrl: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?q=80&w=1200&auto=format&fit=crop',
    description: 'Construída por escravizados, a igreja carrega uma história pesada. Há relatos de vozes, sombras e manifestações espirituais no interior, especialmente à noite. O ambiente é descrito como carregado.',
    curiosity: 'Missas eram realizadas escondidas durante a escravidão.',
    canVisit: '✅ Sim — ponto turístico.',
  },

];
