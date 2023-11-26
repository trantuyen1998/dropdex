export const formatPrice = (arg: number) => {
  return arg.toLocaleString('en', {
    useGrouping: true,
    minimumFractionDigits: 2,
  });
};
