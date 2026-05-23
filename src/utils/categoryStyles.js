export const CATEGORY_META = {
  crime: {
    label: 'Crime',
    color: '#C0392B',   // vermelho profundo
  },
  lenda: {
    label: 'Lenda',
    color: '#8C6BE8',   // roxo suave
  },
  assombracao: {
    label: 'Assombração',
    color: '#4A7ABF',   // azul escuro frio
  },
  misterio: {
    label: 'Mistério',
    color: '#A07840',   // dourado apagado
  },
};

export const FILTERS = [
  { value: 'todos',       label: 'Todos' },
  { value: 'crime',       label: 'Crimes' },
  { value: 'lenda',       label: 'Lendas' },
  { value: 'assombracao', label: 'Assombrações' },
  { value: 'misterio',    label: 'Mistérios' },
];

export function getCategoryMeta(category) {
  return CATEGORY_META[category] ?? {
    label: 'Desconhecida',
    color: '#9A9AA3',
  };
}
