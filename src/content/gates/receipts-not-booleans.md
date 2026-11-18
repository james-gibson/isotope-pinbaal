---
title: Receipts, not booleans
description: The lab's rung ladder gates reads, not writes. Actuation needs a recomputable receipt, and the secret never crosses a socket.
order: 4
updated: 2026-11-17
tags: adhd, lezz, receipt, actuation
---

# Receipts, not booleans

`adhd` and `lezz.go` supply the finding that decides the pinball question — and
it is a finding about what the existing gate is *not*.

## The read ladder is not an actuation gate

The lab's rung ladder maps a caller's 42i distance to a rung that limits what
the caller may **read**. A caller that keeps departing is removed from the
routeable set.

Transplanted into a pinball machine, that gives a beautifully graded *view* of
the machine and no gate on the *hands*. A caller at rung 0 correctly sees
nothing and can still fire the flippers, because the surface that admits it is
the same surface that dispatches.

Observation grade is not actuation authority.

## Admit, never authorise

The fix is written down, in two sentences:

- "Gate the dispatch on a negotiated rung/isotope identity… Do **not** let a
  proxy accept a caller-supplied credential for an anonymous caller — the hop
  should require a locally configured entitlement."
- "The secret never crosses a socket; only the receipt does."

Liveness must not arrive at the ESP as a boolean in a JSON frame — a boolean is
a caller-supplied credential, and a proxied hop inherits it. It arrives as a
**receipt the ESP can recompute against a secret the ESP holds**. Then the same
hop can *admit* without *authorising*.

## Ask who, not where

`adhd.cluster.join` supplies the anti-spoofing rule: an address is shared by
design, so a join is asked who it is. A pinball's mirror pair — left/right
multiball, two flippers, two lamp boards — is two nodes of one route with
counter-rotation, which is exactly the `q_a + q_b = 0` pairing. A lone `+1` is
the wild pinball: a flipper with no return, a scene with no terminator, a
half-edge that can reach the lights.

## The gap

The MCP surface "is not isotope-gated — any caller gets the real tools, and
driving them files no alarm". The write gate is missing at transport, in the
lab exactly as in pinballctl. See
[/missing/epoch-bound-actuation](/missing/epoch-bound-actuation).
