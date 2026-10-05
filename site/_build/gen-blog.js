const fs = require('fs');
const { page, secHead, note, cta } = require('./layout');
const W = (f, h) => { fs.writeFileSync(f, h); console.log('✓ ' + f); };

const POSTS = [
  {
    slug: 'stop-blaming-your-security-team',
    date: '2026-09-06',
    dateLabel: '6 September 2026',
    read: '7 min',
    cat: 'Perspective',
    title: 'Stop Blaming Your Security Team for AI Agent Breaches',
    desc: 'The real problem is not effort. Nobody could have set the right permissions, because the system does not allow it.',
    kw: 'AI agent breach, security team, agent permissions, post-incident review, least privilege',
    lead: 'Post-incident reviews of AI agent breaches routinely ask the wrong question. The right one changes what a durable fix looks like.',
    body: `
      <p>Post-incident reviews of AI agent breaches routinely ask the wrong question. Organisations ask who approved this agent's access &mdash; a diligence question suited to conventional systems, where permissions are fixed and enumerable.</p>

      <p>AI agents break that assumption. They compose their actions at runtime, so the correct permission set cannot be known in advance. This is not a failure of process discipline. It is a structural limitation of asking a person to predict behaviour that has not yet occurred.</p>

      <h2>The instinct to blame, and why it misdiagnoses the problem</h2>

      <p>When an AI agent causes damage &mdash; a data leak, an unauthorised action, a manipulated decision &mdash; the first question inside most organisations is: who approved this agent's access?</p>

      <p>It is the natural question to ask. It is also the wrong one.</p>

      <p>In the large majority of cases, the answer is not negligence. It is that the person configuring the agent's permissions was asked to do something that is not actually achievable: predict, in advance, the exact set of actions an autonomous system will decide to take once deployed.</p>

      <h2>Why this differs from every other access decision</h2>

      <div class="codeblock">
        <p class="codeblock__label">How the permission set is determined</p>
        <pre class="codeblock__pre">HUMAN EMPLOYEE
  Determined by   fixed role, known responsibilities
  Predictability  high — reviewable and stable

CONVENTIONAL APPLICATION
  Determined by   fixed at build time, visible in code
  Predictability  high — the binary defines the ceiling

AI AGENT
  Determined by   composed at runtime, from task and data encountered
  Predictability  low — a property of behaviour, not of code</pre>
      </div>

      <p>An AI agent's permission requirement is not a property of its code. It is a property of what it actually does, which cannot be known until it is already doing it. The same agent, given identical starting access, may call three tools on one run and twelve on the next, depending entirely on the task and the data it encounters along the way.</p>

      <p>Faced with this, organisations have effectively two options. Restrict the agent almost entirely, which defeats the purpose of deploying it. Or grant broad standing access and monitor for problems after the fact, which most teams choose &mdash; not out of carelessness, but because it is the only workable option available with current tooling.</p>

      <p><strong>Choosing the second is a rational response to an unsolved tooling gap.</strong> It is not a diligence failure, and treating it as one leads organisations toward fixes that do not address the actual cause.</p>

      <h2>Why the standard post-incident response does not close the gap</h2>

      <p>The typical organisational response to an agent-related incident is to tighten the manual approval process: additional sign-offs, more documentation, longer review cycles.</p>

      <p>This does not solve the underlying problem. It makes the guess more expensive to produce. It does not make it more accurate. The permission set is still being authored by a person under the same fundamental uncertainty as before; the process is simply slower.</p>

      <p>The correct question is not "who approved this access."</p>

      <p>The correct question is: <em>what is the minimum set of permissions this specific task actually requires, and how would we determine that without asking a person to predict it in advance?</em></p>

      <h2>Toward a different category of solution</h2>

      <p>That reframing points to a different approach entirely: deriving the policy from observed behaviour, rather than authoring it under uncertainty.</p>

      <p>The mechanism, at a conceptual level. Observe what a defined task class genuinely requires over a bounded, controlled observation period. Treat that observed evidence &mdash; not a person's best guess &mdash; as the basis for the permission boundary. Update the boundary as behaviour is re-observed, rather than fixing it once and reviewing it only after an incident.</p>

      <p><strong>This shifts the burden from prediction to measurement</strong> &mdash; a category of problem organisations are far better equipped to solve reliably.</p>

      <h2>Implications for risk and governance functions</h2>

      <p>This distinction changes how an organisation should evaluate its own exposure. If the current basis for agent permissions is "a person wrote a policy based on their best understanding of what the agent might need," that policy is only ever as accurate as that person's ability to predict runtime behaviour &mdash; a ceiling defined by the nature of the problem, not by the competence of the person doing the work.</p>

      <p>The fix is not a better analyst or a stricter checklist.</p>

      <p><strong>The fix is a different source for the policy altogether.</strong></p>`
  },
  {
    slug: 'access-control-gap-ai-native',
    date: '2026-08-24',
    dateLabel: '24 August 2026',
    read: '8 min',
    cat: 'Research',
    title: 'The Access Control Gap in AI-Native Architectures',
    desc: 'Conventional IAM was architected for human users at predictable entry points. Multi-agent systems are a different problem, not an extension of the same one.',
    kw: 'multi-agent security, delegation chains, confused deputy, IAM limitations, AI-native architecture',
    lead: 'As agents move from experimental deployments to core infrastructure, a structural gap has emerged that conventional identity frameworks were never designed to address.',
    body: `
      <p>As AI agents move from experimental deployments to core operational infrastructure, a structural gap has emerged in how organisations approach access management &mdash; one that conventional identity and access frameworks were never designed to address.</p>

      <h2>The shift enterprises are underestimating</h2>

      <p>Identity and access management, as practised across most enterprises today, was architected for a world of human users interacting with systems through predictable, discrete entry points. That architecture assumed a bounded number of identities, human-speed interaction patterns, and access decisions made at the point of authentication rather than continuously, per action.</p>

      <p>AI-native organisations operate under fundamentally different conditions. Agents do not merely supplement the human workforce &mdash; in many operational models they constitute the majority of active identities within a system. They initiate calls to other agents. They compose multi-step workflows without human intervention at each step. A single user-initiated request can traverse a chain of ten or more agent-to-agent invocations before resolution.</p>

      <p><strong>This is not an incremental extension of existing access models. It is a different problem.</strong></p>

      <h2>Delegation chains: the structural vulnerability</h2>

      <p>The critical distinction is this. Traditional access control answers the question of whether an identity is authorised to perform an action. Multi-agent systems require answering a more complex question &mdash; whether an identity is authorised to perform an action <em>on behalf of a chain of prior delegations</em>, each of which may have granted privilege in a context the current action was never intended to serve.</p>

      <div class="codeblock">
        <p class="codeblock__label">Privilege inherited across a chain</p>
        <pre class="codeblock__pre">USER REQUEST
    │
    ▼
ORCHESTRATOR        holds broad standing access
    │
    ▼
RESEARCH AGENT      inherits the invoking credential
    │
    ▼
WRITER AGENT        three hops from the request

Effective access at hop three is whatever was
convenient at hop one. No individual link in the
chain was designed to grant it.</pre>
      </div>

      <p>This is the mechanism behind confused-deputy vulnerabilities in agentic systems: privilege inherited across a delegation chain, expanding implicitly at each hop, until an agent several calls removed from the original request holds effective access that no individual link in that chain was designed to grant.</p>

      <p>Static, role-based permission models do not account for this dynamic. They were not built to. The result is a class of exposure that scales precisely as organisations scale their agent deployments &mdash; the more sophisticated the automation, the larger the latent attack surface, unless the access model is designed to constrain it by default.</p>

      <h2>Requirements for a delegation-aware access model</h2>

      <p>Organisations building or scaling multi-agent systems require an access architecture with four characteristics that conventional IAM does not provide.</p>

      <p><strong>Granular sub-agent identity.</strong> Each agent within a delegation chain requires a distinct, scoped identity and permission set, rather than inheriting a shared credential from the identity that invoked it.</p>

      <p><strong>Attenuation by design.</strong> Privilege should narrow monotonically as it propagates through a delegation chain. An agent receiving a delegated task should hold access scoped precisely to that task &mdash; never the full privilege set of the agent that delegated to it.</p>

      <p><strong>Sub-millisecond evaluation at scale.</strong> In systems where delegation chains execute multiple agent-to-agent calls per user-facing request, access verification must introduce negligible latency. Authorisation architecture that measurably slows execution becomes untenable at production volume.</p>

      <p><strong>Full-chain auditability.</strong> Incident response requires more than identifying which agent performed an action. It requires reconstructing the complete delegation path &mdash; the sequence of invocations, the scope granted at each stage, and the point at which access was exercised.</p>

      <h2>The cost of deferral</h2>

      <p>Organisations early in their AI-native buildout often treat this as a future problem, to be addressed once agent fleets and delegation complexity have grown large enough to justify the investment.</p>

      <p>This calculus inverts the actual risk profile. Access architecture is materially less costly to establish correctly during early-stage buildout than to retrofit once agent populations, integration surfaces and delegation patterns have scaled. <strong>Each additional agent deployed on a flat-trust foundation increases the eventual cost and disruption of remediation.</strong></p>

      <p>Organisations that establish delegation-aware access control while chain complexity remains manageable avoid the far more expensive proposition of migrating a mature, production-scale agent architecture under pressure.</p>

      <h2>A different starting premise</h2>

      <p>The core shift required is not additive. It is not another layer of tooling placed atop existing infrastructure. It is a different premise entirely: <strong>access is not a static grant assigned once to an identity and carried forward through every subsequent action.</strong> It is a continuous evaluation, scoped narrowly at every point of delegation, constrained to be no broader than the privilege that preceded it.</p>

      <p>For organisations where AI agents remain a peripheral capability, this distinction may be immaterial. For organisations where agents constitute the operational core, it is the foundation on which system integrity depends.</p>

      <p>The question worth resolving now, while delegation chains remain short and system complexity remains manageable, is straightforward: does your access architecture assume an agent inherits the privilege of whoever invoked it &mdash; and if so, is that assumption one your organisation can afford to carry forward at scale?</p>`
  }
];

// ── Post pages ──
POSTS.forEach(p => {
  const others = POSTS.filter(o => o.slug !== p.slug);
  W(`resources/blog/posts/${p.slug}.html`, page({
    depth: 3,
    title: `${p.title} | StartiQOS AI`,
    desc: p.desc, keywords: p.kw,
    canonical: `resources/blog/posts/${p.slug}.html`,
    schema: `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BlogPosting","headline":${JSON.stringify(p.title)},"description":${JSON.stringify(p.desc)},"datePublished":"${p.date}","author":{"@type":"Person","name":"Shashwat Sharma","affiliation":{"@type":"Organization","name":"StartiQOS AI"}},"publisher":{"@type":"Organization","name":"StartiQOS AI"}}
</script>`,
    body: `
<article class="section">
  <div class="wrap wrap--narrow">
    <div class="post__head rv">
      <p class="post__meta"><span class="post__cat">${p.cat}</span><span>${p.dateLabel}</span><span>${p.read} read</span></p>
      <h1 class="post__title">${p.title}</h1>
      <p class="post__lead">${p.lead}</p>
      <p class="post__by">Shashwat Sharma &middot; <span>Founder, Product &amp; Architecture</span></p>
    </div>
  </div>
</article>

<section class="section--tight">
  <div class="wrap wrap--narrow">
    <div class="prose rv">
${p.body}
    </div>

${note('Part of an ongoing series.',
  'This is one of a continuing set of research and build notes from StartiQOS AI on delegated authority and least-privilege enforcement in multi-agent systems.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap wrap--narrow">
    <p class="eyebrow rv">Continue reading</p>
    <div class="postlist rv-stagger" style="margin-top:28px">
${others.map(o => `      <a class="postcard" href="${o.slug}.html">
        <p class="postcard__meta"><span class="post__cat">${o.cat}</span><span>${o.dateLabel}</span><span>${o.read}</span></p>
        <h2 class="postcard__title">${o.title}</h2>
        <p class="postcard__desc">${o.desc}</p>
        <span class="postcard__go">Read <span>&rarr;</span></span>
      </a>`).join('\n')}
    </div>
    <div class="sec-foot rv"><a class="link" href="../index.html">All posts <span>&rarr;</span></a></div>
  </div>
</section>

${cta('Find out what your agents', 'are actually allowed to do.',
  'Shadow mode runs for two weeks with no enforcement and no risk. You keep the report whether or not you proceed.',
  ['Book a shadow-mode pilot', '../../../contact.html'], ['See the control plane', '../../../platform/index.html'])}
`
  }));
});

// ── Blog index ──
W('resources/blog/index.html', page({
  depth: 2,
  title: 'Blog — Research and Engineering Notes | StartiQOS AI',
  desc: 'Research and engineering notes on delegated authority, least-privilege enforcement, and access control in multi-agent AI systems.',
  keywords: 'AI agent security blog, delegation chains, least privilege AI, multi-agent security research',
  canonical: 'resources/blog/index.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Blog', 'Research and', 'engineering notes.',
  'An ongoing series on delegated authority and least-privilege enforcement in multi-agent AI systems. We publish the reasoning rather than the conclusions, because the reasoning is the part you can check.')}
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

console.log('\nBlog rebuilt with real articles.');
