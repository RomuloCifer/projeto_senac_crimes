export const CATEGORY_META = {
  crime: {
    label: 'Crime',
    color: '#8B0000',
  },
  lenda: {
    label: 'Lenda',
    color: '#7D4EFF',
  },
  assombracao: {
    label: 'Assombração',
    color: '#7C8CFF',
  },
  misterio: {
    label: 'Mistério',
    color: '#C9A227',
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
