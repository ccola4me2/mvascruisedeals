// What a guest saves on one cabin: the direct price minus my price, both given
// as "$1,950.00" strings. Works in whole cents so the result is always exact,
// and always shows cents ($332.10, never $332). Returns "" if either price
// cannot be read or the direct price is not higher.
const cents = (s) => {
  const n = Math.round(parseFloat(String(s).replace(/[^0-9.]/g, "")) * 100);
  return Number.isFinite(n) ? n : null;
};

export function youSave(direct, ours) {
  const d = cents(direct);
  const o = cents(ours);
  if (d === null || o === null || d <= o) return "";
  const diff = d - o;
  const dollars = Math.floor(diff / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + dollars + "." + String(diff % 100).padStart(2, "0");
}
