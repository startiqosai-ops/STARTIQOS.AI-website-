const fs = require('fs');
const { page, secHead, rows, causes, note, cta } = require('./layout');

const W = (f, html) => { fs.writeFileSync(f, html); console.log('✓ ' + f); };
const D = 1, P = '../';

// ═══════════════════════════════════════════════ OVERVIEW ═══
W('platform/index.html', page({
  depth: D, extraCss: 'home',
  title: 'Control Plane Overview — Agent Authority Enforcement | StartiQOS AI',
  desc: 'The StartiQOS control plane sits between your AI agents and everything they can reach. Least-privilege enforcement, composition analysis and runtime verification in under a millisecond.',
  keywords: 'AI agent control plane, agent authorization, least privilege AI, MCP security, runtime enforcement',
  canonical: 'platform/index.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('The Platform', 'One control plane.', 'Six enforcement layers.',
  'It sits between your agent and everything it can reach \u2014 your model provider, your MCP servers, your APIs, your database.',
  'Every call is checked against the authority that agent actually holds. Decisions return in under a millisecond, and every denial is recorded with its reason.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="codeblock rv">
      <p class="codeblock__label">Where it sits</p>
      <pre class="codeblock__pre">  YOUR AGENT
      │
      │  every tool call, every model call
      ▼
  ┌─────────────────────────────────────────┐
  │   STARTIQOS CONTROL PLANE               │
  │                                         │
  │   verify delegation chain               │
  │   check capability against policy       │
  │   evaluate composition reachability     │
  │   apply taint attenuation               │
  │                                         │
  │   → allow  ·  escalate  ·  deny         │
  └─────────────────────────────────────────┘
      │
      ▼
  MCP SERVERS  ·  APIs  ·  DATABASE  ·  SaaS
      │
      ▼
  ATTESTATION LEDGER  (hash-chained, exportable)</pre>
    </div>

${note('No agent code changes.',
  'The control plane is a transparent proxy. You point your agent at it with one configuration line. It does not modify prompts, does not add a model round trip, and does not require your framework to support anything specific.')}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Six Layers', 'What each layer', 'actually does.',
  'Each layer answers a question the others cannot. Together they define what an agent is permitted to do.',
  '', 'h2')}
${rows([
  ['01', 'Learned Least-Privilege',
   'Static policies cannot keep up with agents whose tools change weekly. We learn task classes from observed execution, derive the capabilities each genuinely requires, and generate a candidate policy. A named human approves it before it takes effect.'],
  ['02', 'Composition &amp; Reachability Analysis',
   'Permissions are evaluated in combination, not one at a time. We map which capability pairs create a reachable path to data movement, credential access or irreversible action \u2014 and block the path rather than the individual grant.'],
  ['03', 'Monotonic Delegation',
   'When one agent hands work to another, the delegated authority is verified to be equal to or narrower than its parent. Authority can shrink down a chain. It can never grow, even if a downstream agent is fully compromised.'],
  ['04', 'Provenance &amp; Taint Tracking',
   'We track where an agent\u2019s context came from. The more untrusted material it has read \u2014 external documents, web content, other agents\u2019 output \u2014 the narrower its authority becomes, automatically. Exposure attenuates permission.'],
  ['05', 'Poisoning-Resistant Policy Learning',
   'A system that learns from behaviour can be taught the wrong thing. An attacker feeding synthetic activity during the learning window could permanently widen a policy. We detect, down-weight and filter suspicious observations before they influence anything.'],
  ['06', 'Runtime Verification',
   'At the moment of the call, the delegation chain, the declared intent, the provenance state and the capability set are verified together. The answer is allow, escalate to a human, or deny \u2014 with the reason recorded in an append-only ledger.']
])}
    <div class="sec-foot rv">
      <a class="link" href="least-privilege.html">Start with least-privilege enforcement <span>&rarr;</span></a>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Deployment', 'It runs inside', 'your environment.',
  'Traces and enforcement stay within your boundary. Security teams do not route agent tool calls through a third party, and we do not ask them to.',
  '', 'h2')}
${causes([
  ['Self-hosted', 'Single Binary',
   'One binary and one configuration file, deployed in your VPC or cluster. No inbound connection from us, no dependency on our availability.',
   '<strong>Failure mode is configurable.</strong> Fail-open or fail-closed, per agent.'],
  ['Data', 'Nothing Leaves',
   'Traces record argument shapes and types, never argument values. Your data is not in the telemetry by construction, not by policy.',
   '<strong>Anonymisable by design.</strong> This is a schema decision, not a setting.'],
  ['Performance', 'Under A Millisecond',
   'Token verification is offline \u2014 no callback to an issuer, no network hop in the decision path. Written in Rust for this reason.',
   '<strong>Benchmarks published.</strong> We will not ask you to take latency on trust.']
])}
  </div>
</section>

${cta('Find out what your agents', 'are actually allowed to do.',
  'Shadow mode runs for two weeks with no enforcement and no risk. You get the gap between permissions held and permissions used, and every composition path that could move data out.',
  ['Book a shadow-mode pilot', P + 'contact.html'], ['See the services', P + 'services/index.html'])}
`
}));

// ═══════════════════════════════════════ LEAST PRIVILEGE ═══
W('platform/least-privilege.html', page({
  depth: D, extraCss: 'home',
  title: 'Least-Privilege Enforcement for AI Agents | StartiQOS AI',
  desc: 'Your agent holds ninety-four permissions and uses six. We learn the minimum each task requires from observed behaviour, and enforce it at every call.',
  keywords: 'least privilege AI agents, AI agent permissions, agent access control, over-permissioning',
  canonical: 'platform/least-privilege.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Layer 01', 'Ninety-four permissions.', 'Six in use.',
  'Scoping permissions per task is slow, so teams grant broad access and move on. The unused ones are not idle \u2014 they are available.',
  'An agent that can read every table, call every endpoint and send every email is one poisoned document away from doing all three on someone else\u2019s behalf.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('The Problem', 'Why nobody scopes', 'agent permissions properly.',
  'It is not negligence. It is that the required permission set genuinely cannot be known at design time.', '', 'h2')}
${rows([
  ['01', 'An agent composes tools at runtime',
   'A deterministic microservice can be scoped in advance because its call graph is fixed. An LLM agent decides which tools to invoke while it is running, based on what it reads. There is no design-time answer to scope it against.'],
  ['02', 'The cost of being wrong is asymmetric',
   'Too few permissions and the agent fails visibly in front of a user. Too many and nothing happens \u2014 until it does. Teams optimise for the visible failure, which means they over-grant.'],
  ['03', 'Tools change faster than policy reviews',
   'A new MCP server is added on Tuesday. The quarterly access review is in March. In between, nobody re-scopes anything.']
])}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Method', 'Learn what it needs.', 'Enforce exactly that.',
  'We observe first, derive second, and enforce only after a human has approved the result.', '', 'h2')}
${rows([
  ['01', 'Task-class grouping',
   'Profiles are learned per task class \u2014 <span class="mono">invoice_reconciliation</span>, <span class="mono">ticket_triage</span> \u2014 not per agent instance. The same agent doing two jobs gets two profiles, and a new agent doing a known job inherits one.'],
  ['02', 'Capability mining with support thresholds',
   'A capability enters the policy only if it appears above a support threshold <em>and</em> across a minimum number of distinct sessions. One unusual run cannot introduce a permission.'],
  ['03', 'Argument constraint induction',
   'Beyond which tool, we learn the shape of its arguments \u2014 numeric ranges, string enums, path prefixes \u2014 and compile those into the policy. Read access to the ledger becomes read access with a row limit.'],
  ['04', 'Human approval before enforcement',
   'The generated policy is human-readable, with a justification line on every capability: support level, session count, and the observed taint bound. A security engineer can answer \u201cwhy is this here?\u201d without reading model internals.']
])}

    <div class="codeblock rv">
      <p class="codeblock__label">Generated policy — what a security engineer reviews</p>
      <pre class="codeblock__pre">task_class: invoice_reconciliation
generated_at: 2026-09-14
trace_sessions_observed: 128
confidence: high

capabilities:
  - selector: ledger.invoices.read
    support: 0.99
    distinct_sessions: 127
    max_benign_taint: 3
    arg_constraints:
      limit: { max: 500 }

  - selector: ledger.payments.read
    support: 0.87
    distinct_sessions: 111
    max_benign_taint: 1

  - selector: report.write
    support: 0.94
    distinct_sessions: 120
    max_benign_taint: 0

denied_implicitly: 88   # granted by credential, never observed in use</pre>
    </div>

${note('Every line carries its justification.',
  'Support level, session count and taint bound are printed next to each capability. A policy you cannot interrogate is a policy you cannot defend in a review.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('The Guard Rails', 'What stops this', 'breaking your agents.',
  'A least-privilege system that blocks legitimate work gets switched off in a fortnight. Three mechanisms prevent that.', '', 'h2')}
${causes([
  ['Guard 01', 'Escalation Is A First-Class Verdict',
   'Denial is not the only answer. When an agent requests something outside its profile, the call pauses and a human is notified. Approval mints a one-shot grant for that action only.',
   '<strong>The agent resumes.</strong> It does not fail, and the exception is recorded.'],
  ['Guard 02', 'Long Learn Mode By Default',
   'Enforcement does not begin until the profile reaches a confidence threshold. Where observation is thin, the system says so and keeps observing rather than enforcing a guess.',
   '<strong>Cold start is honest.</strong> No policy is better than a wrong one.'],
  ['Guard 03', 'Conservative Thresholds',
   'The support threshold is tuned to favour including a borderline capability over excluding it. Breakage is the failure mode that gets a security product removed.',
   '<strong>Target: under five percent</strong> task breakage at eighty percent permission reduction.']
])}
  </div>
</section>

${cta('See the gap between', 'held and used.',
  'Two weeks of shadow mode produces the number for your own agents. No enforcement, no risk, no code changes.',
  ['Book a shadow-mode pilot', P + 'contact.html'], ['Composition analysis', 'composition-analysis.html'])}
`
}));

// ═════════════════════════════════════ COMPOSITION ═══
W('platform/composition-analysis.html', page({
  depth: D, extraCss: 'home',
  title: 'Composition Analysis — Safe Permissions, Dangerous Together | StartiQOS AI',
  desc: 'Reading customer data is safe. Calling a webhook is safe. Together they are exfiltration. We evaluate permission combinations, not individual grants.',
  keywords: 'privilege escalation, capability composition, AI agent data exfiltration, permission combinations',
  canonical: 'platform/composition-analysis.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Layer 02', 'Safe alone.', 'Dangerous together.',
  'Every identity system evaluates permissions one at a time. The exfiltration path only exists in the combination.',
  'Reading customer records is routine. Calling an external webhook is routine. Neither is flagged. Together they are a data-theft channel that nothing in your stack will report.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="codeblock rv">
      <p class="codeblock__label">What a single-permission review sees</p>
      <pre class="codeblock__pre">  crm.contacts.read        ✓ approved  — support agents need this
  http.post.external       ✓ approved  — webhook integrations need this

  Both individually justified. Both individually low risk.
  Neither flagged by IAM, CIEM, or agent identity tooling.</pre>
    </div>

    <div class="codeblock rv">
      <p class="codeblock__label">What composition analysis sees</p>
      <pre class="codeblock__pre">  REACHABILITY PATH DETECTED

  crm.contacts.read  →  http.post.external

  Classification:  data movement to an uncontrolled destination
  Reachable in:    one agent turn, no additional capability required
  Trigger:         any instruction reaching the agent's context

  Verdict:  the pair is denied. Either capability alone is allowed.</pre>
    </div>

${note('This is the claim we lead with,',
  'because it is the one nothing else in the market makes. Identity platforms tell you an agent is over-permissioned. None of them tell you which two of its permissions form a path.')}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Classes', 'Four kinds of', 'reachable path.',
  'Composition risk is not a single pattern. These are the four that matter, and each is evaluated separately.', '', 'h2')}
${rows([
  ['01', 'Read \u2192 Egress',
   'Any capability that returns sensitive data, paired with any capability that moves bytes outside the boundary. Email, webhook, file write to a shared mount, even a verbose log write to a third-party sink.'],
  ['02', 'Read \u2192 Write-Back',
   'Read a credential, a token or a configuration value, then write it somewhere it becomes reachable \u2014 a ticket comment, a shared document, an environment variable another agent can read.'],
  ['03', 'Enumerate \u2192 Act',
   'List every record, then perform a per-record action. Individually a lookup and an update. Combined, the ability to modify an entire table one row at a time without ever tripping a bulk-operation control.'],
  ['04', 'Delegate \u2192 Re-Amplify',
   'Hand a narrow capability to a sub-agent that holds a different narrow capability. Neither agent can complete the path alone. The chain can. This is why composition is evaluated across the delegation graph, not per agent.']
])}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('How It Runs', 'Analysed offline.', 'Enforced inline.',
  'The expensive part happens during policy generation. The runtime check is a set lookup.', '', 'h2')}
${causes([
  ['At learn time', 'Graph Construction',
   'Every capability in the profile is classified by what it can read, write, enumerate or send. The reachability graph is built once, and the dangerous pairs are enumerated.',
   '<strong>Offline.</strong> Nothing in the hot path.'],
  ['At approval', 'Human Review',
   'The detected paths are presented with their classification and an example of what an attacker would need to do. The reviewer decides which to block and which are genuinely required.',
   '<strong>Required paths get a narrower form</strong> \u2014 an allowlisted destination rather than open egress.'],
  ['At runtime', 'Session-State Check',
   'The capability set an agent has actually exercised in this session is tracked. If invoking the next capability would complete a blocked path, the call is denied \u2014 even though that capability is in the profile.',
   '<strong>Order matters.</strong> The check is on the path, not the permission.']
])}
  </div>
</section>

${cta('Find the paths', 'nobody is looking for.',
  'The shadow-mode report includes every composition path present in your current agent configuration, classified and ranked.',
  ['Book a shadow-mode pilot', P + 'contact.html'], ['Delegation control', 'delegation-control.html'])}
`
}));

// ═══════════════════════════════════════ DELEGATION ═══
W('platform/delegation-control.html', page({
  depth: D, extraCss: 'home',
  title: 'Delegation Control — Authority Narrows, Never Widens | StartiQOS AI',
  desc: 'In multi-agent systems, each hand-off can grant more than it received. Monotonic attenuation makes widening cryptographically impossible.',
  keywords: 'multi-agent delegation, agent authority chain, capability attenuation, A2A security',
  canonical: 'platform/delegation-control.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Layer 03', 'Authority narrows.', 'It never widens.',
  'In a chain of agents, each hand-off can grant more than it received. By the third agent, nobody can say what authority exists.',
  'This is not a policy we ask agents to follow. It is a property of the token format \u2014 widening is cryptographically infeasible even when a downstream agent is fully compromised.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="codeblock rv">
      <p class="codeblock__label">The invariant</p>
      <pre class="codeblock__pre">  ORCHESTRATOR          →  RESEARCH AGENT      →  WRITER AGENT
  C_root                   C_child               C_grandchild

  guaranteed:  C_grandchild ⊆ C_child ⊆ C_root

  Each delegation appends an attenuating caveat. There is no
  operation that removes one. A compromised writer agent cannot
  mint itself a broader token, because broadening is not an
  operation the format supports.</pre>
    </div>

${note('Why this is not just a rule.',
  'A policy that says \u201cdo not widen\u201d relies on every agent in the chain behaving. An attenuating token format means a misbehaving agent simply cannot. The guarantee survives compromise.')}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('What Gets Verified', 'Every call.', 'The whole chain.',
  'The gateway does not trust the last hop. It verifies the entire chain from the acting agent back to a signed human intent.', '', 'h2')}
${rows([
  ['01', 'Signature and chain integrity',
   'Every caveat in the chain is verified offline \u2014 no callback to an issuer, no network hop. A broken or forged link fails the call.'],
  ['02', 'Termination at a human intent',
   'Every chain must terminate at a root token bound to a signed task description. An action with no traceable human origin does not execute, regardless of how well-formed the token is.'],
  ['03', 'Cycle detection',
   'Agent A delegates to B, B delegates back to A. Without detection this re-amplifies privilege through a loop. Cycles are rejected at verification.'],
  ['04', 'Depth and expiry',
   'Chains carry a maximum depth and a time-to-live. A token issued for a task that finished an hour ago is not a valid token, and a chain that has passed through nine agents is treated as a fault, not a workflow.']
])}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Why It Matters Now', 'Multi-agent is', 'already the default.',
  'The single-agent deployment is becoming rare. Orchestrators spawning sub-agents is how most production systems are now built \u2014 and no deployed mechanism guarantees what authority exists at hop three.', '', 'h2')}
${causes([
  ['Risk 01', 'The Confused Sub-Agent',
   'A sub-agent reads untrusted content and is redirected. It acts using authority its parent delegated for a different purpose entirely.',
   '<strong>Attenuation bounds the damage</strong> to whatever that sub-agent was narrowed to.'],
  ['Risk 02', 'The Untraceable Action',
   'Something was modified. Four agents were involved. No record connects the action to the human who initiated the workflow.',
   '<strong>Chain termination</strong> makes that connection a requirement, not a hope.'],
  ['Risk 03', 'Cross-Organisation Chains',
   'Your agent calls a partner\u2019s agent. Their authority model is not yours. Increasingly this is a normal integration, not an edge case.',
   '<strong>Federated attenuation</strong> \u2014 chains that cross an organisational boundary and still narrow.']
])}
  </div>
</section>

${cta('Map your delegation graph', 'before you need it.',
  'Shadow mode records every hand-off between your agents, including the ones nobody documented.',
  ['Book a shadow-mode pilot', P + 'contact.html'], ['Provenance and taint', 'provenance.html'])}
`
}));

// ═══════════════════════════════════════ PROVENANCE ═══
W('platform/provenance.html', page({
  depth: D, extraCss: 'home',
  title: 'Provenance &amp; Taint Tracking — Exposure Attenuates Authority | StartiQOS AI',
  desc: 'The more untrusted content an agent reads, the narrower its authority becomes. Automatic attenuation based on context provenance.',
  keywords: 'prompt injection protection, taint tracking, information flow security, AI agent provenance',
  canonical: 'platform/provenance.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Layer 04', 'The more it reads,', 'the less it may do.',
  'An agent that has processed ten external documents is a different risk from one that has read only internal records \u2014 even though it is the same agent, with the same profile.',
  'We track where an agent\u2019s context came from, and narrow its authority as untrusted exposure accumulates. No detection, no classification. Just a smaller permission set.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
    <div class="codeblock rv">
      <p class="codeblock__label">Taint in a single session</p>
      <pre class="codeblock__pre">  step 1   read internal ticket                  taint 0
  step 2   query ledger                          taint 0     ✓ allowed
  step 3   fetch attached PDF (external origin)  taint 2
  step 4   query ledger                          taint 2     ✓ allowed
  step 5   send email                            taint 2     ✗ DENIED

           report.send has max_benign_taint: 0
           observed only at taint 0 across 120 sessions</pre>
    </div>

${note('The capability was in the profile.',
  'Sending email is legitimate work for this agent. What changed is that it had just read something from outside the boundary \u2014 and the profile records that this capability was never once exercised after untrusted exposure.')}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('How Taint Accrues', 'Not everything', 'is equally untrusted.',
  'Taint is a graded property, not a binary flag. A signed internal document and an arbitrary web page are not the same input.', '', 'h2')}
${rows([
  ['0', 'Internal, structured',
   'Database rows, internal API responses, records the organisation controls end to end. No taint.'],
  ['1', 'Internal, authored',
   'Wiki pages, tickets, internal documents written by people. Trusted, but a human wrote the contents and a human can be socially engineered.'],
  ['2', 'External, identified',
   'Email from a known correspondent, a supplier\u2019s document, a partner\u2019s API response. The origin is known; the contents are not controlled.'],
  ['3', 'External, arbitrary',
   'Web pages, unsolicited email, uploaded files, tool descriptions from an MCP server you do not operate. Assume the contents are adversarial.']
])}
${note('Taint is monotonic within a session.',
  'It rises and does not fall. An agent cannot cleanse its context by reading something trustworthy afterwards, because the untrusted instruction is still in the context window.', true)}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Why This Beats Detection', 'The attack does not', 'have to be recognised.',
  'Injection detection asks: is this instruction malicious? Taint attenuation asks a different question entirely \u2014 has this agent been exposed to anything it should not act on?', '', 'h2')}
${causes([
  ['Detection', 'Requires Recognition',
   'A classifier blocks what resembles a known attack. Rephrase the instruction, encode it, split it across two documents, and the resemblance disappears.',
   '<strong>Loses to novelty.</strong> Structurally, not occasionally.'],
  ['Attenuation', 'Requires Nothing',
   'We do not read the instruction or judge it. We observe that untrusted material entered the context, and narrow what the agent may do next.',
   '<strong>Works against attacks nobody has seen,</strong> including ones that do not exist yet.'],
  ['Together', 'Defence In Depth',
   'If you already run a detection layer, keep it. It catches obvious cases cheaply. Attenuation is what remains when detection misses.',
   '<strong>We do not ask you to remove anything.</strong> We assume the other layer will fail.']
])}
  </div>
</section>

${cta('See how much untrusted data', 'your agents actually read.',
  'The shadow-mode report includes taint profiles per task class \u2014 and which capabilities are being exercised after exposure.',
  ['Book a shadow-mode pilot', P + 'contact.html'], ['Runtime verification', 'runtime-verification.html'])}
`
}));

// ═══════════════════════════════ RUNTIME VERIFICATION ═══
W('platform/runtime-verification.html', page({
  depth: D, extraCss: 'home',
  title: 'Runtime Verification — Allow, Escalate, or Deny | StartiQOS AI',
  desc: 'Every call is verified against the delegation chain, declared intent, provenance state and capability set. Sub-millisecond decisions, every outcome recorded.',
  keywords: 'runtime authorization, AI agent enforcement, policy decision point, agent audit trail',
  canonical: 'platform/runtime-verification.html',
  body: `
<section class="section">
  <div class="wrap">
${secHead('Layer 06', 'Three verdicts.', 'One of them is not \u201cno\u201d.',
  'At the moment of the call, four things are verified together: the delegation chain, the declared intent, the provenance state, and the capability set.',
  'The answer is allow, escalate to a human, or deny \u2014 and every outcome is written to an append-only ledger with the reason attached.')}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('The Verdicts', 'What each one', 'means in practice.', 'Escalation is the verdict that makes the other two usable.', '', 'h2')}
${causes([
  ['Verdict 01', 'Allow',
   'The capability is in the profile, the arguments are within their learned constraints, the chain verifies, and the taint level is within the recorded bound. The call is forwarded and logged.',
   '<strong>Sub-millisecond.</strong> No model round trip, no issuer callback.'],
  ['Verdict 02', 'Escalate',
   'The request is outside the profile, but plausibly legitimate. The agent pauses. A named human is notified with the request, the context, and what the agent was asked to do. Approval mints a one-shot grant.',
   '<strong>The agent resumes.</strong> The exception is recorded as an exception.'],
  ['Verdict 03', 'Deny',
   'The capability is not in the profile, or completing it would close a blocked composition path, or the chain does not verify. The call is rejected and an alert is raised.',
   '<strong>The reason is recorded,</strong> not just the outcome.']
])}
${note('Why escalation matters more than it looks.',
  'A system with only allow and deny is a system that will block legitimate work, and a security control that blocks legitimate work is removed within a fortnight. Escalation is what makes strict enforcement survivable.')}
  </div>
</section>

<section class="section">
  <div class="wrap">
${secHead('The Ledger', 'What you can', 'hand an auditor.',
  'Observability tools produce traces for engineers. This produces evidence \u2014 a different artifact, for a different reader.', '', 'h2')}
    <div class="codeblock rv">
      <p class="codeblock__label">One ledger entry</p>
      <pre class="codeblock__pre">  timestamp        2026-09-14T10:22:41Z
  agent            finance-reconciler-7
  delegation       orchestrator-1 → finance-reconciler-7   (depth 2)
  intent_hash      sha256:9f3k2m8x...  (signed by j.mehta@)
  task_class       invoice_reconciliation
  capability       ledger.invoices.read
  arguments        { table: STRING, limit: INT[1..500] }
  taint_level      0
  verdict          ALLOW
  reason           in profile, support 0.99, within taint bound
  latency          0.4 ms
  prev_hash        sha256:a71c04e2...

  Hash-chained. Periodic Merkle root signing.
  Tamper-evident on verification. Exportable as an evidence bundle.</pre>
    </div>
${note('Argument shapes, never argument values.',
  'The ledger records that a query had a table name and a row limit within a range. It does not record which table or which rows. Your data is not in the audit trail by construction.', true)}
  </div>
</section>

<section class="section section--alt">
  <div class="wrap">
${secHead('Performance', 'The decision path', 'has no network in it.',
  'A security control in the critical path either meets the latency budget or gets removed. There is no third outcome.', '', 'h2')}
${rows([
  ['01', 'Offline chain verification',
   'Tokens carry their own proof. Verification requires no callback to an issuer and no policy server lookup. This is the single largest reason the decision fits inside a millisecond.'],
  ['02', 'Rust in the hot path',
   'The gateway is Rust. Policy learning is Python, and it runs in batch, offline. The languages are chosen per workload rather than per preference.'],
  ['03', 'Composition as a set lookup',
   'The expensive reachability analysis runs at policy-generation time. At runtime the check is whether the current session\u2019s exercised set plus this capability intersects a blocked pair.'],
  ['04', 'Configurable failure mode',
   'Fail-open or fail-closed, set per agent. A support agent may fail open; a payments agent should not. We do not choose that for you.']
])}
  </div>
</section>

${cta('Run it in shadow mode', 'and read the ledger.',
  'Two weeks of real decisions, with no enforcement. You see exactly what would have been allowed, escalated and denied \u2014 before anything changes.',
  ['Book a shadow-mode pilot', P + 'contact.html'], ['Control plane overview', 'index.html'])}
`
}));

console.log('\nPlatform pages done.');
