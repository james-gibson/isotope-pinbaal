---
title: The baml gate
description: isotope-baml is the first deployable piece in the whole thread — a pure admission gate over a scalar — but it binds to nothing and refuses to claim safety.
order: 5
updated: 2026-11-17
tags: isotope-baml, gate, baml
---

# The baml gate

isotope-baml is the first piece in the whole thread that is honestly
*deployable*: pure, testable, vendorable, and clear about what it refuses to
claim. It is a gate over a scalar — a tolerance ceiling on drift — not a
transition system.

## What it is good for

Exactly one thing: the Pi's **admission check** on a feature request. A
`Policy` has a single field, `refuse_above`, and a `Decision` is not bound to
the action it authorises. That is a gate, not a machine.

## The three defects to fix before adopting

1. **Null is not zero.** There is no absence discipline — no `null exists`, no
   refusal of a charge-0 field. The le.go ladder is the missing layer. See
   [/gates/absence-is-three-valued](/gates/absence-is-three-valued).
2. **The `> 220` wrap is non-monotone.** Distance above the last band wraps to
   the most-trusted state, so "very stale" grades as "clean" — a laundering
   operation, not a rounding error. The gate must saturate or refuse past the
   last band, and it must "never go higher than its input".
3. **`magnitude` is computed and never used.** If the ranker ever fed on
   anchor-relative position rather than differential structure, it would be
   ranking on a constant. The frame contract forbids exactly this — see
   [/gates/the-frame-contract](/gates/the-frame-contract).

## What it explicitly does not do

- **No epoch binding.** A `Decision` cannot stop a stale write replayed after
  ball death — there is no ball generation, no expiry, no nonce.
- **No precedence.** The README refuses the reading a priority scheme would
  need.
- **No safety.** Stated in the README, unprompted: distance measures boundary
  compliance, not whether an operation will fail or whether a machine is safe.
- **No cancellation or scheduling.** Still tick-shaped.
- **Not embeddable.** `baml pack` is a ~34 MB binary at ~0.10 s per call,
  `baml run -e` ~0.60 s. A hundred milliseconds is three orders of magnitude
  too slow for a lamp loop, and 34 MB does not fit an ESP32-S3.

## The licensing note

AGPL-3.0, with "network use counts as distribution". For a machine whose Pi
serves a browser UI, that is a live question, and the escape route — calling
the binary across a process boundary — moves the validation problem rather
than removing it.
