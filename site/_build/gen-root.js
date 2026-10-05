const fs = require('fs');
const { page, secHead, rows, causes, note, cta } = require('./layout');
const W = (f, h) => { fs.writeFileSync(f, h); console.log('✓ ' + f); };

// ═══════════════════════════════════════════════ CONTACT ═══
W('contact.html', page({
  depth: 0, extraCss: 'home',
  title: 'Contact — Book a Shadow-Mode Pilot | StartiQOS AI',
  desc: 'Book a two-week shadow-mode pilot or a transformation audit. Chandigarh, India, working globally.',
  canonical: 'contact.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Contact', 'Two ways in.', 'Both start with measurement.',
  'A shadow-mode pilot for the control plane, or a transformation audit for a department. Neither requires a commitment to what follows.',
  'We answer technical questions from people evaluating the product whether or not they buy.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="contact">
      <div class="contact__form rv">
        <form data-form>
          <div class="field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" required>
          </div>
          <div class="field">
            <label for="email">Work email</label>
            <input id="email" name="email" type="email" required>
          </div>
          <div class="field">
            <label for="company">Company</label>
            <input id="company" name="company" type="text">
          </div>
          <div class="field">
            <label for="interest">What are you interested in</label>
            <select id="interest" name="interest">
              <option>Shadow-mode pilot — agent control plane</option>
              <option>Transformation audit — one department</option>
              <option>Verified knowledge system</option>
              <option>Technical question</option>
              <option>Something else</option>
            </select>
          </div>
          <div class="field">
            <label for="message">What are you trying to work out</label>
            <textarea id="message" name="message" rows="5" placeholder="How many agents, what they touch, and what prompted you to look."></textarea>
          </div>
          <button class="btn btn--primary" type="submit">Send <span class="btn__arrow">&rarr;</span></button>
          <p class="small" data-form-status role="status"></p>
        </form>
      </div>

      <aside class="contact__aside rv">
        <div class="contact__block">
          <p class="contact__k">Email</p>
          <p class="contact__v"><a href="mailto:info@startiqosai.com">info@startiqosai.com</a></p>
        </div>
        <div class="contact__block">
          <p class="contact__k">Location</p>
          <p class="contact__v">Chandigarh, India<br>Working globally</p>
        </div>
        <div class="contact__block">
          <p class="contact__k">Response time</p>
          <p class="contact__v">Within two working days. If it is a technical question, usually sooner.</p>
        </div>
        <div class="contact__block">
          <p class="contact__k">What happens next</p>
          <p class="contact__v">A thirty-minute call to understand what you are running. If a pilot makes sense we scope it on that call. If it does not, we will say so.</p>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('Before You Write', 'Three things', 'worth knowing.', 'Each of these saves a conversation.', '', 'h2')}
${causes([
  ['01', 'The Pilot Is Free',
   'Two weeks of shadow mode, no enforcement, no code changes beyond a configuration line. You keep the report whether or not you proceed.', ''],
  ['02', 'We Don\u2019t Hold SOC 2 Yet',
   'If your procurement requires it today, we are not currently a fit. We would rather tell you now than after a discovery call.', ''],
  ['03', 'No Production Deployment Yet',
   'The system works and the tests pass. It has not run in a customer\u2019s production environment. You would be the first, and the pricing reflects that.', '']
])}
  </div>
</section>
`
}));

// ═══════════════════════════════════════════════ CAREERS ═══
W('careers.html', page({
  depth: 0, extraCss: 'home',
  title: 'Careers — We Hire Rarely, and Slowly | StartiQOS AI',
  desc: 'Four people in Chandigarh building agent authority enforcement. We hire rarely and look for people who can say they do not know.',
  canonical: 'careers.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Careers', 'We hire rarely,', 'and slowly.',
  'Four people. When we add a fifth it will be because the work genuinely cannot be done without them, not because we raised money.',
  'We look for people who can say \u201cI don\u2019t know\u201d in a meeting, and who would rather be corrected than confident.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Open Roles', 'Nothing open', 'right now.',
  'This page is honest rather than aspirational. When a role opens it will be listed here with the actual scope and the actual compensation range.', '', 'h2')}
    <div class="prose rv">
      <p>If you are working on capability-based security, policy learning, or formal verification of authorisation systems, we would still like to hear from you. Not as a pipeline exercise \u2014 because those are small fields and the conversations are useful regardless.</p>
      <p>Write to <a href="mailto:info@startiqosai.com" class="post__link">info@startiqosai.com</a> with what you are working on.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('What It Is Like', 'Four people,', 'no management layer.',
  'Being accurate about this matters more than being appealing.', '', 'h2')}
${rows([
  ['01', 'The work is unglamorous',
   'Authorisation systems, policy formats, token verification, latency budgets. There is no model training and very little that demos well. The interesting part is the reasoning, not the surface.'],
  ['02', 'We have no customers yet',
   'Pre-revenue, self-funded, and honest about it on the website. If that is a dealbreaker it should be, and better now than in month three.'],
  ['03', 'Everyone does delivery',
   'There is no layer between building and shipping. The person who designs the policy format also debugs it at two in the morning when a pilot is running.'],
  ['04', 'Being wrong is normal',
   'We publish what we got wrong. Internally that means changing your position when someone shows you evidence is the expected behaviour, not an embarrassment.']
])}
  </div>
</section>
`
}));

// ═══════════════════════════════════════════════ LOGIN ═══
W('login.html', page({
  depth: 0, extraCss: 'home',
  title: 'Log in | StartiQOS AI',
  desc: 'Sign in to the StartiQOS agent authority control plane.',
  canonical: 'login.html',
  body: `
<section class="section auth">
  <div class="wrap wrap--narrow">
    <div class="auth__card rv">
      <p class="eyebrow">Control Plane</p>
      <h1 class="auth__title">Sign in</h1>

      <form data-form>
        <div class="field">
          <label for="email">Work email</label>
          <input id="email" name="email" type="email" required autocomplete="email">
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required autocomplete="current-password">
        </div>
        <button class="btn btn--primary" type="submit" style="width:100%;justify-content:center">
          Sign in <span class="btn__arrow">&rarr;</span>
        </button>
        <p class="small" data-form-status role="status"></p>
      </form>

      <p class="auth__alt">
        No account? <a href="contact.html" class="post__link">Book a shadow-mode pilot</a> \u2014 access is provisioned with the pilot.
      </p>
    </div>

    <p class="auth__note rv">
      The control plane runs inside your environment. This sign-in is for the hosted
      dashboard only; enforcement does not depend on it, and nothing stops working if
      this page is unreachable.
    </p>
  </div>
</section>
`
}));

// ═══════════════════════════════════════════════ CONSOLE ═══
W('console.html', page({
  depth: 0, extraCss: 'home',
  title: 'Control Plane — Agent Authority Console | StartiQOS AI',
  desc: 'The StartiQOS control plane console. Agent inventory, permission gaps, composition paths and the attestation ledger.',
  canonical: 'console.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('The Console', 'What you see', 'in shadow mode.',
  'The console is provisioned with a pilot. This is the interface, populated with representative data so you can assess it before committing.',
  'Everything below is a demonstration. Real deployments show your own agents, in your own environment, with enforcement disabled until you approve a policy.')}
  </div>
</section>

<section class="section--tight">
  <div class="wrap">

    <div class="cons rv">
      <div class="cons__bar">
        <span class="cons__dot"></span>
        <p class="cons__path">control-plane / overview</p>
        <span class="cons__mode">SHADOW MODE \u00b7 NO ENFORCEMENT</span>
      </div>

      <div class="cons__body">
        <div class="cons__stats">
          <div class="cstat"><p class="cstat__n">7</p><p class="cstat__l">Agents observed</p></div>
          <div class="cstat"><p class="cstat__n">94 <span class="cstat__to">&rarr;</span> 6</p><p class="cstat__l">Permissions held vs used</p></div>
          <div class="cstat"><p class="cstat__n">3</p><p class="cstat__l">Composition paths found</p></div>
          <div class="cstat"><p class="cstat__n">0.4<span class="cstat__u">ms</span></p><p class="cstat__l">Median decision</p></div>
        </div>

        <table class="cons__table">
          <thead>
            <tr><th>Agent</th><th>Task class</th><th>Held</th><th>Used</th><th>Max taint</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="mono">finance-reconciler-7</td><td>invoice_reconciliation</td>
              <td class="cons__num">94</td><td class="cons__num">6</td><td class="cons__num">2</td>
              <td><span class="pill pill--ready">Policy ready</span></td>
            </tr>
            <tr>
              <td class="mono">support-triage-2</td><td>ticket_triage</td>
              <td class="cons__num">41</td><td class="cons__num">9</td><td class="cons__num">3</td>
              <td><span class="pill pill--ready">Policy ready</span></td>
            </tr>
            <tr>
              <td class="mono">research-worker-1</td><td>vendor_lookup</td>
              <td class="cons__num">28</td><td class="cons__num">4</td><td class="cons__num">3</td>
              <td><span class="pill pill--ready">Policy ready</span></td>
            </tr>
            <tr>
              <td class="mono">orchestrator-1</td><td>multi</td>
              <td class="cons__num">112</td><td class="cons__num">14</td><td class="cons__num">1</td>
              <td><span class="pill pill--learn">Learning \u00b7 8 days</span></td>
            </tr>
            <tr>
              <td class="mono">report-writer-3</td><td>weekly_report</td>
              <td class="cons__num">37</td><td class="cons__num">5</td><td class="cons__num">0</td>
              <td><span class="pill pill--ready">Policy ready</span></td>
            </tr>
            <tr>
              <td class="mono">unknown-agent-a</td><td>unclassified</td>
              <td class="cons__num">66</td><td class="cons__num">11</td><td class="cons__num">3</td>
              <td><span class="pill pill--warn">Undocumented</span></td>
            </tr>
          </tbody>
        </table>

        <p class="cons__foot">
          <span class="pill pill--warn">Undocumented</span>
          One agent was found that is not in your inventory. It was deployed eight
          months ago on a service credential. This is the most common finding in a
          first pilot.
        </p>
      </div>
    </div>

  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Composition', 'Three paths', 'that should not exist.',
  'Each of these is two permissions that are individually approved and jointly dangerous.', '', 'h2')}

    <div class="cons rv">
      <div class="cons__bar">
        <span class="cons__dot"></span>
        <p class="cons__path">control-plane / composition</p>
      </div>
      <div class="cons__body">
        <div class="cpath">
          <p class="cpath__head"><span class="pill pill--crit">Critical</span> Read \u2192 Egress</p>
          <p class="cpath__chain"><span class="mono">crm.contacts.read</span> <span class="cpath__arrow">&rarr;</span> <span class="mono">http.post.external</span></p>
          <p class="cpath__meta">support-triage-2 \u00b7 reachable in one turn \u00b7 no additional capability required</p>
          <p class="cpath__fix">Recommended: narrow <span class="mono">http.post.external</span> to an allowlisted destination. Both capabilities are required by the task; the destination is not.</p>
        </div>

        <div class="cpath">
          <p class="cpath__head"><span class="pill pill--crit">Critical</span> Delegate \u2192 Re-amplify</p>
          <p class="cpath__chain"><span class="mono">orchestrator-1</span> <span class="cpath__arrow">&rarr;</span> <span class="mono">research-worker-1</span> <span class="cpath__arrow">&rarr;</span> <span class="mono">file.write.shared</span></p>
          <p class="cpath__meta">neither agent completes the path alone \u00b7 the chain does</p>
          <p class="cpath__fix">Recommended: attenuate the delegation. The worker does not need write access for vendor lookup.</p>
        </div>

        <div class="cpath">
          <p class="cpath__head"><span class="pill pill--sig">Significant</span> Enumerate \u2192 Act</p>
          <p class="cpath__chain"><span class="mono">ledger.invoices.list</span> <span class="cpath__arrow">&rarr;</span> <span class="mono">ledger.invoices.update</span></p>
          <p class="cpath__meta">finance-reconciler-7 \u00b7 per-record modification without a bulk control</p>
          <p class="cpath__fix">Recommended: cap <span class="mono">list</span> at the observed row limit and rate-limit <span class="mono">update</span> per session.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Ledger', 'Every decision,', 'with its reason.',
  'Hash-chained and exportable. Argument shapes are recorded; argument values never are.', '', 'h2')}

    <div class="cons rv">
      <div class="cons__bar">
        <span class="cons__dot"></span>
        <p class="cons__path">control-plane / ledger</p>
        <span class="cons__mode">LAST 6 DECISIONS</span>
      </div>
      <div class="cons__body">
        <table class="cons__table cons__table--ledger">
          <thead><tr><th>Time</th><th>Agent</th><th>Capability</th><th>Taint</th><th>Verdict</th><th>Reason</th></tr></thead>
          <tbody>
            <tr><td class="mono">10:22:41</td><td class="mono">finance-reconciler-7</td><td class="mono">ledger.invoices.read</td><td class="cons__num">0</td><td><span class="pill pill--allow">Allow</span></td><td>in profile \u00b7 support 0.99</td></tr>
            <tr><td class="mono">10:22:43</td><td class="mono">finance-reconciler-7</td><td class="mono">ledger.payments.read</td><td class="cons__num">0</td><td><span class="pill pill--allow">Allow</span></td><td>in profile \u00b7 support 0.87</td></tr>
            <tr><td class="mono">10:23:02</td><td class="mono">support-triage-2</td><td class="mono">doc.fetch.external</td><td class="cons__num">3</td><td><span class="pill pill--allow">Allow</span></td><td>in profile \u00b7 taint raised to 3</td></tr>
            <tr><td class="mono">10:23:05</td><td class="mono">support-triage-2</td><td class="mono">http.post.external</td><td class="cons__num">3</td><td><span class="pill pill--deny">Deny</span></td><td>would complete blocked path \u00b7 read \u2192 egress</td></tr>
            <tr><td class="mono">10:24:18</td><td class="mono">research-worker-1</td><td class="mono">file.write.shared</td><td class="cons__num">2</td><td><span class="pill pill--esc">Escalate</span></td><td>outside profile \u00b7 notified j.mehta@</td></tr>
            <tr><td class="mono">10:26:44</td><td class="mono">report-writer-3</td><td class="mono">report.send</td><td class="cons__num">0</td><td><span class="pill pill--allow">Allow</span></td><td>in profile \u00b7 within taint bound</td></tr>
          </tbody>
        </table>
        <p class="cons__foot">
          In shadow mode these verdicts are recorded but not applied. The denied call
          above would have succeeded. The point of the pilot is showing you what
          enforcement <em>would</em> have done before it does it.
        </p>
      </div>
    </div>
  </div>
</section>

${cta('See this populated', 'with your own agents.',
  'Two weeks of shadow mode. No enforcement, no code changes, and you keep the report whether or not you proceed.',
  ['Book a shadow-mode pilot', 'contact.html'], ['See the platform', 'platform/index.html'])}
`
}));

// ═══════════════════════════════════════════════ 404 ═══
W('404.html', page({
  depth: 0, extraCss: 'home',
  title: 'Page not found | StartiQOS AI',
  desc: 'That page does not exist.',
  canonical: '404.html',
  body: `
<section class="section">
  <div class="wrap wrap--narrow" style="text-align:center;padding-block:clamp(60px,10vh,120px)">
    <p class="eyebrow rv" style="justify-content:center">404</p>
    <h1 class="rv" style="margin:20px 0 24px">That page <em class="accent">does not exist.</em></h1>
    <p class="lead rv" style="max-width:52ch;margin-inline:auto">
      Which is at least an honest answer. If you were looking for something specific
      and it should be here, tell us and we will fix it.
    </p>
    <div class="cta__actions rv" style="margin-top:36px">
      <a class="btn btn--primary" href="index.html">Back to the homepage <span class="btn__arrow">&rarr;</span></a>
      <a class="btn btn--ghost" href="contact.html">Tell us what is missing</a>
    </div>
  </div>
</section>
`
}));

// ═══════════════════════════════════════════════ LEGAL ═══
const legalPage = (slug, title, eyebrow, h, ha, lead, sections) =>
  W(`legal/${slug}.html`, page({
    depth: 1, extraCss: 'home',
    title: `${title} | StartiQOS AI`,
    desc: lead.replace(/<[^>]+>/g, '').slice(0, 155),
    canonical: `legal/${slug}.html`,
    body: `
<section class="section">
  <div class="wrap">
${secHead(eyebrow, h, ha, lead, 'Last updated 14 September 2026.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap wrap--narrow">
${sections.map(([head, body]) => `    <div class="legal__block rv">
      <h2 class="legal__h">${head}</h2>
      <div class="prose">${body}</div>
    </div>`).join('\n')}
  </div>
</section>
`
  }));

legalPage('privacy', 'Privacy Policy', 'Legal', 'Privacy', 'Policy',
  'What we collect, what we do not, and what happens to it. The short version: the control plane runs in your environment and your data does not reach us.',
  [
    ['What the control plane collects', `
      <p>The control plane records <strong>argument shapes and types</strong>, never argument values. A trace records that a query had a table name and a row limit within a range. It does not record which table or which rows.</p>
      <p>This is a schema decision made at the start, not a redaction step applied afterwards. It cannot be reversed, and it is the reason traces are anonymisable by construction.</p>`],
    ['Where it is stored', `
      <p>Traces and the attestation ledger stay inside your environment. The control plane is self-hosted; there is no inbound connection from us and no dependency on our availability.</p>
      <p>Where you opt into the shared profile library, only anonymised aggregate metadata syncs outward \u2014 task-class names and capability frequencies, never traces.</p>`],
    ['What this website collects', `
      <p>Essential cookies to make the site function. Optional analytics to understand which pages are read, which you can decline.</p>
      <p>If you submit the contact form we receive your name, email, company and message. We use it to reply to you. We do not add you to a marketing list, because we do not operate one.</p>`],
    ['Sub-processors', `
      <p>For the website: our hosting provider and, where you consent, an analytics provider.</p>
      <p>For engagements: named in the engagement agreement before work begins, with their data handling terms attached. We do not add a sub-processor mid-engagement without telling you.</p>`],
    ['Your rights', `
      <p>Under the DPDP Act and, where applicable, the GDPR, you may request access to personal data we hold about you, ask for it to be corrected, or ask for it to be deleted.</p>
      <p>Write to <a href="mailto:info@startiqosai.com" class="post__link">info@startiqosai.com</a>. We respond within thirty days.</p>`],
    ['Grievance officer', `
      <p>A named grievance officer is appointed as required under section 13 of the DPDP Act. Contact details are published here before we begin processing personal data for any client.</p>`]
  ]);

legalPage('terms', 'Terms of Service', 'Legal', 'Terms of', 'Service',
  'The terms under which we provide the control plane and our services. Written to be read rather than to be impenetrable.',
  [
    ['What we provide', `
      <p>The agent authority control plane, deployed in your environment, and the implementation services described on this site.</p>
      <p>Where an engagement is involved, the scope, price, timeline and stated autonomy ceiling are set out in a separate engagement agreement which takes precedence over this page.</p>`],
    ['What we do not warrant', `
      <p>The control plane reduces what an agent can do. It does not make an agent correct, and it does not eliminate every path to harm. Where a harmful action falls inside an agent\u2019s legitimate scope, enforcement bounds the blast radius rather than preventing the action.</p>
      <p>We do not warrant that any particular attack will be prevented. We describe the mechanism and its boundaries, on this site and in the documentation, and we would rather you evaluate it than trust it.</p>`],
    ['Shadow-mode pilots', `
      <p>Pilots are provided at no cost and with no enforcement. You keep the resulting report whether or not you proceed, and there is no obligation on either side at the end of one.</p>`],
    ['Your obligations', `
      <p>You are responsible for the agents you run, the permissions you approve, and the decisions your organisation takes on the basis of our reports.</p>
      <p>Every policy requires approval by a named person in your organisation. That approval is a decision you own.</p>`],
    ['Limitation of liability', `
      <p>Our liability under any engagement is limited to the fees paid for that engagement. For pilots, where no fee is paid, our liability is limited to zero.</p>
      <p>We are a sole proprietorship. That is stated plainly because it affects what recourse exists, and you should factor it into your procurement decision.</p>`],
    ['Governing law', `
      <p>These terms are governed by the laws of India, with jurisdiction in Chandigarh.</p>`]
  ]);

legalPage('security', 'Security', 'Legal', 'Security', 'and disclosure',
  'How the control plane is built, what we have not yet been audited for, and how to report a vulnerability.',
  [
    ['Certifications we do not hold', `
      <p>We do not currently hold SOC 2, ISO 27001, or any other independently audited certification. We will not display a badge for an assessment we have not been through.</p>
      <p>If your procurement process requires one today, we are not currently a fit, and we would rather say so on this page than in a discovery call.</p>`],
    ['Architecture', `
      <p>The control plane is self-hosted and runs inside your environment. Traces and the attestation ledger do not leave your boundary.</p>
      <p>Token verification is offline \u2014 there is no callback to an issuer and no policy server in the decision path. The gateway is written in Rust; policy learning runs in batch, outside the hot path.</p>
      <p>The attestation ledger is hash-chained with periodic Merkle root signing. We do not use a blockchain, and the reason is in our documentation.</p>`],
    ['Threat model boundaries', `
      <p>In scope: indirect prompt injection, tool poisoning, compromised sub-agents attempting scope widening, token theft and replay, delegation cycles, policy poisoning during observation, and a compromised MCP server.</p>
      <p>Out of scope: compromise of the gateway host itself, model weight tampering, an insider with legitimate signing keys, and physical infrastructure attacks.</p>`],
    ['Reporting a vulnerability', `
      <p>Write to <a href="mailto:info@startiqosai.com" class="post__link">info@startiqosai.com</a> with \u201csecurity\u201d in the subject. We acknowledge within two working days.</p>
      <p>We do not currently run a paid bounty programme. We will credit you publicly if you want that, and we will not threaten anyone who reports something in good faith.</p>`],
    ['Disclosure', `
      <p>If a vulnerability in our system affects a customer, we tell that customer within seventy-two hours of confirming it, including when the fix is not yet ready.</p>
      <p>When the calibration record is published it will include security findings, not only accuracy figures.</p>`]
  ]);

console.log('\nRoot, legal and console done.');
