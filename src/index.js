const range = document.getElementById('rangeInput');
const tooltip = document.getElementById('priceValue');
const priceText = tooltip.querySelector('.price-text');

function updateTooltip() {
  const value = range.value;
  priceText.textContent = `$${value}`;

  const percent = (value - range.min) / (range.max - range.min);
  const offset = percent * range.offsetWidth;

  tooltip.style.left = `${offset}px`;
}

range.addEventListener('input', () => {
  requestAnimationFrame(updateTooltip);
});

window.addEventListener("DOMContentLoaded", updateTooltip);