/* ==========================================================================
   Accordion — FAQ and expandable sections
   ========================================================================== */

export function initAccordion() {
  const items = document.querySelectorAll('[data-acc-item]');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('[data-acc-trigger]');
    const panel = item.querySelector('[data-acc-panel]');
    if (!trigger || !panel) return;

    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', () => {
      const open = item.dataset.open === 'true';

      // Close siblings within the same group
      const group = item.closest('[data-acc-group]');
      if (group && !open) {
        group.querySelectorAll('[data-acc-item]').forEach(sib => {
          if (sib === item) return;
          sib.dataset.open = 'false';
          const sp = sib.querySelector('[data-acc-panel]');
          const st = sib.querySelector('[data-acc-trigger]');
          if (sp) sp.style.maxHeight = null;
          if (st) st.setAttribute('aria-expanded', 'false');
        });
      }

      item.dataset.open = open ? 'false' : 'true';
      trigger.setAttribute('aria-expanded', String(!open));
      panel.style.maxHeight = open ? null : panel.scrollHeight + 'px';
    });
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    document.querySelectorAll('[data-acc-item][data-open="true"]').forEach(item => {
      const panel = item.querySelector('[data-acc-panel]');
      if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });
}
