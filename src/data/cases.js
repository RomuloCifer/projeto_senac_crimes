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

  // ── CASO EXEMPLO — substitua ou mantenha como referência ──────────────────
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

  // ── ADICIONE NOVOS CASOS ABAIXO ────────────────────────────────────────────

];
