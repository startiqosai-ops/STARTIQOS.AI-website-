/* ==========================================================================
   Scroll reveal — intersection observer
   Elements marked .rv, .rv-stagger, .mask or .rule--draw reveal once.
   ========================================================================== */

export function initScrollReveal() {
  const targets = document.querySelectorAll('.rv, .rv-stagger, .mask, .rule--draw');
  if (!targets.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  targets.forEach(el => observer.observe(el));
}

/* ---- Sequenced reveal for the hero on page load ------------------------ */
export function revealHero(sequence = []) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sequence.forEach(([selector, delay]) => {
    const el = document.querySelector(selector);
    if (!el) return;
    setTimeout(() => el.classList.add('is-visible'), reduced ? 0 : delay);
  });
}
