/* ==========================================================================
   Premium interactions
   Tilt, parallax, scroll progress, counters, meters, terminal typing.
   All of it degrades to nothing if the elements are absent.
   ========================================================================== */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse  = window.matchMedia('(hover: none)').matches;

/* ---- Scroll progress ----------------------------------------------------- */
function progress() {
  const bar = document.createElement('div');
  bar.className = 'progress';
  document.body.appendChild(bar);

  let raf = null;
  const draw = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
    raf = null;
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  draw();
}

/* ---- 3D tilt -------------------------------------------------------------
   Pointer-driven rotation with a hard cap. Anything past ~7deg stops
   reading as depth and starts reading as a gimmick.
   ------------------------------------------------------------------------- */
function tilt() {
  if (reduced || coarse) return;
  const MAX = 6.5;

  document.querySelectorAll('[data-tilt]').forEach(el => {
    let raf = null, rx = 0, ry = 0;

    const apply = () => {
      el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = null;
    };

    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width  - .5;
      const py = (e.clientY - r.top)  / r.height - .5;
      ry =  px * MAX * 2;
      rx = -py * MAX * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    });

    el.addEventListener('pointerleave', () => {
      rx = ry = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  });
}

/* ---- Parallax ------------------------------------------------------------
   Small translations only. Large ones cause the element to detach
   visually from the copy beside it.
   ------------------------------------------------------------------------- */
function parallax() {
  if (reduced || coarse) return;
  const items = [...document.querySelectorAll('[data-par]')];
  if (!items.length) return;

  let raf = null;
  const draw = () => {
    const vh = window.innerHeight;
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const depth = parseFloat(el.dataset.par) || .06;
      const mid = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-mid * depth).toFixed(2)}px, 0)`;
    });
    raf = null;
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  addEventListener('resize', draw, { passive: true });
  draw();
}

/* ---- Counters ------------------------------------------------------------ */
function counters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const run = el => {
    const target = parseFloat(el.dataset.count);
    const dp = (el.dataset.count.split('.')[1] || '').length;
    if (reduced) { el.textContent = target.toFixed(dp); return; }

    const dur = 1300, t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dp);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      run(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: .6 });

  els.forEach(el => io.observe(el));
}

/* ---- Meters -------------------------------------------------------------- */
function meters() {
  const els = document.querySelectorAll('[data-meter]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.meter + '%';
      obs.unobserve(e.target);
    });
  }, { threshold: .5 });

  els.forEach(el => io.observe(el));
}

/* ---- Terminal -----------------------------------------------------------
   Lines appear in sequence once the block scrolls into view. Not a
   character-by-character typewriter — that reads as decoration and
   makes the content slow to read.
   ------------------------------------------------------------------------- */
function terminal() {
  const blocks = document.querySelectorAll('[data-term]');
  if (!blocks.length) return;

  const play = block => {
    const lines = block.querySelectorAll('.term__line');
    if (reduced) { lines.forEach(l => l.classList.add('is-in')); return; }
    lines.forEach((l, i) => {
      setTimeout(() => l.classList.add('is-in'), i * 110);
    });
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      play(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: .35 });

  blocks.forEach(b => io.observe(b));
}

/* ---- Reveal -------------------------------------------------------------
   Replaces the older observer so thresholds stay consistent with the
   longer transitions in premium.css.
   ------------------------------------------------------------------------- */
function reveal() {
  const els = document.querySelectorAll('.rv, .rv-stagger');
  if (!els.length) return;

  if (reduced) { els.forEach(e => e.classList.add('is-visible')); return; }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      obs.unobserve(e.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });

  els.forEach(el => io.observe(el));
}

export function initPremium() {
  progress();
  reveal();
  tilt();
  parallax();
  counters();
  meters();
  terminal();
  sectionIndex();
}
/* ---- Section index ------------------------------------------------------
   The numeral and hairline are CSS pseudo-elements, so they need a class
   toggled on the parent to animate in with the rest of the section.
   ------------------------------------------------------------------------- */
function sectionIndex() {
  const heads = document.querySelectorAll('.sec-head:not(.sec-head--stack)');
  if (!heads.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-lit');
      obs.unobserve(e.target);
    });
  }, { threshold: .25 });

  heads.forEach(h => io.observe(h));
}