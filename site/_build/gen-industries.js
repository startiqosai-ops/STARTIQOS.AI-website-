const fs = require('fs');
const { page, secHead, rows, causes, note, cta } = require('./layout');
const W = (f, h) => { fs.writeFileSync(f, h); console.log('✓ ' + f); };
const D = 1, P = '../';

const IND = [
  {
    slug: 'ai-native-companies',
    nav: 'AI-Native Companies',
    title: 'AI Agent Security for AI-Native Companies | StartiQOS AI',
    desc: 'Agents in production touching customer data through MCP servers and tool APIs. Least-privilege enforcement without slowing them down.',
    kw: 'AI agent security, MCP security, agent permissions, AI startup security',
    h: 'Your agents are', ha: 'already in production.',
    lead: 'You shipped agents because they worked. Now they hold credentials to your database, your customers\u2019 data, and half a dozen third-party APIs \u2014 and nobody scoped any of it.',
    note: 'You are the segment feeling this first, because you built with agents rather than adding them.',
    fit: 'product',
    pains: [
      ['01', 'MCP servers you did not write',
       'Every MCP server your agent connects to ships tool descriptions that enter your agent\u2019s context. CVE-2025-6514 scored 9.6 on exactly this surface, and the postmark-mcp package shipped fifteen clean releases before adding exfiltration to the sixteenth.'],
      ['02', 'One credential, every table',
       'The agent has a service account because per-task scoping was going to take a sprint nobody had. It reads three tables and can read forty.'],
      ['03', 'Sub-agents nobody diagrammed',
       'The orchestrator spawns workers. The workers call tools. At hop three, the authority that exists is whatever was convenient at the time.'],
      ['04', 'A security review you cannot pass',
       'Your first enterprise customer asks what governs agent access. The honest answer is that nothing does, and that answer costs you the deal.']
    ],
    why: [
      ['Why us 01', 'It Does Not Slow Them Down',
       'Sub-millisecond decisions, no model round trip. The control plane sits in the call path, not the reasoning path.', ''],
      ['Why us 02', 'No Framework Lock-In',
       'A transparent proxy. One configuration line. It does not care whether you use LangChain, the OpenAI SDK, or something you wrote yourself.', ''],
      ['Why us 03', 'It Answers The Security Review',
       'An exportable ledger showing what each agent is permitted to do, who approved it, and every decision made. That is the artifact the review is asking for.', '']
    ],
    ctaT: 'Two weeks of shadow mode.', ctaA: 'No enforcement, no risk.',
    ctaS: 'You get the gap between permissions held and used, every composition path present today, and a ledger you can hand to a customer\u2019s security team.'
  },
  {
    slug: 'enterprise-it',
    nav: 'Enterprise IT',
    title: 'AI Governance for Enterprise IT — Fourteen Projects, No Layer | StartiQOS AI',
    desc: 'The average enterprise runs fourteen AI projects and fewer than half deliver measurable value. A governance layer across all of them.',
    kw: 'enterprise AI governance, AI project governance, shadow AI, enterprise IT AI security',
    h: 'Fourteen projects.', ha: 'No governing layer.',
    lead: 'Six teams built six things. Each is defensible on its own. Nothing sits across all of them, and the board has started asking what the spend produced.',
    note: 'Gartner expects forty percent of agentic AI projects to be cancelled by 2027, with governance gaps identified after production incidents.',
    fit: 'both',
    pains: [
      ['01', 'Nobody owns the aggregate',
       'Each project has an owner. The portfolio does not. When the question is \u201cwhat can our AI systems collectively reach,\u201d there is no one to ask and no place to look.'],
      ['02', 'Shadow agents',
       'A team stood something up on a corporate credential six months ago. It still runs. It is not in any inventory, and the person who built it has changed roles.'],
      ['03', 'Governance retrofitted, which means not at all',
       'Systems were built, then someone asked who governs them. Adding provenance and authority limits afterwards means rebuilding, which nobody funds.'],
      ['04', 'Value that cannot be proven',
       'Everything started at once, so there is no before-state to measure against. Eighteen months of spend and no defensible answer about what it returned.']
    ],
    why: [
      ['Why us 01', 'One Layer, Every Agent',
       'The control plane is framework-agnostic and sits at the call boundary. A project built by a team that has since disbanded is still governed by it.', ''],
      ['Why us 02', 'Discovery Before Enforcement',
       'Shadow mode inventories what exists before anything changes \u2014 including the agents nobody told you about.', ''],
      ['Why us 03', 'Sequenced Transformation',
       'For the services side, each department proves its governance before the next begins. That is how sprawl is prevented rather than cleaned up.', '']
    ],
    ctaT: 'Inventory first.', ctaA: 'Enforce after.',
    ctaS: 'Shadow mode produces the list of agents, what each can reach, and the composition paths across them. No enforcement until you decide.'
  },
  {
    slug: 'regulated-industries',
    nav: 'Regulated Industries',
    title: 'AI Governance for Regulated Industries — EU AI Act Ready | StartiQOS AI',
    desc: 'Financial services runs three times the median AI budget because regulation demands documented governance. Exportable evidence, not engineer traces.',
    kw: 'EU AI Act compliance, AI governance regulated industries, financial services AI, AI audit trail',
    h: 'Documented governance', ha: 'is not optional.',
    lead: 'Financial services runs roughly three times the median AI budget \u2014 not because the use cases are better, but because the regulatory environment demands documented AI governance.',
    note: 'EU AI Act Annex III obligations become enforceable in December 2027. Annex I follows in August 2028.',
    fit: 'both',
    pains: [
      ['01', 'Traces are not evidence',
       'Observability tools produce traces for engineers. An auditor is asking a different question and will not accept a debugging artifact as an answer.'],
      ['02', 'Attribution gaps',
       'An action was taken. Four systems were involved. Nothing connects it to the human who authorised the workflow, which is precisely what documented oversight requires.'],
      ['03', 'Human oversight, provable',
       'Saying a human is in the loop is not the same as producing the record of which human, at which point, approving what.'],
      ['04', 'A fixed deadline',
       'Unlike most security work, this one has a date attached. Procurement cycles in regulated firms run long enough that December 2027 is not far away.']
    ],
    why: [
      ['Why us 01', 'An Evidence Bundle, Not A Log',
       'Hash-chained, Merkle-signed, exportable. Every action carries its delegation chain, its approving human, and its verdict with the reason attached.', ''],
      ['Why us 02', 'Intent Binding',
       'Every chain terminates at a signed human intent. An action with no traceable human origin does not execute \u2014 which makes oversight a property of the system rather than a claim about it.', ''],
      ['Why us 03', 'Argument Shapes, Not Values',
       'The ledger records that a query had a table and a row limit within range. Not which rows. Your regulated data is not in the audit trail by construction.', '']
    ],
    ctaT: 'The deadline is fixed.', ctaA: 'The evidence takes time.',
    ctaS: 'Shadow mode produces a sample evidence bundle from your own agents, so your compliance function can assess the format before you commit to anything.'
  },
  {
    slug: 'healthcare',
    nav: 'Healthcare',
    title: 'AI Agent Security for Healthcare — Patient Data and Agent Access | StartiQOS AI',
    desc: 'Agents that must never exceed their scope, with an audit trail that records argument shapes rather than patient data.',
    kw: 'healthcare AI security, HIPAA AI agents, patient data AI governance, clinical AI safety',
    h: 'Patient data.', ha: 'Agents that must not exceed scope.',
    lead: 'Clinical and administrative AI touches the most tightly governed data category there is, and the consequence of an agent acting outside its scope is not a support ticket.',
    note: 'The audit trail records argument shapes and types, never argument values. Patient data is not in the telemetry by construction.',
    fit: 'both',
    pains: [
      ['01', 'Minimum necessary, enforced',
       'The principle already exists in your policies. What has not existed is a mechanism that applies it to an agent composing tool calls at runtime.'],
      ['02', 'Documents from outside the boundary',
       'Referral letters, faxed records, uploaded scans, payer correspondence. Every one is untrusted content entering an agent that also holds record access.'],
      ['03', 'Audit trails that contain what they audit',
       'A log that records the query also records the patient. The audit trail becomes a second copy of the data it was meant to govern.'],
      ['04', 'Vendors without the certifications',
       'You cannot deploy a control that has not been assessed. We do not hold SOC 2 yet, and we say so rather than implying otherwise.']
    ],
    why: [
      ['Why us 01', 'Taint Attenuation',
       'An agent that has just read an external document holds less authority than one that has not. Automatic, with no detection step to evade.', ''],
      ['Why us 02', 'Data-Free Telemetry',
       'Argument shapes and types only. This is a schema decision made at the start, not a redaction step bolted on later.', ''],
      ['Why us 03', 'Self-Hosted, Always',
       'Traces and enforcement stay inside your environment. There is no inbound connection from us and no dependency on our availability.', '']
    ],
    ctaT: 'Start where the risk', ctaA: 'is highest.',
    ctaS: 'Shadow mode on one agent, two weeks, no enforcement. You see exactly what it holds and what it uses before anything changes.'
  },
  {
    slug: 'b2b-saas',
    nav: 'B2B SaaS',
    title: 'AI Agent Security for B2B SaaS — Your Customers\u2019 Data, Your Review | StartiQOS AI',
    desc: 'Your product runs agents on customer data. Their security review is now your security review. An exportable governance artifact.',
    kw: 'B2B SaaS AI security, multi-tenant AI agents, SaaS security review, customer data AI',
    h: 'Your product runs agents', ha: 'on your customers\u2019 data.',
    lead: 'You added AI features and they worked. Now every enterprise deal includes a security review asking what governs those agents, and the honest answer determines whether the deal closes.',
    note: 'Your customers\u2019 security teams are asking the question. The artifact they want is a governance record, not an architecture diagram.',
    fit: 'both',
    pains: [
      ['01', 'Multi-tenant blast radius',
       'One agent, many customers\u2019 data. The scoping that prevents cross-tenant reach exists in application logic, which means it exists until someone refactors it.'],
      ['02', 'Customer content is untrusted content',
       'Your agent reads documents your customers uploaded. From the agent\u2019s perspective those documents are indistinguishable from instructions.'],
      ['03', 'The security questionnaire',
       'Forty questions, six about AI, and no good answer to any of the six. Every enterprise deal now includes this.'],
      ['04', 'Certifications you have and controls you do not',
       'SOC 2 covers your infrastructure. It says nothing about what your agents can reach, and buyers have started noticing the gap.']
    ],
    why: [
      ['Why us 01', 'Per-Tenant Authority',
       'Policies are learned per task class and bound per delegation chain. Cross-tenant reach becomes a capability that was never granted rather than a bug that was never written.', ''],
      ['Why us 02', 'An Artifact For The Review',
       'An exportable record showing what each agent may do, who approved it, and every decision taken. That is what the questionnaire is reaching for.', ''],
      ['Why us 03', 'Deployed In Your Stack',
       'Self-hosted. Your customers\u2019 data does not reach us, which is the first question their security team will ask.', '']
    ],
    ctaT: 'Answer the six questions', ctaA: 'before they are asked.',
    ctaS: 'Shadow mode produces the governance record for your agents in two weeks, with no enforcement and no change to your product.'
  },
  {
    slug: 'marketplaces-d2c',
    nav: 'Marketplaces &amp; D2C',
    title: 'AI Systems for Marketplaces and D2C — Support and Operations at Volume | StartiQOS AI',
    desc: 'Support and operations automation where real money and real customers are involved. Bounded systems with sources attached.',
    kw: 'ecommerce AI, D2C automation, marketplace AI operations, customer support AI',
    h: 'Real money.', ha: 'Real customers.',
    lead: 'Support and operations automation at volume, where a wrong answer reaches a customer immediately and a wrong action moves money.',
    note: 'Most of what you need here is the services side \u2014 systems built bounded from the start, rather than enforcement bolted onto agents you already shipped.',
    fit: 'services',
    pains: [
      ['01', 'Support agents that invent policy',
       'The refund window is fourteen days. The agent said thirty because retrieval returned nothing and it answered anyway. The customer has a screenshot.'],
      ['02', 'Operations knowledge nobody wrote down',
       'Exception handling, supplier quirks, which SKUs cannot be split across shipments. It lives with whoever has been there longest.'],
      ['03', 'Actions with financial consequence',
       'Issuing refunds, adjusting inventory, cancelling orders. Each is routine and each is irreversible in a way a support answer is not.'],
      ['04', 'Volume that makes review impossible',
       'Four hundred AI-handled conversations a day. Nobody can read them, so nobody knows what the error rate is.']
    ],
    why: [
      ['Why us 01', 'Retrieval That Refuses',
       'When the policy document does not cover the question, the system says so instead of producing a plausible answer. That single behaviour removes most of the risk.', ''],
      ['Why us 02', 'Consequence-Weighted Sampling',
       'You cannot review four hundred conversations. You can review the ones that touched a refund. Sampling weighted by what the action could cost.', ''],
      ['Why us 03', 'Authority Limits On Money',
       'Refunds above a threshold escalate to a human rather than executing. The limit is a property of the system, not a line in a prompt.', '']
    ],
    ctaT: 'Start with the', ctaA: 'knowledge system.',
    ctaS: 'Five to six weeks. Retrieval over your actual policies, with sources attached and a refusal when the evidence is not there.'
  },
  {
    slug: 'agencies',
    nav: 'Agencies',
    title: 'AI Delivery for Agencies — Your Clients\u2019 Governance Question | StartiQOS AI',
    desc: 'You deliver AI for clients. Their governance question becomes your deliverable. White-label enforcement and a governance record per client.',
    kw: 'agency AI delivery, AI consulting governance, client AI systems, white label AI security',
    h: 'You deliver AI.', ha: 'Their governance question is yours.',
    lead: 'You build AI systems for clients. Increasingly, the thing that decides whether the project is accepted is not whether it works \u2014 it is whether its governance can be demonstrated.',
    note: 'The governance record becomes a deliverable you can charge for, rather than an objection you have to handle.',
    fit: 'both',
    pains: [
      ['01', 'Handover without a governance story',
       'The system works. The client\u2019s security team asks what governs it. The project stalls in acceptance while you assemble something after the fact.'],
      ['02', 'Client credentials in your build',
       'You were given broad access to ship on time. That access is now embedded in a system running in their environment, and nobody has revisited it.'],
      ['03', 'Repeating the same work per client',
       'Every client asks the same governance questions. Every time, you answer from scratch.'],
      ['04', 'Liability after handover',
       'The system misbehaves eight months later. The question of who scoped its permissions has a name attached to it, and the name is yours.']
    ],
    why: [
      ['Why us 01', 'A Deliverable, Not An Objection',
       'The governance record ships with the system. It becomes a line item rather than a delay in acceptance.', ''],
      ['Why us 02', 'Reusable Across Clients',
       'Task-class policies transfer. The second client\u2019s support-triage agent inherits what the first one\u2019s taught the system.', ''],
      ['Why us 03', 'Scoped Handover',
       'Least-privilege policies mean the access you were given for the build is not the access the system keeps. That boundary is documented and dated.', '']
    ],
    ctaT: 'Ship governance', ctaA: 'with the system.',
    ctaS: 'Run shadow mode on one client project. The record it produces is the thing their security review has been asking for.'
  },
  {
    slug: 'startups',
    nav: 'Startups',
    title: 'AI-Native from Day One — Agent Security for Startups | StartiQOS AI',
    desc: 'Build with scoped agents before permission sprawl becomes a rewrite. The cheapest time to do this is now.',
    kw: 'startup AI security, AI-native startup, early stage AI governance, agent permissions startup',
    h: 'The cheapest time', ha: 'is before you have sprawl.',
    lead: 'You are building AI-native. Right now your agent has one credential and four tools, and scoping it properly is an afternoon. In eighteen months it is a rewrite.',
    note: 'Most of this page is about timing rather than urgency. You probably do not need enforcement today. You will, and the decision you make now determines what it costs.',
    fit: 'product',
    pains: [
      ['01', 'The service account that never gets narrowed',
       'You gave it broad access to ship. Everyone does. The problem is that nothing ever triggers a review, so it is still broad at Series A.'],
      ['02', 'Your first enterprise deal',
       'They will ask what governs agent access. You are two years from having a security team, and the answer still has to exist.'],
      ['03', 'Architecture that assumes trust',
       'Agents calling agents, with authority passed implicitly. Retrofitting attenuation into a system that assumed it was unnecessary is expensive.'],
      ['04', 'Nobody to own it',
       'There is no security engineer. There will not be one for a while. Whatever you adopt has to work without someone tending it.']
    ],
    why: [
      ['Why us 01', 'Shadow Mode Is Free To Try',
       'Two weeks, no enforcement, no code changes. Worst case you learn what your agents actually hold, which is worth knowing regardless.', ''],
      ['Why us 02', 'It Scales With You',
       'The policy model does not change when you go from four agents to forty. What changes is how much it saves you.', ''],
      ['Why us 03', 'An Answer For The Deal',
       'The governance record is the artifact that unblocks an enterprise security review. Having it early is a sales advantage, not just hygiene.', '']
    ],
    ctaT: 'Find out what your agent', ctaA: 'can currently reach.',
    ctaS: 'Two weeks of shadow mode. If the answer is \u201cnot much,\u201d you have lost nothing and gained a document. If it is not, you found out cheaply.'
  },
  {
    slug: 'smes',
    nav: 'SMEs',
    title: 'First AI Systems, Built Properly — For SMEs | StartiQOS AI',
    desc: 'Your first AI systems, built with sources and limits from the start rather than retrofitted later.',
    kw: 'SME AI adoption, small business AI, first AI system, AI implementation SME',
    h: 'Your first AI systems.', ha: 'Built properly.',
    lead: 'You are adopting AI for the first time. The question is not which model \u2014 it is whether what you build can be trusted by the people who have to use it.',
    note: 'The product side is probably not for you yet. The services side is, and it is where most of the value at this stage sits.',
    fit: 'services',
    pains: [
      ['01', 'A tool that answers confidently and wrongly',
       'Someone tried ChatGPT on a company question and got a fluent, incorrect answer. Now half the team does not trust any of it, which is a reasonable response.'],
      ['02', 'Knowledge in three people\u2019s heads',
       'When one of them is on leave, the work slows. This is the problem AI can actually solve here, and it is not the one most vendors lead with.'],
      ['03', 'No one to run it afterwards',
       'You do not have an AI team. Whatever gets built has to be operable by the people already here.'],
      ['04', 'Budget that does not stretch to a mistake',
       'A failed AI project at enterprise scale is a write-off. At your scale it is the whole year\u2019s discretionary spend.']
    ],
    why: [
      ['Why us 01', 'It Refuses Rather Than Guesses',
       'The single behaviour that rebuilds trust: when the system does not know, it says so. Once that is true, people start using it.', ''],
      ['Why us 02', 'We Hand It Over And Leave',
       'Documentation, the sampling process, and training for whoever owns it. We do not stay on as a dependency.', ''],
      ['Why us 03', 'We Will Tell You Not To',
       'If the honest ceiling does not justify the cost, that is the audit finding. You pay for the audit and keep your budget.', '']
    ],
    ctaT: 'Start with the audit.', ctaA: 'It is separable.',
    ctaS: 'Two weeks, fixed price. You get the honest ceiling for the process you care about most, and the cost of reaching it. Some businesses should stop there.'
  }
];

const FIT = {
  product: ['Control Plane', 'This page is mostly about the product. The services are available, but enforcement is what this segment needs first.'],
  services: ['Implementation', 'This page is mostly about the services. The control plane matters later, once agents are in production.'],
  both: ['Product and Services', 'Both sides apply here. Enforcement for what is already running, implementation for what comes next.']
};

IND.forEach(i => {
  const [fitLabel, fitNote] = FIT[i.fit];
  W(`industries/${i.slug}.html`, page({
    depth: D, extraCss: 'home',
    title: i.title, desc: i.desc, keywords: i.kw,
    canonical: `industries/${i.slug}.html`,
    body: `
<section class="section">
  <div class="wrap">
${secHead(i.nav, i.h, i.ha, i.lead, i.note)}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('What We Hear', 'The four things', 'that come up every time.',
  'Not hypotheticals. These are the positions teams in this segment describe when asked what they are actually worried about.', '', 'h2')}
${rows(i.pains)}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Fit', 'Why this', 'applies here.', fitNote, '', 'h2')}
${causes(i.why)}
    <div class="sec-foot rv" style="display:flex;gap:12px;flex-wrap:wrap">
      <a class="btn btn--ghost" href="${P}platform/index.html">See the control plane <span class="btn__arrow">&rarr;</span></a>
      <a class="btn btn--ghost" href="${P}services/index.html">See the services <span class="btn__arrow">&rarr;</span></a>
    </div>
  </div>
</section>

${cta(i.ctaT, i.ctaA, i.ctaS,
  ['Talk to us', P + 'contact.html'], ['What we don\u2019t do', P + 'about/what-we-dont-do.html'])}
`
  }));
});

console.log('\nIndustries done.');
