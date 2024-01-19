export const formatNumber = (number, decimalPlaces = 2) => {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(number);
    return formatted;
  };
  