export const parseMoney = (value: number) => {
  return 'R$ ' + value.toFixed(2).replaceAll('.', ',');
};
