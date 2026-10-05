const fs = require('fs');
const { page, secHead, rows, causes, note, cta } = require('./layout');
const W = (f, h) => { fs.writeFileSync(f, h); console.log('✓ ' + f); };
const D = 1, P = '../';

const CEILING = `
    <table class="ceiling rv">
      <thead><tr><th>Department</th><th>Estimated ceiling</th><th>What limits it</th></tr></thead>
      <tbody>
        <tr><td>Marketing &amp; content operations</td><td class="ceiling__n">90–95%</td><td>Strategy and positioning stay human</td></tr>
        <tr><td>Data operations &amp; reporting</td><td class="ceiling__n">90%</td><td>Interpretation stays human</td></tr>
        <tr><td>Document processing</td><td class="ceiling__n">90%</td><td>Exception rules must exist in writing</td></tr>
        <tr><td>Customer support, first line</td><td class="ceiling__n">85–90%</td><td>Escalation path required</td></tr>
        <tr><td>Sales research &amp; outreach</td><td class="ceiling__n">85%</td><td>The conversation itself is not automatable</td></tr>
        <tr><td>Procurement</td><td class="ceiling__n">75%</td><td>Spend approval stays human</td></tr>
        <tr><td>Human resources</td><td class="ceiling__n">70%</td><td>Hiring and exit decisions carry legal exposure</td></tr>
        <tr><td>Finance &amp; accounts payable</td><td class="ceiling__n">70%</td><td>Money movement always requires sign-off</td></tr>
        <tr class="ceiling__mark"><td>Legal operations</td><td class="ceiling__n">50%</td><td>Advice and liability are the function</td></tr>
      </tbody>
    </table>`;

// ═══════════════════════════════════════ SERVICES INDEX ═══
W('services/index.html', page({
  depth: D, extraCss: 'home',
  title: 'Services — Enterprise AI Implementation with Stated Limits | StartiQOS AI',
  desc: 'Verified knowledge systems, AI-native department transformation and enterprise transformation. Fixed scope, fixed price, published autonomy ceilings.',
  keywords: 'enterprise AI implementation, enterprise RAG, AI transformation services, AI governance consulting',
  canonical: 'services/index.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Implementation', 'Bounded AI,', 'built into your operation.',
  'Enforcement software is one half. The other is building AI systems that were bounded from the first line of code.',
  'Three engagements. Fixed scope, fixed price, and the honest limit stated before a contract is signed.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${causes([
  ['01 — Knowledge', 'Verified Knowledge Systems',
   'Enterprise retrieval over your own documents, policies and operational data. Every answer attaches the source it came from. When retrieval finds nothing relevant, the system says so instead of answering from general knowledge.',
   '<strong>5\u20136 weeks.</strong> Delivered by the engineering team.'],
  ['02 — Department', 'AI-Native Department Transformation',
   'One department converted to AI-native operation against an autonomy ceiling agreed in writing before anything is built. Every task is classified, and the ceiling follows from that classification.',
   '<strong>10\u201312 weeks.</strong> Founder-delivered. Two per year.'],
  ['03 — Enterprise', 'AI-Native Enterprise Transformation',
   'Strategy, platform, retrieval and governance sequenced across departments. Each stage proves its governance before the next begins \u2014 which is how agent sprawl is prevented rather than cleaned up afterwards.',
   '<strong>Sold in stages.</strong> You can stop after any of them.']
])}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('How We Work', 'Two engagements', 'at a time.',
  'Not an apology \u2014 a constraint we have chosen. Delivery quality in this category depends on senior attention.',
  '', 'h2')}
${rows([
  ['01', 'The audit comes first, and it is separable',
   'Every engagement opens with an audit: what the department actually does, which tasks are genuinely automatable, and what the honest ceiling is. You can stop there. Some clients should.'],
  ['02', 'The founders run the stages that decide the outcome',
   'The audit and the task classification are run by the people who designed the method. These are the two stages where a junior consultant produces the failure rate the rest of this market already has.'],
  ['03', 'Governance is active from the first deployment',
   'Not retrofitted at the end. Provenance, sampling and authority limits go in with the first system, because adding them afterwards means rebuilding it.'],
  ['04', 'We decline work below a sixty percent ceiling',
   'If the achievable automation does not justify the cost of getting there, we say so before you spend. A client who pays for a transformation that cannot deliver value becomes a reference against us.']
])}
  </div>
</section>

${cta('Start with the audit.', 'Decide after.',
  'Two weeks, fixed price, and a written ceiling for the department you care about most. If the number does not justify the work, we will tell you.',
  ['Book a transformation audit', P + 'contact.html'], ['See the control plane', P + 'platform/index.html'])}
`
}));

// ═══════════════════════════════ VERIFIED KNOWLEDGE ═══
W('services/verified-knowledge-systems.html', page({
  depth: D, extraCss: 'home',
  title: 'Verified Knowledge Systems — Enterprise RAG That Cites Its Sources | StartiQOS AI',
  desc: 'Enterprise retrieval that attaches a source to every answer and refuses when the evidence is not there. Five to six weeks to production.',
  keywords: 'enterprise RAG, retrieval augmented generation, knowledge management AI, document AI, RAG implementation',
  canonical: 'services/verified-knowledge-systems.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Service 01', 'It cites its sources.', 'And it says when it does not know.',
  'Enterprise retrieval over your own documents, policies and operational data \u2014 built so that an answer without a source cannot be produced.',
  'Most RAG deployments fail the same way: they answer confidently from general knowledge when retrieval returns nothing useful. The user cannot tell the difference. That failure mode is designed out of this one.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('The Problem', 'Confident answers', 'with nothing underneath.',
  'The failure is not that the system is wrong sometimes. It is that a wrong answer looks exactly like a right one.', '', 'h2')}
${causes([
  ['Failure 01', 'Answering From The Model',
   'Retrieval returns three irrelevant chunks. The model answers anyway, from what it learned in training. The answer is plausible, fluent, and about a different company\u2019s policy.',
   '<strong>Our fix:</strong> retrieval confidence gates the answer. Below threshold, it refuses.'],
  ['Failure 02', 'No Source Attached',
   'The answer is correct. Nobody can verify it, because nothing points back to the document it came from. Six months later the policy changes and nobody knows which answers are now stale.',
   '<strong>Our fix:</strong> every claim carries its source document and section.'],
  ['Failure 03', 'Nobody Measures It',
   'The system went live. Accuracy was never sampled. The first evidence of a problem is a customer acting on a wrong answer.',
   '<strong>Our fix:</strong> monthly sampling, reported \u2014 including the errors that reached a user.']
])}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Build', 'Five to six weeks,', 'including supervision.',
  'The last two weeks are a supervised period where the system runs but is not yet trusted. That is not padding \u2014 it is where the accuracy baseline comes from.', '', 'h2')}
${rows([
  ['Week 1', 'Corpus audit',
   'What documents exist, how current they are, what contradicts what. Most knowledge bases contain two versions of the same policy. We find those first, because retrieval cannot resolve a contradiction that the corpus contains.'],
  ['Week 2', 'Ingestion and chunking',
   'Structure-aware chunking rather than fixed windows. Section headings, tables and policy clauses survive as units. Freshness metadata attached at ingest, so staleness is queryable later.'],
  ['Week 3\u20134', 'Retrieval and refusal',
   'Hybrid retrieval, reranking, and the confidence gate that produces a refusal instead of an answer. The gate is tuned against your own corpus \u2014 a threshold that works for legal documents does not work for support tickets.'],
  ['Week 5\u20136', 'Supervised run',
   'The system answers real questions, and every answer is reviewed before it reaches the asker. This produces the accuracy baseline, catches the corpus problems that only surface under real queries, and tunes the refusal rate.']
])}
${note('What you receive at the end.',
  'A running system, the accuracy baseline from the supervised period, a monthly sampling process your team can operate, and the freshness report that tells you which parts of the corpus have gone stale.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Where It Fits', 'The teams that', 'buy this first.',
  'The pain is always the same shape: knowledge exists, but only in people\u2019s heads or in documents nobody can find.', '', 'h2')}
${rows([
  ['01', 'Support teams answering the same question weekly',
   'Tier-one support where the answer exists in a document but finding it takes longer than asking a colleague. Deflection is measurable from week one.'],
  ['02', 'Onboarding that takes six weeks and should take two',
   'New joiners asking questions that are answered in a wiki nobody reads. The system does not replace the wiki \u2014 it makes the wiki answerable.'],
  ['03', 'Operations running on tribal knowledge',
   'Exception handling, escalation rules and process edge cases that exist only in the memory of whoever has been there longest. The corpus audit usually surfaces that this knowledge was never written down at all \u2014 which is itself the finding.'],
  ['04', 'Compliance answering the same audit questions annually',
   'Where the evidence exists across four systems and assembling it takes a week. Source attribution is not a nice-to-have here; it is the deliverable.']
])}
  </div>
</section>

${cta('Knowledge your team can', 'actually retrieve.',
  'Five to six weeks to production, with a supervised period before it is trusted. First engagement is discounted in exchange for a published case study.',
  ['Talk to us', P + 'contact.html'], ['See all services', 'index.html'])}
`
}));

// ═══════════════════════════ DEPARTMENT TRANSFORMATION ═══
W('services/department-transformation.html', page({
  depth: D, extraCss: 'home',
  title: 'AI-Native Department Transformation — With a Stated Ceiling | StartiQOS AI',
  desc: 'One department converted to AI-native operation against an autonomy ceiling agreed in writing before anything is built. Six stages, ten to twelve weeks.',
  keywords: 'AI-native transformation, department automation, AI autonomy ceiling, AI governance, business process automation',
  canonical: 'services/department-transformation.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Service 02', 'One department.', 'The ceiling stated first.',
  'Converted to AI-native operation against a limit agreed in writing before anything is built \u2014 including when that limit is low.',
  'Every vendor promises more. We publish the honest number before a contract is signed, because a client who pays for a transformation that cannot deliver becomes a reference against us.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('The Ceilings', 'What we will tell you', 'before we audit.', 'These are our working estimates by department type. Your actual number comes from the audit.', '', 'h2')}
${CEILING}
${note('These are estimates, not benchmarks.',
  'They come from our own task-level analysis of what requires human judgment, reviewed against published transformation frameworks. We publish them so you know what we will tell you before we audit your department \u2014 and we revise them as engagements complete.')}
${note('Read the number correctly.',
  'The ceiling describes the share of a team\u2019s work hours, not authority. Finance at seventy percent means seventy percent of manual effort is automated. It does not mean AI approves anything. Decisions remain human.', true)}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Six Stages', 'Ten to twelve weeks,', 'and you can stop at stage one.',
  'The audit is separable and separately priced. Some departments should not proceed past it, and we will say so.', '', 'h2')}
${rows([
  ['01', 'Audit \u2014 two weeks',
   'What the department actually does, task by task, measured rather than described. Interviews with the people doing the work, not only the person who manages it. Output: the honest ceiling, in writing, and the cost of reaching it.'],
  ['02', 'Classification \u2014 one week',
   'Every task sorted into execution, decision, authority or governance. Execution automates. Decisions get AI-assisted but stay human. Authority never moves. Governance is what watches the rest. The ceiling is arithmetic on this classification, not an opinion.'],
  ['03', 'Design \u2014 two weeks',
   'The target operating model, the systems required, the human oversight points, and the escalation paths. Reviewed with the department, not presented to it.'],
  ['04', 'Build \u2014 three to four weeks',
   'The systems, with governance active from the first deployment. Provenance, sampling and authority limits are part of the build, not a later phase.'],
  ['05', 'Supervised run \u2014 two weeks',
   'The department operates the new model with every AI output reviewed before it takes effect. This is where the real exception cases surface, and where the ceiling gets corrected if the audit was optimistic.'],
  ['06', 'Handover \u2014 one week',
   'Documentation, the sampling process, the drift indicators, and training for whoever owns it after we leave. We do not stay on as a dependency.']
])}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('What We Decline', 'The engagements', 'we turn down.',
  'Each of these has cost us revenue. They are written down so the decision gets made before the pressure arrives.', '', 'h2')}
${causes([
  ['Decline 01', 'Below A Sixty Percent Ceiling',
   'If the achievable automation does not justify the cost of getting there, the honest answer is not to do it. We tell you during the audit, and you pay for the audit only.',
   '<strong>Legal operations</strong> frequently falls here. We say so.'],
  ['Decline 02', 'No Written Exception Rules',
   'Automation requires knowing what the exceptions are. If they exist only in someone\u2019s head, the honest ceiling is very low \u2014 and the first project is documenting them, not automating anything.',
   '<strong>This is a common audit finding.</strong> It is not a failure.'],
  ['Decline 03', 'Zero-Human Operation',
   'Every system we build requires a named human owner with authority to intervene. Legal accountability requires a person. If the requirement is a department with nobody in it, we are the wrong firm.',
   '<strong>We correct the expectation</strong> rather than take the engagement.']
])}
  </div>
</section>

${cta('Start with the audit.', 'Two weeks, fixed price.',
  'You get the honest ceiling for your department in writing, the task classification behind it, and the cost of reaching it. If the number does not justify the work, that is the deliverable.',
  ['Book a transformation audit', P + 'contact.html'], ['Enterprise transformation', 'enterprise-transformation.html'])}
`
}));

// ═══════════════════════════ ENTERPRISE TRANSFORMATION ═══
W('services/enterprise-transformation.html', page({
  depth: D, extraCss: 'home',
  title: 'AI-Native Enterprise Transformation — Sequenced, Not Simultaneous | StartiQOS AI',
  desc: 'Strategy, platform, retrieval and governance sequenced across departments. Each stage proves its governance before the next begins. Stop after any stage.',
  keywords: 'AI transformation, enterprise AI strategy, AI governance framework, AI adoption roadmap',
  canonical: 'services/enterprise-transformation.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Service 03', 'Sequenced.', 'Never simultaneous.',
  'Strategy, platform, retrieval and governance across departments \u2014 with each stage proving its governance before the next begins.',
  'This is how agent sprawl is prevented rather than cleaned up afterwards. The average enterprise now runs fourteen AI projects and fewer than half deliver measurable value. Sequencing is the difference.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('The Stages', 'You can stop', 'after any of them.',
  'Each stage is separately priced and independently valuable. Nothing requires a commitment to the next one.', '', 'h2')}
${rows([
  ['Stage 0', 'AI Strategy &amp; Roadmap \u2014 two weeks',
   'Where AI genuinely fits and where it does not. Use cases scored by feasibility, consequence and cost, then sequenced by what delivers value soonest. Output: a roadmap with honest ceilings per department, and the ones we recommend against.'],
  ['Stage 1', 'Verified Knowledge System \u2014 six weeks',
   'The first system, in the department where the knowledge problem is sharpest. Retrieval that cites its sources and refuses when it cannot answer. This is deliberately first: it is the lowest-risk system that produces visible value.'],
  ['Stage 2', 'First Department \u2014 twelve weeks',
   'One department to AI-native operation against its stated ceiling. Governance active from the first deployment. This stage is where the organisation learns what the method actually costs and delivers.'],
  ['Stage 3', 'Second Department \u2014 twelve weeks',
   'The next department, with the governance model already proven and the internal team now able to run parts of it. Each subsequent department costs less than the one before.']
])}
${note('Why we sell it in stages rather than as a programme.',
  'A buyer who commits to a multi-year transformation from a four-person firm is taking a risk neither of us should accept. A buyer who purchases Stage 0, sees the honest ceilings, and chooses to continue is a buyer who stays for Stage 3.')}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('Why Sequencing', 'The failure mode', 'is running everything at once.',
  'Fourteen AI projects, six teams, no single layer that governs any of it. This is the most common enterprise AI position in 2026, and it is how forty percent of agentic projects end up cancelled.', '', 'h2')}
${causes([
  ['Problem 01', 'Governance Retrofitted',
   'Systems are built, then someone asks who governs them. Adding provenance and authority limits afterwards means rebuilding, which nobody funds. So it does not happen.',
   '<strong>Sequenced:</strong> governance ships with the first system, and the model is reused.'],
  ['Problem 02', 'No Transferable Learning',
   'Six teams solve the same retrieval problem six different ways, because they ran in parallel and none of them finished first.',
   '<strong>Sequenced:</strong> department two inherits what department one proved.'],
  ['Problem 03', 'Value Unprovable',
   'Everything started at once, so there is no before-state to measure against. Eighteen months later nobody can say what the spend produced.',
   '<strong>Sequenced:</strong> each stage has a baseline, because the previous stage established it.']
])}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('One At A Time', 'We run one', 'transformation client.',
  'Not two. This is a constraint on our capacity, stated plainly rather than discovered by a client in month four.', '', 'h2')}
${note('What that means for you.',
  'If we are engaged, we will tell you when we can start rather than starting badly. If we are not, you get our full attention for the duration. A firm that takes four transformation clients with four people is describing something it cannot deliver.')}
  </div>
</section>

${cta('Start with Stage 0.', 'Decide about the rest later.',
  'Two weeks, fixed price. You get the roadmap, the honest ceilings per department, and the list of things we recommend against doing at all.',
  ['Book Stage 0', P + 'contact.html'], ['Department transformation', 'department-transformation.html'])}
`
}));

console.log('\nServices done.');
