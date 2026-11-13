# AI prompts — Exercise 3

Use with a **structured spec** (Exercise 1 or 2 output). Replace `{{STRUCTURED_SPEC}}` with your markdown.

---

## Shared system guardrail (prepend to any prompt)

```text
You are assisting a Business Analyst. Use ONLY the structured specification below.
- Cite IDs (RULE-##, OUT-##, Q-##, etc.) when referencing requirements.
- If information is missing, list clarification questions — do NOT invent business policy, legal rules, or numeric limits.
- Label each output item as Grounded, Inferred, or Invented.
- Prefer tables and bullet lists over prose.

STRUCTURED SPEC:
{{STRUCTURED_SPEC}}
```

---

## Prompt A — Acceptance criteria

```text
From the structured spec above, produce acceptance criteria for refinement-ready user stories.

Requirements:
1. Group AC by functional area or user story candidate (max 4 groups).
2. Each AC must be observable and testable (Given/When/Then or clear pass/fail).
3. Link each AC to at least one spec ID.
4. Flag any AC that required invention as Invented and explain what spec gap caused it.

Output format:
### Group: [name]
| AC ID | Criterion | Linked spec IDs | Confidence |
```

---

## Prompt B — Edge cases

```text
From the structured spec above, list edge and exception cases relevant to refinement.

Requirements:
1. Minimum 8 items; maximum 15.
2. Categories: validation, timing, data/state, privacy, notifications, localization.
3. For each edge case: trigger, expected behavior IF spec is silent say "Spec silent — question Q-##".
4. Do not propose technical implementation.

Output format:
| Edge ID | Trigger | Expected behavior | Spec basis | Suggested question ID |
```

---

## Prompt C — Stakeholder clarification questions

```text
From the structured spec above, draft stakeholder clarification questions for a 30-minute review.

Requirements:
1. Audience tags: Product, Legal, Support, Marketing (pick relevant).
2. Prioritize Blocker vs Important vs Nice-to-know.
3. Each question references spec IDs it resolves.
4. Include 2 "challenge questions" that test whether scope is too large for the next release.

Output format:
| Priority | Audience | Question | Resolves IDs |
```

---

## Prompt E — PoC / MVP slice from structured spec (Exercise 4)

```text
From the structured spec above, propose a 2-week PoC OR MVP slice.

Requirements:
1. One falsifiable hypothesis (H-01) with audience and outcome.
2. Smallest testable slice: 3 IN-SLICE, 3 OUT-SLICE — each OUT cites why deferred.
3. Declare PoC vs MVP with 2-sentence justification.
4. Two success signals (SIG-P-01, SIG-P-02) with different PoC vs production thresholds.
5. Three kickoff-blocking questions (Q-P-01..03) referencing parent spec IDs.

Output format: markdown tables matching mvp-poc-slice-template.md sections 1–6.
Label Grounded / Inferred / Invented on every row.
```

---

## Prompt F — Slice scope challenge (engineering lens)

```text
Review this PoC/MVP slice as a skeptical tech lead. Do not add features.

1. Two scope-creep risks with slice IDs
2. One manual/fake step appropriate for 2 weeks
3. One success signal that needs a shorter proxy metric

SLICE:
{{POC_SLICE}}
```

---

## Prompt D — Optional diff (before/after spec fix)

After you add a line to fix an invention, run:

```text
Compare these two spec versions. List AC or edge cases from Prompt A/B that change from Invented to Grounded.

VERSION 1:
[paste old]

VERSION 2:
[paste new]
```

---

## Validation checklist (human review)

Before accepting AI output into backlog:

- [ ] Every **Invented** item has a spec gap ticket or open question
- [ ] Numeric limits match approved policy (not model defaults)
- [ ] Exclusions in AC don't contradict OUT-## rows
- [ ] Stakeholder questions assigned owners in your tracker
- [ ] Acceptance signals remain demo-able (no internal-only jargon)

---

## Weak vs strong example

**Weak:** "Write acceptance criteria for the contact form change."

**Strong:** Shared guardrail + Prompt A + full structured spec with RULE and OUT sections filled.
