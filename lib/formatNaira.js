export function formatNaira(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  const rounded = Math.round(Number(value));
  return `₦${rounded.toLocaleString('en-NG')}`;
}

export default formatNaira;
