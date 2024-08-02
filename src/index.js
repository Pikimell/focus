import { createCard, MAST, transformArr } from './helpers';
const refs = {
  containerEl: document.querySelector('.js-container'),
  column_1: document.querySelector('.js-column[data-idx="1"]'),
  column_2: document.querySelector('.js-column[data-idx="2"]'),
  column_3: document.querySelector('.js-column[data-idx="3"]'),
  buttonsList: document.querySelector('.js-buttons'),
  modalEl: document.querySelector('.js-modal'),
};
const LEN = 9;
let ITERATION = 0;
let arr = createCol();
const intervalID = [];
function createCol() {
  const result = [];
  for (let i = 2; i <= 10; i++) {
    for (let mast of Object.values(MAST)) {
      const card = { value: i, suit: mast };
      result.push(card);
    }
  }
  return result;
}

function render(arr) {
  while (intervalID.length) clearTimeout(intervalID.pop());

  refs.column_1.innerHTML = '';
  refs.column_2.innerHTML = '';
  refs.column_3.innerHTML = '';
  arr.forEach((el, idx) => {
    const id = setTimeout(() => {
      const diff = idx % 3;
      const markup = createCard(el, idx / 3);
      refs[`column_${diff + 1}`].insertAdjacentHTML('beforeend', markup);
    }, 700 * idx);
    intervalID.push(id);
  });
}

function focus(column = 0) {
  if (ITERATION > 4) {
    return;
  }
  shakeArr(column);
  render(arr);
  ITERATION++;
  if (ITERATION === 4) {
    return renderResult();
  }
}
function init() {
  arr = transformArr(arr).slice(0, LEN * 3);
}

function renderResult() {
  const idx = Math.floor((LEN * 3) / 2);
  const markup = createCard(arr[idx]);
  showModal(markup);
}
refs.buttonsList.addEventListener('click', e => {
  if (e.target === e.currentTarget) return;
  const column = +e.target.dataset.idx;
  focus(column);
});

function shakeArr(column = 0) {
  const part1 = arr.filter((_, i) => i % 3 === 0);
  const part2 = arr.filter((_, i) => i % 3 === 1);
  const part3 = arr.filter((_, i) => i % 3 === 2);
  switch (column) {
    case 1:
      arr = [...part2, ...part1, ...part3];
      break;
    case 2:
      arr = [...part3, ...part2, ...part1];
      break;
    case 3:
      arr = [...part1, ...part3, ...part2];
      break;
  }
}
init();
focus();

function showModal(markup) {
  refs.modalEl.innerHTML = markup;
  document.body.classList.add('show-modal');
}

refs.modalEl.parentElement.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return;
  document.body.classList.remove('show-modal');
  reset();
});

function reset() {
  while (intervalID.length) clearTimeout(intervalID.pop());
  refs.column_1.innerHTML = '';
  refs.column_2.innerHTML = '';
  refs.column_3.innerHTML = '';
  ITERATION = 0;
  arr = createCol();
  init();
}
