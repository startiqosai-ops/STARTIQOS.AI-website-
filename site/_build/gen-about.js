const fs = require('fs');
const { page, secHead, rows, causes, note, cta } = require('./layout');
const W = (f, h) => { fs.writeFileSync(f, h); console.log('✓ ' + f); };
const D = 1, P = '../';

// ═══════════════════════════════════════════════ ABOUT ═══
W('about/index.html', page({
  depth: D, extraCss: 'home',
  title: 'About StartiQOS AI — Bounded AI, Proven Work',
  desc: 'StartiQOS AI builds the authority control plane for AI agents, and implements enterprise AI systems with stated limits. Chandigarh, India.',
  keywords: 'StartiQOS AI, AI agent security company, AI governance company India',
  canonical: 'about/index.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('About StartiQOS AI', 'Software that bounds what AI can do.', 'Engineering that proves what it did.',
  'Two lines of work, one principle: what an AI system is permitted to do should be explicit, bounded, and provable afterwards.',
  'We build an authority control plane for AI agents, and we implement the systems underneath \u2014 retrieval that cites its sources, departments that operate against a stated ceiling.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Why We Exist', 'An agent is not hacked.', 'It is borrowed.',
  'An AI agent is given access to a company\u2019s systems. Nobody knows precisely what access it needs, so it is given everything.', '', 'h2')}
    <div class="prose rv">
      <p>It ends up holding ninety-four permissions and using six.</p>
      <p>The other eighty-eight are not unused. They are available. When an agent reads a document containing an instruction written by someone else \u2014 send this data to that address \u2014 it cannot distinguish that instruction from its real task. It acts, using access it was legitimately granted.</p>
      <p>The agent is not compromised. It is confused, and its authority is borrowed.</p>
      <p>Every defence being built today tries to recognise the instruction and block it. That approach fails by construction: a defence that works by recognising attacks loses to the attack it has not seen.</p>
      <p><strong>We take the other path. We remove the capability rather than detect the intent.</strong> When the instruction arrives, the agent attempts the action and fails \u2014 not because anything was detected, but because that permission was never there.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('What We Build', 'One product.', 'Three services.',
  'Deliberately narrow. A four-person team that claims five products and ten departments is describing something it cannot deliver.', '', 'h2')}
${rows([
  ['Product', 'Agent Authority Control Plane',
   'Least-privilege enforcement for AI agents. Learns what each task actually needs, enforces it at every call, and blocks prompt injection by removing the capability rather than detecting the attack.'],
  ['Service 01', 'Verified Knowledge Systems',
   'Enterprise retrieval that attaches a source to every answer and refuses when the evidence is not there. Five to six weeks to production.'],
  ['Service 02', 'AI-Native Department Transformation',
   'One department converted against an autonomy ceiling agreed in writing before anything is built. Ten to twelve weeks, two engagements per year.'],
  ['Service 03', 'AI-Native Enterprise Transformation',
   'Strategy, platform, retrieval and governance sequenced across departments. Sold in stages; you can stop after any of them.']
])}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Where We Are', 'Chandigarh, India.', 'Working globally.',
  'A small team, deliberately. We take two engagements at a time because delivery quality in this category depends on senior attention.', '', 'h2')}
${note('Where we are in our own build.',
  'The enforcement system runs with sub-millisecond decisions and a passing test suite, and the injection-blocking path works end to end. It has not yet been deployed in a customer\u2019s production environment. We will say so until it has.')}
    <div class="sec-foot rv" style="display:flex;gap:12px;flex-wrap:wrap">
      <a class="btn btn--ghost" href="team.html">Meet the team <span class="btn__arrow">&rarr;</span></a>
      <a class="btn btn--primary" href="${P}contact.html">Talk to us <span class="btn__arrow">&rarr;</span></a>
    </div>
  </div>
</section>
`
}));

W('about/mission.html', page({
  depth: D, extraCss: 'home',
  title: 'Our Mission — Making What AI Can Do Explicit | StartiQOS AI',
  desc: 'To make what AI can do explicit, bounded, and provable. Not safer in the abstract — a specific agent holding exactly the authority its task requires.',
  canonical: 'about/mission.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Our Mission', 'To make what AI can do', 'explicit, bounded, and provable.',
  'Not to make AI safer in the abstract. To make a specific agent, in a specific system, hold exactly the authority its task requires \u2014 and to leave a record that survives an audit.',
  'This is unglamorous work. It is also the difference between AI an organisation can deploy and AI that stays in pilot.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="prose rv">
      <p>Eighty-eight percent of enterprise agents never reach production. Almost none of them fail on capability.</p>
      <p>They fail because nobody could answer a simple question: <strong>what is this thing allowed to do, and how would we know if it did something else?</strong></p>
      <p>We are building the answer to that question.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Principles', 'Six commitments.', 'Each costs us something.', 'They are written down so the decision gets made before the pressure arrives.', '', 'h2')}
${rows([
  ['01', 'Enforcement over detection',
   'Detection-based defence is an arms race against attacks nobody has seen. Capability removal is not. This is a harder product to build and an easier one to trust.'],
  ['02', 'Limits stated before we begin',
   'For services engagements we publish the honest ceiling on what can be automated \u2014 including when that number is low enough to lose us the work.'],
  ['03', 'Sources or refusal',
   'No claim without something you can verify. When a system does not have enough information, it says so rather than filling the gap with something plausible.'],
  ['04', 'Published error rates',
   'Every system we build gets measured, and the measurement includes the failures. A vendor reporting zero errors is either not measuring or not disclosing.'],
  ['05', 'Two engagements at a time',
   'Not an apology \u2014 a constraint we chose. Scaling by putting someone junior on your runtime produces exactly the failure rate the rest of this market already has.'],
  ['06', 'Client ownership',
   'Your data, your configuration, your infrastructure. Traces stay inside your boundary. Nothing we build is used to train models and nothing crosses between clients.']
])}
  </div>
</section>

${cta('If any of this rules us out,', 'that is the page working.',
  'And if it does not, you now know exactly what you are buying.',
  ['Talk to us', P + 'contact.html'], ['What we don\u2019t do', 'what-we-dont-do.html'])}
`
}));

W('about/team.html', page({
  depth: D, extraCss: 'home',
  title: 'Core Team — The Four Who Started It | StartiQOS AI',
  desc: 'StartiQOS AI was built by four people. Product and architecture, company, AI systems, and engineering delivery.',
  canonical: 'about/team.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('The Core Team', 'Four people.', 'Chandigarh, India.',
  'StartiQOS AI was built by four people from day one. The systems, the methodology and the standards came from here.',
  'A small team, deliberately. We take two engagements at a time because delivery quality in this category depends on senior attention.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <article class="person rv">
      <div class="person__photo"><img src="${P}assets/img/team/shashwat.jpg" alt="Shashwat" loading="lazy"></div>
      <div class="person__body">
        <p class="person__role">Founder \u00b7 Product &amp; Architecture</p>
        <h2 class="person__name">Shashwat</h2>
        <p class="person__bio">Originates the authority model, the enforcement design, and the research behind both. The capability learning method, the composition analysis and the delegation invariant start here.</p>
        <p class="person__owns"><span>Owns</span> Product \u00b7 Architecture \u00b7 Research</p>
        <a href="#" class="link">LinkedIn <span>&rarr;</span></a>
      </div>
    </article>

    <article class="person rv">
      <div class="person__photo"><img src="${P}assets/img/team/naveen-dogra.jpg" alt="Naveen Dogra" loading="lazy"></div>
      <div class="person__body">
        <p class="person__role">Founder &amp; CEO</p>
        <h2 class="person__name">Naveen Dogra</h2>
        <p class="person__bio">Runs the company \u2014 legal, corporate records, compliance and client engagements. Responsible for how StartiQOS operates as a business and what it commits to publicly.</p>
        <p class="person__owns"><span>Owns</span> Company \u00b7 Legal \u00b7 Compliance \u00b7 Client engagements</p>
        <a href="#" class="link">LinkedIn <span>&rarr;</span></a>
      </div>
    </article>

    <article class="person rv">
      <div class="person__photo"><img src="${P}assets/img/team/vipul.jpg" alt="Vipul" loading="lazy"></div>
      <div class="person__body">
        <p class="person__role">Technical Lead \u00b7 AI Systems</p>
        <h2 class="person__name">Vipul</h2>
        <p class="person__bio">Builds the AI systems behind the platform and leads technical design. Owns how the systems reason \u2014 the policy learning, the evaluation, and the guardrails that keep it honest.</p>
        <p class="person__owns"><span>Owns</span> AI systems \u00b7 Policy learning \u00b7 Evaluation</p>
        <a href="#" class="link">LinkedIn <span>&rarr;</span></a>
      </div>
    </article>

    <article class="person rv">
      <div class="person__photo"><img src="${P}assets/img/team/rahul.jpg" alt="Rahul" loading="lazy"></div>
      <div class="person__body">
        <p class="person__role">Engineering Lead \u00b7 Delivery</p>
        <h2 class="person__name">Rahul</h2>
        <p class="person__bio">Manages the development team and the build across the control plane and the service engagements. Owns delivery \u2014 what ships, when, and whether it survives production.</p>
        <p class="person__owns"><span>Owns</span> Engineering delivery \u00b7 Development team \u00b7 Platform build</p>
        <a href="#" class="link">LinkedIn <span>&rarr;</span></a>
      </div>
    </article>

${note('Where we are, stated plainly.',
  'The enforcement system runs with sub-millisecond decisions and a passing test suite. It has not yet been deployed in a customer\u2019s production environment, and we have not yet completed a services engagement. We will say so until both are true.')}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('How We Operate', 'Small on purpose,', 'not by accident.',
  'Three decisions about how this company runs. Each costs us revenue, and each is kept anyway.', '', 'h2')}
${causes([
  ['01', 'Two Engagements At A Time',
   'Delivery quality here depends on senior attention. Scaling by putting someone junior on your runtime produces exactly the failure rate the rest of this market already has.', ''],
  ['02', 'Founders Do The Delivery',
   'The audit and the classification \u2014 the two stages that decide whether an engagement succeeds \u2014 are run by the people who designed the method, not handed down.', ''],
  ['03', 'We Run It On Ourselves First',
   'Nothing is sold before we have used it internally. If our own systems cannot produce a result we would stand behind, it is not ready to sell to anyone.', '']
])}
  </div>
</section>

${cta('We hire rarely,', 'and slowly.',
  'When we do, we look for people who can say \u201cI don\u2019t know\u201d in a meeting \u2014 and who would rather be corrected than confident.',
  ['See open roles', P + 'careers.html'], ['Get in touch', P + 'contact.html'])}
`
}));

W('about/how-we-work.html', page({
  depth: D, extraCss: 'home',
  title: 'How We Work — Method and Principles | StartiQOS AI',
  desc: 'Observe, derive, approve, enforce. Nothing is enforced until a named human approves it, and every decision is recorded with its reason.',
  canonical: 'about/how-we-work.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('How We Work', 'Observe. Derive.', 'Approve. Enforce.',
  'Nothing is enforced until a named human has approved it, and every decision afterwards is recorded with the reason attached.',
  'The same sequence applies to a services engagement: measure what actually happens before designing what should.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('The Product Method', 'Four steps.', 'Shadow mode runs first.',
  'You see what your agents actually hold before anything changes \u2014 and you decide whether to enforce it.', '', 'h2')}
${rows([
  ['01', 'Observe',
   'The control plane runs in shadow mode alongside your agents. No enforcement, no risk. We record which capabilities each task actually invokes and which sit unused. Two weeks. Output: the gap between held and used.'],
  ['02', 'Derive',
   'From observed behaviour we generate a candidate least-privilege policy per task class, plus the composition paths that exist today but should not. Suspicious observations are filtered before they influence the policy.'],
  ['03', 'Approve',
   'A named human reviews and approves. Nothing is enforced automatically. Policies are versioned, and every change carries an owner and a timestamp.'],
  ['04', 'Enforce',
   'Every call is verified against the approved policy at runtime. Denials are logged with the reason. When an injected instruction arrives, the agent attempts the action and fails \u2014 because that capability was never granted.']
])}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Services Method', 'Audit first.', 'And the audit is separable.',
  'Every engagement opens with a measurement, not a proposal. You can stop after it, and some departments should.', '', 'h2')}
${rows([
  ['01', 'Measure what the department actually does',
   'Task by task, observed rather than described. Interviews with the people doing the work, not only the person who manages it. The gap between the documented process and the real one is usually the most valuable finding.'],
  ['02', 'Classify every task',
   'Execution, decision, authority or governance. Execution automates. Decisions get AI assistance but stay human. Authority never moves. The ceiling is arithmetic on this classification, not an opinion.'],
  ['03', 'State the ceiling in writing',
   'Before any build. Including when the number is low enough that we recommend against proceeding \u2014 which happens, and which is the point of doing the audit separately.'],
  ['04', 'Build with governance active from day one',
   'Provenance, sampling and authority limits go in with the first deployment. Retrofitting them means rebuilding, which nobody funds, which means it does not happen.'],
  ['05', 'Supervised run before trust',
   'The system operates with every output reviewed before it takes effect. This is where the real exception cases surface and where the ceiling gets corrected if the audit was optimistic.'],
  ['06', 'Hand it over and leave',
   'Documentation, the sampling process, the drift indicators, and training for whoever owns it afterwards. We do not stay on as a dependency.']
])}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('What Does Not Change', 'Three things', 'that hold either way.', 'Whether it is the product or an engagement.', '', 'h2')}
${causes([
  ['01', 'A Named Human Owns It',
   'Every policy, every system, every department has a person with authority to intervene and accountability for the outcome. Legal accountability requires a person.', ''],
  ['02', 'The Limit Is Stated First',
   'Autonomy ceilings for departments, capability sets for agents. Published before the work starts, not discovered afterwards.', ''],
  ['03', 'Failures Get Measured',
   'Sampling, drift detection, and a reported error rate. We would rather be the company with a visible error rate than the one with an invisible one.', '']
])}
  </div>
</section>

${cta('See it run on', 'your own agents.',
  'Shadow mode for two weeks. No enforcement, no code changes, no risk \u2014 and a report showing exactly what would have been allowed, escalated and denied.',
  ['Book a shadow-mode pilot', P + 'contact.html'], ['What we don\u2019t do', 'what-we-dont-do.html'])}
`
}));

W('about/what-we-dont-do.html', page({
  depth: D, extraCss: 'home',
  title: 'What We Don\u2019t Do — Our Stated Limits | StartiQOS AI',
  desc: 'We do not sell detection, zero-human operation, multi-year programmes, or legal advice. Each of these costs us revenue.',
  canonical: 'about/what-we-dont-do.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('The Limits', 'What we', 'don\u2019t do.',
  'Most companies publish what they can do. This page exists because being clear about the opposite protects both sides.',
  'An engagement that should never have started is worse for us than one we never won.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('On The Product', 'What the control plane', 'cannot do for you.', 'Every security control has a boundary. These are ours.', '', 'h2')}
${causes([
  ['Limit 01', 'We Don\u2019t Detect Attacks',
   'Prompt injection classifiers, content filters and anomaly scoring are not what this is. We remove capability. If you want detection as well, keep the layer you have \u2014 we assume it will miss things.', ''],
  ['Limit 02', 'We Can\u2019t Protect A Compromised Host',
   'The threat model assumes the gateway host is trusted. If an attacker has root on the machine running the control plane, the control plane is not your problem.', ''],
  ['Limit 03', 'We Can\u2019t Fix A Bad Agent',
   'If your agent produces wrong answers, enforcement does not make them right. It bounds what the wrong answer can cause. Those are different problems.', ''],
  ['Limit 04', 'Cold Start Is Real',
   'A new agent with no observed behaviour has no learned policy. Shadow mode delivers the audit immediately, but enforcement waits for a confidence threshold. We will not enforce a guess.', '']
])}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('On Services', 'Work we', 'turn down.', 'Each of these has cost us revenue.', '', 'h2')}
${rows([
  ['01', 'We don\u2019t sell zero-human operation',
   'Every system we build requires a named human owner with authority to intervene. Legal accountability requires a person. Anyone promising a fully autonomous department is describing something they cannot deliver safely.'],
  ['02', 'We decline engagements below a sixty percent ceiling',
   'If the honest autonomy ceiling for a department does not justify the cost of transforming it, we say so before you spend. A client who pays for a transformation that cannot deliver becomes a reference against us.'],
  ['03', 'We don\u2019t run multi-year programmes',
   'Company-wide, multi-year change belongs to large systems integrators with the delivery scale for it. We do one department at a time, with a fixed scope and a fixed price.'],
  ['04', 'We don\u2019t provide legal advice',
   'Our compliance work identifies which regulations apply and what obligations follow. It never produces the legal instrument that satisfies them. Where formal advice is required we coordinate qualified professionals rather than substituting for them.'],
  ['05', 'We don\u2019t take more than two engagements at a time',
   'Delivery quality here depends on senior attention. If we are engaged, we will tell you when we can start rather than starting badly.'],
  ['06', 'We don\u2019t sell agent-building tooling',
   'We govern agents and we build bounded systems. We are not a platform for other people to build agents on, and we do not compete with the frameworks you already use.']
])}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Not A Fit', 'Who we are', 'not for.', 'Naming this saves everyone a wasted conversation.', '', 'h2')}
    <table class="ceiling rv">
      <thead><tr><th>Not a fit</th><th>Why</th></tr></thead>
      <tbody>
        <tr><td>Teams wanting a detection product</td><td>We remove capability rather than recognise attacks. If detection is the requirement, we are the wrong layer.</td></tr>
        <tr><td>Organisations seeking zero-human operation</td><td>We do not sell it, and we will correct the expectation rather than take the engagement.</td></tr>
        <tr><td>Companies without documented exception rules</td><td>Automation requires knowing what the exceptions are. Without them written down, the honest ceiling is very low.</td></tr>
        <tr><td>Anyone needing enforcement on day one</td><td>Shadow mode runs first. A policy enforced before it is learned is a policy that breaks your agents.</td></tr>
        <tr><td>Buyers requiring SOC 2 today</td><td>We do not hold it yet. We will not claim a certification we have not been audited for.</td></tr>
        <tr><td>Multi-year transformation programmes</td><td>Four people. We say so rather than discovering it together in month four.</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('On What We Claim', 'Things you won\u2019t find', 'on this website.',
  'A company built on published error rates cannot decorate its own site with numbers it cannot evidence.', '', 'h2')}
${causes([
  ['Absent 01', 'Accuracy Percentages',
   'No \u201c94% accurate\u201d claim. There is no independent benchmark in this category and a self-graded number means nothing.', ''],
  ['Absent 02', 'Customer Counts',
   'No \u201c500+ companies protected.\u201d When we publish numbers they will be ones you could ask us to substantiate.', ''],
  ['Absent 03', 'Testimonials And Logos',
   'No quotes, no client logos, no partner badges until they are real, current, and used with permission.', ''],
  ['Absent 04', '\u201cWorld\u2019s First\u201d Anything',
   'Unverifiable superlatives are the fastest way to lose a technical buyer. We describe what the system does instead.', ''],
  ['Absent 05', 'Certifications We Don\u2019t Hold',
   'No SOC 2 or ISO badges until they are independently audited and current. Security claims we make are ones we can demonstrate.', ''],
  ['Absent 06', 'Case Studies Without Clients',
   'The case studies page stays empty until two real engagements are published with permission. It is in the navigation so you can see that it is empty.', '']
])}
${note('When our calibration record exists',
  '\u2014 detection rates, false positives, and where we were wrong \u2014 it will be published in full on its own page. Until then, this page is what we have instead of statistics.')}
  </div>
</section>

${cta('If any of this rules us out,', 'that\u2019s the page working.',
  'And if it does not, you now know exactly what you are buying.',
  ['Book a shadow-mode pilot', P + 'contact.html'], ['How we work', 'how-we-work.html'])}
`
}));

console.log('\nAbout done.');
