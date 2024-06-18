const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export function getMonth(date: string) {
  try {
    return months[new Date(date).getMonth()];
  } catch (e) {
    return 'mês desconhecido';
  }
}
