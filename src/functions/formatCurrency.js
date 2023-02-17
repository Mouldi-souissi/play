export const formatCurrency = (value) => {
  return Number(value).toLocaleString("fr", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 0,
  });
};
