/* ==========================================================================
   Page shell — nav, footer, head. Every page is built from this.
   Depth 0 = root, 1 = /about/, 2 = /resources/blog/
   ========================================================================== */

const up = d => d === 0 ? '' : '../'.repeat(d);

// ── NAV ────────────────────────────────────────────────────────────────────
const NAV = [
  { label: 'Home', href: 'index.html' },
  { label: 'About', items: [
    ['about/index.html',           'About StartiQOS',      'What we are and why we exist'],
    ['about/mission.html',         'Our Mission',          'Bounded AI, proven work'],
    ['about/team.html',            'Core Team',            'The four who started it'],
    ['about/how-we-work.html',     'How We Work',          'Our method and principles'],
    ['about/what-we-dont-do.html', 'What We Don\u2019t Do','Our stated limits']
  ]},
  { label: 'Platform', items: [
    ['platform/index.html',                'Control Plane Overview',      'How it sits in your stack'],
    ['platform/least-privilege.html',      'Least-Privilege Enforcement', 'Ninety-four permissions to six'],
    ['platform/composition-analysis.html', 'Composition Analysis',        'Safe alone, dangerous together'],
    ['platform/delegation-control.html',   'Delegation Control',          'Authority narrows, never widens'],
    ['platform/provenance.html',           'Provenance &amp; Taint',      'Untrusted data shrinks authority'],
    ['platform/runtime-verification.html', 'Runtime Verification',        'Allow, escalate, or deny']
  ]},
  { label: 'Services', items: [
    ['services/index.html',                        'All Services',                'Implementation, with stated limits'],
    ['services/verified-knowledge-systems.html',   'Verified Knowledge Systems',  'Retrieval that cites its sources'],
    ['services/department-transformation.html',    'Department Transformation',   'One department, stated ceiling'],
    ['services/enterprise-transformation.html',    'Enterprise Transformation',   'Sequenced across departments']
  ]},
  { label: 'Industries', wide: true, items: [
    ['industries/ai-native-companies.html',  'AI-Native Companies',     'Agents already in production'],
    ['industries/enterprise-it.html',        'Enterprise IT',           'Many projects, no governance layer'],
    ['industries/regulated-industries.html', 'Regulated Industries',    'Documented governance required'],
    ['industries/healthcare.html',           'Healthcare',              'Patient data and agent access'],
    ['industries/b2b-saas.html',             'B2B SaaS',                'Agents touching customer data'],
    ['industries/marketplaces-d2c.html',     'Marketplaces &amp; D2C',  'Support and operations at volume'],
    ['industries/agencies.html',             'Agencies',                'Delivering AI for clients'],
    ['industries/startups.html',             'Startups',                'AI-native from day one'],
    ['industries/smes.html',                 'SMEs',                    'First AI systems, done properly']
  ]},
  { label: 'Resources', items: [
    ['resources/blog/index.html',          'Blog',           'Research and engineering notes'],
    ['resources/documentation/index.html', 'Documentation',  'Integration and reference'],
    ['resources/case-studies/index.html',  'Case Studies',   'Published with client permission'],
    ['resources/faq.html',                 'FAQ',            'Common questions, answered plainly']
  ]},
  { label: 'Careers', href: 'careers.html' },
  { label: 'Contact', href: 'contact.html' }
];

const CHEV = '<svg class="nav__chev" viewBox="0 0 8 8" fill="none"><path d="M1 3l3 3 3-3" stroke="currentColor" stroke-width="1.2"/></svg>';

function nav(d) {
  const p = up(d);
  const li = NAV.map(item => {
    if (item.href) {
      return `    <li class="nav__item"><a href="${p}${item.href}" class="nav__link">${item.label}</a></li>`;
    }
    const links = item.items.map(([href, title, desc]) =>
      `        <a class="nav__drop-link" href="${p}${href}"><span><span class="nav__drop-title">${title}</span><span class="nav__drop-desc">${desc}</span></span></a>`
    ).join('\n');
    return `    <li class="nav__item" data-nav-item data-open="false">
      <button class="nav__link" data-nav-trigger aria-expanded="false">${item.label}${CHEV}</button>
      <div class="nav__drop${item.wide ? ' nav__drop--wide' : ''}">
${links}
      </div>
    </li>`;
  }).join('\n');

  return `<nav class="nav" data-nav aria-label="Main navigation">
  <a href="${p}index.html" class="nav__brand">StartiQOS <span>AI</span></a>
  <ul class="nav__menu">
${li}
  </ul>
  <div class="nav__actions">
    <a href="${p}login.html" class="btn btn--ghost btn--sm">Log in</a>
    <a href="${p}console.html" class="btn btn--gold btn--sm">Open Control Plane</a>
    <button class="nav__toggle" data-nav-toggle aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function footer(d) {
  const p = up(d);
  const col = (title, links) =>
    `      <div>
        <p class="footer__col-title">${title}</p>
${links.map(([h, t]) => `        <a class="footer__link" href="${p}${h}">${t}</a>`).join('\n')}
      </div>`;

  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__top">
      <div>
        <p class="footer__brand">StartiQOS <span>AI</span></p>
        <p class="footer__blurb">Software that bounds what AI can do. Engineering that proves what it did.</p>
        <p class="footer__loc">Chandigarh, India \u00b7 Working globally</p>
        <div class="footer__social">
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="X">X</a>
          <a href="#" aria-label="GitHub">\u25ce</a>
        </div>
      </div>
${col('Platform', [
  ['platform/index.html', 'Control Plane Overview'],
  ['platform/least-privilege.html', 'Least-Privilege Enforcement'],
  ['platform/composition-analysis.html', 'Composition Analysis'],
  ['platform/delegation-control.html', 'Delegation Control'],
  ['platform/provenance.html', 'Provenance &amp; Taint'],
  ['platform/runtime-verification.html', 'Runtime Verification']
])}
${col('Services', [
  ['services/verified-knowledge-systems.html', 'Verified Knowledge Systems'],
  ['services/department-transformation.html', 'Department Transformation'],
  ['services/enterprise-transformation.html', 'Enterprise Transformation'],
  ['services/index.html', 'All Services']
])}
${col('Industries', [
  ['industries/ai-native-companies.html', 'AI-Native Companies'],
  ['industries/enterprise-it.html', 'Enterprise IT'],
  ['industries/regulated-industries.html', 'Regulated Industries'],
  ['industries/healthcare.html', 'Healthcare'],
  ['industries/b2b-saas.html', 'B2B SaaS']
])}
${col('Company', [
  ['about/index.html', 'About'],
  ['about/mission.html', 'Mission'],
  ['about/team.html', 'Core Team'],
  ['about/how-we-work.html', 'How We Work'],
  ['about/what-we-dont-do.html', 'What We Don\u2019t Do'],
  ['careers.html', 'Careers']
])}
${col('Resources', [
  ['resources/blog/index.html', 'Blog'],
  ['resources/documentation/index.html', 'Documentation'],
  ['resources/case-studies/index.html', 'Case Studies'],
  ['resources/faq.html', 'FAQ'],
  ['contact.html', 'Contact']
])}
    </div>
    <div class="footer__bottom">
      <span>\u00a9 2026 StartiQOS AI \u2014 All rights reserved.</span>
      <span class="footer__legal">
        <a href="${p}legal/privacy.html">Privacy</a>
        <a href="${p}legal/terms.html">Terms</a>
        <a href="${p}legal/security.html">Security</a>
      </span>
    </div>
  </div>
</footer>`;
}

// ── PAGE SHELL ─────────────────────────────────────────────────────────────
function page({ depth = 0, title, desc, keywords = '', canonical = '', extraCss = '', body, schema = '' }) {
  const p = up(depth);
  const css = ['reset','variables','typography','global','navbar','buttons',
               'components','sections','footer','animations']
    .map(f => `<link rel="stylesheet" href="${p}css/${f}.css">`).join('\n')
    + `\n<link rel="stylesheet" href="${p}css/pages/home.css">`
    + `\n<link rel="stylesheet" href="${p}css/premium.css">`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${title}</title>
<meta name="description" content="${desc}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
<link rel="canonical" href="https://startiqosai.com/${canonical}">

<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="https://startiqosai.com/assets/img/og-cover.png">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${p}favicon.ico">
<link rel="manifest" href="${p}site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

${css}

${schema}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="grain" aria-hidden="true"></div>

${nav(depth)}

<main id="main">
${body}
</main>

${footer(depth)}

<script type="module" src="${p}js/main.js"></script>
</body>
</html>`;
}

// ── SECTION BUILDERS ───────────────────────────────────────────────────────
const secHead = (eyebrow, h, hAccent, lead, note, tag = 'h1') => `
    <div class="sec-head">
      <p class="eyebrow rv">${eyebrow}</p>
      <${tag} class="rv">${h}${hAccent ? ` <em class="accent">${hAccent}</em>` : ''}</${tag}>
      <p class="lead rv">${lead}${note ? ' ' + note : ''}</p>
    </div>`;

const rows = items => `
    <div class="rows">
${items.map(([n, t, b]) => `      <div class="row rv">
        <p class="row__num">${n}</p>
        <h3 class="row__title">${t}</h3>
        <p class="row__body">${b}</p>
      </div>`).join('\n')}
    </div>`;

const causes = items => `
    <div class="grid-3--open rv-stagger">
${items.map(([label, title, body, answer]) => `      <article class="cause">
        <p class="cause__label">${label}</p>
        <h3 class="cause__title">${title}</h3>
        <p class="cause__body">${body}</p>
        ${answer ? `<p class="cause__answer">${answer}</p>` : ''}
      </article>`).join('\n')}
    </div>`;

const note = (strong, text, plain = false) =>
  `    <div class="note${plain ? ' note--plain' : ''} rv"><strong>${strong}</strong> ${text}</div>`;

const cta = (title, accent, sub, primary, secondary) => `
<section class="section--alt cta">
  <div class="wrap">
    <h2 class="cta__title rv">${title}<br><em class="accent">${accent}</em></h2>
    <p class="cta__sub rv">${sub}</p>
    <div class="cta__actions rv">
      <a class="btn btn--primary" href="${primary[1]}">${primary[0]} <span class="btn__arrow">&rarr;</span></a>
      <a class="btn btn--ghost" href="${secondary[1]}">${secondary[0]}</a>
    </div>
  </div>
</section>`;

module.exports = { page, nav, footer, secHead, rows, causes, note, cta, up };
