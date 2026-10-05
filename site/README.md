# StartiQOS AI — Website

Full static site. 40 pages, no build step required to serve.

## Positioning

**One product** — Agent Authority Control Plane
**Three services** — Verified Knowledge Systems, Department Transformation,
Enterprise Transformation

Tagline: *Every Permission Earned. Every Action Proven.*

The five-product platform (Idea Validation, Specification, Assumption,
Verification, Credential) is retired.

## Structure

```
index.html            homepage — 9 sections
console.html          control plane demo, representative data
login.html  contact.html  careers.html  404.html

about/        5 pages
platform/     6 pages — control plane and its five layers
services/     4 pages
industries/   9 pages
resources/    blog (3 posts) · documentation · case-studies · faq
legal/        privacy · terms · security

css/          design system
  pages/home.css   all page-specific CSS, one file
js/           unchanged
_build/       generators — regenerate pages from content models
```

## Regenerating

Pages are generated from `_build/*.js` so nav and footer stay in sync.
Edit the content model, then:

```
node _build/gen-platform.js
node _build/gen-services.js
node _build/gen-about.js
node _build/gen-industries.js
node _build/gen-resources.js
node _build/gen-root.js
```

`index.html` is hand-maintained; the generators do not touch it.

Nav and footer live in `_build/layout.js`. Change them there, re-run all
generators, and every page updates. Editing nav in one HTML file by hand
will desynchronise it from the other thirty-nine.

## CSS ownership — do not duplicate

| Component | Owned by |
|---|---|
| `.hero`, `.stage` | sections.css |
| `.row`, `.stat`, `.acc`, `.card` | components.css |
| `.cause` | sections.css, extended in home.css |
| `.ceiling`, `.note`, `.ind`, `.codeblock` | home.css |
| `.sec-head` | home.css — single stacked block, no columns |
| `.cons*`, `.pill*`, `.cpath` | home.css |
| `.postcard`, `.post__*`, `.prose` | home.css |
| `.contact*`, `.auth*`, `.legal*`, `.person*` | home.css |

Redefining a component in home.css breaks the layout. `.row` in
components.css is a three-column grid (`64px 1fr 1.2fr`); overriding it to
two columns collapses the body text into a narrow strip.

## JS hooks every page must carry

- Nav: `data-nav`, `data-nav-item`, `data-nav-trigger`, `data-nav-toggle`
- Hero (homepage only): `data-hero-eyebrow`, `data-hero-line-1..3`,
  `data-hero-sub`, `data-hero-emph`, `data-hero-rule`, `data-hero-actions`,
  `data-hero-trust`
- Guilloché: `data-guilloche` on the canvas, `data-stage-plate`, `data-stage-cap`
- Accordion: `data-acc-group`, `data-acc-item`, `data-acc-trigger`, `data-acc-panel`
- Forms: `data-form`, `data-form-status`
- Reveal: `.rv` for single elements, `.rv-stagger` on a parent

## SEO / AEO

- Per-page title, description, keywords, canonical, Open Graph
- `FAQPage` schema on the homepage and `resources/faq.html`
- `BlogPosting` schema on every post
- `Organization` schema on the homepage
- `sitemap.xml` regenerated from the file tree

The FAQ answers are written as direct-answer blocks because that is the
format AI answer engines extract.

## Claims that need evidence before launch

| Claim | Where | Status |
|---|---|---|
| Autonomy ceiling figures | services, homepage | Labelled as estimates, not benchmarks |
| CVE-2025-6514, CVSS 9.6 | homepage stats | Verifiable, keep |
| 88% of pilots never reach production | homepage, mission | Cited to industry reporting |
| 40% cancelled by 2027 | homepage stats | Gartner |
| Sub-millisecond decisions | throughout | Our own measurement, publish the benchmark |
| 1,454 tests passing | not currently on site | Add only with a public CI link |

The "no production deployment yet" disclosure appears on about/index,
about/team, resources/faq and contact. Do not remove it before it is true.

## Local development

```
python3 -m http.server 8899
```

Must be served over HTTP. ES modules will not load over `file://`.

## Before going live

- [ ] Replace `assets/img/team/*.jpg` with real photographs
- [ ] Add LinkedIn URLs on about/team.html
- [ ] Configure EmailJS keys in js/emailjs-integration.js
- [ ] Replace favicon.ico with a real icon
- [ ] Add assets/img/og-cover.png (1200×630)
- [ ] Self-host fonts rather than the Google CDN
- [ ] Point contact form at a real endpoint


## Section headers

`.sec-head` is a single stacked block: eyebrow, heading, one lead paragraph.

It was previously a two-column grid with a second "note" paragraph in the
right column. That layout bottom-aligned the heading against dead space and
the second paragraph read as filler. Both are gone; the note text was merged
into the lead where it added anything.

If you regenerate pages, `secHead()` in `_build/layout.js` still accepts a
`note` argument and appends it to the lead. Pass an empty string to omit it.

---

## Premium layer

`css/premium.css` and `js/premium.js` sit on top of the base design system.
They load last on every page, so they win without `!important`.

### What they add

| | |
|---|---|
| Dark product surfaces | `.section--void`, `.term`, `.cons`, `.codeblock`, footer |
| Depth | Four shadow levels, `--lift-1` to `--lift-4` |
| 3D tilt | `data-tilt` on any card. Capped at 6.5°, disabled on touch |
| Parallax | `data-par="0.04"` — small values only |
| Counters | `data-count="88"` on a span inside `.stat__num` |
| Meters | `data-meter="64"` on `.meter__fill` |
| Terminal | `data-term` on the block, `.term__line` on each line |
| Scroll progress | Injected automatically, no markup needed |

### Rules

**Tilt stays under 7 degrees.** Past that it reads as a gimmick rather than
depth, and it fights with text legibility.

**Parallax values stay under 0.08.** Larger values detach the element from
the copy beside it, which looks broken rather than dynamic.

**Everything degrades.** `prefers-reduced-motion` disables all of it.
`hover: none` disables tilt, because on touch it competes with scrolling.

### Dark sections

Use `.section--void` for anything showing the product. Keep cream for
narrative and company pages. The contrast is the point — a page that is
dark throughout loses the distinction between story and system.

## Blog

Two published articles, both by Shashwat Sharma:

- `stop-blaming-your-security-team` — 6 September 2026
- `access-control-gap-ai-native` — 24 August 2026

Add new posts to the `POSTS` array in `_build/gen-blog.js` and re-run it.
The index and the cross-links between posts regenerate from that array.
