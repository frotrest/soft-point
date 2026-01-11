document.addEventListener('DOMContentLoaded', () => {
  const range = document.getElementById('rangeInput');
  const tooltip = document.getElementById('priceValue');
  const priceText = tooltip?.querySelector('.price-text');
  const container = range?.parentElement;

  function updateTooltip() {
    if (!range || !tooltip || !priceText || !container) return;

    const value = range.value;
    priceText.textContent = `$${value}`;

    const percent = (value - range.min) / (range.max - range.min);

    const rangeRect = range.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;

    const thumbWidth = parseFloat(getComputedStyle(range).getPropertyValue('--thumb-size')) || 20;

    const offsetInsideRange = percent * (rangeRect.width - thumbWidth) + thumbWidth / 2;

    const centerX = rangeRect.left - containerRect.left + offsetInsideRange;

    let left = centerX;

    const minLeft = tooltipWidth / 2;
    const maxLeft = containerRect.width - tooltipWidth / 2;
    left = Math.max(minLeft, Math.min(maxLeft, left));

    tooltip.style.left = `${left}px`;
  }

  range?.addEventListener('input', () => {
    requestAnimationFrame(updateTooltip);
  });

  window.addEventListener('resize', updateTooltip);

  updateTooltip();
  try {
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animation = entry.target.dataset.animate;
            entry.target.classList.add('animate__animated', `animate__${animation}`);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } catch (error) {
    console.error('Ошибка с анимациями:', error);
  }
});
