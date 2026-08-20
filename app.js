/* ============================================================
   QUESTION BANKS
   Each option: {t: text, c: true/false, why: rationale shown after grading}
   Options shuffle at render time. Stable id = `${articleKey}::${index}`.
   ============================================================ */

const ARTICLES = {

bea: {
  name: "Building Effective Agents",
  desc: "Workflows vs. agents, the augmented LLM, five workflow patterns, and when to reach for autonomy.",
  url: "anthropic.com/engineering/building-effective-agents",
  link: "https://www.anthropic.com/engineering/building-effective-agents",
  notes: [
    {h:"Start simple", body:"The piece opens with a bias toward restraint: find the simplest architecture that works, and only add agentic complexity — more autonomy, more steps, more tool calls — once it's clearly earning its keep. A single, well-optimized model call with good retrieval and a few examples covers more ground than people expect. Complexity is a cost paid in latency, dollars, and debuggability, not a badge of sophistication."},
    {h:"Workflows vs. agents", body:"Both sit under the umbrella term “agentic systems,” but they split on who's steering. A workflow is code-defined: the developer lays out the path in advance — this step, then that step, then a branch — and the LLM fills in each box. An agent is different: the model itself decides what to do next, in a loop, based on what it's observed so far. Workflows are predictable and easy to reason about; agents are flexible but noisier and pricier."},
    {h:"The augmented LLM", body:"The foundational unit underneath every pattern in the piece is a model that's been given real capabilities — retrieval, tools, memory — and, crucially, uses them on its own initiative. It writes its own search queries, decides which function to call, and reasons over what comes back. Everything more elaborate (chains, routers, agents) is just this building block arranged differently."},
    {h:"Prompt chaining", body:"The simplest workflow: break a task into an ordered sequence of LLM calls, where each call's output feeds the next. It trades some latency for accuracy, since each individual step is simpler and easier to get right than trying to do everything in one shot. Works well when a task decomposes cleanly into fixed subtasks."},
    {h:"Routing", body:"A classifier step sends an input down one of several specialized paths, each with its own prompt (or even its own model). It shines when a task naturally splits into distinct categories that deserve different handling, and when that classification can be made reliably — mixing up categories defeats the purpose."},
    {h:"Parallelization", body:"Two flavors: sectioning splits one task into independent pieces run at the same time and stitched back together (useful when subtasks don't depend on each other); voting runs the same task multiple times and aggregates the results (useful for boosting confidence or catching outlier mistakes)."},
    {h:"Orchestrator-workers", body:"Looks like parallelization on a diagram, but the key difference is that the subtasks aren't decided ahead of time — a central orchestrator model looks at the specific input and dynamically figures out what work needs doing, then hands pieces to worker calls. Useful when you can't predict the shape of the subtasks in advance."},
    {h:"Evaluator-optimizer", body:"One model produces a candidate response, a second (or the same model in a different pass) critiques it, and the loop repeats until the critique is satisfied. Worth using specifically when two things are both true: the response can meaningfully improve from articulated feedback, and a model is actually capable of giving that feedback."},
    {h:"When to reach for agents", body:"Agents earn their complexity on open-ended problems where you can't hardcode the number of steps in advance — the model needs to explore, check its own progress against the environment (tool outputs, execution results), and decide when it's done. That autonomy is also the risk: costs climb, and small errors can compound across a long unsupervised run, so stopping conditions (like a max iteration count) and sandboxed testing matter."},
    {h:"Three implementation principles", body:"When you do build an agent: keep the design as simple as it can be; make the agent's planning explicit rather than hidden, so a human can follow along; and invest real effort in the agent-computer interface (ACI) — how tools are documented, formatted, and structured — the same way you'd invest in a human-facing UI."},
    {h:"Designing the ACI", body:"Concrete practices: favor output formats the model has seen a lot of in training (closer to natural text, less rigid escaping/line-counting); test tool designs empirically by running many example inputs through a workbench and watching where the model stumbles, then iterate; and apply “poka-yoke” — restructure a tool's arguments so that the mistakes you keep seeing become harder to make (their worked example: switching a coding tool from relative to absolute filepaths fixed a recurring class of errors)."},
    {h:"Where agents fit best", body:"Customer support and coding come up as the two standout domains, because both share four traits: they mix conversation with action, have fairly clear success criteria, generate natural feedback loops, and allow for real human oversight. Code in particular is a great fit because solutions are checkable by running tests — that gives the agent objective, immediate signal to iterate against."},
    {h:"On frameworks", body:"Orchestration frameworks (LangGraph, Rivet, Vellum, etc.) make it easy to get started, but they add a layer of abstraction that can obscure what's actually being sent to and returned from the model — which makes debugging harder when something goes wrong. If you use one, understand what's happening underneath it rather than trusting it blindly."}
  ],
  questions: [
{cat:"foundations", q:"How does the article distinguish “workflows” from “agents” within the broader category of agentic systems?", opts:[
  {t:"Workflows orchestrate LLMs and tools through predefined code paths; agents dynamically direct their own process and tool use", c:true, why:"This is the article's core definition — control flow is fixed in advance for workflows, decided at runtime for agents."},
  {t:"Workflows use only a single LLM call per run, while agents are defined as always requiring at least two separate models working in tandem", c:false, why:"The split is about who controls the process, not how many LLM calls or models are involved — both can use many calls."},
  {t:"Workflows are limited to customer-support use cases, while agents are limited to coding use cases, per the article's two worked examples", c:false, why:"Customer support and coding are just the article's two illustrative domains — not a rule restricting what workflows or agents can be applied to."},
  {t:"Agents are systems that never call external tools, while workflows are defined specifically by their heavy reliance on tool access at every step", c:false, why:"Both patterns commonly use tools — tool access isn't the distinguishing factor between a workflow and an agent."}
]},
{cat:"foundations", q:"What's the recommended default when deciding whether to build an agentic system at all?", opts:[
  {t:"Find the simplest solution possible, and only increase complexity when it demonstrably improves outcomes", c:true, why:"The article's opening guidance: start simple, add complexity only when it's proven to help."},
  {t:"Always default to a full autonomous agent architecture from day one, since workflows are framed as a legacy pattern being phased out", c:false, why:"Workflows aren't deprecated — the article explicitly recommends them over agents whenever a fixed path is sufficient."},
  {t:"Always build with a third-party orchestration framework first, then strip it down to raw API calls later once the prototype is validated", c:false, why:"The article is cautious about frameworks generally, not just recommends them as a default starting point."},
  {t:"Avoid single, unaugmented LLM calls entirely, since the article considers them insufficient for any real production application", c:false, why:"The article explicitly says a single well-optimized LLM call is often enough for many applications."}
]},
{cat:"foundations", q:"What tradeoff do agentic systems typically make in exchange for better task performance?", opts:[
  {t:"They often trade latency and cost for improved performance on the task", c:true, why:"This is the article's stated core tradeoff for choosing agentic complexity."},
  {t:"They trade overall accuracy for lower latency, since agentic systems are described as skipping most intermediate reasoning steps to finish faster", c:false, why:"Agentic systems typically take more steps and more time, not fewer — the tradeoff runs the other way."},
  {t:"They trade transparency for raw speed, since the article states agent reasoning is deliberately hidden from developers to reduce overhead", c:false, why:"The article recommends the opposite — making agent planning steps explicit and visible, not hiding them."},
  {t:"They trade tool access for architectural simplicity, since agentic systems are described as typically using far fewer tools than fixed workflows", c:false, why:"Agents typically have broader, more flexible tool access than fixed workflows, not less."}
]},
{cat:"frameworks", q:"What caution does the article raise about agent frameworks (e.g. drag-and-drop workflow builders)?", opts:[
  {t:"They can create extra layers of abstraction that obscure underlying prompts and responses, making debugging harder", c:true, why:"The article's explicit warning about frameworks: abstraction can hide what's actually being sent to and returned from the model."},
  {t:"They are described as fundamentally incompatible with tool use, meaning agents built with them cannot call external functions or APIs at all", c:false, why:"Frameworks are generally built around tool use, not incompatible with it — that's not the article's concern."},
  {t:"They are said to be unsuitable for production systems entirely, and are recommended only for early-stage prototyping before a rewrite", c:false, why:"The article doesn't ban frameworks from production — it cautions developers to understand what's underneath them, wherever they're used."},
  {t:"They require rewriting all agent logic in a proprietary domain-specific language rather than using standard general-purpose programming languages", c:false, why:"That's not the article's critique — most frameworks are just libraries in standard languages; the concern is hidden abstraction, not syntax."}
]},
{cat:"frameworks", q:"What does the article recommend if a developer chooses to use a framework anyway?", opts:[
  {t:"Make sure you understand the underlying code, since incorrect assumptions about what's under the hood are a common source of error", c:true, why:"Directly stated: understand what the framework is doing under the hood before trusting it."},
  {t:"Avoid testing the framework's behavior directly and instead trust its default configuration completely, since testing is described as redundant work", c:false, why:"The article never says to skip testing — understanding and verifying behavior is exactly the point being made."},
  {t:"Reserve the framework exclusively for the final production release, and never use it during earlier prototyping or experimentation phases", c:false, why:"No such phase restriction is given — the caution applies whenever a framework is used, prototype or production."},
  {t:"Treat the framework as a full replacement for ever making direct calls to the underlying LLM API again", c:false, why:"The article doesn't suggest frameworks replace direct API use — understanding the raw prompts/responses underneath is the point."}
]},
{cat:"foundations", q:"What is the “augmented LLM,” and why is it called the foundational building block?", opts:[
  {t:"An LLM enhanced with capabilities like retrieval, tools, and memory, which it can actively use — e.g. generating its own search queries", c:true, why:"This is the article's definition — augmentation the model actively drives, not just static context stuffed in."},
  {t:"An LLM that has been fine-tuned specifically on large volumes of agentic transcripts before being deployed into any production system", c:false, why:"Augmentation in the article is about runtime capabilities like tools and retrieval, not a fine-tuning process."},
  {t:"A specialized version of an LLM that is only able to run inside a fully sandboxed offline evaluation environment", c:false, why:"The augmented LLM concept applies to any deployment context — it isn't restricted to sandboxed eval environments."},
  {t:"An LLM permanently paired one-to-one with a second, larger “supervisor” LLM that must approve every action before it executes", c:false, why:"That describes a specific multi-agent pattern, not the general augmented-LLM building block the article defines."}
]},
{cat:"workflows", q:"What is prompt chaining, and what is its main goal?", opts:[
  {t:"Decomposing a task into a sequence of steps where each LLM call processes the previous output, trading latency for higher accuracy by simplifying each step", c:true, why:"Matches the article's definition and stated tradeoff for prompt chaining directly."},
  {t:"Running the same prompt many times in parallel and aggregating the resulting outputs together using a majority-vote mechanism across the runs", c:false, why:"That describes the parallelization workflow's voting variant, not prompt chaining, which is sequential rather than parallel."},
  {t:"Letting a central orchestrator LLM dynamically delegate subtasks to worker LLMs whose exact scope isn't known in advance", c:false, why:"That's the orchestrator-workers pattern — prompt chaining uses a fixed, predetermined sequence of steps instead."},
  {t:"Classifying an incoming input and then directing it toward one of several specialized, pre-written downstream prompts based on that classification", c:false, why:"That describes the routing workflow, not prompt chaining, which doesn't branch based on classification."}
]},
{cat:"workflows", q:"When is the routing workflow a good fit?", opts:[
  {t:"For complex tasks with distinct categories that are better handled separately, where classification can be done accurately", c:true, why:"The article's stated conditions for routing: distinct categories plus reliable classification."},
  {t:"Only when a task must be completed by exactly one single LLM call with absolutely no branching or conditional logic permitted anywhere", c:false, why:"Routing is defined by branching to different specialized prompts — that's the opposite of a no-branching constraint."},
  {t:"Only for tasks with no clear success criteria at all, where flexibility is prioritized far above any measurable accuracy", c:false, why:"Routing depends on accurate classification, which itself requires some clarity about categories — it isn't for undefined, criteria-free tasks."},
  {t:"Only when every possible input belongs to the same underlying category and therefore needs completely identical downstream handling", c:false, why:"Routing exists precisely because inputs differ and need different handling — identical inputs wouldn't need routing at all."}
]},
{cat:"workflows", q:"What are the two key variations of the parallelization workflow?", opts:[
  {t:"Sectioning (independent subtasks run in parallel) and voting (the same task run multiple times for diverse outputs)", c:true, why:"These are the two named variations of parallelization given in the article."},
  {t:"Chaining, where steps run one after another, and routing, where a classifier dispatches a task to one specialized downstream prompt", c:false, why:"Chaining and routing are separate, distinct workflow patterns in the article, not sub-variants of parallelization."},
  {t:"Orchestration, involving central planning by a lead LLM, and delegation, involving task assignment to independent worker LLMs", c:false, why:"That describes the orchestrator-workers pattern, which the article treats as a separate workflow from parallelization."},
  {t:"Compaction, which summarizes prior context, and retrieval, which pulls in new information from an external source on demand", c:false, why:"Compaction and retrieval are long-horizon context-engineering techniques from a different article, not parallelization variants here."}
]},
{cat:"workflows", q:"In the orchestrator-workers pattern, what's the key difference from parallelization, despite looking topologically similar?", opts:[
  {t:"Subtasks aren't pre-defined — the orchestrator determines them dynamically based on the specific input", c:true, why:"This is the article's stated distinction: dynamic task decomposition versus fixed, pre-split subtasks."},
  {t:"Orchestrator-workers is defined as never involving more than a single worker LLM active at any given point in the process", c:false, why:"The pattern typically involves multiple concurrent workers — that's not what separates it from parallelization."},
  {t:"Parallelization is said to require explicit human approval between each individual subtask, while orchestrator-workers never involves any human checkpoint", c:false, why:"Neither pattern is defined by human-approval requirements in the article — the real distinction is dynamic vs. fixed task decomposition."},
  {t:"Orchestrator-workers is described as applicable only to customer support scenarios, while parallelization is described as applicable only to coding scenarios", c:false, why:"Neither pattern is restricted to a single domain — both are general workflow structures usable across many tasks."}
]},
{cat:"workflows", q:"What two conditions make a task a good fit for the evaluator-optimizer workflow?", opts:[
  {t:"LLM responses can be demonstrably improved with articulated feedback, and the LLM can provide that feedback itself", c:true, why:"These are the article's two stated conditions for when evaluator-optimizer is worth using."},
  {t:"The task must have no possible failure modes whatsoever, and the evaluator LLM must never require any recalibration once deployed", c:false, why:"Evaluator-optimizer exists precisely to catch and correct failure modes — a failure-free task wouldn't need it at all."},
  {t:"The task must be fully deterministic in nature, and evaluation must rely exclusively on code-based graders rather than any model-based judgment", c:false, why:"The workflow is built around an LLM evaluator giving feedback, not code-based determinism, per the article's description."},
  {t:"The optimizer LLM must always be a strictly more capable model than the evaluator LLM assigned to review its output", c:false, why:"No such capability hierarchy is required or mentioned — the same or comparable models can fill both roles."}
]},
{cat:"agents", q:"During execution, why is it crucial for agents to gain “ground truth” from the environment at each step?", opts:[
  {t:"To assess their own progress, using signals like tool call results or code execution outcomes", c:true, why:"Matches the article's explanation of why environment feedback matters at each agent step."},
  {t:"To generate polished marketing copy summarizing what the agent accomplished during the run, for later use in customer-facing materials", c:false, why:"Ground truth is about self-correction during execution, not producing summaries for marketing purposes."},
  {t:"Ground truth is described as relevant only to fixed workflows, and is said to play no meaningful role for autonomous agents", c:false, why:"The opposite is true — ground truth checking is described as especially crucial for autonomous, open-ended agent execution."},
  {t:"To guarantee the agent never needs to pause for human feedback at any point throughout the entire task", c:false, why:"Ground truth checking and human feedback are separate concerns — one doesn't eliminate the need for the other."}
]},
{cat:"agents", q:"Why do agents often include stopping conditions, such as a maximum number of iterations?", opts:[
  {t:"To maintain control over autonomous execution, since tasks might otherwise run indefinitely or compound errors", c:true, why:"This is the article's stated rationale for stopping conditions on agent loops."},
  {t:"Stopping conditions are described as a hard requirement of the underlying model architecture rather than a choice made by developers", c:false, why:"Stopping conditions are a design decision developers add to the harness, not a built-in model architecture constraint."},
  {t:"Stopping conditions exist solely to reduce token costs, and the article states they have no relationship to overall task reliability", c:false, why:"Cost is one factor, but the article ties stopping conditions primarily to controlling runaway or compounding errors."},
  {t:"Agents are said to never require stopping conditions once ground truth checks have been properly implemented in the harness", c:false, why:"Ground truth checks and stopping conditions are complementary safeguards — neither is described as making the other unnecessary."}
]},
{cat:"agents", q:"When are agents described as the better choice over workflows?", opts:[
  {t:"For open-ended problems where the required number of steps is hard to predict and a fixed path can't be hardcoded", c:true, why:"This is the article's core criterion for choosing agents over predefined workflows."},
  {t:"Only for tasks that can be fully specified in advance with a known, fixed sequence of steps determined before execution begins", c:false, why:"A fully specifiable, fixed-step task is exactly the case where a workflow is recommended instead of an agent."},
  {t:"Only when minimizing latency and cost is the top priority, since the article frames agents as consistently cheaper than workflows", c:false, why:"The article states agents typically cost more and run slower than workflows, not less."},
  {t:"Only for tasks with no tool access at all, since the article frames tool use as unnecessary overhead for agentic systems", c:false, why:"Tool use is central to how agents operate in the article — it isn't framed as something to avoid."}
]},
{cat:"agents", q:"What downside comes with the autonomous nature of agents, according to the article?", opts:[
  {t:"Higher costs and the potential for compounding errors, which is why extensive sandboxed testing is recommended", c:true, why:"This is the article's stated tradeoff and its recommended mitigation."},
  {t:"Agents are described as incapable of using more than a single tool across the full duration of any given task", c:false, why:"No such single-tool limitation exists in the article — agents typically use multiple tools across a task."},
  {t:"Agents are said to be unable to be paused for human feedback once they begin autonomous execution of a task", c:false, why:"The article discusses human checkpoints as a valid safeguard for agents, not something incompatible with autonomy."},
  {t:"Agent autonomy is described as carrying no meaningful downside at all compared to using a fixed, predefined workflow", c:false, why:"The article explicitly names cost and compounding-error risk as real downsides of autonomy."}
]},
{cat:"principles", q:"What are the three core principles the article recommends when implementing agents?", opts:[
  {t:"Simplicity in design, transparency by showing planning steps, and careful agent-computer interface (ACI) documentation and testing", c:true, why:"These are the article's three named implementation principles."},
  {t:"Maximizing the total number of available tools, minimizing all human oversight, and defaulting to aggressive parallelization wherever technically possible", c:false, why:"None of these are the article's stated principles — it actually cautions against unnecessary complexity like excess tools."},
  {t:"Adopting a third-party orchestration framework, scaling to the largest available model, and continuously fine-tuning on production transcripts", c:false, why:"The article is cautious about frameworks and doesn't prescribe fine-tuning as a core implementation principle."},
  {t:"Minimizing cost above all other factors, minimizing latency above all other factors, and avoiding the use of workflows entirely", c:false, why:"Workflows are recommended, not avoided, and cost/latency are tradeoffs to weigh, not principles to maximize in isolation."}
]},
{cat:"aci", q:"What analogy does the article draw when discussing tool design for agents?", opts:[
  {t:"Invest as much effort in the agent-computer interface (ACI) as you would in human-computer interface (HCI) design", c:true, why:"This is the article's explicit HCI-to-ACI analogy."},
  {t:"Tool design should mimic relational database schema design, since the article claims agents process tool calls the same way a SQL engine parses queries", c:false, why:"No such database-schema analogy appears — the article's comparison is specifically to human-computer interface design."},
  {t:"Tool design should mirror network protocol design, since the article states agents treat every tool strictly as a low-level API endpoint", c:false, why:"The article's framing is about usability and interface design, not network protocol semantics."},
  {t:"The article states there is no useful analogy for tool design, framing agent tool use as an entirely unprecedented problem", c:false, why:"The article does offer an analogy — to HCI — rather than treating the problem as having no precedent."}
]},
{cat:"aci", q:"What general guidance does the article give for choosing a tool's output format (e.g. diffs vs. full file rewrites, JSON vs. markdown)?", opts:[
  {t:"Keep the format close to what the model has seen naturally occurring in text, and avoid formatting overhead like precise line-counting or heavy escaping", c:true, why:"This is the article's specific formatting guidance for tool outputs and inputs."},
  {t:"Always prefer JSON output specifically, since the article states it is strictly easier for any model to produce correctly than any other format", c:false, why:"The article doesn't universally favor JSON — it recommends whatever format is closest to naturally occurring text for the task."},
  {t:"Format choice is described as essentially irrelevant, since the article claims all formats convert losslessly with equal ease for any model", c:false, why:"The article treats format choice as meaningful and worth testing, not as an irrelevant, interchangeable detail."},
  {t:"Always require a full file rewrite rather than a diff, since the article states diffs are effectively impossible for models to produce reliably", c:false, why:"The article discusses diffs as a legitimate option, weighed against rewrites based on token cost and error-proneness, not banned outright."}
]},
{cat:"aci", q:"Why did requiring absolute filepaths instead of relative ones improve a coding agent's reliability, according to the article's example?", opts:[
  {t:"The agent had been making mistakes with relative paths after moving out of the root directory; removing that ambiguity from the tool's contract fixed the errors", c:true, why:"This matches the article's specific worked example of an ACI fix."},
  {t:"Relative filepaths were described as fundamentally incompatible with the programming language the coding agent's toolchain was written in", c:false, why:"The issue was ambiguity in agent state tracking, not any language-level incompatibility with relative paths."},
  {t:"Absolute filepaths were said to reduce the total token count of every tool call, regardless of whether the call itself was correct", c:false, why:"The benefit described was correctness, not token efficiency — absolute paths are often longer, not shorter, in tokens."},
  {t:"Relative filepaths reportedly could not be parsed at all by the tool-use portion of the system prompt in that harness", c:false, why:"Relative paths were parseable — the problem was the agent losing track of its working directory, not a parsing failure."}
]},
{cat:"aci", q:"What does the article suggest as a way to iteratively improve a tool's design?", opts:[
  {t:"Run many example inputs through a workbench to observe what mistakes the model makes with a tool, then iterate", c:true, why:"This is the article's recommended iterative testing process for tool design."},
  {t:"Rely exclusively on the model's own self-reported confidence score before ever running the tool against any real example inputs", c:false, why:"The article recommends empirical testing with real inputs, not trusting a self-reported confidence score in place of testing."},
  {t:"Avoid testing tools directly during development, since the article claims only real end users in production can reveal meaningful tool issues", c:false, why:"The article explicitly recommends pre-launch testing on a workbench, not waiting for production usage to surface problems."},
  {t:"Finalize all tool definitions before any testing begins, since the article discourages revising tool specs once development has started", c:false, why:"The article frames tool design as iterative — revising specs based on observed mistakes is the recommended approach."}
]},
{cat:"aci", q:"What does “poka-yoke” mean in the context of designing tools for agents?", opts:[
  {t:"Changing a tool's arguments so that it's harder for the agent to make mistakes", c:true, why:"This matches the article's use of the term, borrowed from manufacturing error-proofing."},
  {t:"Automatically retrying any failed tool call up to a fixed number of times before finally surfacing an error message to the agent", c:false, why:"Poka-yoke refers to preventing mistakes via interface design, not to a retry-logic mechanism."},
  {t:"Translating a tool's description into whichever natural language the agent has most frequently used earlier in the conversation", c:false, why:"The term has nothing to do with translation — it's about reducing opportunities for input mistakes."},
  {t:"Hiding a given tool from the agent entirely until a human explicitly grants access to it through a separate approval step", c:false, why:"That describes access control, not poka-yoke, which is about making a tool's argument design mistake-resistant."}
]},
{cat:"domains", q:"According to the article, what shared traits make both customer support and coding especially promising domains for agents?", opts:[
  {t:"They require both conversation and action, have clear success criteria, enable feedback loops, and allow for meaningful human oversight", c:true, why:"These are the four shared traits the article lists for both domains."},
  {t:"They are described as the only two domains where agents can operate entirely without any tool access whatsoever", c:false, why:"Both domains actually rely heavily on tool access — that's not what makes them promising per the article."},
  {t:"They are described as the only domains where running an agentic system is ever cheaper than a single unaugmented LLM call", c:false, why:"Cost comparisons aren't the basis given — the article cites conversation+action, clear criteria, feedback loops, and oversight instead."},
  {t:"They are described as requiring no evaluation at all, since the article claims success is self-evident to the end user in both domains", c:false, why:"Clear success criteria (which the article does cite) implies evaluation is possible and useful, not unnecessary."}
]},
{cat:"domains", q:"Why is code especially well-suited to agentic problem-solving, per the article?", opts:[
  {t:"Solutions are verifiable through automated tests, so agents can iterate using test results as feedback in a well-defined, structured problem space", c:true, why:"This is the article's stated reason code suits agentic iteration well."},
  {t:"Code is described as the only domain the article considers safe enough for full autonomy with absolutely no human review at any stage", c:false, why:"The article still emphasizes oversight and testing for coding agents — it doesn't recommend zero human review."},
  {t:"Coding tasks are said to never require more than a single tool call, unlike other domains the article discusses for agentic use", c:false, why:"Coding tasks typically involve many tool calls (edits, tests, searches) — that's part of why iterative feedback matters there."},
  {t:"Code quality is described as impossible to measure objectively, which the article gives as the reason human review is used instead of automated tests", c:false, why:"The article's point is the opposite — code is unusually easy to verify objectively via automated tests."}
]},
{cat:"foundations", q:"For many applications, what does the article say is often “usually enough,” without needing a full agentic system?", opts:[
  {t:"Optimizing a single LLM call with retrieval and in-context examples", c:true, why:"This is the article's stated “usually enough” baseline before reaching for agentic complexity."},
  {t:"Chaining together at least five separate sequential LLM calls regardless of how simple or complex the underlying task actually is", c:false, why:"The article doesn't prescribe a fixed minimum chain length — it favors the simplest sufficient solution, which may be just one call."},
  {t:"Deploying a full orchestrator-workers system as the default starting point for essentially any new application being built", c:false, why:"The article recommends starting simple, not defaulting to one of the more complex workflow patterns."},
  {t:"Running the evaluator-optimizer loop for a fixed number of iterations on every incoming request as a baseline architecture", c:false, why:"Evaluator-optimizer is reserved for tasks that specifically benefit from iterative critique, not framed as a universal default."}
]}
  ]
},

cea: {
  name: "Effective Context Engineering for AI Agents",
  desc: "Context as a finite resource, attention budget, system prompt altitude, retrieval strategies, and long-horizon techniques.",
  url: "anthropic.com/engineering/effective-context-engineering-for-ai-agents",
  link: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
  notes: [
    {h:"From prompt engineering to context engineering", body:"Context engineering is framed as the natural next step after prompt engineering: instead of just crafting a good static prompt, you're curating and maintaining the whole set of tokens the model sees at inference time — system prompt, tools, message history, retrieved documents, everything. Context, in this piece, is defined simply: it's the tokens in the window when you sample from the model."},
    {h:"Context rot and the attention budget", body:"Because of how transformer attention works, every token can in principle attend to every other token — an n² relationship that gets stretched thinner as the context grows. The practical consequence is “context rot”: as token count rises, a model's ability to accurately pull out and use specific pieces of that context tends to degrade. Importantly, this isn't described as a hard cliff — models stay broadly capable at long context lengths, but precision on retrieval and long-range reasoning can erode gradually rather than catastrophically."},
    {h:"System prompts at the right altitude", body:"The piece uses a Goldilocks framing: a good system prompt is specific enough to actually steer behavior, but not so rigid that it becomes a brittle pile of hardcoded rules for every edge case. Two failure modes bookend the sweet spot — over-specifying with brittle logic that breaks the moment reality doesn't match your assumptions, and under-specifying with vague guidance that silently assumes shared context the model doesn't have. And “minimal” doesn't mean “short” — it means the smallest set of information that still fully covers expected behavior, which can be substantial."},
    {h:"Tools and examples", body:"Bloated tool sets are a recurring failure mode: too much overlapping functionality, or ambiguous boundaries between when to use which tool. A useful test — if a human engineer on the team couldn't confidently say which tool applies, the agent won't be able to either. For few-shot examples, the advice is to curate a small, diverse set of canonical examples that illustrate the desired behavior, rather than trying to enumerate every edge case in a long list."},
    {h:"Defining “agent”", body:"After all the nuance, the piece lands on a compact working definition: an agent is an LLM autonomously using tools in a loop. Everything else in the article is really about managing what that loop can see at each turn."},
    {h:"Just-in-time retrieval", body:"Rather than stuffing everything potentially relevant into context up front, agents can keep lightweight references — file paths, IDs, links — and use tools to pull in the actual content only at the moment it's needed. The analogy drawn is to human memory: people don't memorize entire archives, they rely on external systems (folders, inboxes, bookmarks) and fetch on demand. Metadata like filenames and folder structure does real work here too, functioning as a signal for relevance, not just as bookkeeping."},
    {h:"The retrieval tradeoff", body:"Just-in-time / runtime exploration is slower than having pre-computed everything up front, and it requires careful tool design so the agent doesn't burn context wandering down dead ends. Claude Code is offered as a hybrid example: certain files (like CLAUDE.md) get loaded up front, while primitives like glob and grep let the agent explore and retrieve the rest of the codebase just-in-time."},
    {h:"Compaction", body:"For long-running conversations approaching the context limit, compaction summarizes the existing conversation and reinitializes a fresh context window seeded with that summary. Building a good compaction prompt is described as an iterative tuning process: start by maximizing recall (capture everything that might matter), then tighten toward precision by trimming what turned out to be unnecessary. A lighter-touch version of the same idea is simply clearing out old tool results the agent no longer needs to see again."},
    {h:"Structured note-taking", body:"Sometimes called agentic memory: the agent writes notes to a location outside the active context window (a file, a scratchpad) that can be pulled back in later. This gives a form of persistent memory across a long task or even across sessions, without needing to keep everything live in context the whole time."},
    {h:"Sub-agent architectures", body:"For work that's genuinely parallel or exploratory, specialized sub-agents can each get their own clean context window, do extensive digging on a narrow slice of the problem, and hand back only a condensed summary to the lead agent — keeping the lead agent's own context from bloating with every dead end its sub-agents explored."},
    {h:"Choosing a technique", body:"The three long-horizon techniques aren't mutually exclusive, and the piece frames the choice as task-dependent: compaction suits long back-and-forth conversations, structured note-taking suits iterative work with clear milestones to check back against, and multi-agent/sub-agent setups suit complex work that benefits from parallel exploration. The overarching principle tying it all together: find the smallest set of high-signal tokens that gets you to the outcome you want."}
  ],
  questions: [
{cat:"foundations", q:"How does the article define “context engineering” in relation to prompt engineering?", opts:[
  {t:"The natural progression of prompt engineering — curating and maintaining the optimal set of tokens during inference, beyond just the prompt itself", c:true, why:"This is the article's own framing of context engineering as an evolution of prompt engineering."},
  {t:"A full replacement for prompt engineering that the article says eliminates any ongoing need to write or maintain system prompts at all", c:false, why:"Context engineering is described as building on prompt engineering, not eliminating the need for it."},
  {t:"A narrower subset of prompt engineering that the article restricts specifically to the design and curation of few-shot examples alone", c:false, why:"Context engineering spans system prompts, tools, message history, and retrieval — not just few-shot examples."},
  {t:"A synonym the article uses interchangeably with fine-tuning, since both are said to involve permanently modifying what the model has learned", c:false, why:"Context engineering operates at inference time on the token window, not by modifying model weights like fine-tuning does."}
]},
{cat:"foundations", q:"What is “context,” as defined in the article?", opts:[
  {t:"The set of tokens included when sampling from an LLM", c:true, why:"This is the article's direct definition of context."},
  {t:"Only the system prompt specifically, explicitly excluding tool definitions and prior message history from the definition", c:false, why:"The article's definition of context is broader — it includes tools, messages, and any other tokens present at inference."},
  {t:"The original training data distribution the underlying model was exposed to before being deployed for inference", c:false, why:"That describes training data, which is a separate concept from the inference-time context window the article defines."},
  {t:"The external database or knowledge store an agent queries, treated by the article as distinct from anything inside the context window itself", c:false, why:"Once retrieved, that data becomes part of the context — the article doesn't treat external stores as a separate category from context."}
]},
{cat:"attention", q:"What is “context rot,” as described in the article?", opts:[
  {t:"As the number of tokens in the context window increases, a model's ability to accurately recall information from that context decreases", c:true, why:"This is the article's direct definition of context rot."},
  {t:"A bug specific to older transformer architectures that the article claims newer model generations no longer exhibit under any circumstances", c:false, why:"The article presents context rot as a general architectural tendency tied to attention mechanics, not a legacy bug that's been fully solved."},
  {t:"The gradual corruption of files stored via a memory tool across many sessions, unrelated to the size of the active context window", c:false, why:"Context rot is specifically about degraded recall as context length grows, not about file storage corruption over time."},
  {t:"A phenomenon where tool descriptions become outdated after an underlying API changes, which the article treats as unrelated to context length", c:false, why:"That's a documentation-maintenance issue, not what the article means by context rot, which concerns recall degrading with token count."}
]},
{cat:"attention", q:"Why does the article describe LLMs as having an “attention budget” that is depleted by every new token?", opts:[
  {t:"Because of the transformer architecture, every token can attend to every other token, creating n² pairwise relationships that get stretched thin as context grows", c:true, why:"This is the article's architectural explanation for the attention budget concept."},
  {t:"Because the article states each new token carries a fixed dollar cost that is billed directly against a hard, non-negotiable spending cap", c:false, why:"Attention budget in the article is an architectural/cognitive concept, not a description of API billing mechanics."},
  {t:"Because models are described as limited to a fixed number of tool calls before being forced to discard all prior context entirely", c:false, why:"The attention budget concept concerns token-level relationships, not a tool-call counter that triggers context deletion."},
  {t:"Because the article frames “attention budget” as purely a marketing term with no underlying architectural cause behind it", c:false, why:"The article ties the term directly to the n² attention mechanism of transformers, giving it a concrete architectural basis."}
]},
{cat:"attention", q:"Does context degradation behave as a hard cliff or a gradient, according to the article?", opts:[
  {t:"A performance gradient — models remain highly capable at longer contexts but may show reduced precision for retrieval and long-range reasoning", c:true, why:"This is the article's explicit characterization of how context degradation actually behaves."},
  {t:"A hard cliff — the article states models perform perfectly up to an exact token count, then fail completely immediately beyond that threshold", c:false, why:"The article explicitly rejects a hard-cliff framing in favor of a gradual performance gradient."},
  {t:"Neither — the article claims context length has no measurable effect on model performance under any tested condition", c:false, why:"The article's entire premise is that context length does measurably affect performance, which is why context engineering matters."},
  {t:"A hard cliff, but the article notes this behavior applies only to open-source models, with closed-source models said to degrade gradually instead", c:false, why:"No such open-source/closed-source distinction is drawn — the gradient framing is presented as general, not model-family specific."}
]},
{cat:"system_prompts", q:"What is the “right altitude” for a system prompt, per the article's Goldilocks framing?", opts:[
  {t:"Specific enough to guide behavior effectively, yet flexible enough to give the model strong heuristics rather than brittle, hardcoded logic", c:true, why:"This is the article's exact Goldilocks description of system prompt altitude."},
  {t:"As short as possible in every case, since the article states minimal token count is the only criterion that determines prompt quality", c:false, why:"The article distinguishes “minimal” from merely “short” — brevity alone isn't the goal, sufficient guidance is."},
  {t:"As exhaustive as possible, explicitly covering every conceivable edge case so that no ambiguity is left for the model to resolve", c:false, why:"Exhaustive, hardcoded edge-case coverage is the brittle failure mode the article warns against, not the recommended altitude."},
  {t:"Written entirely in bullet-point lists, since the article states prose-style instructions are fundamentally ineffective for agentic system prompts", c:false, why:"The article doesn't mandate a specific formatting style like bullets over prose — altitude is about content specificity, not formatting."}
]},
{cat:"system_prompts", q:"What are the two failure modes the “right altitude” concept sits between?", opts:[
  {t:"Hardcoding complex, brittle logic to elicit exact behavior vs. giving vague, high-level guidance that assumes shared context", c:true, why:"These are the article's two named failure modes flanking the right altitude."},
  {t:"Using too many tools within a single system prompt vs. using too few tools, framed by the article as the primary altitude tradeoff", c:false, why:"Tool count is a separate topic in the article — altitude specifically concerns how specific or vague the prompt's instructions are."},
  {t:"Writing prompts in XML-style tags vs. writing prompts in Markdown formatting, which the article treats as a binary quality axis", c:false, why:"Formatting choice (XML vs. Markdown) isn't the axis the article uses to define altitude — specificity of guidance is."},
  {t:"Including few-shot examples vs. excluding them entirely, which the article frames as the central altitude tradeoff for any system prompt", c:false, why:"Examples are discussed separately from altitude — the altitude tradeoff is specifically about hardcoded logic versus vague guidance."}
]},
{cat:"system_prompts", q:"Does “minimal” system prompt content mean the same thing as “short,” per the article?", opts:[
  {t:"No — minimal means the smallest set of information that fully outlines expected behavior, which may still require substantial detail", c:true, why:"This is the article's explicit distinction between minimal and merely short."},
  {t:"Yes — the article defines minimal and short as fully interchangeable terms throughout its discussion of system prompt design", c:false, why:"The article explicitly separates the two concepts rather than treating them as synonyms."},
  {t:"No — the article says minimal refers only to formatting minimalism, such as avoiding XML tags, rather than to informational content at all", c:false, why:"Minimal in the article refers to informational completeness, not a formatting-only concept like tag usage."},
  {t:"Yes, but the article specifies this equivalence applies only to system prompts under a fixed 500-token threshold", c:false, why:"No such fixed token threshold is given in the article's discussion of minimal versus short."}
]},
{cat:"tools_examples", q:"What common failure mode does the article describe with bloated tool sets?", opts:[
  {t:"They cover too much functionality or create ambiguous decision points — if a human engineer can't say which tool to use, neither can the agent", c:true, why:"This is the article's stated diagnostic test and failure mode for bloated tool sets."},
  {t:"Bloated tool sets are described as always producing faster completions than small tool sets, but at some cost to overall accuracy", c:false, why:"The article's concern with bloated tool sets is ambiguity and confusion, not a speed-versus-accuracy tradeoff."},
  {t:"Bloated tool sets are said to cause the agent to refuse to call any tool at all, as an intentional built-in safety behavior", c:false, why:"The article describes confusion and misuse, not a designed refusal behavior triggered by having many tools."},
  {t:"Bloated tool sets are described as a problem exclusively for fixed workflows, with the article stating agents are immune to this issue", c:false, why:"The article discusses this failure mode specifically in the context of agents choosing among tools, not workflows."}
]},
{cat:"tools_examples", q:"What guidance does the article give for using few-shot examples effectively?", opts:[
  {t:"Curate a set of diverse, canonical examples that portray expected behavior, rather than stuffing in a laundry list of every edge case", c:true, why:"This is the article's explicit few-shot example guidance."},
  {t:"Avoid using examples entirely, since the article states they are consistently less effective than natural-language instructions on their own", c:false, why:"The article recommends using curated examples, not avoiding them — it just cautions against overloading with edge cases."},
  {t:"Include as many edge-case examples as can fit, since the article claims accuracy improves in direct linear proportion to example count", c:false, why:"The article specifically warns against a “laundry list” of edge cases, favoring a smaller, diverse, canonical set instead."},
  {t:"Examples are described as useful only for classification-style tasks, with the article stating they don't help open-ended agentic behavior", c:false, why:"The article discusses examples broadly for shaping agent behavior, not as a technique limited to classification tasks."}
]},
{cat:"retrieval", q:"What simple definition for “agent” does the article converge on?", opts:[
  {t:"LLMs autonomously using tools in a loop", c:true, why:"This is the concise definition the article settles on."},
  {t:"Any LLM call that includes at least one tool definition in its request, regardless of whether autonomy is actually involved", c:false, why:"The article's definition requires an autonomous loop, not merely the presence of a tool definition in a single call."},
  {t:"A system where a human must manually approve every individual tool call before the agent is permitted to execute it", c:false, why:"Human-in-the-loop approval is a possible safeguard, but it's not part of the article's core definition of an agent."},
  {t:"A multi-agent system that specifically requires at least one orchestrator LLM coordinating at least one separate worker LLM", c:false, why:"The article's simple definition doesn't require a multi-agent structure — a single LLM looping with tools already qualifies."}
]},
{cat:"retrieval", q:"What is the “just in time” context strategy, as opposed to pre-processing all data up front?", opts:[
  {t:"Agents maintain lightweight identifiers (file paths, queries, links) and use tools to dynamically load data into context only at the moment it's needed", c:true, why:"This is the article's definition of the just-in-time retrieval strategy."},
  {t:"Agents pre-load their entire available knowledge base into context before the very first turn of the conversation even begins", c:false, why:"That describes the pre-computed, up-front approach the article contrasts just-in-time retrieval against, not just-in-time itself."},
  {t:"Agents rely exclusively on embedding-based retrieval performed before inference begins, with no tool use permitted at runtime at all", c:false, why:"Just-in-time retrieval specifically relies on runtime tool use, which this option explicitly rules out."},
  {t:"Agents are described as discarding all context at the end of every single turn, restarting each new turn from a fully blank state", c:false, why:"That describes a form of aggressive context clearing, not the just-in-time retrieval strategy the article defines."}
]},
{cat:"retrieval", q:"What analogy does the article use to explain why “just in time” retrieval mirrors human cognition?", opts:[
  {t:"Humans generally don't memorize entire corpuses of information — we use external organization systems like file systems, inboxes, and bookmarks to retrieve on demand", c:true, why:"This is the article's stated cognitive analogy for just-in-time retrieval."},
  {t:"Humans are described as processing information exclusively through short-term memory, discarding anything not actively being rehearsed at that moment", c:false, why:"The article's analogy is about using external reference systems, not a claim about short-term-memory-only processing."},
  {t:"Humans are said to always prefer reading pre-processed summaries over exploring raw source material directly, in every situation", c:false, why:"The article doesn't make this claim — its analogy is about using external retrieval systems like bookmarks and file structures."},
  {t:"The article states it draws no cognitive analogy at all, framing just-in-time retrieval purely as an engineering-driven design decision", c:false, why:"The article explicitly does draw a cognitive analogy, comparing it to how humans use external memory aids."}
]},
{cat:"retrieval", q:"How can metadata like file names, folder hierarchies, and timestamps help an agent, beyond simple storage efficiency?", opts:[
  {t:"They act as signals that help the agent infer purpose and relevance — e.g. a file named test_utils.py implies something different depending on its folder", c:true, why:"This is the article's explanation of metadata as an inference signal, using its own worked example."},
  {t:"Metadata is described by the article as purely cosmetic organization with no measurable effect on any agent decision-making process", c:false, why:"The article treats metadata as functionally useful for inferring relevance, not as merely cosmetic."},
  {t:"Metadata is said to be useful only for human developers browsing a codebase, since the article claims agents ignore file paths entirely", c:false, why:"The article's point is specifically that agents use metadata like paths and names to infer context, not that they ignore it."},
  {t:"Metadata is framed as primarily helping to reduce the dollar cost of data storage, with no described effect on retrieval quality", c:false, why:"The article's framing is about relevance and inference, not storage cost — that's not the benefit it describes."}
]},
{cat:"retrieval", q:"What tradeoff does runtime exploration (agents navigating and retrieving data themselves) introduce?", opts:[
  {t:"It's slower than retrieving pre-computed data, and requires thoughtful engineering so the agent doesn't waste context chasing dead ends", c:true, why:"This is the article's stated tradeoff for runtime exploration versus pre-computed retrieval."},
  {t:"It has no meaningful tradeoff at all — the article describes runtime exploration as strictly superior to pre-computed retrieval in every case", c:false, why:"The article explicitly names a real tradeoff (speed, risk of wasted context), rather than framing it as strictly superior."},
  {t:"It is said to eliminate the need for any tool design work at all, since agents are described as inferring file structure automatically without tools", c:false, why:"Runtime exploration still depends on well-designed tools like glob/grep — it doesn't remove the need for tool design."},
  {t:"It is described as working only for coding agents specifically, with the article stating it's inapplicable to any other kind of agent", c:false, why:"The article presents runtime exploration as a general strategy, using coding as one example, not as coding-exclusive."}
]},
{cat:"retrieval", q:"How does Claude Code's hybrid strategy combine both retrieval approaches?", opts:[
  {t:"Files like CLAUDE.md are dropped into context up front, while primitives like glob and grep let it navigate and retrieve other files just-in-time", c:true, why:"This is the article's specific description of Claude Code's hybrid retrieval strategy."},
  {t:"It alternates randomly between pre-loading and just-in-time retrieval on every single turn, without any fixed pattern governing the choice", c:false, why:"The strategy is a deliberate, structured hybrid, not a random alternation between the two approaches."},
  {t:"It always pre-loads the entire codebase into context regardless of its size, and is described as never performing any runtime exploration", c:false, why:"The article specifically highlights glob/grep-based runtime exploration as part of the hybrid approach, contradicting a pre-load-only description."},
  {t:"It disables just-in-time retrieval entirely once a project's file count exceeds a fixed threshold defined in the article", c:false, why:"No such file-count threshold or disabling behavior is described — the hybrid approach is presented as the standing default."}
]},
{cat:"long_horizon", q:"What are the three techniques the article introduces for context engineering on long-horizon tasks?", opts:[
  {t:"Compaction, structured note-taking, and sub-agent architectures", c:true, why:"These are the three long-horizon techniques the article names."},
  {t:"Prompt chaining, routing, and parallelization, borrowed directly from the separate “Building Effective Agents” workflow taxonomy", c:false, why:"Those are workflow patterns from a different article, not the long-horizon context techniques this article introduces."},
  {t:"Fine-tuning, retrieval-augmented generation, and reinforcement learning, presented as the article's three recommended long-horizon strategies", c:false, why:"The article's long-horizon techniques operate at inference time on context; none of these training-time methods are among them."},
  {t:"Namespacing, pagination, and truncation, framed as the article's core toolkit for managing very long agent conversations", c:false, why:"Those relate to tool response design in a different article, not this article's long-horizon context techniques."}
]},
{cat:"long_horizon", q:"What is “compaction,” as defined in the article?", opts:[
  {t:"Taking a conversation nearing the context window limit, summarizing its contents, and reinitiating a new context window with that summary", c:true, why:"This is the article's direct definition of compaction."},
  {t:"Deleting the oldest half of a conversation's messages outright, with the article stating no summarization step is involved in the process", c:false, why:"Compaction specifically involves summarizing before re-initiating, not a blind deletion with no summarization step."},
  {t:"Compressing tool response payloads using a fixed, lossless compression algorithm applied automatically before insertion into context", c:false, why:"Compaction is a summarization technique applied to conversation history, not a lossless data-compression algorithm for tool payloads."},
  {t:"Reducing the number of tools made available to an agent partway through the execution of a long-running task", c:false, why:"That describes tool-set trimming, a different concept from compaction, which is about summarizing conversation content."}
]},
{cat:"long_horizon", q:"What tuning process does the article recommend for building a compaction prompt?", opts:[
  {t:"Start by maximizing recall to capture every relevant detail from the trace, then iterate to improve precision by eliminating superfluous content", c:true, why:"This is the article's recommended recall-then-precision tuning process for compaction prompts."},
  {t:"Start with maximum brevity by default, and only add back detail if a human reviewer explicitly complains about missing information later", c:false, why:"The article recommends starting with high recall (thoroughness), not starting with maximum brevity first."},
  {t:"Use one fixed, non-iterative summarization template throughout, since the article states compaction prompts shouldn't vary across different agent traces", c:false, why:"The article explicitly frames compaction prompt-building as an iterative tuning process, not a single fixed template."},
  {t:"Precision should be maximized first according to the article, with recall only addressed later once the system is already in production", c:false, why:"The article's recommended order is the reverse: recall first, then precision, not precision first."}
]},
{cat:"long_horizon", q:"What does the article give as an example of a “safe, light-touch” form of compaction?", opts:[
  {t:"Tool result clearing — removing the raw results of tool calls made deep in message history that the agent no longer needs to see again", c:true, why:"This is the article's example of a light-touch compaction technique."},
  {t:"Deleting the system prompt entirely once the conversation passes a certain length, as described in the article's light-touch example", c:false, why:"The article's light-touch example targets old tool results, not deletion of the system prompt itself."},
  {t:"Removing all user messages from the context while preserving only the agent's own generated outputs, per the article's description", c:false, why:"That would remove essential task context — the article's example specifically targets stale tool results, not user messages."},
  {t:"Randomly sampling roughly half of all messages to discard regardless of their content, as the article's suggested light-touch method", c:false, why:"Random discarding isn't light-touch or safe by the article's standard — its example is a targeted removal of specific stale content."}
]},
{cat:"long_horizon", q:"What is “structured note-taking” (or agentic memory), and what benefit does it provide?", opts:[
  {t:"The agent writes notes persisted outside the context window that can be pulled back in later, providing persistent memory with minimal overhead", c:true, why:"This is the article's definition and stated benefit of structured note-taking."},
  {t:"A technique in which a separate human annotator manually writes summary notes for the agent to consult after each session ends", c:false, why:"The article describes the agent itself writing the notes, not a human annotator doing so."},
  {t:"A method for compressing tool schemas into shorter, more token-efficient function signatures before they're sent to the model", c:false, why:"That describes tool schema optimization, unrelated to the article's note-taking-as-persistent-memory technique."},
  {t:"A retrieval strategy in which the agent is described as only ever reading notes written by other, unrelated agents in different sessions", c:false, why:"Structured note-taking in the article is about an agent's own persistent memory, not reading other agents' unrelated notes."}
]},
{cat:"long_horizon", q:"How do sub-agent architectures help work around context limitations?", opts:[
  {t:"Specialized sub-agents handle focused tasks with clean context windows, exploring extensively but returning only a condensed summary to the lead agent", c:true, why:"This is the article's description of how sub-agent architectures manage context."},
  {t:"Sub-agents share a single, unified context window with the lead agent at all times, per the article's description of the architecture", c:false, why:"The article specifically emphasizes clean, separate context windows for sub-agents, not a single shared window."},
  {t:"Sub-agents are described as replacing the need for any compaction or note-taking technique entirely once they're introduced into a system", c:false, why:"The article presents all three long-horizon techniques as complementary options, not as mutually exclusive replacements."},
  {t:"Sub-agents are described in the article as useful only for coding tasks, with research or analysis tasks explicitly excluded", c:false, why:"The article gives complex parallel research as a fitting use case for sub-agents, not coding exclusively."}
]},
{cat:"long_horizon", q:"How does the article suggest choosing between compaction, note-taking, and multi-agent architectures?", opts:[
  {t:"It depends on task characteristics: compaction suits extensive back-and-forth, note-taking suits iterative work with milestones, and multi-agent suits complex parallel research", c:true, why:"This is the article's task-fit guidance for choosing among the three techniques."},
  {t:"Multi-agent architectures should always be used by default, since the article states the other two techniques are considered obsolete", c:false, why:"The article presents all three as valid, task-dependent choices, not multi-agent as a default replacing the others."},
  {t:"The choice is arbitrary, since the article states all three techniques are functionally interchangeable regardless of task type", c:false, why:"The article ties each technique to specific task characteristics rather than treating the choice as arbitrary."},
  {t:"Compaction should never be combined with note-taking, since the article describes the two techniques as mutually exclusive by design", c:false, why:"The article doesn't frame these techniques as mutually exclusive — they can complement each other depending on the situation."}
]},
{cat:"foundations", q:"What is the article's overarching guiding principle for good context engineering?", opts:[
  {t:"Find the smallest possible set of high-signal tokens that maximizes the likelihood of the desired outcome", c:true, why:"This is the article's stated overarching principle."},
  {t:"Maximize the total number of tokens provided to the model in every case, so that no potentially relevant detail is ever left out", c:false, why:"This is the opposite of the article's guiding principle, which favors a minimal, high-signal token set over maximal inclusion."},
  {t:"Always favor pre-computed retrieval over any form of runtime exploration, without exception, according to the article's stated principle", c:false, why:"The article presents both retrieval strategies as valid depending on context, not a strict, exception-free preference for one."},
  {t:"Context engineering is described as mattering only for tasks under a fixed token count, and can be safely ignored above that threshold", c:false, why:"No such token-count cutoff is described — the article treats context engineering as broadly important across task lengths."}
]}
  ]
},

wt: {
  name: "Writing Tools for Agents",
  desc: "Tools as a contract with non-deterministic agents, building evaluations, and principles for high-quality tool design.",
  url: "anthropic.com/engineering/writing-tools-for-agents",
  link: "https://www.anthropic.com/engineering/writing-tools-for-agents",
  notes: [
    {h:"A new kind of software contract", body:"Traditional software connects deterministic systems to other deterministic systems — call the same function with the same input, get the same output. A tool connects a deterministic system to a non-deterministic agent. That changes what “good design” means: you're not just specifying a correct interface, you're shaping how a reasoning model will interpret, choose, and misuse that interface."},
    {h:"Building tools with Claude Code", body:"When a tool depends on an external SDK or API, it helps to hand Claude Code the actual documentation — many providers now publish LLM-friendly llms.txt files — rather than relying on the model's possibly-outdated built-in knowledge of that API's specifics."},
    {h:"What makes a strong evaluation task", body:"Weak eval tasks tend to be simplistic, single-step lookups. Strong ones are realistic and often require the agent to chew through multiple tool calls, mirroring the complexity of how the tool will actually get used. Verifiers need to be tolerant of legitimate variation — formatting, phrasing, punctuation — or they end up penalizing genuinely correct answers for superficial reasons."},
    {h:"How to run the evals", body:"Prompting the evaluation agent to reason and give feedback before each tool call serves two purposes: it can trigger useful chain-of-thought behavior that improves the agent's actual performance, and it gives you a legible trail of why a tool was (or wasn't) called. Beyond raw accuracy, it's worth tracking runtime, total tool calls, token consumption, and error rates — these often reveal consolidation opportunities that accuracy alone won't surface. A real example cited: Claude was needlessly tacking “2025” onto a web search query, quietly degrading results, until the tool description was tightened up."},
    {h:"Avoiding overfitting", body:"Held-out test sets matter here just like anywhere else in ML: if you only ever check improvements against the same eval set you're optimizing on, you can't tell genuine generalization from overfitting to that particular set of tasks."},
    {h:"Don't just wrap the API", body:"A common mistake is exposing an existing API endpoint as a tool with minimal changes. The problem is that agents have different affordances than traditional software — most importantly, limited context — so a tool that assumes cheap, unlimited memory (like returning every row of a database) can be actively harmful. The address-book example: a search_contacts tool beats a list_contacts tool, because an agent reading through an entire unfiltered list burns context on irrelevant entries in a way traditional code never would."},
    {h:"Consolidating functionality", body:"Rather than exposing every low-level API call as its own tool (list_users, list_events, create_event), it's often better to build one higher-level tool — schedule_event — that internally handles the multi-step logic of finding availability and booking it. Fewer, more purposeful tools tend to outperform many granular ones."},
    {h:"Namespacing", body:"When an agent has access to many overlapping tools (say, several project-management integrations), grouping them under consistent prefixes or suffixes (asana_search, jira_search) helps the agent pick the right one. There's no single correct convention — prefix versus suffix effects vary by model — so it's worth testing your own naming scheme against your own evals rather than assuming one is universally better."},
    {h:"What tool responses should contain", body:"Favor high-signal, natural-language fields (name, file_type) over opaque low-level identifiers (uuid) — resolving arbitrary IDs into something semantically meaningful measurably cuts down on hallucinated references. A response_format parameter (e.g. “concise” vs. “detailed”) lets the agent choose lightweight natural-language output when that's enough, or fuller technical detail when it's actually needed for a follow-up call."},
    {h:"Managing token-heavy responses", body:"For tools that could return a lot of data, combine pagination, range selection, filtering, and truncation, with sensible defaults so the agent doesn't have to think hard to get a reasonably-sized response. And when a call fails, the error message should clearly state what went wrong and what to do about it — not an opaque code or a raw stack trace."},
    {h:"Writing the description itself", body:"A useful mental trick: describe the tool the way you'd explain it to a new hire — spell out implicit context like expected query formats or niche internal terms rather than assuming shared knowledge. Naming matters too: user_id instead of just user removes ambiguity about the expected format. The piece cites a real result from this kind of refinement work on SWE-bench Verified — sharpening tool descriptions measurably cut error rates and contributed to Claude Sonnet 3.5 reaching state-of-the-art performance on that benchmark."},
    {h:"Using Claude to improve tools", body:"Claude itself can help close the loop — reading evaluation transcripts, spotting patterns in failures, and refactoring a whole set of tools at once so that implementations and their descriptions stay consistent with each other as things change."}
  ],
  questions: [
{cat:"foundations", q:"How does the article define a “tool” as a new kind of software?", opts:[
  {t:"A contract between deterministic systems and non-deterministic agents, unlike traditional functions which are contracts between two deterministic systems", c:true, why:"This is the article's core definition of a tool."},
  {t:"A deterministic function that always produces the exact same output given the same input, functioning just like traditional software", c:false, why:"The article's whole point is that tools sit at a new kind of contract boundary precisely because the calling agent is non-deterministic."},
  {t:"A tool is defined strictly as any function exposed specifically through the Model Context Protocol, with nothing else qualifying as a tool", c:false, why:"The article's definition of “tool” is general and conceptual — it isn't restricted to a single protocol implementation."},
  {t:"A prompt template with no executable component at all, used purely to describe an action in natural language for the model to read", c:false, why:"A tool in the article's definition is something the agent actually invokes and gets a result from, not a non-executable description."}
]},
{cat:"building", q:"What does the article suggest providing when using Claude Code to write tools that depend on an external SDK or API?", opts:[
  {t:"Documentation for the relevant libraries, APIs, or SDKs — often found in LLM-friendly llms.txt files on official docs sites", c:true, why:"This is the article's specific recommendation for grounding tool-writing in accurate API documentation."},
  {t:"Nothing extra is needed, since the article states models require no external documentation whatsoever to write fully correct tool code", c:false, why:"The article specifically recommends supplying documentation, precisely because models can't reliably guess unfamiliar API details."},
  {t:"Only the API's marketing landing page, since the article describes technical documentation as too verbose to be practically useful", c:false, why:"The article recommends technical docs (like llms.txt files), not marketing pages, as the useful input."},
  {t:"A complete, pre-written unit test suite must be authored by a human before any tool implementation code can be generated at all", c:false, why:"The article doesn't require a pre-written test suite as a prerequisite — supplying documentation is the specific recommendation given."}
]},
{cat:"evals", q:"What distinguishes a “strong” evaluation task from a “weak” one, per the article's examples?", opts:[
  {t:"Strong tasks are realistic and often require multiple tool calls, grounded in real-world complexity, rather than overly simplistic single-step lookups", c:true, why:"This is the article's stated distinction between strong and weak evaluation tasks."},
  {t:"Strong tasks are defined by the article as always specifying the exact tool-call sequence the agent must follow, step by step, in order", c:false, why:"The article actually warns against overly rigid sequence requirements — realism and complexity define strength, not a fixed script."},
  {t:"Weak tasks are defined by the article as any task that takes a human reader longer than five minutes to fully understand", c:false, why:"Reading time isn't the article's criterion — task realism and multi-step complexity are what separate strong from weak tasks."},
  {t:"Strong tasks are described as never involving any customer or user data of any kind, specifically to avoid potential privacy issues", c:false, why:"Data sensitivity isn't the distinguishing factor the article gives — realism and multi-tool-call complexity are."}
]},
{cat:"evals", q:"What caution does the article give about writing verifiers for evaluation tasks?", opts:[
  {t:"Avoid overly strict verifiers that reject correct responses due to spurious differences like formatting, punctuation, or valid alternate phrasings", c:true, why:"This is the article's explicit caution about overly strict verifiers."},
  {t:"Verifiers should always be a simple exact string match, since the article states any other approach is inherently unreliable and should be avoided", c:false, why:"The article warns against exactly this kind of overly strict, exact-match verifier, since it penalizes valid alternate phrasings."},
  {t:"Verifiers must never use an LLM to judge a response, since the article restricts evaluation exclusively to deterministic code-based checks", c:false, why:"The article discusses LLM-based judging as a legitimate part of evaluation, not something to be excluded entirely."},
  {t:"Verifiers should reject any response that uses a different tool-call sequence than the reference solution, per the article's stated guidance", c:false, why:"That's the exact brittleness the article cautions against — grading the outcome rather than a rigid call sequence is recommended."}
]},
{cat:"evals", q:"Why does the article recommend instructing evaluation agents to output reasoning and feedback blocks before their tool calls?", opts:[
  {t:"Prompting reasoning before tool calls may trigger chain-of-thought behaviors that increase the LLM's effective intelligence, and helps reveal why an agent did or didn't call a tool", c:true, why:"This is the article's stated dual benefit of reasoning-before-tool-calls."},
  {t:"Reasoning blocks are described as a hard technical requirement of the Anthropic API that cannot be omitted from any tool call whatsoever", c:false, why:"Reasoning blocks are a recommended prompting practice in the article, not an API-level technical requirement."},
  {t:"Reasoning blocks are said to exist purely to reduce token usage by shortening the length of the eventual tool call that follows", c:false, why:"Reasoning blocks add tokens rather than reduce them — their benefit described is better behavior and interpretability, not token savings."},
  {t:"Reasoning blocks are described as useful only to human graders reviewing transcripts, providing no benefit to the agent's own task accuracy", c:false, why:"The article specifically ties reasoning blocks to potentially improving the agent's own performance via chain-of-thought effects."}
]},
{cat:"evals", q:"Besides top-level accuracy, what other metrics does the article recommend tracking during tool evaluation?", opts:[
  {t:"Runtime of tool calls and tasks, total number of tool calls, total token consumption, and tool errors", c:true, why:"These are the specific supplementary metrics the article recommends tracking."},
  {t:"Only the total dollar cost of running the full evaluation suite, since the article describes other operational metrics as mostly noise", c:false, why:"The article recommends a broader set of operational metrics, not cost alone treated as the only meaningful signal."},
  {t:"Only the number of distinct engineers who contributed code to writing each individual tool being evaluated", c:false, why:"Contributor count isn't a metric the article discusses at all — its focus is on runtime, tool-call counts, tokens, and errors."},
  {t:"Only whether the evaluation run happened to occur on a weekday versus a weekend, in order to control for infrastructure traffic patterns", c:false, why:"Day-of-week timing isn't among the article's recommended metrics for tool evaluation."}
]},
{cat:"evals", q:"What real example does the article give of a tool description fix that resolved a bias in Claude's tool usage?", opts:[
  {t:"Claude was needlessly appending “2025” to a web search tool's query parameter, degrading results, which was fixed by improving the tool description", c:true, why:"This is the article's specific real-world example of a tool description fix."},
  {t:"Claude was calling a scheduling tool twice for every meeting request, an issue the article says was resolved by changing the tool's return type", c:false, why:"This isn't the example given — the article's cited case involves an unnecessary date string appended to a search query, not duplicate scheduling calls."},
  {t:"Claude was ignoring a pagination parameter entirely, an issue the article says was fixed by renaming the parameter from “page” to “offset”", c:false, why:"This specific pagination-renaming example isn't the one described — the article's example concerns a web search query parameter instead."},
  {t:"Claude was fabricating customer ID values, an issue the article says was resolved by adding a strict validation regex to the tool's input schema", c:false, why:"The article's cited example is about an unnecessary date being appended to a search query, not about fabricated customer IDs."}
]},
{cat:"evals", q:"Why does the article recommend using held-out test sets when optimizing tools?", opts:[
  {t:"To ensure improvements aren't just overfitting to the “training” evaluation set, revealing whether gains generalize", c:true, why:"This is the article's stated rationale for held-out test sets."},
  {t:"Held-out sets are described as necessary only when a human, rather than Claude, is the one writing the tool implementations by hand", c:false, why:"The article's recommendation applies regardless of who writes the tool — the point is guarding against overfitting in general."},
  {t:"Held-out sets are described as used exclusively to measure the dollar cost of running an evaluation, rather than measuring accuracy at all", c:false, why:"Held-out sets are specifically about validating that accuracy improvements generalize, not a cost-measurement mechanism."},
  {t:"Held-out sets are described as replacing the need for any task-generation step entirely once a small initial evaluation set exists", c:false, why:"Held-out sets complement the main eval set for validation — they don't eliminate the need to generate evaluation tasks."}
]},
{cat:"principles", q:"What common error does the article describe with tools that merely wrap existing software functionality or API endpoints?", opts:[
  {t:"They may not account for agents' different “affordances” — e.g. limited context — compared to traditional software with cheap, abundant memory", c:true, why:"This is the article's stated critique of naive API-to-tool wrapping."},
  {t:"Wrapping an API endpoint directly as a tool is described as always faster for an agent than any custom-built alternative implementation", c:false, why:"The article's critique is about mismatched affordances, not a claim that wrapped endpoints are always faster."},
  {t:"API-wrapping tools are described as fundamentally incompatible with the Model Context Protocol and therefore cannot be exposed through it", c:false, why:"MCP compatibility isn't the article's concern here — the issue raised is about context and usability mismatches for agents specifically."},
  {t:"The error described is that wrapped tools can never return structured data, and are limited by the article to returning plain text only", c:false, why:"The article's critique concerns affordance mismatches like context limits, not a restriction on structured-data output."}
]},
{cat:"principles", q:"In the address book example, why might a search_contacts tool be better than a list_contacts tool for an agent?", opts:[
  {t:"An agent reading through every contact token-by-token wastes limited context on irrelevant information, unlike traditional software which can cheaply process a full list", c:true, why:"This is the article's stated reasoning for preferring search over list in this example."},
  {t:"list_contacts tools are described as incompatible with the JSON-based tool-calling format used by most modern agent harnesses", c:false, why:"Both tool types can use the same JSON tool-calling format — compatibility isn't the article's stated reason for preferring search."},
  {t:"search_contacts tools are said to always execute faster in raw wall-clock time regardless of how large the underlying contact list actually is", c:false, why:"The article's argument is about context efficiency for the agent, not a general claim about server-side execution speed."},
  {t:"list_contacts tools are described as unable to be namespaced, whereas search_contacts tools are described as always namespaceable by design", c:false, why:"Namespacing is a separate, unrelated design consideration in the article — it isn't tied to the list-versus-search distinction here."}
]},
{cat:"principles", q:"What does it mean for a tool to “consolidate functionality,” per the article's scheduling example?", opts:[
  {t:"Instead of separate list_users, list_events, and create_event tools, implement one schedule_event tool that finds availability and books it in a single call", c:true, why:"This is the article's specific consolidation example for scheduling."},
  {t:"Consolidation is described as merging every tool available in a system into one single universal function regardless of its underlying purpose", c:false, why:"The article's consolidation example combines a few closely related steps into one tool, not all tools into a single universal function."},
  {t:"Consolidation is described as removing all optional parameters from a tool's schema in order to simplify its overall function signature", c:false, why:"Consolidation in the article is about merging multi-step workflows into one call, not about stripping optional parameters."},
  {t:"Consolidation is described as referring only to combining multiple separate MCP servers under a single shared authentication token", c:false, why:"That's an infrastructure/auth concept, not what the article means by consolidating functionality within a tool's design."}
]},
{cat:"namespacing", q:"What is “namespacing” tools, and why is it useful?", opts:[
  {t:"Grouping related tools under common prefixes (e.g. asana_search, jira_search) to help agents select the right tool when many overlapping tools are available", c:true, why:"This is the article's definition and stated benefit of namespacing tools."},
  {t:"Encrypting a tool's name so that only specifically authorized agents are able to discover that the tool even exists in the system", c:false, why:"Namespacing in the article is about naming conventions for clarity, not an encryption or access-control mechanism."},
  {t:"Assigning each tool a randomly generated UUID as its name, instead of using any human-readable label or descriptive prefix", c:false, why:"Namespacing specifically favors human-readable, descriptive prefixes or suffixes — the opposite of opaque random identifiers."},
  {t:"Namespacing is described as referring to a strict limit of exactly one tool per MCP server, in order to avoid any functional overlap", c:false, why:"Namespacing is a naming convention within or across tool sets, not a rule limiting servers to a single tool each."}
]},
{cat:"namespacing", q:"According to the article, is there a single universally correct choice between prefix- and suffix-based namespacing?", opts:[
  {t:"No — effects vary by LLM, and the article recommends choosing a naming scheme according to your own evaluations", c:true, why:"This is the article's explicit position — no universal winner, test it yourself."},
  {t:"Yes — the article states prefix-based namespacing is shown to outperform suffix-based namespacing consistently across every model tested", c:false, why:"The article explicitly avoids declaring a universal winner, instead recommending evaluation-driven decisions per model."},
  {t:"Yes — the article states suffix-based namespacing is the only scheme that is technically compatible with the Model Context Protocol specification", c:false, why:"Both prefix and suffix schemes are protocol-compatible — MCP compliance isn't the deciding factor the article raises."},
  {t:"The article states namespacing style has been shown to have no measurable effect on any tool-use evaluation across any model tested", c:false, why:"The article says effects vary by model — that's different from claiming there's no measurable effect at all."}
]},
{cat:"tool_responses", q:"What kind of information should tool implementations prioritize returning to agents, per the article?", opts:[
  {t:"High-signal, contextually relevant information — natural language fields like name or file_type rather than low-level identifiers like uuid", c:true, why:"This is the article's stated priority for tool response content."},
  {t:"As much raw technical metadata as possible, since the article claims agents generally prefer exhaustive detail over concise relevance", c:false, why:"The article's guidance favors concise, high-signal fields over exhaustive raw metadata dumps."},
  {t:"Only fields that are strictly required for the immediately next tool call, excluding any other descriptive or contextual information entirely", c:false, why:"The article recommends including useful contextual fields beyond the bare minimum needed for the next call."},
  {t:"Binary-encoded response payloads, since the article states agents are shown to parse binary formats more reliably than plain text formats", c:false, why:"The article's examples and guidance favor natural-language, text-based fields, not binary encoding."}
]},
{cat:"tool_responses", q:"What does resolving arbitrary alphanumeric UUIDs into more semantically meaningful identifiers accomplish, per the article?", opts:[
  {t:"It significantly improves precision in retrieval tasks by reducing hallucinations", c:true, why:"This is the article's stated benefit of this specific design change."},
  {t:"It is described as having no measurable effect on hallucination rates, though it does reduce token usage by a fixed, quoted percentage", c:false, why:"The article ties this change specifically to reduced hallucinations and improved precision, not merely to a token-savings figure."},
  {t:"It is described as making tool responses incompatible with any downstream tool call that still requires the original raw identifier", c:false, why:"The article doesn't describe a compatibility break — semantic identifiers are framed as an improvement, not a breaking change."},
  {t:"It is described as mattering only for tools accessed through a graphical interface, with no described benefit for agent-driven tool use", c:false, why:"The article's stated benefit is specifically about agent retrieval accuracy, not GUI-specific usability."}
]},
{cat:"tool_responses", q:"What is the purpose of exposing a response_format parameter (e.g. “concise” vs. “detailed”) on a tool?", opts:[
  {t:"To let the agent control verbosity — retrieving lightweight natural-language content when that's enough, or detailed technical IDs when needed for further tool calls", c:true, why:"This is the article's stated purpose for the response_format parameter."},
  {t:"To let the agent choose which programming language the tool's underlying server-side implementation happens to be written in", c:false, why:"response_format controls output verbosity in the article's description, not the implementation language of the tool itself."},
  {t:"To determine whether a given tool call is billed to the developer's account or instead to the end user's account", c:false, why:"Billing attribution isn't what response_format controls in the article — it's about output detail level."},
  {t:"The article describes response_format as mandatory on every tool defined, with no default value ever permitted to be set", c:false, why:"The article doesn't describe this parameter as universally mandatory with no default — it's presented as an optional design pattern."}
]},
{cat:"token_efficiency", q:"What combination of techniques does the article suggest for tool responses that could consume lots of context?", opts:[
  {t:"Pagination, range selection, filtering, and/or truncation with sensible default parameter values", c:true, why:"This is the article's stated combination of techniques for managing large tool responses."},
  {t:"Always returning the full, untruncated response in every case and explicitly letting the agent decide afterward what content to discard", c:false, why:"The article recommends proactively limiting response size via pagination/filtering/truncation, not always returning everything untruncated."},
  {t:"Disabling the tool entirely once its typical response size exceeds a fixed token count specified by the article as a hard limit", c:false, why:"The article's recommendation is to manage response size with techniques like pagination, not to disable the tool outright."},
  {t:"Converting all tool responses into compressed binary blobs that the agent is expected to decode itself at inference time", c:false, why:"The article's techniques (pagination, filtering, truncation) operate on structured or text data, not binary blob compression."}
]},
{cat:"token_efficiency", q:"What should a good error response do when a tool call fails, e.g. due to invalid input?", opts:[
  {t:"Clearly communicate specific, actionable improvements rather than opaque error codes or raw tracebacks", c:true, why:"This is the article's stated standard for a good tool error response."},
  {t:"Return the exact same generic error message for every distinct type of failure, in order to keep all responses maximally consistent", c:false, why:"The article recommends specific, actionable error messages, not a single generic message regardless of the failure type."},
  {t:"Silently retry the failed call up to five times internally before ever returning any response back to the agent at all", c:false, why:"The article's guidance is about the content of the error message itself, not a described silent-retry mechanism."},
  {t:"Omit any explanation from the error response entirely, since the article states agents are unable to make productive use of error text", c:false, why:"The article's whole point is the opposite — clear, actionable error text is described as genuinely useful to the agent."}
]},
{cat:"tool_descriptions", q:"What mental exercise does the article suggest when writing tool descriptions and specs?", opts:[
  {t:"Think about how you'd describe the tool to a new hire on your team, making implicit context (query formats, niche terms) explicit", c:true, why:"This is the article's suggested mental exercise for writing tool descriptions."},
  {t:"Write descriptions as tersely as possible in every case, since the article states verbose descriptions are shown to always reduce accuracy", c:false, why:"The article's recommendation is about making implicit context explicit, which often means adding detail, not minimizing it at all costs."},
  {t:"Write descriptions exclusively in the passive voice, in order to match typical conventions found in traditional API documentation", c:false, why:"No such passive-voice stylistic requirement appears in the article's guidance on tool descriptions."},
  {t:"Assume the agent already understands your organization's internal jargon and terminology without needing any further explanation at all", c:false, why:"The article's recommendation is the opposite — make niche or internal terms explicit rather than assuming shared context."}
]},
{cat:"tool_descriptions", q:"Why does the article recommend naming a parameter user_id instead of just user?", opts:[
  {t:"Input parameters should be unambiguously named, avoiding ambiguity about the expected format of the value", c:true, why:"This is the article's stated rationale for precise parameter naming."},
  {t:"user_id is described as a name required by the Model Context Protocol specification, meaning it cannot be named anything else", c:false, why:"MCP doesn't mandate this specific parameter name — the article's reasoning is about reducing ambiguity, not protocol compliance."},
  {t:"Longer parameter names are described by the article as always reducing the overall token count of the resulting tool call payload", c:false, why:"Longer names typically use more tokens, not fewer — that's not the article's stated reasoning here anyway."},
  {t:"The article states this distinction matters only for tools implemented in strongly typed programming languages, and not otherwise", c:false, why:"The article's naming guidance applies broadly to parameter design, regardless of the tool's underlying implementation language."}
]},
{cat:"tool_descriptions", q:"What real-world result does the article cite from refining tool descriptions for the SWE-bench Verified evaluation?", opts:[
  {t:"Precise refinements to tool descriptions dramatically reduced error rates and helped Claude Sonnet 3.5 achieve state-of-the-art performance", c:true, why:"This is the article's cited real-world result from that specific refinement effort."},
  {t:"Tool description changes are reported to have had no measurable effect on SWE-bench Verified scores in either a positive or negative direction", c:false, why:"The article specifically cites a dramatic improvement from these refinements, not a null result."},
  {t:"Refining tool descriptions is described as having improved only latency, with the article stating no change occurred in task completion accuracy", c:false, why:"The article's cited result is specifically about accuracy/error-rate improvement, not a latency-only effect."},
  {t:"SWE-bench Verified performance is described as having improved only after switching from JSON-based tool definitions to markdown-based ones", c:false, why:"The article attributes the improvement to refined descriptions, not to a format switch from JSON to markdown."}
]},
{cat:"principles", q:"What role can Claude itself play in the tool-improvement process, per the article?", opts:[
  {t:"Analyzing evaluation transcripts and refactoring lots of tools at once, helping keep implementations and descriptions self-consistent as changes are made", c:true, why:"This is the article's stated role for Claude in the tool-improvement loop."},
  {t:"Claude is described as usable only to write initial tool code, and never to analyze evaluation results or transcripts afterward", c:false, why:"The article specifically describes Claude analyzing evaluation transcripts, not just writing initial code."},
  {t:"Claude's feedback on tool design is described as unreliable in the article, which recommends always discarding it in favor of human judgment alone", c:false, why:"The article presents Claude's analysis and refactoring as a genuinely useful part of the improvement process, not as unreliable."},
  {t:"Claude is described as only able to optimize tools that it originally authored itself, excluding tools written by a human researcher", c:false, why:"No such authorship restriction is described — the article presents Claude as able to help refine any tool set, regardless of who wrote it originally."}
]}
  ]
},

mcp: {
  name: "Introducing the Model Context Protocol",
  desc: "The original MCP announcement — the problem it solves, its architecture, and its early ecosystem.",
  url: "anthropic.com/news/model-context-protocol",
  link: "https://www.anthropic.com/news/model-context-protocol",
  notes: [
    {h:"The problem", body:"Before MCP, connecting an AI assistant to any given data source — a codebase, a Slack workspace, a database — meant building a bespoke, one-off integration. That doesn't scale: every new source is its own project, and every new assistant has to redo the same integration work against the same sources. MCP is pitched as the fix — a single open standard instead of N×M custom connectors."},
    {h:"What MCP is", body:"An open standard for connecting AI assistants to the systems where data actually lives — content repositories, business tools, developer environments. It's explicitly framed as open, not proprietary or exclusive to Anthropic's own products, and it's meant to enable secure, two-way connections (not just read-only pipes)."},
    {h:"The architecture", body:"Two roles: MCP servers expose data and capabilities from a given system, and MCP clients — the AI applications themselves — connect to those servers to make use of them. That client/server split is what lets one server implementation (say, a Postgres server) be reused across many different AI applications, instead of every application building its own Postgres integration from scratch."},
    {h:"What launched with the announcement", body:"Three things for developers: the protocol specification plus SDKs to build against it; local MCP server support inside the Claude Desktop apps, so people could start testing right away; and an open-source repository of pre-built MCP servers for popular systems — Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer among them, giving developers working examples to build from."},
    {h:"Early ecosystem", body:"Claude 3.5 Sonnet was highlighted as particularly capable at writing MCP server implementations, which matters for adoption — it lowers the bar to building a new server. Block and Apollo were named as early companies integrating MCP into their own systems, and developer-tooling companies including Zed, Replit, Codeium, and Sourcegraph were cited as building MCP support into their platforms. Block's CTO is quoted describing open technology like this as a bridge connecting AI to real-world applications, freeing people to focus on creative work over mechanical integration work."},
    {h:"Getting started and looking ahead", body:"Claude for Work customers were told they could begin testing MCP servers locally right away, connecting Claude to internal systems and datasets. The longer-term vision the announcement lays out: as the ecosystem matures, AI systems should be able to maintain context as they move between different tools and datasets, replacing today's fragmented, source-by-source integration work. MCP is credited to David Soria Parra and Justin Spahr-Summers at Anthropic."}
  ],
  questions: [
{cat:"foundations", q:"What problem is the Model Context Protocol (MCP) designed to solve?", opts:[
  {t:"Every new data source requiring its own custom integration, making truly connected AI systems difficult to scale", c:true, why:"This is the article's stated problem MCP addresses."},
  {t:"Models being too slow at generating text output compared to the response times of traditional keyword-based search engines", c:false, why:"Generation speed isn't the problem the announcement describes — fragmented, one-off integrations are the stated issue."},
  {t:"The lack of any shared standard for formatting prompts sent to different large language model providers' APIs", c:false, why:"MCP addresses connecting models to external data and tools, not standardizing prompt formatting across providers."},
  {t:"AI assistants being architecturally unable to execute more than a single tool call within one conversation turn or session", c:false, why:"That's not a limitation the announcement describes or that MCP is framed as solving — the issue is fragmented per-source integration work."}
]},
{cat:"foundations", q:"How is MCP described at a high level?", opts:[
  {t:"An open standard for connecting AI assistants to the systems where data lives — content repositories, business tools, and development environments", c:true, why:"This is the announcement's own high-level description of MCP."},
  {t:"A proprietary, Anthropic-only API specifically intended for fine-tuning Claude directly on private enterprise datasets supplied by customers", c:false, why:"MCP is described as an open standard for connecting systems, not a fine-tuning API, proprietary or otherwise."},
  {t:"A closed, invite-only protocol limited exclusively to a small, pre-approved set of enterprise partners chosen at launch", c:false, why:"The announcement frames MCP as an open standard with public SDKs and an open-source server repository, not an invite-only system."},
  {t:"A full replacement for the Anthropic API's existing tool-use / function-calling request format, deprecating it going forward", c:false, why:"MCP is described as a complementary standard for connecting to external systems, not a replacement for existing tool-use formats."}
]},
{cat:"architecture", q:"What are the two sides of MCP's architecture, as described in the announcement?", opts:[
  {t:"MCP servers, which expose data, and MCP clients (AI applications), which connect to those servers", c:true, why:"This is the announcement's described client-server architecture for MCP."},
  {t:"MCP publishers, responsible for writing documentation, and MCP subscribers, responsible for consuming that documentation once published", c:false, why:"That's not the architecture described — the actual split is between servers exposing data and clients connecting to it."},
  {t:"MCP models, which are described as generating responses, and MCP graders, which are described as scoring those responses afterward", c:false, why:"Grading and evaluation aren't part of MCP's architecture as described in this announcement — it's a data-connection protocol."},
  {t:"MCP agents, described as acting autonomously, and MCP workflows, described as following fixed, predetermined paths", c:false, why:"That agents/workflows distinction is from a different article's taxonomy, not MCP's server/client architecture described here."}
]},
{cat:"foundations", q:"What kind of connection does MCP enable between data sources and AI-powered tools?", opts:[
  {t:"Secure, two-way connections", c:true, why:"This is the exact phrase the announcement uses to describe MCP connections."},
  {t:"One-way, strictly read-only connections that are described as unable to ever write data back to the originating source system", c:false, why:"The announcement specifically describes two-way connections, not a one-way, read-only limitation."},
  {t:"Connections that are described as requiring a fully offline, air-gapped environment in order to be considered secure by design", c:false, why:"No such air-gapped or offline requirement is described — MCP connections are framed as secure two-way links, not offline-only ones."},
  {t:"Connections that are described as limited strictly to plain text data, explicitly excluding structured or binary data formats", c:false, why:"The announcement doesn't restrict MCP to text-only data — it's described broadly as connecting AI to varied systems and data sources."}
]},
{cat:"components", q:"What three major components were introduced for developers in the initial MCP announcement?", opts:[
  {t:"The protocol specification and SDKs, local MCP server support in the Claude Desktop apps, and an open-source repository of MCP servers", c:true, why:"These are the three specific components the announcement lists for developers."},
  {t:"A hosted MCP marketplace with paid listings, a formal MCP certification program for vendors, and a dedicated MCP fine-tuning API", c:false, why:"None of these were part of the initial announcement — the actual components were the spec/SDKs, local server support, and open-source repo."},
  {t:"A dedicated MCP browser extension, a standalone MCP mobile SDK, and a proprietary MCP query language for structured data retrieval", c:false, why:"These weren't announced components — the announcement's three components were the spec/SDKs, desktop app support, and the open-source repo."},
  {t:"An automated MCP server grading rubric, an organizational compliance checklist for adopters, and a bug bounty program for the protocol", c:false, why:"None of these appear in the announcement — the real three components were the specification/SDKs, desktop support, and the open-source server repo."}
]},
{cat:"components", q:"Which model did the announcement highlight as being especially adept at building MCP server implementations?", opts:[
  {t:"Claude 3.5 Sonnet", c:true, why:"This is the model named in the announcement for this capability."},
  {t:"Claude 2.1, described in the announcement as the strongest available model at the time for writing MCP server code", c:false, why:"Claude 2.1 wasn't the model cited — the announcement specifically names Claude 3.5 Sonnet for this."},
  {t:"Claude Instant, cited by the announcement as unexpectedly effective at generating working MCP server implementations quickly", c:false, why:"Claude Instant isn't the model named in the announcement — Claude 3.5 Sonnet is the one specifically called out."},
  {t:"An unnamed internal Anthropic research model, described in the announcement as not yet available to external developers at launch", c:false, why:"The announcement names a specific, publicly available model (Claude 3.5 Sonnet), not an unnamed internal-only model."}
]},
{cat:"components", q:"Which systems were named as having pre-built MCP servers shared for developers to explore?", opts:[
  {t:"Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer", c:true, why:"This is the specific list of systems named in the announcement."},
  {t:"Salesforce, HubSpot, Zendesk, and Shopify, listed in the announcement as the initial set of pre-built MCP server integrations", c:false, why:"These weren't the systems named — the announcement's actual list includes Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer."},
  {t:"AWS S3, Azure Blob Storage, and Google Cloud Storage only, described as the sole cloud storage integrations available at launch", c:false, why:"Cloud storage providers like these aren't the systems the announcement names for pre-built servers."},
  {t:"Only unspecified internal Anthropic tools, which the announcement states were not disclosed publicly as part of the initial launch", c:false, why:"The announcement does publicly name specific external systems, including Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer."}
]},
{cat:"ecosystem", q:"Which companies were named as early MCP adopters integrating it into their own systems?", opts:[
  {t:"Block and Apollo", c:true, why:"These are the two early adopters specifically named in the announcement."},
  {t:"Salesforce and Oracle, cited in the announcement as the first two major enterprise companies to integrate MCP into production systems", c:false, why:"Salesforce and Oracle aren't the companies named — the announcement specifically cites Block and Apollo as early adopters."},
  {t:"Netflix and Spotify, described in the announcement as early adopters using MCP to power internal media recommendation systems", c:false, why:"Neither Netflix nor Spotify is named in the announcement — Block and Apollo are the early adopters actually cited."},
  {t:"Amazon and Meta, listed in the announcement as having integrated MCP across their respective internal developer tooling platforms", c:false, why:"Amazon and Meta aren't mentioned as early adopters in the announcement — Block and Apollo are the ones specifically named."}
]},
{cat:"ecosystem", q:"Which development tools companies were named as working with MCP to enhance their platforms?", opts:[
  {t:"Zed, Replit, Codeium, and Sourcegraph", c:true, why:"These are the specific dev tools companies named in the announcement."},
  {t:"JetBrains, Eclipse, and NetBeans, described in the announcement as the primary IDE vendors integrating MCP support at launch", c:false, why:"These IDE vendors aren't named in the announcement — the actual companies cited are Zed, Replit, Codeium, and Sourcegraph."},
  {t:"Docker, Kubernetes, and Terraform, cited by the announcement as infrastructure tooling companies building native MCP support", c:false, why:"These infrastructure tools aren't the companies named — the announcement's list is Zed, Replit, Codeium, and Sourcegraph."},
  {t:"GitHub, GitLab, and Bitbucket, listed in the announcement as the three source-control platforms enhancing their tools using MCP", c:false, why:"These source-control platforms aren't named as dev-tools adopters in the announcement — Zed, Replit, Codeium, and Sourcegraph are."}
]},
{cat:"ecosystem", q:"According to Block's CTO, what does open technology like MCP provide?", opts:[
  {t:"A bridge connecting AI to real-world applications, so people can focus on the creative rather than the mechanical", c:true, why:"This is the quote attributed to Block's CTO in the announcement."},
  {t:"A way to eliminate the need for any human oversight of AI-driven business processes entirely, according to the quoted statement", c:false, why:"The quote is about connecting AI to applications so people can focus on creative work, not about removing human oversight."},
  {t:"A guarantee of zero ongoing operating cost for any AI integration built using the protocol, per the announcement's quoted statement", c:false, why:"No cost guarantee is part of the quoted statement — it's about bridging AI to real-world applications."},
  {t:"The only viable method available for training large language models on proprietary, company-specific datasets, according to the quote", c:false, why:"The quoted statement concerns connecting AI to applications, not a claim about model training methods."}
]},
{cat:"foundations", q:"As the MCP ecosystem matures, what capability does the announcement say AI systems will gain?", opts:[
  {t:"Maintaining context as they move between different tools and datasets, replacing today's fragmented integrations", c:true, why:"This is the announcement's stated long-term vision for MCP's benefit."},
  {t:"The ability to train entirely new foundation models directly from aggregated, user-submitted MCP server interaction logs", c:false, why:"Training new foundation models from server logs isn't a capability the announcement describes as an outcome of MCP maturing."},
  {t:"Automatic translation of every connected data source into a single proprietary Anthropic-owned file format for storage", c:false, why:"No such file-format translation capability is described in the announcement's vision for MCP's future."},
  {t:"Full autonomy to modify their own underlying model weights in real time based on data encountered through MCP servers", c:false, why:"Self-modifying weights isn't part of MCP's described purpose — the stated goal is maintaining context across tools and datasets."}
]},
{cat:"getting_started", q:"According to the announcement, what could Claude for Work customers begin doing with MCP right away?", opts:[
  {t:"Test MCP servers locally, connecting Claude to internal systems and datasets", c:true, why:"This is exactly what the announcement says Claude for Work customers could do at launch."},
  {t:"Immediately deploy remote, production-grade MCP servers to their entire organization without needing any additional tooling or setup", c:false, why:"The announcement describes local testing as the immediate capability, not organization-wide remote production deployment."},
  {t:"Purchase pre-certified MCP servers exclusively through a dedicated enterprise marketplace launched alongside the protocol announcement", c:false, why:"No such paid marketplace is described in the announcement — local testing with open-source servers is what's actually offered."},
  {t:"Access MCP only as a separately priced paid add-on that the announcement states is unavailable on any other Claude.ai plan", c:false, why:"The announcement doesn't describe MCP access as gated behind a separate paid add-on for Claude for Work customers."}
]},
{cat:"origin", q:"Who is credited with creating MCP at Anthropic?", opts:[
  {t:"David Soria Parra and Justin Spahr-Summers", c:true, why:"These are the two individuals credited with creating MCP in the announcement."},
  {t:"Erik S. and Barry Zhang, credited in the announcement as the two engineers who originally designed and built the MCP protocol", c:false, why:"These aren't the individuals credited — the announcement names David Soria Parra and Justin Spahr-Summers as MCP's creators."},
  {t:"Ken Aizawa and Theodora Chu, named in the announcement as the lead architects behind the Model Context Protocol's design", c:false, why:"These names don't appear as MCP's creators in the announcement — David Soria Parra and Justin Spahr-Summers are the ones credited."},
  {t:"Mikaela Grace and Jeremy Hadfield, listed in the announcement as the primary creators responsible for MCP's initial specification", c:false, why:"These aren't the credited creators in the announcement — David Soria Parra and Justin Spahr-Summers are named instead."}
]}
  ]
},

evals: {
  name: "Demystifying Evals for AI Agents",
  desc: "The structure of agent evaluations, grader types, agent-type playbooks, non-determinism, and building an eval suite.",
  url: "anthropic.com/engineering/demystifying-evals-for-ai-agents",
  link: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents",
  notes: [
    {h:"Core vocabulary", body:"An eval gives an AI system an input and applies grading logic to its output to measure success. A task (or test case) is one such test with defined inputs and success criteria; a trial is one attempt at a task (run more than once, since outputs vary between runs); a grader is the scoring logic itself, and a single task can carry multiple graders, each with multiple assertions. A transcript (or trace/trajectory) is the full record of a trial — outputs, tool calls, reasoning, intermediate steps — while the outcome is the actual resulting state of the world, which can diverge from what the transcript claims happened. An evaluation harness is the infrastructure that runs and grades tasks end-to-end; an agent harness (scaffold) is what lets a model act as an agent in the first place. Evaluating “an agent” really means evaluating the harness and model together. An evaluation suite is a collection of related tasks sharing a broad goal."},
    {h:"Graders come in three flavors", body:"Code-based graders are fast, cheap, and reproducible, but brittle against valid variation and weak on subjective judgment. Model-based graders (rubric scoring, natural-language assertions, pairwise comparison, reference-based grading, multi-judge consensus) capture nuance and handle open-ended tasks, but are non-deterministic, costlier, and need calibration against human judgment to trust. Human graders are the gold standard for genuinely subjective calls, but expensive, slow, and dependent on expert availability at scale. Scoring across multiple graders on one task can be binary (all must pass) or weighted (combined score must clear a threshold)."},
    {h:"Capability evals vs. regression evals", body:"A capability eval is meant to be a hill to climb — it should start with a low pass rate on a genuinely hard, aspirational task. A regression eval exists to catch backsliding, so it should sit near 100% and stay there. Once a capability eval's pass rate climbs high enough that it's no longer discriminating, it can “graduate” into the regression suite, now serving as an ongoing check rather than a stretch goal."},
    {h:"Coding agents", body:"Software is unusually easy to grade because you can just run it: does it execute, do the tests pass? SWE-bench Verified grades against real GitHub issues by running the associated test suite; Terminal-Bench goes further, testing broader end-to-end technical tasks (like building something from source) rather than fixing one specific reported issue. Beyond pass/fail tests, it's often worth grading the transcript too — code-quality heuristics and model-based judgment of how the agent used its tools."},
    {h:"Conversational agents", body:"The interaction itself is part of what's being graded, which usually means simulating the other side of the conversation with a second model playing the user — as τ-Bench and τ2-Bench do across domains like retail support and airline booking. Success tends to be multidimensional: a hard state check (was the ticket actually resolved?) alongside rubric-graded dimensions like tone and efficiency."},
    {h:"Research agents", body:"Much harder to grade objectively — “comprehensive” or “well-sourced” depend on context, and even domain experts can disagree on what counts as sufficient. BrowseComp tests an agent's ability to find hard-to-locate information across the open web — questions that are easy to verify but hard to solve. A workable grading combination: groundedness checks (are claims actually supported by cited sources), coverage checks (were the key expected facts found), and source quality checks (are the cited sources credible)."},
    {h:"Computer use agents", body:"These operate through the same interface a human would — screenshots, clicks, keystrokes, scrolling — rather than a clean API. WebArena checks browser-scoped tasks (navigation, page/backend state); OSWorld extends that to full operating-system control, inspecting files, app configuration, and databases after the fact. A practical tradeoff shows up in how the agent perceives the screen: DOM-based interaction is fast but token-hungry, screenshot-based interaction is slower but more token-efficient."},
    {h:"Non-determinism: pass@k vs. pass^k", body:"pass@k asks: across k attempts, did at least one succeed? It rises as k grows, since more attempts mean more chances. pass^k asks the opposite question: did all k attempts succeed? It falls as k grows, since consistency across many trials is a much harder bar to clear — which is exactly why it matters more for customer-facing agents, where a single flaky failure out of many interactions is still a real problem."},
    {h:"Building an eval suite — the practical playbook", body:"Don't wait for hundreds of tasks — 20 to 50 tasks pulled from real failures is enough to start, because early changes tend to have large, easily detectable effects. A good task is one where two domain experts would independently agree on pass or fail. A 0% pass rate across many trials with a frontier model is usually a sign the task or grader is broken, not that the model is incapable — write a reference solution to prove the task is solvable and confirm the grading logic actually works. Build balanced problem sets that test both when a behavior should and shouldn't trigger, so the eval doesn't push the agent toward over- or under-triggering it. Run every trial in a clean, isolated environment, since leftover state (old files, prior history) can inflate scores or cause failures unrelated to real skill. Grade the outcome rather than a rigid tool-call sequence, since agents often find valid approaches nobody anticipated. When using an LLM judge, give it an explicit “Unknown” escape hatch to reduce hallucinated verdicts, and isolate judges per dimension rather than asking one judge to assess everything at once. Read transcripts constantly — a failing score sometimes means the agent messed up, and sometimes means the grader wrongly rejected a valid solution, and you won't know which without looking. Real-world cautionary examples: a CORE-Bench eval jumped from 42% to 95% once rigid grading, ambiguous specs, and irreproducible stochastic tasks got fixed; a METR benchmark accidentally penalized models for following its own stated instructions because of a threshold misconfiguration; and Qodo's team was initially unimpressed by a stronger model until they realized their one-shot evals simply weren't capturing gains that only showed up on longer, more complex tasks. Watch for eval saturation — once an agent clears every solvable task, the eval stops giving improvement signal even though it's still useful for catching regressions. Organizationally, it tends to work best when a dedicated evals team owns the core infrastructure while domain experts and product teams contribute the actual tasks."},
    {h:"Beyond automated evals", body:"No single method catches everything (the Swiss Cheese Model analogy), so these complement automated evals rather than replacing them: production monitoring reveals real-world behavior at scale but is reactive and lacks ground truth; A/B testing measures genuine outcomes but is slow and only tests what you actually ship; user feedback is sparse, self-selected, and skews toward severe issues; manual transcript review builds intuition but doesn't scale and varies by reviewer; systematic human studies are the most rigorous but expensive enough to reserve for calibrating LLM judges or grading genuinely subjective output."},
    {h:"Why build evals at all", body:"Even for workflows without one clean pass/fail signal, a simple framing can work — something like: don't break things, do what was asked, and do it well. Evals matter from day one of a project, not just after launch, because they force ambiguity in a spec to get resolved explicitly rather than left to two engineers' differing interpretations. Teams that already have a live agent but no formal evals can retrofit them by combining several techniques at once — static analysis, environment-testing agents, and LLM judges for behaviors like instruction-following — rather than needing to design a perfect system from scratch."}
  ],
  questions: [
{cat:"structure", q:"What is an “evaluation” (eval)?", opts:[
  {t:"A test for an AI system: give it an input, then apply grading logic to its output to measure success", c:true, why:"This is the article's direct definition of an eval."},
  {t:"A benchmark score published by a third-party research lab and cited afterward by product teams to justify a launch decision", c:false, why:"Evals in the article are something teams build and run themselves, not just externally published benchmark scores they cite."},
  {t:"A transcript review process performed only after an agent has already fully shipped to production, with no earlier use case described", c:false, why:"The article describes evals as used throughout development, not restricted to a post-launch-only review process."},
  {t:"A structured conversation format used specifically to calibrate two human graders against each other before any automated grading begins", c:false, why:"Grader calibration is one narrow technique mentioned, not the article's general definition of what an eval is."}
]},
{cat:"structure", q:"What distinguishes multi-turn evaluations from single-turn evaluations?", opts:[
  {t:"Single-turn evals are a prompt, response, and grading logic; multi-turn evals became more common as agentic capabilities advanced", c:true, why:"This matches the article's stated progression from single-turn to multi-turn evaluation."},
  {t:"Multi-turn evals are described as applying only to conversational agents, with the article stating they never apply to coding or research agents", c:false, why:"The article discusses multi-turn evaluation broadly across agent types, not as exclusive to conversational agents."},
  {t:"Single-turn evals are described as requiring a live production deployment, while multi-turn evals are described as running entirely offline instead", c:false, why:"Deployment environment isn't what separates the two — the distinction is about the number of interaction turns being evaluated."},
  {t:"Multi-turn evals are described as replacing grading logic entirely with pure, unstructured human judgment in every case", c:false, why:"Multi-turn evals still use grading logic, potentially combined with human judgment — they don't eliminate structured grading."}
]},
{cat:"structure", q:"What is a “task” (a.k.a. problem or test case)?", opts:[
  {t:"A single test with defined inputs and success criteria", c:true, why:"This is the article's direct definition of a task."},
  {t:"The complete record of outputs, tool calls, and reasoning generated during the course of one specific trial run", c:false, why:"That describes a transcript, a separate concept from a task in the article's terminology."},
  {t:"A collection of many individual tasks that all happen to share one broad underlying goal, such as refunds and cancellations together", c:false, why:"That describes an evaluation suite, which is a collection of tasks, not a single task itself."},
  {t:"The underlying infrastructure responsible for running many tasks concurrently and then aggregating their results into a final report", c:false, why:"That describes the evaluation harness, a different concept from an individual task in the article."}
]},
{cat:"structure", q:"Why run multiple “trials” of the same task instead of just one?", opts:[
  {t:"Model outputs vary between runs, so multiple attempts produce more consistent, reliable results", c:true, why:"This is the article's stated rationale for running multiple trials per task."},
  {t:"Each grader is described as permitted to score only a single trial before it must be formally recalibrated against human judgment", c:false, why:"No such single-use grader limitation is described — graders can be reused across many trials without mandatory recalibration each time."},
  {t:"Running exactly one trial is described as the article's standard, with regression suites specifically required to always run exactly double that number", c:false, why:"The article doesn't set a fixed doubling rule for regression suites — the point of multiple trials is accounting for output variability generally."},
  {t:"Multiple trials are described as necessary only once an eval suite has already reached saturation, and unnecessary before that point", c:false, why:"Multiple trials are useful from early development onward specifically because of output variability, not only after saturation."}
]},
{cat:"structure", q:"What is a “grader,” and what can a single task contain?", opts:[
  {t:"Logic that scores some aspect of performance; a task can have multiple graders, each with multiple assertions", c:true, why:"This is the article's definition of a grader and how tasks can be structured."},
  {t:"A human reviewer only, with the article describing code-based and model-based scoring as entirely separate from the concept of grading itself", c:false, why:"The article treats code-based, model-based, and human scoring all as types of graders, not as separate from grading."},
  {t:"The same thing as an evaluation suite, according to the article, just described as scoped down to a single capability rather than several", c:false, why:"A grader and an evaluation suite are distinct concepts in the article — a grader scores performance, a suite is a collection of tasks."},
  {t:"A single pass/fail check, with the article stating each task is strictly limited to exactly one grader containing exactly one assertion", c:false, why:"The article explicitly allows multiple graders per task, each potentially containing multiple assertions, not a strict one-and-one limit."}
]},
{cat:"structure", q:"What exactly is a “transcript” (also called a trace or trajectory)?", opts:[
  {t:"The complete record of a trial — outputs, tool calls, reasoning, and intermediate results", c:true, why:"This is the article's definition of a transcript."},
  {t:"The final state of the environment after a trial has ended, such as a specific row that now exists in a database", c:false, why:"That describes the outcome, a distinct concept the article separates from the transcript."},
  {t:"Only the agent's very last message sent to the user, explicitly excluding any tool calls made earlier during the trial", c:false, why:"A transcript covers the full trial record, including tool calls and intermediate steps, not just the final message."},
  {t:"A human-authored summary written after the fact by a grader who has reviewed an agent's tool calls during a trial", c:false, why:"A transcript is the raw record generated during the trial itself, not a human-written summary produced afterward."}
]},
{cat:"structure", q:"Why are “transcript” and “outcome” treated as two distinct concepts?", opts:[
  {t:"A transcript is the record of what happened; the outcome is the actual final state in the environment, which may not match what the agent claims happened", c:true, why:"This is the article's stated reason for distinguishing the two concepts, using its flight-booking example."},
  {t:"A transcript is described as covering only tool calls, while an outcome is described as covering only the agent's final text response to the user", c:false, why:"That's not how the article splits these concepts — a transcript covers the full record, while outcome is the actual environment state."},
  {t:"An outcome is described as something produced directly by a grader, while a transcript is described as something produced by the harness instead", c:false, why:"Both the transcript and the outcome arise from the trial itself — the harness records the transcript, but outcome isn't grader-produced."},
  {t:"The article states they're interchangeable terms used only in different sections of eval tooling documentation, with no real conceptual difference", c:false, why:"The article explicitly treats them as distinct, using a concrete flight-booking example to illustrate the difference."}
]},
{cat:"structure", q:"How does an “evaluation harness” differ from an “agent harness” (scaffold)?", opts:[
  {t:"The eval harness runs tasks and grades outputs end-to-end; the agent harness lets a model act as an agent by orchestrating tool calls", c:true, why:"This is the article's stated distinction between the two kinds of harness."},
  {t:"The agent harness is described as responsible for grading outputs, while the eval harness is described as only supplying the tools an agent can call", c:false, why:"This reverses the article's actual roles — grading belongs to the eval harness, and orchestrating tool calls belongs to the agent harness."},
  {t:"The article states they're interchangeable terms both referring to the same underlying piece of infrastructure in a typical eval setup", c:false, why:"The article explicitly treats them as two separate pieces of infrastructure serving different purposes."},
  {t:"The eval harness is described as existing only in production environments, while the agent harness is described as existing only during development", c:false, why:"Neither harness is restricted to a single environment in this way — both can be used across development and evaluation contexts."}
]},
{cat:"structure", q:"When you evaluate “an agent,” what are you actually evaluating?", opts:[
  {t:"The harness and the model working together", c:true, why:"This is the article's stated answer to what's actually being evaluated."},
  {t:"Only the underlying model's raw weights, considered by the article entirely independent of whatever scaffold surrounds it", c:false, why:"The article specifically says evaluating an agent means evaluating the model and its harness together, not the weights alone."},
  {t:"Only the system prompt used, since the article states the harness is assumed to be held perfectly constant across all evals run", c:false, why:"The article doesn't isolate the system prompt as the sole object of evaluation — harness and model together are what's assessed."},
  {t:"The evaluation suite's task authors specifically, since the article states their design choices are what primarily determine outcomes", c:false, why:"Task authors shape what's tested, but the article states what's actually being evaluated is the harness and model working together."}
]},
{cat:"structure", q:"What is an “evaluation suite,” as opposed to a single task?", opts:[
  {t:"A collection of tasks designed to measure specific capabilities, typically sharing a broad goal", c:true, why:"This is the article's definition of an evaluation suite."},
  {t:"A single especially difficult task, according to the article, used specifically to probe the absolute upper limit of agent capability", c:false, why:"That describes a hard individual task, not a suite, which the article defines as a collection of related tasks."},
  {t:"The scoring logic contained within one specific grader, considered by the article prior to being combined with any other graders", c:false, why:"That describes a grader's internal logic, a different concept from a suite, which is a collection of tasks."},
  {t:"A leaderboard comparing multiple different agent harnesses against the exact same fixed underlying model, per the article's definition", c:false, why:"The article doesn't define a suite as a leaderboard — it's specifically a collection of tasks sharing a broad goal."}
]},
{cat:"structure", q:"Why can a frontier agent “fail” a static eval as written while still producing a better real-world outcome?", opts:[
  {t:"Agents can find creative solutions, like exploiting a loophole in a stated policy, that surpass what the static eval anticipated", c:true, why:"This is the article's stated explanation, using its 𝜏2-bench flight-booking example."},
  {t:"Static evals are described by the article as always grading exclusively on latency, meaning any correct-but-slow solution is automatically marked a failure", c:false, why:"Latency-only grading isn't the article's described mechanism here — the example is about a policy loophole the static grader didn't anticipate."},
  {t:"Frontier agents are described as intentionally sabotaging any eval they recognize as synthetic rather than a genuine user request", c:false, why:"The article's example is about a creative, genuinely better solution, not intentional sabotage of a recognized synthetic task."},
  {t:"Grading logic for frontier models is described as disabled by default until a human manually re-enables it for that specific model", c:false, why:"No such disabled-by-default grading mechanism is described — the example concerns a mismatch between the eval's design and a valid creative solution."}
]},
{cat:"graders", q:"What are the three broad types of graders used for agent evals?", opts:[
  {t:"Code-based, model-based, and human graders", c:true, why:"These are the three grader types the article explicitly names."},
  {t:"Deterministic, probabilistic, and adversarial graders, presented in the article as the three foundational categories of agent grading", c:false, why:"This isn't the article's taxonomy — its three named categories are code-based, model-based, and human graders."},
  {t:"Pre-launch, in-production, and post-mortem graders, described in the article as classified according to when in the lifecycle they run", c:false, why:"The article's grader taxonomy is based on grading mechanism (code/model/human), not deployment lifecycle stage."},
  {t:"Rubric-based, outcome-based, and latency-based graders, listed in the article as its three primary categories of grading logic", c:false, why:"Rubric-based scoring is one method under model-based graders in the article, not one of its three top-level categories."}
]},
{cat:"graders", q:"What's a key weakness of code-based graders?", opts:[
  {t:"Brittle to valid variations that don't exactly match expected patterns, and lacking in nuance for subjective tasks", c:true, why:"This is the article's stated weakness for code-based graders."},
  {t:"Non-deterministic results that vary between otherwise identical runs, described by the article as making them especially hard to reproduce", c:false, why:"Non-determinism is actually the article's stated weakness of model-based graders, not code-based ones, which are typically deterministic."},
  {t:"Expensive to run at scale, described in the article as costing meaningfully more than comparable model-based or human grading approaches", c:false, why:"Code-based graders are described as fast and cheap in the article — cost isn't the weakness attributed to them."},
  {t:"Unable to verify tool calls, parameters, or environment state at all, according to the article's described limitations for this grader type", c:false, why:"Code-based graders are actually well-suited to verifying structured things like tool calls and state — that's not their described limitation."}
]},
{cat:"graders", q:"Which of these is a method associated with model-based graders?", opts:[
  {t:"Rubric-based scoring", c:true, why:"This is explicitly listed among the article's model-based grader methods."},
  {t:"Static analysis such as lint, type, and security checks, listed in the article as one of its primary model-based grading methods", c:false, why:"Static analysis tools like lint and type checks are examples of code-based grading in the article, not model-based grading."},
  {t:"Fail-to-pass and pass-to-pass binary tests, described in the article as a core technique specifically under model-based grading", c:false, why:"Fail-to-pass/pass-to-pass testing is a code-based (test-suite-driven) technique in the article, not a model-based one."},
  {t:"Inter-annotator agreement across multiple reviewers, listed by the article as a defining method under its model-based grading category", c:false, why:"Inter-annotator agreement is described in the article under human grading methods, not model-based grading."}
]},
{cat:"graders", q:"What's the biggest weakness of model-based graders?", opts:[
  {t:"Non-deterministic, more expensive than code, and require calibration with human graders for accuracy", c:true, why:"This is the article's stated weakness for model-based graders."},
  {t:"They are described as unable to be used for open-ended or freeform tasks at all, being restricted strictly to structured, closed-form ones", c:false, why:"Model-based graders are actually well-suited to open-ended, subjective tasks in the article — that's specifically their advantage."},
  {t:"They're described in the article as fast and cheap but too rigid to capture any nuance in subjective grading situations", c:false, why:"Rigidity and cheapness describe code-based graders in the article, not model-based ones, which are flexible but costlier and non-deterministic."},
  {t:"They require access to human experts at scale, described by the article as making them impractical for the vast majority of teams to use", c:false, why:"That describes a weakness of human graders in the article, not model-based ones, which don't inherently require expert-scale human access."}
]},
{cat:"graders", q:"Human graders are described as the “gold standard” — what tradeoffs come with them?", opts:[
  {t:"Expensive, slow, and often requiring access to human experts at scale", c:true, why:"This is the article's stated tradeoff for human graders."},
  {t:"Non-deterministic and prone to hallucinating verdicts specifically when given ambiguous rubrics to work from, per the article's description", c:false, why:"Hallucinated verdicts are a described risk for LLM-as-judge (model-based) graders in the article, not the tradeoff cited for human graders."},
  {t:"Cheap but slow, according to the article, since crowdsourced judgment is said to remove the cost associated with expert-level reviewers", c:false, why:"The article describes human graders as expensive, not cheap — that's the opposite of its stated tradeoff."},
  {t:"Fast but brittle, per the article, since human graders are described as struggling specifically with valid variations in agent output", c:false, why:"Brittleness to valid variations is the article's described weakness of code-based graders, not the tradeoff it attributes to human graders."}
]},
{cat:"graders", q:"For a task with multiple graders, what does “binary” scoring mean, as distinct from “weighted”?", opts:[
  {t:"All graders must pass", c:true, why:"This is the article's definition of binary scoring for multi-grader tasks."},
  {t:"Combined grader scores are described as needing to hit a specific numeric threshold that's set independently by the product team", c:false, why:"That describes weighted scoring in the article, which the question specifically distinguishes binary scoring from."},
  {t:"Only one grader out of several assigned is described as being randomly selected to determine the final overall score for a task", c:false, why:"The article doesn't describe a random single-grader selection mechanism — binary scoring means all assigned graders must pass together."},
  {t:"Scores are described as being averaged equally across code-based, model-based, and human graders assigned to a given task", c:false, why:"Equal averaging across grader types describes a form of weighted scoring, not the binary all-must-pass definition the article gives."}
]},
{cat:"types", q:"How do capability (“quality”) evals differ from regression evals in target pass rate?", opts:[
  {t:"Capability evals should start at a low pass rate as a hill to climb; regression evals should stay near 100%", c:true, why:"This is the article's stated target-pass-rate distinction between the two eval types."},
  {t:"Capability evals are described as needing to stay near 100% from the very start, while regression evals are described as beginning at a low pass rate", c:false, why:"This reverses the article's actual guidance — capability evals start low and improve, while regression evals should stay consistently near 100%."},
  {t:"Both eval types are described in the article as designed to converge on roughly 50%, so that improvements remain easy to detect over time", c:false, why:"Neither eval type targets a fixed 50% convergence point in the article — the two have distinctly different target pass rates."},
  {t:"Regression evals are described as having no defined pass-rate target at all, since the article states they exist only to track latency and cost", c:false, why:"Regression evals are specifically about maintaining a near-100% pass rate to catch capability drift, not tracking latency or cost."}
]},
{cat:"types", q:"What can happen to a capability eval once an agent is optimized and reaches a consistently high pass rate?", opts:[
  {t:"It can “graduate” into a regression suite that's run continuously to catch drift", c:true, why:"This is the article's stated description of eval graduation."},
  {t:"It's described as typically being retired outright, since a high pass rate is said to mean the underlying capability is no longer relevant to track", c:false, why:"The article's actual guidance is to graduate a high-scoring capability eval into ongoing regression testing, not retire it."},
  {t:"It's described as being converted automatically into a model-based grader for use on entirely unrelated tasks going forward", c:false, why:"The article doesn't describe this kind of automatic conversion into a grader for unrelated tasks — it describes graduation to a regression suite."},
  {t:"It's described as getting merged directly into production monitoring dashboards, after which it stops running as a standalone eval suite", c:false, why:"The article distinguishes production monitoring from regression suites as separate ongoing practices, not one absorbing the other."}
]},
{cat:"coding", q:"Why are deterministic graders a natural fit for coding agents?", opts:[
  {t:"Software is generally straightforward to evaluate: does the code run, and do the tests pass?", c:true, why:"This is the article's stated reasoning for why coding suits deterministic grading well."},
  {t:"Coding tasks are described in the article as never having any ambiguous specifications, unlike research or conversational agent tasks", c:false, why:"The article doesn't claim coding specs are always unambiguous — its point is that running code and tests gives a clear verification path."},
  {t:"Model-based graders are described as unable to parse code syntax at all, making deterministic checks the only technically viable option", c:false, why:"Model-based graders can and do assess code (e.g. via rubrics for quality) in the article — parsing isn't the described limitation."},
  {t:"Coding agents are described as not producing transcripts, meaning outcome-only grading is presented as the sole possible approach for them", c:false, why:"Coding agents do produce transcripts in the article's framework, and transcripts are described as useful to grade alongside outcomes."}
]},
{cat:"coding", q:"How does a benchmark like Terminal-Bench differ in approach from an issue-and-test-suite benchmark like SWE-bench Verified?", opts:[
  {t:"It tests end-to-end technical tasks, like building software from source or training a model, rather than fixing a specific reported issue", c:true, why:"This is the article's stated contrast between the two benchmark approaches."},
  {t:"It's described as grading exclusively via human SME review, with the article stating no automated test suite is involved in Terminal-Bench at all", c:false, why:"The article doesn't describe Terminal-Bench as purely human-graded — its distinguishing feature described is broader end-to-end task scope, not grading method."},
  {t:"It's described as restricting evaluation strictly to a single programming language, unlike SWE-bench Verified's described multi-language support", c:false, why:"Language restriction isn't the article's stated distinction between these benchmarks — the difference described is end-to-end tasks versus issue-fixing."},
  {t:"It's described as having no defined pass/fail criteria at all, relying entirely on subjective LLM rubrics for every task in the suite", c:false, why:"The article doesn't describe Terminal-Bench as lacking defined criteria — its distinguishing trait is the broader, end-to-end nature of its tasks."}
]},
{cat:"coding", q:"Beyond pass/fail unit tests, what else is it often useful to grade for a coding agent?", opts:[
  {t:"The transcript itself — using heuristics for code quality and model-based graders for how the agent calls tools or interacts with the user", c:true, why:"This is the article's stated recommendation for what else to grade beyond unit tests."},
  {t:"Only the total wall-clock time the agent took from start to finish to arrive at a working solution for the task", c:false, why:"The article recommends grading transcript quality and tool-use behavior too, not narrowing down to timing alone."},
  {t:"Nothing else is recommended — the article states unit test results are described as fully sufficient on their own for any coding task", c:false, why:"The article explicitly recommends going beyond unit tests to also assess the transcript, not treating tests as fully sufficient alone."},
  {t:"Only whether the final code diff produced ends up being shorter in line count than the original buggy code it replaced", c:false, why:"Diff length isn't a grading dimension the article recommends — transcript quality and tool-use behavior are what it suggests instead."}
]},
{cat:"conversational", q:"What makes conversational agents a distinct evaluation challenge compared to coding or research agents?", opts:[
  {t:"The quality of the interaction itself is part of what's evaluated, often requiring a second LLM to simulate the user", c:true, why:"This is the article's stated distinguishing challenge for conversational agent evaluation."},
  {t:"They're described as only able to be evaluated with code-based graders, since the article states their state changes are always fully structured", c:false, why:"The article emphasizes model-based rubrics and simulated users for conversational agents, not an exclusive reliance on code-based graders."},
  {t:"They're described as never calling tools mid-conversation, meaning the article reduces grading to simply checking the agent's final message text", c:false, why:"The article discusses conversational agents using tools and taking actions mid-conversation, not being limited to final-message-only grading."},
  {t:"Unlike research agents, their outputs are described as always objectively verifiable against exactly one single correct answer", c:false, why:"The article emphasizes that conversational agent success is often multidimensional and subjective, not reducible to one objectively correct answer."}
]},
{cat:"conversational", q:"What do benchmarks like τ-Bench and τ2-Bench do?", opts:[
  {t:"Simulate multi-turn interactions across domains like retail support and airline booking, with a model playing the user", c:true, why:"This is the article's description of these specific benchmarks."},
  {t:"Test browser navigation and backend state changes, described by the article as functioning very similarly to WebArena and OSWorld", c:false, why:"That describes computer-use/browser benchmarks in the article, not τ-Bench/τ2-Bench, which focus on simulated conversational interactions."},
  {t:"Grade single-turn customer support tickets using only deterministic string-match checks, according to the article's description of these benchmarks", c:false, why:"τ-Bench and τ2-Bench are described as multi-turn simulations, not single-turn, string-match-graded ticket evaluations."},
  {t:"Measure token cost and latency for conversational agents specifically, with the article stating they don't assess actual task success at all", c:false, why:"The article describes these benchmarks as assessing task success in simulated interactions, not merely tracking cost or latency."}
]},
{cat:"conversational", q:"What kinds of criteria typically define “success” for a conversational agent, taken together?", opts:[
  {t:"A mix of verifiable end-state outcomes (e.g. a state check) and rubrics capturing both task completion and interaction quality, like tone", c:true, why:"This is the article's stated framing of multidimensional conversational agent success."},
  {t:"Only whether the agent's final message is found to contain the exact phrase the grader was configured to expect", c:false, why:"The article specifically moves beyond simple exact-phrase matching toward multidimensional grading like state checks plus rubrics."},
  {t:"Only the total number of tool calls made during the conversation, regardless of what those specific tool calls actually accomplished", c:false, why:"Raw tool-call counts aren't the article's described success criterion — what those calls accomplish, plus interaction quality, matters instead."},
  {t:"Only whether the full conversation happened to stay under some fixed token budget defined ahead of time for the task", c:false, why:"Staying under a token budget isn't the article's described success criterion for conversational agents — outcome and quality rubrics are."}
]},
{cat:"research", q:"Why is research agent quality harder to judge than coding agent quality?", opts:[
  {t:"Unlike binary pass/fail from unit tests, standards like “comprehensive” or “well-sourced” depend on context and experts may disagree", c:true, why:"This is the article's stated explanation for why research quality is harder to judge."},
  {t:"Research agents are described in the article as never producing any final output at all that could be meaningfully checked or reviewed", c:false, why:"Research agents do produce checkable outputs like reports in the article — the difficulty is subjectivity of quality standards, not absence of output."},
  {t:"Research agents are described as unable to use any retrieval tools, meaning their answers rely entirely on parametric model knowledge alone", c:false, why:"The article discusses research agents actively using retrieval and browsing tools, contradicting a no-retrieval-tools description."},
  {t:"There are described in the article as being no published benchmarks at all that attempt to measure research agent performance", c:false, why:"The article specifically discusses benchmarks like BrowseComp for research agents, contradicting a claim that none exist."}
]},
{cat:"research", q:"What kind of challenge does a benchmark like BrowseComp test for?", opts:[
  {t:"Whether an agent can find needles in haystacks across the open web — questions easy to verify but hard to solve", c:true, why:"This is the article's stated description of what BrowseComp tests."},
  {t:"Whether an agent can complete a task using only DOM-based browsing methods, with the article stating screenshots are never permitted for this benchmark", c:false, why:"BrowseComp isn't described in the article as restricting agents to DOM-only browsing — its focus is finding hard-to-locate web information."},
  {t:"Whether an agent correctly formats citations according to one specific, fixed style guide referenced throughout the article's discussion of BrowseComp", c:false, why:"Citation formatting isn't what BrowseComp is described as testing — its focus is locating hard-to-find information on the open web."},
  {t:"Whether an agent can operate a full desktop operating system environment, rather than being limited only to a web browser interface", c:false, why:"That describes OS-level computer-use benchmarks in the article, not BrowseComp, which is specifically about open-web research challenges."}
]},
{cat:"research", q:"Which combination of checks is recommended for building research agent evals?", opts:[
  {t:"Groundedness checks, coverage checks, and source quality checks", c:true, why:"These are the three specific check types the article recommends for research agent evals."},
  {t:"Exact-match checks applied to every individual claim made, regardless of whether the task even has one single objectively correct answer", c:false, why:"The article explicitly moves away from rigid exact-match checking toward groundedness, coverage, and source-quality checks instead."},
  {t:"Pairwise comparison against a single, fixed human-written reference report, described in the article as the only grader type needed", c:false, why:"The article recommends a combination of groundedness, coverage, and source-quality checks, not sole reliance on one reference-comparison method."},
  {t:"Only latency and total token-count metrics, since the article describes research quality itself as fundamentally unmeasurable in any other way", c:false, why:"The article explicitly proposes specific quality-focused checks (groundedness, coverage, source quality), contradicting a claim that quality is unmeasurable."}
]},
{cat:"computer_use", q:"How do computer use agents interact with software?", opts:[
  {t:"Through the same interface as humans — screenshots, mouse clicks, keyboard inputs, and scrolling", c:true, why:"This is the article's stated description of how computer use agents operate."},
  {t:"Exclusively through direct API calls and code execution against the target application's backend, according to the article's description", c:false, why:"The article specifically describes computer use agents as operating through the GUI like a human, not through direct backend API access."},
  {t:"Only through command-line interfaces exposed by the underlying operating system, per the article's description of this agent type", c:false, why:"Command-line-only interaction isn't how the article describes computer use agents — it specifically highlights GUI-based interaction like humans use."},
  {t:"Only through structured function calls that are defined entirely ahead of time by the agent harness before any task begins", c:false, why:"The article's description centers on flexible, human-like GUI interaction, not a fixed set of pre-defined function calls."}
]},
{cat:"computer_use", q:"What's the key difference between a browser-scoped benchmark and one that extends to full operating-system control?", opts:[
  {t:"The browser-scoped one checks navigation and page/backend state; the OS-level one inspects file systems, app configs, and databases after task completion", c:true, why:"This is the article's stated distinction between these two benchmark scopes."},
  {t:"The OS-level benchmark is described as limited strictly to mobile applications, while the browser-scoped one is described as covering only desktop use", c:false, why:"Mobile-versus-desktop isn't the article's stated distinction — the actual difference described is browser-page scope versus full OS-level inspection."},
  {t:"The browser-scoped benchmark is described as requiring no sandboxed environment at all, unlike the OS-level one which the article says always needs one", c:false, why:"Both types of benchmarks generally require some sandboxed environment in the article's framing — that's not the stated distinguishing factor."},
  {t:"They're described as testing identical scenarios, differing only in which specific LLM is used as the grading judge for each one", c:false, why:"The article describes these as scoped differently in what they inspect (browser state vs. full OS state), not merely differing by grading judge."}
]},
{cat:"computer_use", q:"What tradeoff exists between DOM-based and screenshot-based browser interactions?", opts:[
  {t:"DOM-based interactions execute quickly but consume many tokens; screenshot-based interactions are slower but more token-efficient", c:true, why:"This is the article's stated tradeoff between the two interaction approaches."},
  {t:"DOM-based interactions are described in the article as always being both slower and more token-efficient than screenshot-based interactions", c:false, why:"This reverses the article's actual tradeoff — DOM-based interactions are described as fast but token-heavy, not slow and efficient."},
  {t:"Screenshot-based interactions are described as never viable at all for computer use agents, due to described image-parsing limitations in current models", c:false, why:"The article presents screenshot-based interaction as a legitimate, viable option with its own tradeoffs, not as unusable."},
  {t:"There's described in the article as being no meaningful tradeoff at all, since both approaches are said to consume roughly the same token count", c:false, why:"The article explicitly names a real tradeoff between speed and token efficiency for these two interaction approaches."}
]},
{cat:"nondeterminism", q:"What does pass@k measure, and how does it move as k increases?", opts:[
  {t:"The likelihood of at least one success in k attempts; it rises as k increases", c:true, why:"This is the article's stated definition and behavior of pass@k."},
  {t:"The probability that all k trials succeed together, described by the article as falling as the value of k increases", c:false, why:"That's the definition of pass^k in the article, not pass@k, which the question is specifically asking about."},
  {t:"The average number of tool calls made per trial, described in the article as staying roughly flat regardless of the value of k chosen", c:false, why:"Tool-call counts aren't what pass@k measures in the article — it specifically measures at-least-one-success likelihood across k attempts."},
  {t:"The proportion of graders that agree with each other on a given trial's outcome, described as independent of the chosen value of k", c:false, why:"Grader agreement isn't what pass@k measures — the article defines it specifically as at-least-one-success probability across k attempts."}
]},
{cat:"nondeterminism", q:"What does pass^k measure, and why does it especially matter for customer-facing agents?", opts:[
  {t:"The probability all k trials succeed; it falls as k grows, since consistency across more trials is a harder bar", c:true, why:"This is the article's stated definition and rationale for why pass^k matters for reliability."},
  {t:"The likelihood of at least one success across k attempts, described in the article as rising as k grows due to more “shots on goal”", c:false, why:"That's the article's definition of pass@k, not pass^k, which the question is specifically about."},
  {t:"The cost per trial measured in dollars, described in the article as mattering specifically because customer-facing agents tend to run at higher volume", c:false, why:"Cost per trial isn't what pass^k measures in the article — it's specifically about the probability that every one of k trials succeeds."},
  {t:"The number of unique valid solutions found across k separate trials, described in the article as unrelated to overall agent reliability", c:false, why:"Counting unique valid solutions isn't the article's definition of pass^k — it specifically measures whether all trials succeed together."}
]},
{cat:"nondeterminism", q:"If an agent has a 75% per-trial success rate, what is roughly the pass^3 score?", opts:[
  {t:"≈42%, since pass^3 multiplies the per-trial probability by itself three times (0.75 × 0.75 × 0.75)", c:true, why:"0.75³ ≈ 0.42, matching the article's definition of pass^k as the probability all k trials succeed."},
  {t:"≈75%, since pass^k is described in the article as staying equal to the original per-trial success rate regardless of the chosen value of k", c:false, why:"pass^k specifically compounds the per-trial rate across k trials — it doesn't stay flat at the original per-trial rate."},
  {t:"≈56%, arrived at by squaring the per-trial rate (0.75 × 0.75) rather than cubing it as pass^3 actually requires", c:false, why:"This is what pass² would be, not pass^3 — the exponent must match k, which is 3 in this question."},
  {t:"≈98%, arrived at by treating pass^3 as equivalent to pass@3, the at-least-one-success measure, rather than the all-succeed measure", c:false, why:"That figure reflects a pass@3-style at-least-one-success calculation, not pass^3, which requires all three trials to succeed."}
]},
{cat:"roadmap", q:"Why don't teams need hundreds of tasks to start building an eval suite?", opts:[
  {t:"In early agent development each change has a large, noticeable effect, so a small sample of real-failure-derived tasks is enough to detect it", c:true, why:"This is the article's stated rationale for why a small early task set is sufficient."},
  {t:"Large sample sizes are described in the article as statistically invalid for evaluating any AI system, regardless of the system's development stage", c:false, why:"The article doesn't claim large samples are invalid generally — its point is that small samples suffice early on due to large effect sizes."},
  {t:"Tasks are described in the article as becoming progressively easier to write the longer a team waits before beginning, making early efforts wasted", c:false, why:"The article doesn't describe task-writing difficulty changing over time — its point is about the size of effect a small task set can detect early on."},
  {t:"Grading logic is described in the article as becoming unreliable once an eval suite exceeds roughly a dozen tasks in size", c:false, why:"No such task-count threshold for grading reliability is described in the article — the reasoning is specifically about early effect sizes."}
]},
{cat:"roadmap", q:"What makes a task “good” for an eval suite?", opts:[
  {t:"Two domain experts would independently reach the same pass/fail verdict on it", c:true, why:"This is the article's stated definition of a good eval task."},
  {t:"It's described as having no defined success criteria at all, so that the grader can be left to adapt to context entirely on its own", c:false, why:"Undefined success criteria is exactly the kind of ambiguity the article warns against — a good task has clear, agreed-upon criteria."},
  {t:"It's described as judgeable only by a specialized AI researcher, explicitly excluding ordinary domain experts from being able to assess it", c:false, why:"The article's standard is specifically about ordinary domain experts reaching agreement, not requiring specialized AI research expertise."},
  {t:"It's described as needing to take a human tester over an hour to complete, which the article states ensures sufficient task difficulty", c:false, why:"No minimum completion-time requirement is described in the article — its stated criterion is about clarity of pass/fail judgment, not difficulty duration."}
]},
{cat:"roadmap", q:"What does a 0% pass rate across many trials (0% pass@100) with a frontier model most often signal?", opts:[
  {t:"A broken task — a signal to double-check the task specification and graders", c:true, why:"This is the article's stated interpretation of a 0% pass@100 result with a frontier model."},
  {t:"That the model is described in the article as fundamentally incapable of the underlying capability the task is intended to test", c:false, why:"The article specifically warns against this interpretation — with frontier models, 0% is more often a sign of a broken task than true incapability."},
  {t:"That the eval harness is described in the article as running an excessive, wasteful number of trials for that particular task", c:false, why:"Trial count isn't flagged as the issue in the article's interpretation — a broken task specification or grader is the likelier explanation given."},
  {t:"That the grader thresholds are described in the article as needing to be permanently loosened across the entire eval suite as a result", c:false, why:"The article's recommendation is to investigate and fix the specific broken task/grader, not to broadly loosen thresholds suite-wide."}
]},
{cat:"roadmap", q:"What is the purpose of creating a “reference solution” for each task?", opts:[
  {t:"To prove the task is solvable and verify that the graders are correctly configured", c:true, why:"This is the article's stated purpose for reference solutions."},
  {t:"To give the agent under evaluation a shortcut answer that it's explicitly permitted to copy directly during graded trials", c:false, why:"A reference solution is used to validate the eval setup itself, not handed to the agent being evaluated as a shortcut."},
  {t:"To replace the need for any grader at all, once a working reference solution has been written and confirmed for a task", c:false, why:"A reference solution is used alongside graders to validate them — it doesn't eliminate the need for grading logic."},
  {t:"To set the exact tool-call sequence that every valid solution to the task must follow, step by step, without deviation", c:false, why:"The article specifically cautions against requiring an exact tool-call sequence — a reference solution validates solvability, not a rigid required path."}
]},
{cat:"roadmap", q:"Why is it important to test both cases where a behavior should occur and where it shouldn't, rather than only one direction?", opts:[
  {t:"One-sided evals create one-sided optimization — testing only when a behavior should trigger can push the agent toward over-triggering it everywhere", c:true, why:"This is the article's stated rationale, illustrated with its web search over-triggering example."},
  {t:"Testing both directions is described in the article as relevant only to coding agents, since other agent types are said to lack optional behaviors", c:false, why:"The article's balanced-testing example (web search triggering) applies broadly, not just to coding agents specifically."},
  {t:"It's described in the article as mainly a way to reduce the total number of tasks required, since balanced sets are said to need fewer examples", c:false, why:"The article's reasoning is about avoiding skewed optimization, not primarily about reducing overall task count."},
  {t:"It's described in the article as mainly a way to reduce compute cost, rather than being framed as a way to improve eval accuracy", c:false, why:"The article frames balanced testing as improving eval quality and avoiding skewed optimization, not primarily as a cost-reduction technique."}
]},
{cat:"roadmap", q:"Why should each eval trial start from a clean, isolated environment?", opts:[
  {t:"Unnecessary shared state, like leftover files or a prior trial's history, can inflate performance or cause correlated failures unrelated to true agent skill", c:true, why:"This is the article's stated rationale for environment isolation between trials."},
  {t:"Isolation is described in the article as required only when human graders are involved, and unnecessary for code- or model-based graders", c:false, why:"The article's isolation concern applies regardless of grader type — shared state can distort results no matter how the trial is graded."},
  {t:"Clean environments are described in the article as needed purely to reduce compute cost, with no described effect on measured performance itself", c:false, why:"The article specifically ties environment isolation to accurate performance measurement, not merely to cost savings."},
  {t:"Shared state is described in the article as harmless as long as trials are run sequentially rather than concurrently with one another", c:false, why:"The article's git-history example describes shared state as a problem regardless of whether trials run sequentially or concurrently."}
]},
{cat:"roadmap", q:"Why is it often better to grade what an agent produced rather than the exact sequence of tool calls it took?", opts:[
  {t:"Agents regularly find valid approaches eval designers didn't anticipate, so rigid step-checking creates overly brittle tests", c:true, why:"This is the article's stated rationale for outcome-based over sequence-based grading."},
  {t:"Tool calls are described in the article as unable to be reliably logged within a transcript, making sequence-checking technically infeasible in practice", c:false, why:"Tool calls are reliably logged in transcripts per the article — the issue with sequence-checking is brittleness, not a logging limitation."},
  {t:"Only human graders are described in the article as capable of evaluating which specific tools an agent chose to call during a trial", c:false, why:"The article discusses code-based and model-based graders assessing tool use too, not exclusively human graders."},
  {t:"Grading tool-call sequences is described in the article as strictly easier to implement, but too computationally expensive to run at meaningful scale", c:false, why:"The article's stated objection to sequence-grading is brittleness against valid unanticipated approaches, not computational cost."}
]},
{cat:"roadmap", q:"What technique helps keep an LLM-as-judge from hallucinating a verdict when it lacks enough information?", opts:[
  {t:"Give it “a way out,” e.g. an instruction to return “Unknown” when it doesn't have enough information", c:true, why:"This is the article's stated technique for preventing judge hallucination."},
  {t:"Force it to always choose either pass or fail explicitly, with the article stating no other response option should ever be made available", c:false, why:"The article recommends the opposite — giving the judge an “Unknown” escape hatch rather than forcing a binary pass/fail choice."},
  {t:"Withhold the original task description from the judge entirely, so that it cannot be biased by the instructions given to the agent", c:false, why:"The article doesn't recommend withholding the task description — the judge generally needs context to grade accurately; the fix is an “Unknown” option."},
  {t:"Use a single LLM judge to grade every dimension of a task at once, which the article states improves consistency across dimensions", c:false, why:"The article actually recommends isolating judges per dimension rather than having one judge assess everything at once."}
]},
{cat:"roadmap", q:"Why can a low eval score sometimes reflect a broken grader rather than a genuinely weak agent?", opts:[
  {t:"Rigid grading (like requiring an exact numeric match), ambiguous task specs, or irreproducible stochastic tasks can all suppress scores despite good agent performance", c:true, why:"This is the article's stated explanation, illustrated with its CORE-Bench example."},
  {t:"Eval scores are described in the article as always accurate once a suite has been run more than a handful of times across trials", c:false, why:"The article's CORE-Bench example specifically shows a low score persisting due to grading bugs, not becoming reliably accurate after repeated runs."},
  {t:"Low scores are described in the article as only ever indicating a genuine underlying capability gap, never a tooling or specification issue", c:false, why:"The article's CORE-Bench example is precisely a case where a low score reflected tooling issues, not a genuine capability gap."},
  {t:"Grading bugs are described in the article as effectively impossible to occur once static analysis tools have been incorporated into the eval", c:false, why:"The article's CORE-Bench example shows grading bugs occurring despite typical tooling — static analysis inclusion doesn't prevent this."}
]},
{cat:"roadmap", q:"What went wrong in a real misconfigured benchmark where agents were told to optimize toward a stated score threshold, but grading required exceeding it?", opts:[
  {t:"It penalized models for following the stated instructions, while models that ignored the goal scored better", c:true, why:"This is the article's stated description of this specific misconfiguration example."},
  {t:"The benchmark is described in the article as having no threshold at all defined anywhere, so that every trial was automatically scored as a pass", c:false, why:"The article's example specifically involves a defined but misconfigured threshold, not the complete absence of any threshold."},
  {t:"It's described in the article as having used exclusively code-based graders, which the article states proved too brittle for open-ended agent behavior", c:false, why:"The article's point in this example is about threshold misconfiguration specifically, not a general critique of code-based grading brittleness."},
  {t:"The agents involved are described in the article as having been evaluated with no environment or tools available to act within at all", c:false, why:"The article's example involves agents with an environment and a defined goal — the issue described is threshold misconfiguration, not lack of environment."}
]},
{cat:"roadmap", q:"Why is reading transcripts treated as a critical, ongoing skill in agent development?", opts:[
  {t:"A failed task's transcript reveals whether the agent made a genuine mistake or the grader rejected a valid solution, verifying the eval measures what matters", c:true, why:"This is the article's stated rationale for treating transcript-reading as essential."},
  {t:"Transcripts are described in the article as mainly useful for producing marketing materials that showcase agent capabilities to prospective customers", c:false, why:"The article frames transcript reading as a diagnostic development practice, not primarily a marketing content-generation activity."},
  {t:"Reading transcripts is described in the article as something that fully replaces the need for any grader once a suite has matured over time", c:false, why:"The article treats transcript reading and grading as complementary practices, not one replacing the need for the other."},
  {t:"It's described in the article as necessary only once, during initial suite creation, and safely skippable at every point afterward", c:false, why:"The article frames transcript reading as an ongoing practice throughout development, not a one-time step done only at suite creation."}
]},
{cat:"roadmap", q:"What is “eval saturation”?", opts:[
  {t:"When an agent passes all of the solvable tasks in an eval, leaving no room to detect further improvement", c:true, why:"This is the article's stated definition of eval saturation."},
  {t:"When an eval suite is described in the article as being deleted after its owning team disbands or its associated project loses funding", c:false, why:"That describes suite deprecation for organizational reasons, not the article's actual definition of saturation, which concerns pass-rate ceilings."},
  {t:"When too many distinct grader types are described in the article as being combined together within a single task's scoring logic", c:false, why:"Grader-type combination isn't what the article means by saturation — saturation specifically concerns an agent maxing out solvable tasks."},
  {t:"When human reviewers are described in the article as reaching unanimous agreement on every transcript within a formal calibration study", c:false, why:"Reviewer agreement in a calibration study is a different concept from saturation, which the article defines around an agent's pass rate ceiling."}
]},
{cat:"roadmap", q:"Why might a team be unimpressed by a genuinely stronger model, only to later realize their evals were the problem?", opts:[
  {t:"Their existing evals (e.g. one-shot tests) may not capture gains that only show up on longer, more complex agentic tasks", c:true, why:"This is the article's stated explanation, illustrated with its Qodo example."},
  {t:"Stronger models are described in the article as always being more expensive to run, which the article states teams may simply mistake for lower quality", c:false, why:"Cost confusion isn't the article's explanation in this example — the issue described is that existing evals didn't capture longer-task gains."},
  {t:"Their evals are described in the article as entirely human-graded, having simply run out of available reviewers partway through the testing process", c:false, why:"The article's Qodo example is about eval design not capturing longer-task improvements, not about reviewer availability running out."},
  {t:"The stronger model is described in the article as assumed by design to always score lower on any existing regression suite already in place", c:false, why:"No such built-in assumption is described in the article — the actual issue was that existing evals simply didn't measure the relevant gains."}
]},
{cat:"roadmap", q:"Who is generally best positioned to own an eval suite's core infrastructure versus who should contribute the tasks themselves?", opts:[
  {t:"Dedicated evals teams own core infrastructure, while domain experts and product teams contribute most eval tasks", c:true, why:"This is the article's stated recommendation for dividing this responsibility."},
  {t:"External contractors are described in the article as owning core infrastructure exclusively, with no described involvement from internal product teams at all", c:false, why:"The article doesn't recommend outsourcing core infrastructure to external contractors — it recommends a dedicated internal evals team for this."},
  {t:"Only research scientists are described in the article as permitted to write eval tasks, regardless of who ends up owning the infrastructure itself", c:false, why:"The article specifically recommends domain experts and product teams contribute tasks, not restricting task-writing to research scientists alone."},
  {t:"Each product team is described in the article as needing to rebuild its own core infrastructure independently, without any shared evals team involved", c:false, why:"The article specifically recommends a shared, dedicated evals team owning infrastructure, rather than each product team duplicating that work."}
]},
{cat:"other_methods", q:"What's a key con of production monitoring relative to automated evals?", opts:[
  {t:"It's reactive — problems reach users before you know about them — and it lacks ground truth for grading", c:true, why:"This is the article's stated con of production monitoring."},
  {t:"It's described in the article as unable to reveal anything meaningful about how agents actually behave with real user traffic at scale", c:false, why:"Production monitoring is specifically valued in the article for revealing real-world behavior at scale — that's its main strength, not a weakness."},
  {t:"It's described in the article as requiring no instrumentation investment at all, unlike automated evals which the article says need significant upfront setup", c:false, why:"Production monitoring does require meaningful instrumentation investment — that isn't described as a free or effortless approach in the article."},
  {t:"It's described in the article as the fastest method available among all the approaches compared for iterating on agent changes", c:false, why:"The article specifically describes production monitoring as reactive and slow to surface issues, not as the fastest iteration method."}
]},
{cat:"other_methods", q:"What's a notable con of A/B testing as a way to understand agent performance?", opts:[
  {t:"It's slow — taking days or weeks to reach significance and requiring sufficient traffic — and only tests changes you actually deploy", c:true, why:"This is the article's stated con of A/B testing."},
  {t:"It's described in the article as unable to measure real user outcomes such as retention or task completion rates in any meaningful way", c:false, why:"A/B testing is specifically valued in the article for measuring real user outcomes — that's its strength, not the con described."},
  {t:"It's described in the article as failing to control for confounding variables between the different tested variants being compared", c:false, why:"A/B testing is specifically noted in the article for controlling confounds via randomization — that's not the con it describes."},
  {t:"It's described in the article as the cheapest and fastest method among all of the approaches the article compares for understanding performance", c:false, why:"The article describes A/B testing as slow, requiring days or weeks — not as the cheapest or fastest method available."}
]},
{cat:"other_methods", q:"Which method is described as “sparse and self-selected,” skewing toward severe issues, with users rarely explaining why something failed?", opts:[
  {t:"User feedback (e.g. thumbs-down, bug reports)", c:true, why:"This is the article's stated characterization of user feedback as a method."},
  {t:"Automated evals run continuously in CI/CD, described by the article in these same terms of being sparse and self-selected", c:false, why:"Automated evals are systematic and comprehensive by design in the article, not sparse or self-selected like organic user feedback."},
  {t:"Systematic human studies conducted by trained raters, described by the article using this same sparse, self-selected characterization", c:false, why:"Systematic human studies are deliberately structured and comprehensive in the article's description, not sparse or self-selected."},
  {t:"Production monitoring of live system metrics, described by the article in these same sparse, self-selected terms as user feedback", c:false, why:"Production monitoring captures broad, systematic signals across all users, unlike the sparse, self-selected nature of user feedback."}
]},
{cat:"other_methods", q:"Manual transcript review builds intuition for failure modes, but what's a downside of it?", opts:[
  {t:"It's time-intensive, doesn't scale, and coverage or signal quality can be inconsistent due to reviewer fatigue", c:true, why:"This is the article's stated downside of manual transcript review."},
  {t:"It's described in the article as requiring no meaningful human time investment at all once an eval suite has reached saturation", c:false, why:"The article's stated downside is specifically the opposite — manual review is time-intensive and doesn't scale well."},
  {t:"It's described in the article as unable to catch subtle quality issues that automated checks would otherwise be expected to catch instead", c:false, why:"The article actually credits manual transcript review with catching subtle issues automated checks might miss — that's its strength, not weakness."},
  {t:"It's described in the article as fully automated by design, and therefore said to provide no meaningful qualitative insight into failure modes", c:false, why:"Manual transcript review is, by definition, not automated in the article — it's specifically valued for the qualitative insight it does provide."}
]},
{cat:"other_methods", q:"When should systematic human studies be reserved for, given how expensive and slow they are?", opts:[
  {t:"Calibrating LLM graders or evaluating subjective outputs where human consensus serves as the reference standard", c:true, why:"This is the article's stated recommended use case for systematic human studies."},
  {t:"Every production request, described in the article as appropriate since systematic human studies are said to be the fastest available method overall", c:false, why:"The article describes systematic human studies as expensive and slow, the opposite of being fast enough for every production request."},
  {t:"Only coding agent evals, described in the article as the sole domain where human review can be meaningfully applied among agent types", c:false, why:"The article discusses human review as broadly applicable, particularly for subjective judgment tasks, not restricted to coding agents alone."},
  {t:"Never — the article describes systematic human studies as obsolete now that LLM-as-judge graders have become widely available", c:false, why:"The article treats systematic human studies as still valuable, specifically for calibrating LLM graders, not as obsolete."}
]},
{cat:"other_methods", q:"What idea does the “Swiss Cheese Model” from safety engineering illustrate about evaluation methods?", opts:[
  {t:"No single evaluation layer catches every issue, but combining multiple methods catches failures that slip through one layer", c:true, why:"This is the article's stated use of the Swiss Cheese Model analogy."},
  {t:"Each evaluation method is described in the article as handing off responsibility entirely to the next stage of development, like a relay race", c:false, why:"The Swiss Cheese Model in the article is about overlapping, complementary layers, not sequential handoff like a relay race."},
  {t:"Evaluation methods are described in the article as working best structured as an assembly line, specifically without any redundancy between stages", c:false, why:"The Swiss Cheese Model specifically illustrates the value of redundancy across layers, the opposite of a no-redundancy assembly line."},
  {t:"Teams are described in the article as being encouraged to deliberately design a single point of failure in order to simplify their evaluation stack", c:false, why:"The article's use of this analogy argues against relying on any single point of failure, not for deliberately designing one."}
]},
{cat:"why_evals", q:"What's a useful way to frame the dimensions of a successful agent workflow when there's no single objective pass/fail signal (e.g. an editing or support workflow)?", opts:[
  {t:"Something like: don't break things, do what was asked, and do it well", c:true, why:"This is the article's example framing for multidimensional workflow success."},
  {t:"Speed, cost, and overall token efficiency alone, described in the article as the standard three dimensions for any subjective workflow", c:false, why:"The article's example framing centers on not-breaking-things, doing-what-was-asked, and doing-it-well, not primarily speed/cost/efficiency."},
  {t:"Accuracy, latency, and creative originality alone, described in the article as its recommended dimensions for judging subjective agent workflows", c:false, why:"That isn't the article's stated framing — its example dimensions are about correctness, following instructions, and quality of execution."},
  {t:"Compliance, security, and platform performance alone, described in the article as the three dimensions it recommends for subjective workflow evaluation", c:false, why:"These aren't the article's stated example dimensions — the framing given is about not breaking things, following instructions, and doing it well."}
]},
{cat:"why_evals", q:"How can a team that already has a widely used agent, but no evals yet, realistically build an eval system?", opts:[
  {t:"By combining several techniques at once — e.g. static analysis, environment-testing agents, and LLM judges for behaviors like instruction following", c:true, why:"This is the article's stated recommendation for retrofitting evals onto an already-live agent."},
  {t:"By pausing the product entirely until a complete eval suite has been designed from first principles before any further development continues", c:false, why:"The article doesn't recommend pausing the product — it describes building evals incrementally alongside an already-live system."},
  {t:"By relying solely on human graders, since the article states automated grading isn't possible at all once an agent is already deployed live", c:false, why:"The article specifically recommends combining automated techniques like static analysis and LLM judges, not relying solely on human graders."},
  {t:"By waiting for an entirely new model generation to become available before making any attempt to measure the existing agent's quality", c:false, why:"The article's recommendation is to start building evals with current tools right away, not to wait for a future model generation."}
]},
{cat:"why_evals", q:"Why do evals accelerate development even at the very start of a project, before an agent has shipped?", opts:[
  {t:"They resolve ambiguity — two engineers reading the same spec could interpret edge cases differently, and an eval suite pins down expected behavior", c:true, why:"This is the article's stated rationale for building evals early."},
  {t:"They're described in the article as eliminating the need to write any product specification at all before implementation work begins", c:false, why:"The article doesn't claim evals eliminate specs — evals are described as pinning down expected behavior in addition to a spec, not replacing one."},
  {t:"They're described in the article as a regulatory requirement that must be satisfied before any AI agent is legally permitted to ship to production", c:false, why:"No such regulatory-requirement framing appears in the article — its rationale is about resolving ambiguity in expected behavior, not compliance."},
  {t:"They're described in the article as permanently removing the need for any further manual testing at every later stage of development", c:false, why:"The article doesn't claim evals eliminate manual testing entirely — they're framed as accelerating development, not replacing all future manual review."}
]}
  ]
}

};

/* ============================================================
   PERSISTENT STORAGE
   Backed by localStorage, wrapped in the same async {value} shape
   the original artifact's window.storage.get/set used, so the rest
   of this file didn't need to change shape.
   ============================================================ */
const storage = {
  async get(key){
    try{
      const value = localStorage.getItem(key);
      return value === null ? null : { value };
    }catch(e){ return null; }
  },
  async set(key, value){
    localStorage.setItem(key, value);
  }
};

const STORAGE_KEY = 'quiz_progress_v2';
const LEGACY_STORAGE_KEY = 'quiz_progress_v1';
let progress = { missed: {} }; // { [id]: {article, cat, q, opts, missCount, lastMissed} }
let lastMigrationCount = 0;

// One-time migration: v1 stored the old (shorter, un-explained) option text
// under the same `${articleKey}::${index}` ids. Since question order/index
// per article hasn't changed, we can remap each old miss onto the refreshed
// question — pulling current text/options/why, but preserving missCount and
// lastMissed so review history isn't lost.
async function migrateFromLegacy(){
  let legacy;
  try{
    const res = await storage.get(LEGACY_STORAGE_KEY);
    if(!res || !res.value) return null;
    legacy = JSON.parse(res.value);
  }catch(e){
    return null;
  }
  if(!legacy || !legacy.missed) return null;

  const migrated = { missed: {} };
  let count = 0;
  Object.keys(legacy.missed).forEach(id => {
    const [articleKey, idxStr] = id.split('::');
    const i = parseInt(idxStr, 10);
    const article = ARTICLES[articleKey];
    const freshQ = article && article.questions[i];
    if(!freshQ) return; // question no longer exists at that id, skip
    const old = legacy.missed[id];
    migrated.missed[id] = {
      article: articleKey,
      cat: freshQ.cat,
      q: freshQ.q,
      opts: freshQ.opts,
      missCount: old.missCount || 1,
      lastMissed: old.lastMissed || Date.now()
    };
    count++;
  });
  lastMigrationCount = count;
  return migrated;
}

async function loadProgress(){
  const note = document.getElementById('storageNote');
  try{
    const res = await storage.get(STORAGE_KEY);
    if(res && res.value){
      progress = JSON.parse(res.value);
      if(!progress.missed) progress.missed = {};
    } else {
      // no v2 data yet — attempt a one-time migration from v1
      const migrated = await migrateFromLegacy();
      if(migrated){
        progress = migrated;
        await storage.set(STORAGE_KEY, JSON.stringify(progress));
      }
    }
  }catch(e){
    progress = { missed: {} };
  }
  note.textContent = lastMigrationCount > 0
    ? `migrated ${lastMigrationCount} saved item${lastMigrationCount===1?'':'s'} from your previous session — progress persists across sessions`
    : 'progress saved in this browser — persists across sessions';
  renderHome();
}

async function saveProgress(){
  const note = document.getElementById('storageNote');
  note.textContent = 'saving…';
  note.classList.add('saving');
  try{
    await storage.set(STORAGE_KEY, JSON.stringify(progress));
    note.textContent = 'progress saved in this browser — persists across sessions';
  }catch(e){
    note.textContent = 'could not save progress (local storage unavailable in this browser)';
  }
  note.classList.remove('saving');
}

function missedCount(){ return Object.keys(progress.missed).length; }

function exportProgress(){
  const blob = new Blob([JSON.stringify(progress, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'agent-articles-quiz-progress.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================================
   APP STATE
   ============================================================ */
let mode = null, articleKey = null;
let quizQuestions = [];
let idx = 0, score = 0, answered = false;
let results = [];
let currentOpts = [];
let streak = 0, bestStreak = 0;

const els = {
  home: document.getElementById('homeArea'),
  quiz: document.getElementById('quizArea'),
  resultsArea: document.getElementById('resultsArea'),
  runid: document.getElementById('runid'),
  brandCtx: document.getElementById('brandCtx'),
};

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function renderHome(){
  els.quiz.style.display = 'none';
  els.resultsArea.style.display = 'none';
  document.getElementById('notesArea').classList.remove('show');
  els.home.style.display = 'block';
  els.runid.textContent = '';
  els.brandCtx.textContent = 'article trials';

  let cards = '';
  let noteCards = '';
  Object.keys(ARTICLES).forEach(key => {
    const a = ARTICLES[key];
    cards += `
      <div class="article-card" data-key="${key}">
        <div class="meta">
          <div class="name">${a.name}</div>
          <div class="desc">${a.desc}</div>
        </div>
        <div class="stat"><b>${a.questions.length}</b>tasks</div>
      </div>`;
    noteCards += `
      <div class="article-card" data-notes-key="${key}">
        <div class="meta">
          <div class="name">${a.name}</div>
          <div class="desc">${a.notes.length} section${a.notes.length===1?'':'s'} of study notes, plus a link to the original</div>
        </div>
        <div class="stat"><b>read</b>notes</div>
      </div>`;
  });

  const mCount = missedCount();
  const reviewCard = mCount > 0
    ? `<div class="article-card review" id="reviewCard">
         <div class="meta">
           <div class="name">Review missed concepts</div>
           <div class="desc">Every question you've gotten wrong across all articles, pulled from saved history.</div>
         </div>
         <div class="stat"><b>${mCount}</b>saved</div>
       </div>`
    : `<div class="article-card empty">
         <div class="meta">
           <div class="name">Review missed concepts</div>
           <div class="desc">Nothing saved yet — misses from any article trial will collect here automatically.</div>
         </div>
         <div class="stat"><b>0</b>saved</div>
       </div>`;

  els.home.innerHTML = `
    <h1>Anthropic Engineering — Article Trials</h1>
    <p class="sub">Pick an article to run its comprehension trial. Every option now shows a reasoning line after you answer, and missed tasks are saved automatically so you can drill them later, even in a new session.</p>
    <div class="section-label">choose an article</div>
    <div class="article-grid">${cards}</div>
    <div class="section-label">study notes (paraphrased, not full article text)</div>
    <div class="article-grid">${noteCards}</div>
    <div class="section-label">cross-article review</div>
    <div class="article-grid">${reviewCard}</div>
    ${mCount > 0 ? `<div class="controls" style="justify-content:center; margin-top:18px; gap:14px;">
        <button class="ghost small" id="exportBtn">Export progress (.json)</button>
        <button class="ghost small" id="clearBtn">Clear saved history</button>
      </div>` : ''}
  `;

  Object.keys(ARTICLES).forEach(key => {
    document.querySelector(`.article-card[data-key="${key}"]`).addEventListener('click', () => startQuiz('article', key));
    document.querySelector(`.article-card[data-notes-key="${key}"]`).addEventListener('click', () => renderNotes(key));
  });
  if(mCount > 0){
    document.getElementById('reviewCard').addEventListener('click', () => startQuiz('review', null));
    document.getElementById('exportBtn').addEventListener('click', exportProgress);
    document.getElementById('clearBtn').addEventListener('click', async () => {
      if(confirm('Clear all saved missed-question history? This cannot be undone.')){
        progress = { missed: {} };
        await saveProgress();
        renderHome();
      }
    });
  }
}

function renderNotes(key){
  const a = ARTICLES[key];
  els.home.style.display = 'none';
  els.quiz.style.display = 'none';
  els.resultsArea.style.display = 'none';
  els.runid.textContent = '';
  els.brandCtx.textContent = 'study notes';

  let blocks = '';
  a.notes.forEach(n => {
    blocks += `<div class="note-block"><h4>${n.h}</h4><p>${n.body}</p></div>`;
  });

  const notesArea = document.getElementById('notesArea');
  notesArea.innerHTML = `
    <div class="notes-top">
      <div>
        <h1>${a.name}</h1>
        <p class="sub" style="margin-bottom:0;">Study notes — a paraphrased summary of every concept covered, organized by topic.</p>
      </div>
      <a class="notes-src" href="${a.link}" target="_blank" rel="noopener">Open original article ↗</a>
    </div>
    <div class="notes-disclaimer">These are original summaries written in plain language for studying — not a copy of the article's text. For exact wording, quotes, or figures, use the link above.</div>
    ${blocks}
    <div class="controls" style="justify-content:center; margin-top:8px; gap:12px;">
      <button class="ghost" id="notesQuizBtn">Take the quiz for this article</button>
      <button id="notesHomeBtn">Back to home</button>
    </div>
  `;
  notesArea.classList.add('show');

  document.getElementById('notesQuizBtn').addEventListener('click', () => {
    notesArea.classList.remove('show');
    startQuiz('article', key);
  });
  document.getElementById('notesHomeBtn').addEventListener('click', () => {
    notesArea.classList.remove('show');
    renderHome();
  });
}

function startQuiz(m, key){
  mode = m; articleKey = key;
  idx = 0; score = 0; results = []; streak = 0; bestStreak = 0;

  if(mode === 'article'){
    quizQuestions = ARTICLES[key].questions.map((q, i) => ({ id: `${key}::${i}`, ...q }));
    els.brandCtx.textContent = ARTICLES[key].name.toLowerCase();
  } else {
    quizQuestions = shuffle(Object.keys(progress.missed).map(id => ({ id, ...progress.missed[id] })));
    els.brandCtx.textContent = 'missed-concept review';
  }

  els.home.style.display = 'none';
  els.resultsArea.style.display = 'none';
  els.quiz.style.display = 'block';
  renderQuestion();
}

function renderQuestion(){
  answered = false;
  const item = quizQuestions[idx];
  currentOpts = shuffle(item.opts);

  els.runid.textContent = `task ${idx+1} / ${quizQuestions.length}`;

  els.quiz.innerHTML = `
    <h1>${mode === 'article' ? ARTICLES[articleKey].name : 'Missed-Concept Review'}</h1>
    <p class="sub">${mode === 'article' ? ARTICLES[articleKey].desc : 'Pulled from your saved history across all five articles. These stay saved permanently for ongoing review — answering correctly here logs a review pass but never removes the item.'}</p>
    <div class="progress-row">
      <span id="progressText">${idx} / ${quizQuestions.length} graded</span>
      <div class="bar"><div class="bar-fill" id="barFill" style="width:${(idx/quizQuestions.length*100)}%"></div></div>
      <span class="streak-tag" id="streakTag">${streak >= 2 ? `🔥 ${streak} streak` : ''}</span>
      <span class="score-tag" id="scoreTag">${score} correct</span>
    </div>
    <div class="card">
      <div class="task-label">
        <span>task_${String(idx+1).padStart(3,'0')}</span>
        <span>${mode === 'review' ? (ARTICLES[item.id.split('::')[0]]?.name || item.article || '') + ' · ' : ''}${item.cat.replace('_',' ')}</span>
      </div>
      <p class="qtext">${item.q}</p>
      <div id="options"></div>
      <div class="controls">
        <button id="nextBtn" disabled>Submit answer</button>
      </div>
      <div class="why-list" id="whyList"></div>
    </div>
  `;

  const optionsEl = document.getElementById('options');
  const letters = ['A','B','C','D'];
  currentOpts.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'opt';
    div.innerHTML = `<span class="marker">${letters[i]}</span><span>${opt.t}</span>`;
    div.addEventListener('click', () => selectOption(i));
    optionsEl.appendChild(div);
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    if(!answered) return;
    idx++;
    if(idx >= quizQuestions.length){ finishQuiz(); }
    else { renderQuestion(); }
  });
}

function selectOption(i){
  if(answered) return;
  answered = true;
  const item = quizQuestions[idx];
  const correctIdx = currentOpts.findIndex(o => o.c);
  const optDivs = document.querySelectorAll('#options .opt');
  optDivs.forEach((d, j) => {
    d.classList.add('disabled');
    if(j === correctIdx) d.classList.add('correct');
    if(j === i && i !== correctIdx) d.classList.add('incorrect');
    if(j !== i && j !== correctIdx) d.classList.add('dim');
  });

  const isCorrect = (i === correctIdx);
  if(isCorrect){
    score++;
    streak++;
    if(streak > bestStreak) bestStreak = streak;
  } else {
    streak = 0;
  }
  const streakTag = document.getElementById('streakTag');
  if(streakTag) streakTag.textContent = streak >= 2 ? `🔥 ${streak} streak` : '';

  const articleOfItem = mode === 'article' ? articleKey : item.id.split('::')[0];
  results.push({
    id: item.id, article: articleOfItem, cat: item.cat, q: item.q, opts: item.opts,
    yourAnswer: currentOpts[i].t, correctAnswer: currentOpts[correctIdx].t, correct: isCorrect
  });

  if(!isCorrect){
    progress.missed[item.id] = {
      article: articleOfItem, cat: item.cat, q: item.q, opts: item.opts,
      missCount: (progress.missed[item.id]?.missCount || 0) + 1, lastMissed: Date.now()
    };
  } else if(mode === 'review' && progress.missed[item.id]){
    // keep it in the missed pool permanently, but log that a review pass got it right
    const entry = progress.missed[item.id];
    entry.correctReviews = (entry.correctReviews || 0) + 1;
    entry.lastCorrectReview = Date.now();
  }
  saveProgress();

  // build the per-option reasoning list, each with an "ask a follow-up" panel
  const whyList = document.getElementById('whyList');
  const letters = ['A','B','C','D'];
  let whyHtml = '';
  currentOpts.forEach((opt, j) => {
    const isRight = opt.c;
    const wasYours = (j === i);
    whyHtml += `
      <div class="why-item ${isRight ? 'correct' : 'incorrect'}">
        <div class="wh-head">${letters[j]} · ${isRight ? 'CORRECT' : 'INCORRECT'}${wasYours ? ' · your answer' : ''}</div>
        <div class="wh-body">${opt.why}</div>
        <div class="ask-block">
          <button class="ask-toggle" data-idx="${j}" type="button">Ask a follow-up ›</button>
          <div class="ask-panel" id="askPanel-${j}">
            <textarea class="ask-input" id="askInput-${j}" placeholder="e.g. why exactly does this satisfy the definition the article gives?" rows="2"></textarea>
            <div class="ask-row">
              <button class="ask-submit small ghost" data-idx="${j}" type="button">Ask Claude</button>
            </div>
            <div class="ask-response" id="askResponse-${j}"></div>
          </div>
        </div>
      </div>`;
  });
  whyList.innerHTML = whyHtml;
  whyList.classList.add('show');

  // wire up toggle + ask buttons for each option's follow-up panel
  currentOpts.forEach((opt, j) => {
    const toggleBtn = document.querySelector(`.ask-toggle[data-idx="${j}"]`);
    const panel = document.getElementById(`askPanel-${j}`);
    toggleBtn.addEventListener('click', () => {
      const showing = panel.classList.toggle('show');
      toggleBtn.textContent = showing ? 'Hide follow-up ˅' : 'Ask a follow-up ›';
      if(showing) document.getElementById(`askInput-${j}`).focus();
    });
    const submitBtn = document.querySelector(`.ask-submit[data-idx="${j}"]`);
    submitBtn.addEventListener('click', () => askFollowup(j, opt, item));
    document.getElementById(`askInput-${j}`).addEventListener('keydown', (e) => {
      if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); askFollowup(j, opt, item); }
    });
  });

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = false;
  nextBtn.textContent = (idx === quizQuestions.length - 1) ? 'See results' : 'Next task →';
  document.getElementById('scoreTag').textContent = `${score} correct`;
}

async function askFollowup(j, opt, item){
  const inputEl = document.getElementById(`askInput-${j}`);
  const respEl = document.getElementById(`askResponse-${j}`);
  const submitBtn = document.querySelector(`.ask-submit[data-idx="${j}"]`);
  const question = inputEl.value.trim();
  if(!question) { inputEl.focus(); return; }

  const apiKey = (localStorage.getItem(API_KEY_STORAGE_KEY) || '').trim();
  if(!apiKey){
    respEl.classList.add('show');
    respEl.classList.remove('loading');
    respEl.innerHTML = 'No Anthropic API key set — add one under <button class="ask-toggle" type="button" id="openSettingsFromAsk">⚙ Settings</button> to enable follow-up answers.';
    document.getElementById('openSettingsFromAsk')?.addEventListener('click', openSettings);
    return;
  }

  submitBtn.disabled = true;
  respEl.classList.add('show', 'loading');
  respEl.textContent = 'Thinking…';

  const articleMeta = mode === 'review' ? ARTICLES[item.article] : ARTICLES[articleKey];
  const promptContext = `You're helping someone study the Anthropic engineering article "${articleMeta.name}" (${articleMeta.url}).

They just answered this multiple-choice quiz question:
Question: ${item.q}

They're asking about this specific answer option: "${opt.t}"
This option is ${opt.c ? 'CORRECT' : 'INCORRECT'}.
Short rationale already shown to them: ${opt.why}

Answer their follow-up question about this option in 2-4 concise sentences, grounded in what the article most likely covers on this topic. If you're not fully certain of an exact article detail, say so plainly rather than inventing specifics.

Their follow-up question: ${question}`;

  try{
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        messages: [{ role: "user", content: promptContext }]
      })
    });
    if(!response.ok){
      const errBody = await response.json().catch(() => null);
      throw new Error(errBody?.error?.message || `HTTP ${response.status}`);
    }
    const data = await response.json();
    const text = (data.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')
      .trim();
    respEl.textContent = text || 'No response came back — try rephrasing the question.';
  }catch(e){
    respEl.textContent = `Could not reach Claude for a follow-up (${e.message}). Check your API key in Settings and try again.`;
  }
  respEl.classList.remove('loading');
  submitBtn.disabled = false;
}

function finishQuiz(){
  els.quiz.style.display = 'none';
  els.resultsArea.style.display = 'block';

  const total = quizQuestions.length;
  const pct = Math.round(score/total*100);
  let verdictLine;
  if(pct >= 90) verdictLine = "Saturated. You could graduate this into a regression suite for yourself.";
  else if(pct >= 75) verdictLine = "Strong pass rate — worth reviewing the few missed tasks below.";
  else if(pct >= 50) verdictLine = "Partial credit territory. Review the missed concepts below, then run it again.";
  else verdictLine = "A low pass rate usually means a few concepts need another pass — review below, then re-run.";
  if(bestStreak >= 3) verdictLine += ` Best streak this run: 🔥 ${bestStreak}.`;

  const cats = {};
  results.forEach(r => {
    const label = mode === 'review' ? (ARTICLES[r.article]?.name || r.article) : r.cat.replace('_',' ');
    cats[label] = cats[label] || {correct:0,total:0};
    cats[label].total++;
    if(r.correct) cats[label].correct++;
  });
  let rows = '';
  Object.keys(cats).forEach(c => {
    rows += `<div class="breakdown-row"><span class="cat">${c}</span><span class="frac">${cats[c].correct}/${cats[c].total}</span></div>`;
  });

  const missed = results.filter(r => !r.correct);
  let reviewHtml = '';
  missed.forEach(r => {
    reviewHtml += `
      <div class="review-item">
        <span class="cat-tag">${mode==='review' ? (ARTICLES[r.article]?.name || r.article) : ARTICLES[articleKey].name} · ${r.cat.replace('_',' ')}</span>
        <div class="rq">${r.q}</div>
        <div class="ra-row yours"><b>YOUR ANSWER</b>${r.yourAnswer}</div>
        <div class="ra-row right"><b>CORRECT</b>${r.correctAnswer}</div>
      </div>`;
  });

  const remainingSaved = missedCount();

  els.resultsArea.innerHTML = `
    <div class="card results">
      <div class="label">final grade — pass@1</div>
      <div class="big">${score}/${total}</div>
      <div class="label">${pct}% overall</div>
      <p class="verdict-line">${verdictLine}</p>
      <div class="breakdown">
        <h3>Breakdown</h3>
        ${rows}
      </div>
      ${missed.length ? `
      <div class="controls" style="justify-content:center; margin-top:22px;">
        <button class="ghost" id="reviewBtn">Review ${missed.length} missed task${missed.length>1?'s':''} from this run</button>
      </div>
      <div class="review-list" id="reviewList">
        <h3 style="margin-top:22px;">Missed this run</h3>
        ${reviewHtml}
      </div>` : `<p class="verdict-line" style="margin-top:0;">No misses this run — clean sweep.</p>`}
      <p class="storage-note" style="margin-top:20px;">${remainingSaved} question${remainingSaved===1?'':'s'} saved to your missed-concept history overall.</p>
      <div class="controls" style="justify-content:center; margin-top:10px; gap:12px;">
        <button class="ghost" id="restartBtn">Run again</button>
        <button id="homeBtn">Back to articles</button>
      </div>
    </div>
  `;

  if(missed.length){
    const reviewBtn = document.getElementById('reviewBtn');
    const reviewList = document.getElementById('reviewList');
    reviewBtn.addEventListener('click', () => {
      const showing = reviewList.classList.toggle('show');
      reviewBtn.textContent = showing ? 'Hide review' : `Review ${missed.length} missed task${missed.length>1?'s':''} from this run`;
    });
  }
  document.getElementById('restartBtn').addEventListener('click', () => startQuiz(mode, articleKey));
  document.getElementById('homeBtn').addEventListener('click', renderHome);
}

/* ============================================================
   THEME + SETTINGS PANEL
   ============================================================ */
const THEME_STORAGE_KEY = 'quiz_theme';
const API_KEY_STORAGE_KEY = 'quiz_anthropic_api_key';

function applyTheme(theme){
  if(theme === 'light' || theme === 'dark'){
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function initTheme(){
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(saved);
}

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme')
    || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_STORAGE_KEY, next);
  applyTheme(next);
}

function refreshApiKeyStatus(){
  const status = document.getElementById('apiKeyStatus');
  if(!status) return;
  const hasKey = !!(localStorage.getItem(API_KEY_STORAGE_KEY) || '').trim();
  status.textContent = hasKey ? 'A key is saved in this browser.' : 'No key saved — follow-up answers are disabled until one is added.';
}

function openSettings(){
  document.getElementById('settingsPanel').classList.add('show');
  document.getElementById('apiKeyInput')?.focus();
}
function closeSettings(){
  document.getElementById('settingsPanel').classList.remove('show');
}

function initSettings(){
  const panel = document.getElementById('settingsPanel');
  const settingsBtn = document.getElementById('settingsBtn');
  const themeToggle = document.getElementById('themeToggle');
  const keyInput = document.getElementById('apiKeyInput');
  const saveKeyBtn = document.getElementById('saveKeyBtn');
  const clearKeyBtn = document.getElementById('clearKeyBtn');

  keyInput.value = localStorage.getItem(API_KEY_STORAGE_KEY) || '';
  refreshApiKeyStatus();

  settingsBtn.addEventListener('click', () => {
    panel.classList.toggle('show');
    if(panel.classList.contains('show')) keyInput.focus();
  });
  themeToggle.addEventListener('click', toggleTheme);
  saveKeyBtn.addEventListener('click', () => {
    localStorage.setItem(API_KEY_STORAGE_KEY, keyInput.value.trim());
    refreshApiKeyStatus();
  });
  clearKeyBtn.addEventListener('click', () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    keyInput.value = '';
    refreshApiKeyStatus();
  });
}

/* ============================================================
   KEYBOARD SHORTCUTS
   1-4 / A-D pick an option; Enter / → advance; Esc closes settings.
   Ignored while typing in a text field.
   ============================================================ */
function initKeyboardShortcuts(){
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    const typing = tag === 'TEXTAREA' || tag === 'INPUT';

    if(e.key === 'Escape'){ closeSettings(); return; }
    if(typing) return;

    const quizVisible = els.quiz.style.display !== 'none';
    if(!quizVisible) return;

    const key = e.key.toLowerCase();
    const optionMap = { '1':0, '2':1, '3':2, '4':3, 'a':0, 'b':1, 'c':2, 'd':3 };
    if(!answered && key in optionMap){
      const opts = document.querySelectorAll('#options .opt');
      if(opts[optionMap[key]]){ e.preventDefault(); selectOption(optionMap[key]); }
      return;
    }
    if(answered && (e.key === 'Enter' || e.key === 'ArrowRight')){
      const nextBtn = document.getElementById('nextBtn');
      if(nextBtn && !nextBtn.disabled){ e.preventDefault(); nextBtn.click(); }
    }
  });
}

initTheme();
initSettings();
initKeyboardShortcuts();
loadProgress();
