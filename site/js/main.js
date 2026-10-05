/* ==========================================================================
   StartiQOS AI — Main entry point
   Every module is imported here. Nothing self-initialises.
   ========================================================================== */

import { initNavigation }               from './navigation.js';
import { initScrollReveal, revealHero } from './scroll-reveal.js';
import { initCounters }                 from './counters.js';
import { initAccordion }                from './accordion.js';
import { initForms }                    from './forms.js';
import { initCookieConsent }            from './cookie-consent.js';
import { initAnalytics }                from './analytics.js';
import { initEmailJS }                  from './emailjs-integration.js';
import { initGuilloche }                from './guilloche.js';
import { initPremium }                  from './premium.js';

/* ---- Boot -------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  // Site-wide
  initNavigation();
  initPremium();
  initCounters();
  initAccordion();
  initForms();
  initCookieConsent();
  initAnalytics();
  initEmailJS();

  // Homepage hero
  const canvas = document.querySelector('[data-guilloche]');
  if (canvas) {
    const rosette = initGuilloche(canvas, {
      onComplete: () => {
        document.querySelector('[data-stage-plate]')?.classList.add('is-visible');
        document.querySelector('[data-stage-cap]')?.classList.add('is-visible');
      }
    });

    // Optional dev controls
    document.querySelector('[data-guilloche-replay]')
      ?.addEventListener('click', () => rosette.replay());
  }

  // Hero copy sequence — staggered, slow, no bounce
  revealHero([
    ['[data-hero-eyebrow]',  400],
    ['[data-hero-line-1]',   620],
    ['[data-hero-line-2]',   740],
    ['[data-hero-line-3]',   860],
    ['[data-hero-sub]',     1120],
    ['[data-hero-emph]',    1240],
    ['[data-hero-rule]',    1340],
    ['[data-hero-actions]', 1420],
    ['[data-hero-trust]',   1580]
  ]);

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Mark JS as active for progressive enhancement
  document.documentElement.classList.add('js');
});
