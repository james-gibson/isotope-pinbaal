---
title: The proof of absence
description: "The wrong thing was never allowed" is unprovable. What is provable is bounded — no gameplay lamp lit more than ε after ball death.
order: 3
updated: 2026-11-17
tags: missing, absence, proof
---

# The proof of absence

The third open piece, and the sharpest. The user's framing: "if every light
requires a live ball in play, as soon as the ball is dead those lit universes
die." The hard part is not the calculation — `dead` is just `not live`. The hard
part is the *evidence*.

## A ledger cannot show an unbilled delta

A rolling tick proves **presence**, never absence. It can show you a lamp was
extinguished; it can never show you a lamp was never lit with a dead ball. And
with dynamic skills, absence gets a *third* cause the counter also cannot
distinguish: the path should have advanced but the skill it needed had been
re-resolved out of existence.

## What upgrades a finding into a refusal

The lab's answer, from the same issue:

> a gap is not merely a finding, it is a refusal — and the thing that upgrades it from finding to refusal is that the head of the sequence lives in the keeper's own state, beside a secret the caller never holds.

Three properties: contiguity, hash-chaining, and a **head somebody holds**.
Each entry is MACed and chained, so a skipped seq and a forked prev are the same
event from either end. An entry that was never walked cannot be appended,
because it would have to chain onto a head the repository never held.

The transfer limit is stated with unusual honesty: a third party can verify the
arithmetic of a presented trail but cannot prove the absence of a walk it never
saw. That is why the head lives beside the secret, and the publication's copy is
only evidence.

## The provable statement is bounded

For a physical actuator, "the wrong thing was never allowed" is unprovable — the
lamp is lit for some microseconds after the trough goes empty. What is provable
is **bounded**:

> No gameplay lamp lit more than ε after ball death.

with ε set by the ESP's local loop, not by the Pi's tick. Stating it with the
bound in it is the difference between a spec and a hope.

## The exempt set is the attack surface

"Every light requires a live ball" is false of a real machine: attract lighting,
game-over, match, high-score and ball-save blink are all lit with no live ball.
So the invariant is scoped to gameplay lamps, and everything hangs on how the
exempt set is determined.

Per the canon's discipline, the exempt set must be *declared* (`null exists`),
never inferred from the absence of a flag, and a lamp with no declared class
must be refused rather than defaulted.
