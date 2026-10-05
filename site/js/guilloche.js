/* ==========================================================================
   Guilloché — 3D rosette hero animation
   --------------------------------------------------------------------------
   Guilloché is the engine-turned engraving used on banknotes, share
   certificates and watch dials. It exists because it resists forgery —
   the visual language of authenticity, which is why it is the brand mark
   for a verification company.

   Canvas 2D by design. WebGL caps line width at 1px on most platforms,
   which would destroy the entire effect. Do not port this to Three.js.
   ========================================================================== */

export function initGuilloche(canvas, opts = {}) {
  if (!canvas) return null;

  const cfg = {
    curves:      opts.curves      ?? 26,
    petals:      opts.petals      ?? 7,
    segments:    opts.segments    ?? 340,
    radius:      opts.radius      ?? 1,
    amplitude:   opts.amplitude   ?? 0.30,
    depth:       opts.depth       ?? 0.26,
    drawMs:      opts.drawMs      ?? 3600,
    rotSpeed:    opts.rotSpeed    ?? 0.00058,
    innerSpeed:  opts.innerSpeed  ?? -0.00092,
    tilt:        opts.tilt        ?? -0.30,
    scale:       opts.scale       ?? 0.315,
    colour:      opts.colour      ?? '200,125,46',
    onComplete:  opts.onComplete  ?? null
  };

  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, DPR = 1;
  let rot = 0, rotInner = 0;
  let t0 = performance.now();
  let progress = 0;
  let completed = false;
  let rafId = null;

  /* ---- sizing ---------------------------------------------------------- */
  function resize() {
    const rect = canvas.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  /* ---- geometry -------------------------------------------------------- */
  function buildOuter() {
    const set = [];
    for (let i = 0; i < cfg.curves; i++) {
      const phase = (i / cfg.curves) * Math.PI * 2;
      const pts = [];
      for (let s = 0; s <= cfg.segments; s++) {
        const t = (s / cfg.segments) * Math.PI * 2;
        const r = cfg.radius + cfg.amplitude * Math.cos(cfg.petals * t + phase);
        pts.push({
          x: r * Math.cos(t),
          y: r * Math.sin(t),
          z: cfg.depth * Math.sin(cfg.petals * t + phase) + 0.10 * Math.cos(2 * t + phase)
        });
      }
      set.push(pts);
    }
    return set;
  }

  function buildInner() {
    const set = [];
    const N = 14, SEG = 220;
    for (let i = 0; i < N; i++) {
      const phase = (i / N) * Math.PI * 2;
      const pts = [];
      for (let s = 0; s <= SEG; s++) {
        const t = (s / SEG) * Math.PI * 2;
        const r = 0.42 + 0.13 * Math.cos(5 * t - phase);
        pts.push({
          x: r * Math.cos(t),
          y: r * Math.sin(t),
          z: 0.16 * Math.sin(5 * t - phase)
        });
      }
      set.push(pts);
    }
    return set;
  }

  let outer = buildOuter();
  let inner = buildInner();

  /* ---- projection ------------------------------------------------------ */
  function project(p, rotation) {
    const c = Math.cos(rotation), s = Math.sin(rotation);
    const x  = p.x * c - p.z * s;
    const z  = p.x * s + p.z * c;
    const ct = Math.cos(cfg.tilt), st = Math.sin(cfg.tilt);
    const y2 = p.y * ct - z * st;
    const z2 = p.y * st + z * ct;
    const f  = 2.9;
    const sc = f / (f + z2 + 1.5);
    return { x: x * sc, y: y2 * sc, d: z2 };
  }

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  /* ---- draw ------------------------------------------------------------ */
  function drawSet(set, rotation, cx, cy, radius, alphaMul, widthMul, prog) {
    set.forEach((pts, ci) => {
      const local = Math.max(0, Math.min(1, (prog * set.length * 1.5) - ci));
      if (local <= 0) return;

      const n = Math.floor(pts.length * easeOut(local));
      if (n < 2) return;

      for (let i = 0; i < n - 1; i++) {
        const a = project(pts[i], rotation);
        const b = project(pts[i + 1], rotation);
        const depth = (a.d + b.d) / 2;
        const front = Math.max(0.06, Math.min(1, 1 - (depth + 0.55) / 1.4));

        ctx.beginPath();
        ctx.moveTo(cx + a.x * radius, cy + a.y * radius);
        ctx.lineTo(cx + b.x * radius, cy + b.y * radius);
        ctx.strokeStyle = `rgba(${cfg.colour},${(0.055 + 0.30 * front * front) * alphaMul})`;
        ctx.lineWidth = (0.32 + 0.62 * front) * widthMul;
        ctx.stroke();
      }
    });
  }

  function drawTicks(cx, cy, radius, prog) {
    const N = 72;
    for (let i = 0; i < N; i++) {
      if (i / N > prog) continue;
      const a = (i / N) * Math.PI * 2 - Math.PI / 2;
      const major = i % 6 === 0;
      const r1 = radius * 1.30;
      const r2 = radius * (major ? 1.365 : 1.345);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.strokeStyle = major ? `rgba(${cfg.colour},.42)` : 'rgba(20,20,20,.13)';
      ctx.lineWidth = major ? 0.9 : 0.55;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.30, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2);
    ctx.strokeStyle = 'rgba(20,20,20,.10)';
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  /* ---- loop ------------------------------------------------------------ */
  function frame(now) {
    const elapsed = now - t0;
    ctx.clearRect(0, 0, W, H);

    progress = reduced ? 1 : Math.min(1, elapsed / cfg.drawMs);

    if (!reduced) {
      rot += cfg.rotSpeed;
      rotInner += cfg.innerSpeed;
    }

    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * cfg.scale;
    const breathe = reduced ? 1 : 1 + Math.sin(now * 0.00034) * 0.008;

    drawTicks(cx, cy, radius, Math.min(1, progress * 1.4));
    drawSet(outer, rot, cx, cy, radius * breathe, 1, 1, progress);
    drawSet(inner, rotInner, cx, cy, radius * breathe, 0.82, 0.9,
            Math.max(0, progress * 1.25 - 0.25));

    if (!completed && progress >= 1) {
      completed = true;
      if (cfg.onComplete) cfg.onComplete();
    }

    rafId = requestAnimationFrame(frame);
  }

  /* ---- api ------------------------------------------------------------- */
  function replay() {
    t0 = performance.now();
    progress = 0;
    completed = false;
  }

  function setDensity(curves, petals) {
    cfg.curves = curves;
    cfg.petals = petals;
    outer = buildOuter();
    inner = buildInner();
    replay();
  }

  function destroy() {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
  }

  /* ---- init ------------------------------------------------------------ */
  window.addEventListener('resize', resize);
  resize();
  // Second pass after fonts/layout settle
  setTimeout(resize, 120);
  rafId = requestAnimationFrame(frame);

  return { replay, setDensity, destroy, resize };
}
