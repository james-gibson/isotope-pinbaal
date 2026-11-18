---
title: The frame contract
description: The 42i-rotation feature is the closest thing to the missing design — a frame contract for a mode system, written as a spec at rest.
order: 2
updated: 2026-11-17
tags: isotope, rotation, frame, 42i
---

# The frame contract

The `42i-rotation.feature` file in isotope is the closest thing in either
repository to the missing design. It is not a rule engine and not a lifecycle
service — it is the **frame contract** a mode system needs, written as ten
scenarios.

## What it pins

- **Identity is invariant under frame.** `base64url(sha256(canonical raw))`,
  with the anchor absent from the computation. Re-framing rewrites every label
  and no identity. History survives a frame change; the view does not.
- **Ordering is invariant under re-zero.** A re-zero preserves the interval —
  same absolute span, two origins. The Apollo fixture's whole point.
- **No exempt actor.** The rotation holds for charge configurations from one
  plane to five, and for probes including arbitrary strings: "no plane is
  exempt". Universality is a strong claim, stated in the right form.
- **The mirror fails closed.** The parser accepts two of the four quarter-turn
  anchors and rejects the other two, so one handedness of the mirror is not
  expressible. That is a provenance gate implemented as a parse rejection, not a
  log warning.

## What it refuses to say

Two things, both named in the thread and neither softened here:

- **Position cannot produce precedence.** Both statements displace by the same
  `42 − 42i`, so "the rotation carries no similarity between them". Ranking by
  key *differences* is anchor-invariant; ranking by key *magnitude* is
  anchor-dependent. A ranker must consume differences, never positions.
- **The composition law is underspecified.** `key = Σ(z_j − anchor)` is
  consistent with several different laws for whether `|Δkey|` scales with plane
  count `N`, and the file never relates the per-plane displacement to the key's
  magnitude. That single quantity is what a ranker would consume.

## A spec at rest

The honest limit: none of the ten scenarios fires, schedules, cancels or
mutates. It is a specification of relationships between readings, not a runtime.
For the `timed-mode` blocker it supplies the authoring semantics — named origin,
signed offset, declared invariance — and zero of the runtime.

Two open questions attach to it: whether the scenarios have step definitions or
run in CI, and whether "the magnitude is 59.397 in every case" is an assertion
nobody re-checks. The same disease as the Apollo suite's
`findEventsInRelativeRange.length === 4`, one level up.
