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

  // ── CASOS EXEMPLO — um de cada categoria para testes iniciais ────────────
  {
    id: 'crime-mascaras-chumbo',
    title: 'Caso das Máscaras de Chumbo',
    category: 'crime',
    city: 'Niterói',
    state: 'RJ',
    year: '1966',
    latitude: -22.8751,
    longitude: -43.0722,
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800',
    description: 'Dois técnicos foram encontrados mortos no Morro do Vintém com máscaras de chumbo artesanais e um bilhete enigmático com instruções para um "experimento".',
    curiosity: 'A investigação nunca explicou de forma convincente a origem das cápsulas citadas no bilhete, e o caso permanece oficialmente sem solução.',
  },
  {
    id: 'lenda-et-varginha',
    title: 'ET de Varginha',
    category: 'lenda',
    city: 'Varginha',
    state: 'MG',
    year: '1996',
    latitude: -21.5514,
    longitude: -45.4303,
    imageUrl: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=800',
    description: 'Relatos sobre uma criatura avistada em Varginha mobilizaram moradores, militares e a imprensa, transformando o caso em uma das lendas urbanas mais famosas do país.',
    curiosity: 'A cidade incorporou o episódio à sua identidade cultural com monumentos e eventos temáticos.',
  },
  {
    id: 'assombracao-edificio-joelma',
    title: 'Edifício Joelma',
    category: 'assombracao',
    city: 'São Paulo',
    state: 'SP',
    year: '1974',
    latitude: -23.5489,
    longitude: -46.6361,
    imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=800',
    description: 'Um incêndio em 1974 matou 187 pessoas após se espalhar rapidamente pelos andares. Muitas vítimas ficaram presas ou saltaram do prédio. Após o desastre, surgiram relatos de gritos, vultos e elevadores funcionando sozinhos. Funcionários afirmam sentir presenças estranhas até hoje.',
    curiosity: 'As "Treze Almas" — vítimas que pularam juntas — viraram objeto de devoação popular e são lembradas em missas realizadas no local até hoje.',
    canVisit: '⚠️ Sim — prédio em funcionamento. Acesso público à área térrea.',
    images: [
      '/cases/assombracao-edificio-joelma/1.jpeg',
      '/cases/assombracao-edificio-joelma/2.jpeg',
      '/cases/assombracao-edificio-joelma/3.jpeg',
    ],
  },
  {
    id: 'misterio-operacao-prato',
    title: 'Operação Prato',
    category: 'misterio',
    city: 'Colares',
    state: 'PA',
    year: '1977',
    latitude: -0.9367,
    longitude: -48.2808,
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800',
    description: 'Uma operação militar foi aberta para investigar luzes e objetos voadores que aterrorizavam comunidades da região de Colares, no Pará.',
    curiosity: 'Parte da documentação oficial só foi divulgada anos depois, o que alimentou ainda mais o mistério.',
  },

  // ── ADICIONE NOVOS CASOS ABAIXO ────────────────────────────────────────────

];
