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

const animatedElements = document.querySelectorAll("[data-animate]");

document.addEventListener("DOMContentLoaded", () => {
  try {
  const animatedElements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof Element) {
          const animation = entry.target.dataset.animate;
          entry.target.classList.add("animate__animated", `animate__${animation}`);
          observer.unobserve(entry.target);
        }
    })
  }, {
    root: null,
    threshold: 0.1,
  })

  animatedElements.forEach(el => {
    observer.observe(el);
  })    
  } catch (error) {
    console.log(`Ошибка с анимациями: ${error}`);
  }
});