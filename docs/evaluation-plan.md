# Formative evaluation plan

## Document status

This document defines the first executable formative evaluation protocol for the Menu Lens customer decision spine.

It is a pre-implementation observation contract, not a formal comparative study and not evidence that Menu Lens is superior to a conventional ordering interface.

The evaluated spine is:

```text
complete menu
→ inline detail
→ candidate
→ comparison
→ explicit decision
→ configuration
→ current order
```

The protocol should be used to shape the first implementation, inspect early prototypes, and decide which interaction concepts should continue, change, simplify, or be removed.

## 1. Evaluation purpose

The first evaluation should determine whether the Menu Lens interaction is understandable and internally coherent before a conventional baseline, production analytics, or optimization study exists.

It should reveal:

- whether participants form an accurate mental model of the menu and its state boundaries
- whether the complete menu feels complete, stable, and directly available
- whether candidates support reversible consideration without becoming a renamed cart
- whether inline detail and return behavior preserve orientation and spatial memory
- whether comparison reduces memory work enough to justify its interaction cost
- whether explicit decision and configuration feel like a clear, reversible boundary
- which features should be retained, modified, simplified, redesigned, or deleted

Time, click count, and ordered value may be recorded as contextual observations, but they are not primary success measures.

## 2. First-round research questions

Use these identifiers in task notes, event definitions, and session summaries.

### RQ1 — Complete-menu overview

Can a dense, stable complete-menu view help participants establish the restaurant's scope, categories, approximate menu size, and price range without making them fear that products are hidden?

### RQ2 — Candidate versus order

Does separating candidates from current-order items support genuine consideration without turning the cart or current order into temporary storage?

### RQ3 — Inline detail and browsing continuity

Can inline detail and preserved browsing context support comparison without destroying spatial memory or forcing participants to relocate products?

No first-round task should be added unless it materially informs at least one of these questions.

## 3. Study boundary and non-goals

The first study uses:

- one Menu Lens prototype or interaction mockup
- one credible fictional restaurant menu
- the complete-menu decision spine only
- local observation notes
- an optional local in-memory event log

The first study does not evaluate:

- conversion rate
- revenue or average order value
- recommendation-algorithm performance
- real-time multi-device collaboration
- Quick, Shared-table, or Featured lenses
- a formal A/B test
- a conventional-interface comparison condition
- merchant CMS usability
- production telemetry infrastructure

Do not describe slower exploration as failure unless it is accompanied by confusion, unwanted repetition, orientation loss, accidental commitment, or inability to explain the decision.

Do not describe additional actions as failure when they create understandable, reversible comparison or recovery.

## 4. Participants and proxy testers

### 4.1 Formative participants

Prefer participants who:

- have used mobile or QR restaurant menus before
- are not already familiar with Menu Lens terminology or the intended state model
- can form genuine preferences from the reference menu
- represent a mix of people who browse broadly and people who decide quickly
- can use the target mobile viewport without assistance unrelated to the prototype

A small iterative round is appropriate. Run enough independent sessions to expose repeated patterns, then revise and run another round. Do not treat a small formative sample as statistically representative.

Do not collect names, email addresses, device identifiers, precise location, medical information, allergy details, or other unnecessary personal data.

### 4.2 Proxy testers before a coded prototype

Internal or proxy testers may be used to rehearse the protocol and inspect a paper prototype or clickable mockup, provided that:

- the session is labeled as a proxy test
- the tester did not design the specific interaction being tested when possible
- the tester makes genuine menu choices rather than following an expected path
- the moderator does not teach Candidate, Current order, or the intended state model
- proxy results are not used as evidence that unfamiliar users understand the product

Team members may identify broken flows, missing states, and ambiguous instrumentation. They are weak evidence for learnability or natural terminology.

## 5. Session setup

Before each session:

1. Reset candidates, comparison state, configuration state, current order, scroll position, and the local event log.
2. Confirm that the complete menu and all required task products are available in the prototype.
3. Confirm that at least one compared product has incomplete or low-confidence semantic metadata.
4. Confirm that at least one product requires configuration after decision and at least one does not.
5. Prepare the observation note template without participant-identifying information.
6. Record the prototype version, dataset version, viewport, and whether the session is moderated in person or remotely.
7. Do not pre-open the intended entry point or Candidate workspace.

Recommended session order:

```text
neutral introduction
→ think-aloud practice
→ Task 1
→ Task 2
→ Task 3
→ Task 4
→ debrief
→ moderator summary
```

## 6. Moderator instructions

### 6.1 Neutral introduction

Use a neutral introduction such as:

> This is an early menu prototype. We are testing the design, not you. Please use it as naturally as you can and say what you are looking for, what you expect to happen, and anything that feels unclear. Some parts may be incomplete.

Do not introduce the terms Candidate, decision workspace, Configuration boundary, or Current order before the participant encounters them.

### 6.2 During tasks

The moderator should:

- read each task exactly or with equivalent neutral wording
- avoid naming a control, location, icon, or expected path
- allow the participant to explore and recover before intervening
- ask neutral probes such as `What are you expecting here?` or `What do you think happened?`
- distinguish observed behavior from participant explanation
- capture exact participant wording when it reveals a mental model
- record every intervention and what caused it
- allow reversals and changes of mind

The moderator should not:

- explain that Candidate is different from the order
- point to the complete-menu entry, category directory, comparison control, or back action
- reassure the participant that state was preserved before they verify it
- interpret silence as understanding
- treat use of a feature as proof that the feature helped
- rescue the participant merely because the path is slower than expected

### 6.3 Intervention rule

Intervene only when one of these conditions applies:

- the participant explicitly asks for help after describing what they expected
- the participant is unable to continue after making a reasonable recovery attempt
- the prototype is broken or the task cannot proceed
- continuing would produce no additional evidence about the interaction

Use the least revealing intervention first:

1. repeat the task goal
2. ask what the participant expects
3. confirm that they may continue exploring
4. identify a general region only if necessary
5. explain the control or state only as a final rescue

Record the intervention level. A task completed after state explanation is not unassisted success.

## 7. Think-aloud guidance

Think-aloud is used to expose expectations and mental models, not to force a continuous narration.

Before Task 1, ask the participant to practice on a neutral action, such as explaining how they would choose between two ordinary objects.

During the session:

- prompt with `What are you thinking now?` after a meaningful silence, not after every action
- do not ask leading questions such as `Are you looking for the Candidate button?`
- separate contemporaneous wording from explanations given after the task
- note when speaking appears to change the participant's behavior
- allow quiet visual scanning; silence during scanning is not automatically hesitation
- do not request free-text entry containing personal, dietary, allergy, or medical information

When quoting a participant, remove incidental identifying details before sharing notes.

## 8. Task scripts

The four tasks form one continuous scenario. Preserve state between tasks unless the prototype failure requires a reset, in which case record the reset.

### Task 1 — Establish the menu overview

**Research question:** RQ1

**Participant script**

> Imagine this is your first visit. Look through the menu until you feel you understand what the restaurant mainly serves. Tell me when you have a useful overall picture.

Do not tell the participant which entry point or navigation control to use.

After the participant stops, ask:

- What does this restaurant mainly sell?
- About how large does the menu feel?
- What is the approximate price range?
- Do you believe you can see the complete menu? Why?

**Observe**

- first actions and chosen entry point
- whether category structure and item counts are noticed
- whether the participant can estimate menu scale without counting every item
- whether price-range understanding is broadly accurate
- whether the participant suspects products are filtered or hidden
- whether category jumps preserve a stable sense of one document
- backtracking, repeated searches, and orientation loss
- whether density supports scanning or becomes an undifferentiated list
- whether the participant can explain where they are in the menu

**Promising signals**

- the participant describes the restaurant's broad menu shape and price range
- the participant believes the complete menu is directly available and can explain why
- category movement feels like navigation within one stable menu
- the participant can return to a previously seen category without reconstructing the menu

**Failure signals**

- the participant cannot tell whether the menu is complete
- the participant believes the current view is a recommendation subset without evidence
- category navigation feels like replacing one hidden list with another
- density prevents recognition of categories, scale, or price relationships
- the participant repeatedly restarts browsing to regain orientation

### Task 2 — Build Candidates without ordering

**Research question:** RQ2, with continuity evidence for RQ3

**Participant script**

> Find two or three dishes you might genuinely want to eat. Keep them as possibilities, but do not formally order anything yet.

Do not use the word Candidate in the script unless the participant has already used it.

**Observe**

- whether the participant discovers a reversible consideration action
- the participant's wording for the resulting state
- whether they believe quantity, total, or required configuration has changed
- whether they search for a cart or Current order as temporary storage
- whether they hesitate because they fear an irreversible action
- whether they postpone saving an option because the state is unclear
- whether they add products prematurely to avoid losing them
- whether adding and removing a Candidate preserves browsing position
- whether the Candidate count and workspace are noticed without dominating the menu

**Promising signals**

- the participant can keep possibilities without configuring or affecting the order
- the participant describes Candidates as items under consideration rather than ordered items
- the participant can add or remove Candidates without fear of changing the order
- the participant continues browsing after forming Candidates

**Failure signals**

- the participant believes a Candidate is already in the order
- the participant looks for quantity, total, or modifiers immediately after adding a Candidate
- the participant uses Current order as the only understandable bookmark
- the participant avoids Candidates because the action appears irreversible
- the Candidate workspace adds actions but does not reduce fear of losing products

### Task 3 — Compare and make an explicit decision

**Research questions:** RQ2 and RQ3

**Participant script**

> Compare the dishes you are seriously considering. Choose the one you would most likely order and explain what made the difference.

Do not require use of the comparison surface. Whether the participant finds or avoids it is evidence.

**Observe**

- whether the participant reopens individual products to remember attributes
- whether comparison reduces this repeated memory work
- which attributes actually affect the decision
- whether irrelevant comparison fields create noise
- whether missing or low-confidence metadata is recognized as uncertain rather than false or unavailable
- whether the participant is forced into required configuration before deciding
- whether opening and closing detail preserves surrounding alternatives and scroll position
- whether the participant understands the action that crosses from consideration into decision
- whether the participant can explain the final choice in their own words
- stated decision confidence and what limits it

**Promising signals**

- the participant can compare two or three genuine possibilities without reconstructing each product from memory
- missing or low-confidence metadata is understood as incomplete evidence
- the participant knows which product is merely considered and which one has been explicitly decided
- the participant can explain the decision using attributes they actually saw
- returning from detail or comparison preserves orientation

**Failure signals**

- comparison does not reduce reopening, memorization, or note-like behavior
- the participant mistakes missing metadata for a negative product property
- the comparison surface creates false confidence from uncertain data
- modifiers or quantity appear before explicit decision
- deciding is indistinguishable from adding a Candidate or opening detail
- closing comparison or detail causes the participant to relocate products

### Task 4 — Cross the Configuration boundary

**Research questions:** RQ2 and RQ3

**Participant script**

> Decide to order one dish, then complete any choices the prototype asks you to make.

If the product chosen in Task 3 does not require Configuration, run this task with another genuinely acceptable dish that does. Record the second pass as a planned Configuration probe, not as evidence that the participant changed their original preference.

After the participant first enters Configuration, ask them to cancel or go back once, then continue and complete the task. This is a planned task probe, not a rescue intervention. Do not tell them what state should remain.

**Observe**

- whether the participant expects Configuration only after explicit decision
- whether the transition into Configuration feels reversible
- whether cancellation returns to an understandable prior context
- whether the Candidate remains available after cancellation
- whether the participant knows whether a decided draft exists after cancellation
- whether returning preserves category, scroll position, and nearby alternatives
- whether completing Configuration clearly creates a Current order item
- whether Candidates and Current order remain visually and conceptually distinct
- whether the participant can identify which items affect the total
- whether removal from Current order leaves Candidate state understandable

**Promising signals**

- the participant identifies Configuration as a later transaction step
- cancellation returns to the expected decision context without losing the Candidate or browsing position
- completion creates an item in Current order, not merely another Candidate
- the participant can explain the difference between Candidate and Current order
- the participant can continue browsing after adding an item to Current order

**Failure signals**

- the participant does not know when commitment occurred
- Configuration appears to be required for mere consideration
- cancellation seems destructive or returns to an unexpected place
- Candidate state disappears or duplicates unpredictably
- Current order and Candidate are interpreted as the same collection
- the participant cannot tell which item affects quantity or total

## 9. Observation model

### 9.1 Evidence classes

Every note should be labeled as one of four evidence classes:

1. **Direct observation** — an action, visible state, error, hesitation, or recovery that occurred.
2. **Participant statement** — the participant's wording, expectation, explanation, or confidence report.
3. **Moderator interpretation** — a reasoned interpretation linked to observed evidence.
4. **Unverified inference** — a plausible explanation that requires additional sessions or a targeted follow-up.

Do not rewrite moderator interpretation as participant intent.

### 9.2 Core observation dimensions

Record evidence about:

- menu overview and completeness belief
- category and price understanding
- Candidate mental model
- Candidate versus Current order distinction
- explicit decision recognition
- Configuration timing and reversibility
- browsing-position preservation
- product relocation or repeated searching
- comparison memory burden
- incomplete-metadata interpretation
- accidental or apparently irreversible actions
- final decision confidence
- ability to explain the decision
- moderator intervention

### 9.3 Secondary measures

The following may be recorded, but must be interpreted with the core observations:

- elapsed time by task
- number of product-detail openings
- number of category jumps
- number of reversals
- number of Candidate changes
- number of moderator interventions

Do not use a single time or click threshold as a pass/fail rule.

## 10. Success signals by research question

### RQ1 — Complete-menu overview is promising when

- participants can describe the restaurant's major categories and approximate price range
- participants form a plausible estimate of menu size without exhaustive counting
- participants trust that the complete menu remains directly reachable
- stable ordering and category navigation support return and recognition
- density enables scanning without obscuring hierarchy

### RQ2 — Candidate separation is promising when

- participants use Candidates for genuine possibilities before deciding
- Candidates do not imply quantity, modifiers, total, or commitment
- participants do not need Current order as a bookmark
- participants understand the transition from Candidate to decided/configured item
- Candidates remain useful after one item enters Current order

### RQ3 — Inline detail and continuity are promising when

- detail opens and closes without forcing product relocation
- participants recognize surrounding alternatives after returning
- comparison reduces repeated reopening or mental reconstruction
- canceling Configuration restores an understandable decision context
- preserved state supports orientation rather than creating hidden or stale state

These are formative signals, not validated effect sizes.

## 11. Falsification and redesign signals

The following results challenge the interaction concept itself. They must not be classified automatically as visual polish or solved by adding explanatory copy.

### 11.1 Complete-menu falsification signals

- most participants in a formative round cannot tell whether they are seeing the complete menu
- participants believe a lens or initial surface silently hides products
- the dense menu prevents recognition of categories, scale, or price relationships
- stable ordering does not produce recognizable return points
- category navigation fragments the menu into disconnected screens

### 11.2 Candidate falsification signals

- most participants cannot explain how Candidate differs from Current order
- participants consistently interpret Candidate as a formal order action
- participants still use Current order as temporary storage because it is clearer
- fear of losing products causes premature decision or Configuration
- Candidate workspace adds interaction cost without reducing memory work, uncertainty, or accidental commitment

### 11.3 Inline-detail and comparison falsification signals

- inline detail causes more orientation loss than a separate detail surface would
- closing detail or comparison regularly requires participants to find products again
- comparison does not reduce repeated reopening or mental reconstruction
- comparison fields create false certainty from incomplete metadata
- preserving several states produces more confusion than simply browsing again

### 11.4 Configuration-boundary falsification signals

- participants cannot identify when consideration became a decision
- required Configuration is encountered before explicit intent
- canceling Configuration destroys or ambiguously duplicates Candidate state
- participants cannot identify which collection affects quantity, total, or the order
- Current order appears to be another Candidate list rather than a transaction state

### 11.5 How to treat a falsification signal

When a falsification signal appears:

1. verify that it was not caused by a broken prototype or moderator instruction
2. inspect the state transition, not only the label or styling
3. seek the same evidence in another independent session
4. propose a structural alternative or removal test
5. rerun the affected task before expanding the feature

A single severe invariant breach may justify immediate redesign. A repeated pattern across a small independent round is stronger evidence than a larger number of minor comments.

## 12. Feature decision rules

Use the smallest response that addresses the observed cause.

### Retain

Retain a feature when participants understand its state, it supports at least one research question, and it does not create a repeated recovery cost elsewhere.

### Modify

Modify a feature when the concept appears useful but the action, state transition, information hierarchy, or return behavior is ambiguous.

Do not default to adding tooltip text. First test whether the interaction itself can make the state visible.

### Simplify

Simplify a feature when participants gain value from the underlying capability but ignore or misunderstand optional dimensions, controls, or persisted states.

Examples include reducing comparison attributes or removing a redundant Candidate-workspace action.

### Redesign

Redesign a feature when participants form the wrong state model, lose orientation, experience accidental commitment, or cannot recover without explanation.

A redesign should change the state transition or surface structure, not only wording.

### Remove

Remove or defer a feature when:

- it does not materially inform RQ1, RQ2, or RQ3
- participants do not use it for a real decision need
- it increases interaction or state complexity without reducing memory work or uncertainty
- its value depends on metadata that cannot be presented without false confidence
- a simpler existing behavior supports the same task more clearly

A feature may be removed from the first spine without being rejected permanently.

## 13. Local event vocabulary

### 13.1 Purpose

The event log supplements observation notes. It does not replace video, moderator notes, participant wording, or interpretation.

The first implementation may keep a session-local in-memory array that can be viewed or exported manually. It must not send events over the network or require an analytics account, database, cookie, persistent identifier, or telemetry SDK.

### 13.2 Minimal event envelope

```ts
type FormativeEvent = {
  sequence: number;
  elapsedMs: number;
  name: FormativeEventName;
  context: Record<string, string | number | boolean | null>;
};
```

Rules:

- `sequence` is monotonic within the current test session.
- `elapsedMs` is relative to the local session start; a wall-clock timestamp is unnecessary.
- product and category context uses stable local dataset IDs, never visible names or descriptions.
- context values use small documented enums or bounded numbers.
- the log resets between sessions and on explicit reset.
- no event contains free text.
- count fields report the state after the event transition; opening events report the state visible at open time.
- scroll offsets use one consistent local unit within a prototype version and are interpreted only alongside observation notes.

### 13.3 Allowed context vocabulary

Use only fields needed by the event definitions below:

- `productId`
- `categoryId`
- `candidateCount`
- `currentOrderCount`
- `detailSource`: `menu`, `candidate-workspace`, `comparison`, or `current-order`
- `scrollOffsetBefore`
- `scrollOffsetAfter`
- `metadataCompleteness`: `complete`, `partial`, or `unknown`
- `configurationRequired`
- `previousInteractionState`: `menu`, `detail`, `candidate-workspace`, `comparison`, `configuration`, or `current-order`
- `comparisonCount`
- `restoredProductId`
- `restoredCategoryId`

Scroll offsets are local interface measurements used only to inspect restoration. Do not combine them with viewport fingerprints or device identifiers.

### 13.4 Prohibited data for every event

Never record:

- participant name or account name
- email address or phone number
- device, advertising, browser, or analytics identifier
- IP address or precise location
- free-text search, notes, special instructions, or participant wording
- product names, descriptions, or arbitrary visible text
- allergy, medical, or inferred health information
- raw modifier values when they may contain personal or sensitive information
- remote analytics session identifiers

### 13.5 Event definitions

#### Menu and orientation events

| Event | Trigger | Required context | Do not record | Research question |
|---|---|---|---|---|
| `view_menu_overview` | Fire once when the complete-menu overview or complete-menu reading surface first becomes visible in the session. Do not fire for every render. | `previousInteractionState`; `categoryId` when a category is initially focused | product text, participant identity, device fingerprint, wall-clock timestamp | RQ1 |
| `jump_to_category` | Fire after an intentional category-directory or anchor action changes the focused category. | `categoryId`, `scrollOffsetBefore`, `scrollOffsetAfter` | category name, touch coordinates, viewport fingerprint | RQ1, RQ3 |
| `open_product_detail` | Fire when a product-detail surface becomes visibly open because of a participant action. | `productId`, `categoryId`, `detailSource`, `scrollOffsetBefore`, `candidateCount`, `currentOrderCount`, `metadataCompleteness`, `configurationRequired` | product name, description, ingredients, participant wording | RQ1, RQ2, RQ3 |
| `close_product_detail` | Fire when detail closes and the prior browsing surface is visible again. | `productId`, `categoryId`, `detailSource`, `scrollOffsetBefore`, `scrollOffsetAfter`, `restoredProductId`, `restoredCategoryId` | screen capture, visible product text, pointer path | RQ3 |

#### Candidate events

| Event | Trigger | Required context | Do not record | Research question |
|---|---|---|---|---|
| `add_candidate` | Fire only when a product transitions from available product to Candidate. Repeated clicks that do not change state are not this event. | `productId`, `categoryId`, `previousInteractionState`, `candidateCount`, `currentOrderCount`, `configurationRequired` | quantity, modifier values, product text, participant identity | RQ2, RQ3 |
| `remove_candidate` | Fire only when a Candidate is removed without changing Current order. | `productId`, `previousInteractionState`, `candidateCount`, `currentOrderCount` | removal reason as free text, product name, participant identity | RQ2 |
| `open_candidate_workspace` | Fire when the Candidate workspace becomes visibly active because of a participant action. | `previousInteractionState`, `candidateCount`, `currentOrderCount` | candidate names, participant notes, device identifiers | RQ2, RQ3 |

#### Comparison and decision events

| Event | Trigger | Required context | Do not record | Research question |
|---|---|---|---|---|
| `open_comparison` | Fire when a comparison surface becomes visible for two or more Candidates. | `previousInteractionState`, `comparisonCount`, `candidateCount`, `currentOrderCount`, `metadataCompleteness` | compared product names, full metadata values, participant wording | RQ2, RQ3 |
| `close_comparison` | Fire when comparison closes and the prior decision context is visible. | `previousInteractionState`, `comparisonCount`, `candidateCount`, `currentOrderCount`, `restoredProductId`, `restoredCategoryId` | product text, screen recording, inferred preference | RQ3 |
| `decide_product` | Fire when an explicit participant action transitions a Candidate or available product into purchase intent. Do not fire on focus, detail open, or Candidate add. | `productId`, `previousInteractionState`, `candidateCount`, `currentOrderCount`, `configurationRequired`, `metadataCompleteness` | decision reason, participant wording, product name | RQ2, RQ3 |

#### Configuration and Current order events

| Event | Trigger | Required context | Do not record | Research question |
|---|---|---|---|---|
| `start_configuration` | Fire when Configuration becomes visible after explicit decision. | `productId`, `previousInteractionState`, `candidateCount`, `currentOrderCount`, `configurationRequired` | chosen modifier values, special instructions, free text | RQ2, RQ3 |
| `cancel_configuration` | Fire when Configuration is left without adding or updating a Current order item. | `productId`, `previousInteractionState`, `candidateCount`, `currentOrderCount`, `restoredProductId`, `restoredCategoryId`, `scrollOffsetAfter` | cancellation reason as free text, modifier values, participant identity | RQ2, RQ3 |
| `complete_configuration` | Fire when all required Configuration is valid and the participant confirms completion. It precedes the Current order state transition. | `productId`, `previousInteractionState`, `candidateCount`, `currentOrderCount`, `configurationRequired` | modifier values, quantity details beyond what the state model already requires, special instructions | RQ2 |
| `add_current_order_item` | Fire when a configured draft order item becomes part of Current order. | `productId`, `previousInteractionState`, `candidateCount`, `currentOrderCount`, `configurationRequired` | price total, payment data, modifier text, participant identity | RQ2, RQ3 |
| `remove_current_order_item` | Fire when an item leaves Current order. Candidate state must be reported only through `candidateCount`, not inferred from this event. | `productId`, `previousInteractionState`, `candidateCount`, `currentOrderCount` | removal reason, payment data, product name, participant identity | RQ2 |

### 13.6 Event interpretation cautions

- Event absence may mean the participant did not discover a feature, chose another valid path, or encountered a prototype failure.
- Event frequency does not prove value.
- Repeated detail opens may indicate comparison work, orientation loss, curiosity, or event duplication; use notes to distinguish them.
- More Candidate changes may reflect useful exploration rather than indecision.
- A restored scroll offset does not prove restored orientation; the participant must also recognize the context.
- `metadataCompleteness` reports whether the compared surface had complete support data. It does not evaluate whether the metadata was correct.

## 14. Observation note template

Copy this section for each task. Keep direct evidence separate from interpretation.

```markdown
# Formative observation note

## Session

- Session ID:
- Date:
- Prototype version:
- Dataset version:
- Viewport / input mode:
- Session type: participant / proxy
- Moderator:
- Participant context: relevant ordering experience only; no identifying details

## Task

- Task number and name:
- Research question: RQ1 / RQ2 / RQ3
- Start state:
- End state:

## Direct observation

- Observed actions:
- Moments of hesitation:
- Recovery attempts:
- Orientation loss:
- Candidate / Current order confusion:
- Unexpected or apparently irreversible moments:
- Moderator intervention and level:
- Outcome: unassisted success / assisted success / partial / unable to complete / prototype failure

## Participant statements

- Exact wording:
- What the participant expected:
- How the participant described Candidate:
- How the participant described Current order:
- Decision reason:
- Decision confidence: low / medium / high

## State evidence

- Browsing position preserved: yes / partly / no / not observed
- Candidate state preserved: yes / partly / no / not observed
- Current order understood: yes / partly / no / not observed
- Configuration boundary understood: yes / partly / no / not observed
- Complete-menu trust: yes / partly / no / not observed
- Metadata uncertainty understood: yes / partly / no / not observed

## Moderator interpretation

- Potential design implication:
- Competing explanation:
- Evidence strength: direct / supported by statement / repeated pattern / ambiguous

## Unverified inference

- Hypothesis requiring more sessions:
- Follow-up task or prototype change that could test it:
```

## 15. Session summary template

Complete this immediately after each session before discussing the session with other observers.

```markdown
# Formative session summary

- Session ID:
- Prototype version:
- Participant or proxy:

## Mental model

- How did the participant explain what Menu Lens is?
- Did it feel like reading a menu, arranging a decision, or operating an order form? What evidence supports this?

## Overview

- Did the participant establish the restaurant's broad menu shape?
- Did they estimate menu size and price range plausibly?
- Did they trust that the complete menu was available?

## State boundaries

- Clearest boundary:
- Most confusing boundary:
- Candidate understood as consideration: yes / partly / no
- Candidate and Current order distinguished: yes / partly / no
- Explicit decision recognized: yes / partly / no
- Configuration timing understood: yes / partly / no

## Browsing continuity

- Where was browsing context preserved?
- Where did the participant lose orientation?
- Which products or categories had to be found again?
- Did preserved state help or create stale/hidden-state confusion?

## Comparison and decision

- Did Candidate or comparison reduce memory work?
- Which attributes affected the decision?
- How was incomplete or low-confidence metadata interpreted?
- Could the participant explain the final choice?
- Final decision confidence:

## Interventions and failures

- Moderator interventions:
- Prototype failures:
- Accidental or apparently irreversible actions:

## Feature disposition

- Retain:
- Modify:
- Simplify:
- Redesign:
- Remove or defer:

## Evidence quality

- Strongest direct observation:
- Strongest participant statement:
- Moderator interpretation:
- Unverified inference:
- Which observations require more sessions?

## Next test

- Highest-priority prototype change:
- Task to rerun:
- Event or note gap to correct:
```

## 16. Cross-session synthesis

After a small round, synthesize by research question rather than by screen.

For every pattern, record:

- the research question it informs
- number of independent sessions in which it appeared
- whether it was directly observed, stated, interpreted, or inferred
- whether it blocked task progress or merely added friction
- whether it violated a product invariant
- the smallest structural change that could test an alternative
- the task that must be rerun after the change

Do not average away severe state confusion. A participant accidentally adding an order item while believing it is only a Candidate is more important than several minor preferences about spacing or labels.

## 17. Claims this evaluation cannot support

The first formative study cannot establish that Menu Lens:

- is faster than a conventional QR ordering interface
- requires fewer taps than a conventional interface
- improves conversion, revenue, basket size, or upsell
- causes better purchasing decisions in a measurable economic sense
- is preferred by the general population
- works for every restaurant type, menu size, language, or accessibility need
- improves multi-person coordination or real-time shared ordering
- makes recommendation algorithms more effective
- proves semantic metadata is accurate or merchant-maintainable
- is ready for production analytics, privacy, security, or operational integration
- reduces cognitive load as a validated psychometric claim
- should replace paper menus or conventional ordering systems

The study may identify promising behavior, recurring confusion, structural failure, and design changes worth testing. It cannot make comparative or causal claims without an appropriate later study.

## 18. Unresolved questions and escalation rule

No current core-document conflict requires changing the product contract for this protocol.

The following implementation details remain intentionally unresolved until the domain dataset and decision-spine workstreams provide concrete behavior:

- exact UI labels and visual treatment for Candidate, explicit decision, Configuration, and Current order
- exact representation of `metadataCompleteness`, provided it preserves `complete`, `partial`, and `unknown` semantics for evaluation
- whether detail expands inline or uses a bottom sheet, provided return behavior preserves browsing context
- the local mechanism used to display or export the in-memory event log

Escalate to the core conversation before changing:

- the distinction between Candidate and Current order
- the point at which Configuration begins
- complete-menu reachability
- the requirement to preserve browsing context
- the three first-round research questions
- the parked status of a conventional baseline

Do not modify `product-contract.md`, `glossary.md`, or deferred workstreams from an evaluation implementation convenience.

## 19. Protocol completion checklist

Before using this protocol, confirm:

- all four tasks map directly to RQ1, RQ2, or RQ3
- no task requires a conventional baseline, alternative lens, merchant CMS, or shared-table behavior
- the moderator can run every task without explaining the intended state model
- observation notes distinguish direct evidence, participant statements, interpretation, and inference
- the local event log contains no identifying, free-text, medical, allergy, or remote analytics data
- success is not defined only by time, click count, or order value
- falsification signals can trigger redesign or removal rather than automatic copy changes
- the session summary can identify what to retain, modify, simplify, redesign, or remove
- the protocol does not claim superiority or production readiness
