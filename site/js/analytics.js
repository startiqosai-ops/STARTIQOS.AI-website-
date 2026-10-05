/* ==========================================================================
   Analytics
   --------------------------------------------------------------------------
   INTEGRATION POINT. Loads only after analytics consent is given.
   ========================================================================== */

const CONFIG = {
  provider: 'plausible',   // plausible | umami | ga4
  domain:   '',            // ← your domain
  scriptSrc:''             // ← analytics script URL
};

export function initAnalytics() {
  document.addEventListener('consent:analytics', load, { once: true });
}

function load() {
  if (!CONFIG.scriptSrc) {
    console.info('[StartiQOS] Analytics not configured.');
    return;
  }
  const s = document.createElement('script');
  s.defer = true;
  s.src = CONFIG.scriptSrc;
  if (CONFIG.domain) s.setAttribute('data-domain', CONFIG.domain);
  document.head.appendChild(s);
}

export function track(event, props = {}) {
  if (window.plausible) window.plausible(event, { props });
}
