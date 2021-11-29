export function formatThousandNumber(val) {
  if (val > 999) {
    return (val / 1000).toFixed(1) + 'k';
  }
  return val;
}
