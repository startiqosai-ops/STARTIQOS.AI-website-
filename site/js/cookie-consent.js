/* ==========================================================================
   Cookie consent
   ========================================================================== */

const KEY = 'startiqos-cookie-consent';

export function initCookieConsent() {
  const banner = document.querySelector('[data-cookie-banner]');
  if (!banner) return;

  const stored = localStorage.getItem(KEY);
  if (stored) { applyConsent(JSON.parse(stored)); return; }

  banner.hidden = false;

  banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
    save({ necessary: true, analytics: true });
    banner.hidden = true;
  });

  banner.querySelector('[data-cookie-reject]')?.addEventListener('click', () => {
    save({ necessary: true, analytics: false });
    banner.hidden = true;
  });
}

function save(consent) {
  localStorage.setItem(KEY, JSON.stringify(consent));
  applyConsent(consent);
}

function applyConsent(consent) {
  if (consent.analytics) {
    document.dispatchEvent(new CustomEvent('consent:analytics'));
  }
}

export function openCookiePreferences() {
  localStorage.removeItem(KEY);
  const banner = document.querySelector('[data-cookie-banner]');
  if (banner) banner.hidden = false;
}
