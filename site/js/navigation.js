/* ==========================================================================
   Navigation — sticky, dropdowns, mobile menu
   ========================================================================== */

export function initNavigation() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  /* ---- sticky on scroll ------------------------------------------------ */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-stuck', window.scrollY > 50);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- dropdowns ------------------------------------------------------- */
  const items = [...nav.querySelectorAll('[data-nav-item]')];
  const isMobile = () => window.innerWidth <= 1100;

  function closeAll(except) {
    items.forEach(item => {
      if (item === except) return;
      item.dataset.open = 'false';
      const trigger = item.querySelector('[data-nav-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  items.forEach(item => {
    const trigger = item.querySelector('[data-nav-trigger]');
    if (!trigger) return;

    trigger.addEventListener('click', e => {
      e.preventDefault();
      const open = item.dataset.open === 'true';
      closeAll(item);
      item.dataset.open = open ? 'false' : 'true';
      trigger.setAttribute('aria-expanded', String(!open));
    });

    // Desktop hover
    item.addEventListener('mouseenter', () => {
      if (isMobile()) return;
      closeAll(item);
      item.dataset.open = 'true';
      trigger.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', () => {
      if (isMobile()) return;
      item.dataset.open = 'false';
      trigger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) closeAll(null);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAll(null);
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });

  /* ---- mobile toggle --------------------------------------------------- */
  const toggle = nav.querySelector('[data-nav-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (!open) closeAll(null);
    });
  }

  /* ---- close mobile menu on resize to desktop -------------------------- */
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      if (!isMobile()) {
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
        closeAll(null);
      }
    }
  });
}
