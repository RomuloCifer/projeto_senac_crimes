export const CATEGORY_META = {
  crime: {
    label: 'Crimes',
    color: '#f2484b',
  },
  lenda: {
    label: 'Lendas',
    color: '#7c4dff',
  },
  assombracao: {
    label: 'Assombracoes',
    color: '#8dd8ff',
  },
  misterio: {
    label: 'Misterios',
    color: '#ffc947',
  },
};

export const FILTERS = [
  { value: 'todos', label: 'Todos' },
  { value: 'crime', label: 'Crimes' },
  { value: 'lenda', label: 'Lendas' },
  { value: 'assombracao', label: 'Assombracoes' },
  { value: 'misterio', label: 'Misterios' },
];

export function getCategoryMeta(category) {
  return CATEGORY_META[category] ?? {
    label: 'Desconhecida',
    color: '#7a7f92',
  };
}
