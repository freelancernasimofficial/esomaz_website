const getCompactNumber = (n: number) => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(n);
};

export default getCompactNumber;
