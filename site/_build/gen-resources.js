const fs = require('fs');
const { page, secHead, rows, causes, note, cta } = require('./layout');
const W = (f, h) => { fs.writeFileSync(f, h); console.log('✓ ' + f); };

// ═══════════════════════════════════════════════ POSTS ═══
const POSTS = [
  {
    slug: 'why-detection-fails',
    date: '2026-09-10',
    dateLabel: '10 September 2026',
    read: '8 min',
    cat: 'Research',
    title: 'Why Prompt Injection Detection Fails By Construction',
    desc: 'Every defence that works by recognising an attack loses to the attack it has not seen. The argument, and what replaces it.',
    kw: 'prompt injection, AI security, detection vs prevention, capability security',
    lead: 'The entire prompt-injection industry is building classifiers. The approach has a structural problem that no amount of training data resolves.',
    body: `
    <div class="prose rv">
      <p>A detection-based defence works like this: an instruction arrives, a classifier scores it, and if the score crosses a threshold the instruction is blocked. The quality of the defence is the quality of the classifier.</p>

      <p>This is the same architecture as signature-based antivirus, and it has the same failure mode. A classifier recognises what resembles its training distribution. An attacker who produces something outside that distribution is not blocked \u2014 not because the classifier is badly built, but because recognition is the mechanism.</p>

      <h2>Three ways the boundary moves</h2>

      <p><strong>Rephrasing.</strong> The semantic content of an injection is stable; its surface form is not. \u201cIgnore previous instructions\u201d and a paragraph of plausible business context that arrives at the same outcome are the same attack and different strings.</p>

      <p><strong>Splitting.</strong> An instruction distributed across two documents is two innocuous fragments. The agent assembles them in context. The classifier sees each separately.</p>

      <p><strong>Indirection.</strong> The document does not contain the instruction. It contains a URL. The agent fetches it. Now the instruction is in context and it never passed through the classifier at all.</p>

      <p>None of these are clever. They are the first three things anyone tries.</p>

      <h2>The asymmetry</h2>

      <p>A defender must anticipate every variant. An attacker needs one that was not anticipated. This asymmetry is why signature-based approaches lost in every previous security domain, and there is no reason to expect a different outcome here.</p>

      <p>The usual response is that classifiers improve. They do. The variants also improve, and the attacker iterates faster because they receive immediate feedback on whether an attempt worked.</p>

      <h2>What removes the asymmetry</h2>

      <p>An instruction is only dangerous if the agent can act on it. The action requires a capability. If the capability was never granted, the instruction is inert regardless of how it is phrased.</p>

      <p>Consider an agent whose task is reconciling invoices. Observed across a hundred sessions, it reads the ledger, reads invoices, and writes a report. It has never sent an email. Its policy contains no email capability.</p>

      <p>An injected instruction now arrives: send the customer list to this address.</p>

      <p>The agent tries. The call reaches the enforcement layer. There is no send capability in the profile, so the call is denied.</p>

      <p><strong>Nothing was detected.</strong> No classifier scored the instruction. The enforcement layer never read it. The attack failed because the thing it needed did not exist.</p>

      <h2>What this does not solve</h2>

      <p>Being honest about the boundary matters more than the argument above.</p>

      <p>Capability removal does not help when the harmful action is inside the agent\u2019s legitimate scope. An agent whose job is sending email can be made to send the wrong email. Least privilege bounds the blast radius; it does not eliminate it.</p>

      <p>It does not help against composition paths that were approved. If reading customer data and calling a webhook are both required, the path exists and the policy permitted it. That is what composition analysis is for, and it is a separate mechanism.</p>

      <p>And it depends on learning the right policy. An over-broad profile is a permissive policy with extra steps.</p>

      <h2>The claim, precisely</h2>

      <p>Not that capability removal is a complete defence. That it is a defence whose failure mode is <em>an incorrect policy</em> rather than <em>an unfamiliar attack</em>.</p>

      <p>A wrong policy can be found by review. An unfamiliar attack cannot be found until it arrives.</p>
    </div>`
  },
  {
    slug: 'composition-escalation',
    date: '2026-09-03',
    dateLabel: '3 September 2026',
    read: '6 min',
    cat: 'Research',
    title: 'Two Safe Permissions Are Not A Safe Pair',
    desc: 'Identity systems evaluate permissions individually. The exfiltration path only exists in the combination, and nothing in the standard stack reports it.',
    kw: 'privilege escalation, capability composition, IAM limitations, data exfiltration',
    lead: 'Reading customer records is routine. Calling an external webhook is routine. Together they are a data-theft channel that nothing in your stack will flag.',
    body: `
    <div class="prose rv">
      <p>Access review is a per-permission activity. A reviewer sees a list, considers each entry, and decides whether this agent should have this capability. Both of the permissions above pass that review, correctly, because each has a legitimate use.</p>

      <p>The composition does not appear on the list. It is not a permission; it is a consequence of holding two.</p>

      <h2>Why this is structural, not an oversight</h2>

      <p>Every access control model in production evaluates a single subject-action-resource triple. RBAC assigns roles that contain permissions. ABAC evaluates attributes against a policy for one action. CIEM tools flag over-permissioning by comparing granted to used, still per permission.</p>

      <p>None of them ask what becomes reachable when two permissions are held simultaneously, because that question requires a graph rather than a list \u2014 and because in the pre-agent world, the question was mostly academic. A human with both permissions had to consciously combine them.</p>

      <p>An LLM agent composes tools at runtime based on what it reads. The combination is not a deliberate act. It is a normal Tuesday.</p>

      <h2>The four classes</h2>

      <p><strong>Read to egress.</strong> Any capability returning sensitive data, paired with any capability that moves bytes outside the boundary. Email, webhook, file write to a shared mount, a verbose log to a third-party sink.</p>

      <p><strong>Read to write-back.</strong> Read a credential or configuration value, then write it somewhere it becomes reachable. A ticket comment. A shared document. An environment variable another agent reads.</p>

      <p><strong>Enumerate to act.</strong> List every record, then perform a per-record action. Individually a lookup and an update. Combined, the ability to modify a table one row at a time without ever triggering a bulk-operation control.</p>

      <p><strong>Delegate to re-amplify.</strong> Hand a narrow capability to a sub-agent holding a different narrow capability. Neither completes the path alone. The chain does.</p>

      <p>The fourth is the one that surprises people, and it is why composition has to be evaluated across the delegation graph rather than per agent.</p>

      <h2>Analysis offline, enforcement inline</h2>

      <p>Building the reachability graph is expensive. Doing it per call would be unusable.</p>

      <p>It runs at policy-generation time instead. Every capability is classified by what it can read, write, enumerate or send. The graph is built once and the dangerous pairs enumerated.</p>

      <p>At runtime the check is cheap: track which capabilities this session has already exercised, and deny if invoking the next one would complete a blocked pair.</p>

      <p><strong>Order matters.</strong> Reading customer data is allowed. Calling the webhook is allowed. Calling the webhook <em>after</em> reading customer data, in the same session, is not.</p>

      <h2>Required paths</h2>

      <p>Some compositions are the job. A reporting agent legitimately reads data and sends it somewhere.</p>

      <p>Those do not get blocked \u2014 they get narrowed. Open egress becomes an allowlisted destination. The path survives in a form where the destination is fixed and an injected instruction cannot redirect it.</p>

      <p>That narrowing is a human decision made at approval time, with the path and its classification in front of the reviewer. It is not something the system decides on its own.</p>
    </div>`
  },
  {
    slug: 'ninety-four-to-six',
    date: '2026-08-27',
    dateLabel: '27 August 2026',
    read: '5 min',
    cat: 'Engineering',
    title: 'Ninety-Four Permissions, Six In Use',
    desc: 'Why agent permissions are so consistently over-granted, and what the gap actually costs.',
    kw: 'least privilege, agent permissions, over-permissioning, access control',
    lead: 'It is not negligence. The required permission set genuinely cannot be known at design time, and the cost of guessing wrong is asymmetric.',
    body: `
    <div class="prose rv">
      <p>The pattern is consistent enough to be predictable. An agent is granted broad access during development, ships, and is never re-scoped. Six months later it holds dozens of permissions and exercises a handful.</p>

      <p>Blaming the team is both unfair and unhelpful. Three structural reasons produce this, and none of them are laziness.</p>

      <h2>Runtime composition</h2>

      <p>A deterministic microservice can be scoped in advance because its call graph is fixed. You read the code and you know what it touches.</p>

      <p>An LLM agent decides which tools to invoke while running, based on what it reads. There is no design-time answer to scope against, because the answer depends on inputs that do not exist yet.</p>

      <h2>Asymmetric failure cost</h2>

      <p>Grant too few permissions and the agent fails visibly, in front of a user, during a demo. Grant too many and nothing happens \u2014 until it does, months later, in a way nobody connects back to the grant.</p>

      <p>Teams optimise for the visible failure. This is rational behaviour producing a bad outcome.</p>

      <h2>Review cadence versus change cadence</h2>

      <p>A new MCP server is added on Tuesday. The quarterly access review is in March. Nothing in between triggers a re-scope.</p>

      <p>For traditional services this mismatch was tolerable because the services changed slowly. Agent tooling changes weekly.</p>

      <h2>What the gap costs</h2>

      <p>An unused permission is not idle. It is available \u2014 to the agent, and to anything that can influence the agent.</p>

      <p>The practical measure is blast radius: if this agent is redirected by a poisoned document, what can it reach? With six permissions the answer is bounded and knowable. With ninety-four it is a research project.</p>

      <h2>Why learning rather than asking</h2>

      <p>The obvious alternative is to ask the team to declare what each agent needs. This produces a document that is wrong on the day it is written, because the team is guessing at the same unknowable thing.</p>

      <p>Observed behaviour is different. Across a hundred sessions of the same task class, the capabilities actually exercised are a fact rather than an estimate.</p>

      <p>Two guards make this usable. A capability enters the policy only above a support threshold and across a minimum number of distinct sessions \u2014 so one unusual run cannot introduce a permission. And the generated policy requires human approval, with the support level and session count printed next to every line.</p>

      <h2>The number that matters</h2>

      <p>Not the reduction percentage on its own. The reduction against task breakage.</p>

      <p>Eighty percent reduction with fifteen percent of tasks breaking is a control that gets switched off within a fortnight. The target is eighty percent reduction below five percent breakage, and the curve between those two numbers at varying thresholds is the real result.</p>

      <p>We have not yet measured that curve against production agents. When we have, it will be published \u2014 including the cases where it did not hold.</p>
    </div>`
  }
];

// Post pages
POSTS.forEach(p => {
  const others = POSTS.filter(o => o.slug !== p.slug).slice(0, 2);
  W(`resources/blog/posts/${p.slug}.html`, page({
    depth: 3, extraCss: 'home',
    title: `${p.title} | StartiQOS AI`,
    desc: p.desc, keywords: p.kw,
    canonical: `resources/blog/posts/${p.slug}.html`,
    schema: `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BlogPosting","headline":"${p.title}","description":"${p.desc}","datePublished":"${p.date}","author":{"@type":"Organization","name":"StartiQOS AI"},"publisher":{"@type":"Organization","name":"StartiQOS AI"}}
</script>`,
    body: `
<article class="section">
  <div class="wrap wrap--narrow">
    <div class="post__head rv">
      <p class="post__meta"><span class="post__cat">${p.cat}</span><span>${p.dateLabel}</span><span>${p.read} read</span></p>
      <h1 class="post__title">${p.title}</h1>
      <p class="post__lead">${p.lead}</p>
    </div>
  </div>
</article>

<section class="section--tight">
  <div class="wrap wrap--narrow">
${p.body}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap wrap--narrow">
    <p class="eyebrow rv">Continue reading</p>
    <div class="rows">
${others.map((o, n) => `      <div class="row rv">
        <p class="row__num">0${n + 1}</p>
        <h3 class="row__title"><a href="${o.slug}.html" class="post__link">${o.title}</a></h3>
        <p class="row__body">${o.desc}</p>
      </div>`).join('\n')}
    </div>
    <div class="sec-foot rv"><a class="link" href="../index.html">All posts <span>&rarr;</span></a></div>
  </div>
</section>

${cta('Find out what your agents', 'are actually allowed to do.',
  'Shadow mode runs for two weeks with no enforcement and no risk.',
  ['Book a shadow-mode pilot', '../../../contact.html'], ['See the control plane', '../../../platform/index.html'])}
`
  }));
});

// Blog index
W('resources/blog/index.html', page({
  depth: 2, extraCss: 'home',
  title: 'Blog — Research and Engineering Notes | StartiQOS AI',
  desc: 'Research and engineering notes on AI agent security, least-privilege enforcement, and composition-based privilege escalation.',
  keywords: 'AI agent security blog, prompt injection research, AI governance writing',
  canonical: 'resources/blog/index.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Blog', 'Research and', 'engineering notes.',
  'What we are working on, what we got wrong, and the arguments behind the architecture.',
  'We publish the reasoning rather than the conclusions, because the reasoning is the part you can check.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="postlist rv-stagger">
${POSTS.map(p => `      <a class="postcard" href="posts/${p.slug}.html">
        <p class="postcard__meta"><span class="post__cat">${p.cat}</span><span>${p.dateLabel}</span><span>${p.read}</span></p>
        <h2 class="postcard__title">${p.title}</h2>
        <p class="postcard__desc">${p.desc}</p>
        <span class="postcard__go">Read <span>&rarr;</span></span>
      </a>`).join('\n')}
    </div>
${note('Publishing cadence.',
  'We write when there is something worth writing, which is roughly monthly. There is no newsletter yet, because a newsletter with three subscribers is a mailing list.')}
  </div>
</section>
`
}));

// Documentation
W('resources/documentation/index.html', page({
  depth: 2, extraCss: 'home',
  title: 'Documentation — Integration and Reference | StartiQOS AI',
  desc: 'Integration guides, policy reference and API documentation for the StartiQOS agent authority control plane.',
  canonical: 'resources/documentation/index.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Documentation', 'Integration', 'and reference.',
  'How to deploy the control plane, what the policy format means, and how to read the attestation ledger.',
  'Full documentation opens with the first pilot. What follows is the structure and the integration outline.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Integration', 'One configuration line.', 'No agent code changes.',
  'The control plane is a transparent proxy. You point your agent at it and nothing else changes.', '', 'h2')}
    <div class="codeblock rv">
      <p class="codeblock__label">Before</p>
      <pre class="codeblock__pre">MCP_SERVER_URL = "https://mcp.internal.example.com"</pre>
    </div>
    <div class="codeblock rv">
      <p class="codeblock__label">After</p>
      <pre class="codeblock__pre">MCP_SERVER_URL = "http://startiqos-gateway:8080/mcp.internal.example.com"

# The gateway forwards to the original server.
# It does not modify prompts, responses, or tool schemas.
# Shadow mode is the default — nothing is enforced until a policy
# is generated and a named human approves it.</pre>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('Reference', 'What the', 'documentation covers.', 'Published in full when the first pilot begins.', '', 'h2')}
${rows([
  ['01', 'Deployment',
   'Docker and Kubernetes manifests, configuration reference, TLS termination, and the fail-open versus fail-closed decision per agent.'],
  ['02', 'Policy format',
   'The generated YAML, what every field means, how support and session thresholds are tuned, and how to hand-edit a policy when the learned one is wrong.'],
  ['03', 'Token format',
   'Biscuit tokens, the Datalog caveats we generate, and how attenuation works across a delegation chain. Includes verification without our infrastructure.'],
  ['04', 'Ledger and export',
   'Schema of the attestation ledger, how hash chaining and Merkle signing work, and the evidence bundle format for compliance export.'],
  ['05', 'Escalation integration',
   'Webhook and Slack integration for the escalate verdict, approval signing, and how one-shot grants are minted and expire.'],
  ['06', 'Protocol support',
   'MCP today. HTTP and REST tool interception next. A2A inter-agent protocol after that.']
])}
${note('Why it is not public yet.',
  'Documentation written before anyone has integrated is documentation written against assumptions. It opens with the first pilot, and the pilot shapes it.')}
  </div>
</section>

${cta('Be the first integration.', 'The documentation follows you.',
  'Shadow mode for two weeks, and the deployment guide gets written against what you actually needed.',
  ['Book a shadow-mode pilot', '../../contact.html'], ['See the platform', '../../platform/index.html'])}
`
}));

// Case studies
W('resources/case-studies/index.html', page({
  depth: 2, extraCss: 'home',
  title: 'Case Studies — Published With Client Permission | StartiQOS AI',
  desc: 'This page is empty. Case studies are published when real engagements complete, with client permission.',
  canonical: 'resources/case-studies/index.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Case Studies', 'This page', 'is empty.',
  'It is in the navigation so that you can see it is empty.',
  'Case studies are published when real engagements complete, with the client\u2019s permission, and with numbers they would confirm if you asked them.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="prose rv">
      <p>Most companies at our stage write case studies about hypothetical clients, or dress up an internal experiment as a deployment. It is a small dishonesty and everyone in the industry recognises it.</p>
      <p>We would rather have an empty page in the navigation than a full one that does not survive a question.</p>
      <p>When this page fills, each entry will carry the client\u2019s name where they permit it, the measured outcome, the honest ceiling we stated at the start, and whether we met it.</p>
      <p><strong>Including the engagements where we did not.</strong></p>
    </div>
${note('What we can show you instead.',
  'A working system in a live demonstration, the architecture in full detail, and the reasoning behind every design decision on this site. That is what exists, so that is what we offer.')}
  </div>
</section>

${cta('Be the first', 'case study.',
  'First engagements are discounted in exchange for a published case study \u2014 including the parts that did not go to plan.',
  ['Talk to us', '../../contact.html'], ['What we don\u2019t do', '../../about/what-we-dont-do.html'])}
`
}));

// FAQ
const FAQS = [
  ['What is agent authority enforcement?',
   'Agent authority enforcement limits what an AI agent can do by granting only the permissions its task requires, verified at runtime. Unlike detection-based security, which identifies and blocks malicious instructions, enforcement removes the capability entirely \u2014 so an injected instruction has nothing to invoke.'],
  ['How is this different from prompt injection detection?',
   'Detection works by recognising an attack pattern, which fails against attacks it has not seen. Capability removal does not depend on recognition. If a permission was never granted, no instruction can invoke it, regardless of how the instruction is phrased, encoded or split across documents.'],
  ['What is composition-based privilege escalation?',
   'Two permissions can each be safe individually and dangerous together. Reading customer records is routine. Calling an external webhook is routine. Combined, they form an exfiltration path. Identity and access management systems evaluate permissions one at a time and do not flag the combination.'],
  ['Does this slow my agents down?',
   'Authorisation decisions return in under a millisecond. The control plane sits in the call path, not the reasoning path \u2014 it does not add a model round trip. Token verification is offline, with no callback to an issuer, which is the main reason the decision fits inside that budget.'],
  ['What happens during the learning period?',
   'Shadow mode runs alongside your agents with no enforcement, so there is no operational risk. You receive a report showing which permissions each agent holds versus uses, and every composition path that could move data out. You then decide whether to enforce.'],
  ['Could an attacker poison what the system learns?',
   'It is the right question and it is the reason policy learning is not left unguarded. A capability enters a policy only above a support threshold and across a minimum number of distinct sessions, traces collected at high taint contribute proportionally less, and every generated policy requires human approval before taking effect.'],
  ['What if the learned policy breaks a legitimate task?',
   'Denial is not the only verdict. When an agent requests something outside its profile, the call pauses and a named human is notified. Approval mints a one-shot grant for that action, and the agent resumes. The exception is recorded as an exception rather than silently added to the policy.'],
  ['Do you need access to our data?',
   'No. The control plane is self-hosted and runs inside your environment. Traces record argument shapes and types \u2014 that a query had a table name and a row limit within range \u2014 never argument values. Your data is not in the telemetry by construction, not by policy.'],
  ['What frameworks do you support?',
   'MCP today, as a transparent proxy. HTTP and REST tool interception is next, and the A2A inter-agent protocol after that. The gateway does not care which agent framework you use, because it sits at the call boundary rather than inside your code.'],
  ['What is an autonomy ceiling?',
   'An autonomy ceiling is the honest upper limit on how much of a department\u2019s work can be automated, stated before an engagement begins. It describes the share of work hours automated, not decision authority \u2014 decisions remain with named humans. Our published figures are estimates from task-level analysis, revised as engagements complete.'],
  ['Why do you publish a fifty percent ceiling for legal operations?',
   'Because it is the honest number, and because a client who pays for a transformation that cannot deliver value becomes a reference against us. Advice and liability are the function of a legal team. Automating the document handling around them does not change that.'],
  ['Do you hold SOC 2 or ISO 27001?',
   'Not yet. We will not display a badge for a certification we have not been independently audited for. If your procurement process requires it today, we are not currently a fit and we would rather say so now.'],
  ['Where are you in your own build?',
   'The enforcement system runs with sub-millisecond decisions and a passing test suite, and the injection-blocking path works end to end. It has not yet been deployed in a customer\u2019s production environment, and we have not yet completed a services engagement. We will say so until both are true.'],
  ['What does a shadow-mode pilot cost?',
   'Nothing. Two weeks, one agent or several, no enforcement and no code changes beyond a configuration line. You receive the permission gap report and the composition analysis. If you decide not to proceed, you keep the report.']
];

W('resources/faq.html', page({
  depth: 1, extraCss: 'home',
  title: 'FAQ — Common Questions, Answered Plainly | StartiQOS AI',
  desc: 'What agent authority enforcement is, how it differs from detection, what a shadow-mode pilot involves, and where we are in our own build.',
  keywords: 'AI agent security FAQ, agent authorization questions, prompt injection protection',
  canonical: 'resources/faq.html',
  schema: `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${FAQS.map(([q, a]) =>
  `{"@type":"Question","name":${JSON.stringify(q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(a.replace(/\u2019/g, "'").replace(/\u2014/g, '-'))}}}`
).join(',')}]}
</script>`,
  body: `
<section class="section">
  <div class="wrap">
${secHead('Frequently Asked', 'Questions,', 'answered plainly.',
  'The ones that come up before people buy, including the ones with uncomfortable answers.',
  'If something is missing from this page, it is because nobody has asked it yet rather than because we are avoiding it.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap wrap--narrow">
    <div class="acc rv-stagger" data-acc-group>
${FAQS.map(([q, a]) => `      <div class="acc__item rv" data-acc-item data-open="false">
        <button class="acc__trigger" data-acc-trigger>${q}<span class="acc__icon"></span></button>
        <div class="acc__panel" data-acc-panel><p class="acc__body">${a}</p></div>
      </div>`).join('\n')}
    </div>
  </div>
</section>

${cta('Still have a question?', 'Ask it directly.',
  'We answer technical questions from people evaluating the product, whether or not they buy.',
  ['Contact us', '../contact.html'], ['See the platform', '../platform/index.html'])}
`
}));

console.log('\nResources done.');
