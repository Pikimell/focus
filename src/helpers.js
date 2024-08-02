export function createCard({ value, suit }, angle = 0) {
  angle = Math.floor(angle);
  const isRed = suit === MAST.BUBA || suit === MAST.CHIRVA;
  return `
  <div class="card ${isRed ? "red" : ""}" style="top:${angle * 40}px">
    <div class="top-card">
      <div class="card-value">${value}</div>
      <div class="card-suit">${suit}</div>
    </div>

    <div class="bot-card">
      <div class="card-value">${value}</div>
      <div class="card-suit">${suit}</div>
    <div>
    </div>
  `;
}
export function transformArr(arr) {
  arr = [...arr];
  for (let i = 0; i < 100; i++) {
    const x = Math.round(Math.random() * (arr.length - 1));
    const y = Math.round(Math.random() * (arr.length - 1));
    [arr[x], arr[y]] = [arr[y], arr[x]];
  }
  return arr;
}
export const MAST = {
  PIKA: "♠",
  CHIRVA: "♥",
  BUBA: "♦",
  HRESTA: "♣",
};
