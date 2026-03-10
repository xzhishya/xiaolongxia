---
name: meeting-action-items
description: Turn meeting notes, transcripts, chat logs, or rough bullets into a clean action-item summary with owners, deadlines, dependencies, risks, and decisions. Use when the user asks for meeting minutes, action items, next steps, owner assignment, follow-up lists, or summary extraction after sales, project, delivery, or R&D discussions.
---

# Meeting Action Items

Extract decisions and next steps from messy input, then rewrite them into a compact execution view.

## Workflow

1. Identify the meeting context: customer, project, topic, and date if available.
2. Separate information into five buckets:
   - decisions made
   - action items
   - open questions
   - risks/blockers
   - follow-up meetings or deadlines
3. Normalize each action item into:
   - task
   - owner
   - due date or timing
   - status or dependency
4. If owners or dates are missing, mark them explicitly as `TBD` instead of guessing.
5. Keep facts grounded in the source; do not invent commitments.

## Output Pattern

Use this structure unless the user asks for another format:

### Meeting summary
- purpose
- key conclusion
- major decisions

### Action items
- `[Owner] Task — Due: <date/TBD> — Depends on: <dependency/none>`

### Open questions
- unanswered items requiring clarification

### Risks / blockers
- schedule, scope, resource, customer, technical, or approval risks

## Good Defaults

- Merge duplicates.
- Convert vague language into clear verbs.
- Preserve uncertainty labels like tentative / proposed / pending.
- Surface anything that sounds like a commitment to a customer or management.
- If the meeting is long, prioritize actionable content over conversational filler.

## Special Cases

### Sales or customer meetings
Highlight:
- customer asks
- promised deliverables
- commercial follow-ups
- proposal / demo / quote deadlines

### Project meetings
Highlight:
- milestone impact
- cross-team dependencies
- owner gaps
- escalation needs

### R&D / technical meetings
Highlight:
- requirement clarifications
- design decisions
- experiment tasks
- data / interface / model dependencies
