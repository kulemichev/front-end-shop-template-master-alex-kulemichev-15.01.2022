const cartCounterLabel = document.querySelector('#cart-counter-label');
const contentContainer = document.querySelector('#content-container');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = (label, cn) => {
  const counter = cn + 1;

  label.innerHTML = `${counter}`;
  if (counter === 1) cartCounterLabel.style.display = 'block';

  return counter;
};

const getMockData = (t) => +t.parentElement.previousElementSibling.innerHTML
  .replace(/\$(\d+)\s\D+(\d+).*/, '$1.$2');

const getPrice = (t, c) => Math.round((c + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  t.disabled = true;
  contentContainer.removeEventListener('click', fn);
};
const enableControls = (t, fn) => {
  t.disabled = false;
  contentContainer.addEventListener('click', fn);
};

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;
  let restoreHTML = null;

  if (typeof target !== 'object') {
    console.error('target is not an object');

    return;
  }

  if (target.classList.contains('item-actions__cart')) {
    cartCounter = incrementCounter(cartCounterLabel, cartCounter);

    cartPrice = getPrice(target, cartPrice);

    restoreHTML = target.innerHTML;
    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

    disableControls(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      enableControls(target, btnClickHandler);
    }, interval);
  }
};

contentContainer.addEventListener('click', btnClickHandler);