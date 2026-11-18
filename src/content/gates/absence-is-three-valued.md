---
title: Absence is three-valued
description: le.go's ladder — null, null exists, zero is inadmissible — sorts pinballctl's failures into two kinds, and the phase-cancellation law accounts for four blockers at once.
order: 3
updated: 2026-11-17
tags: le.go, absence, phase-cancellation
---

# Absence is three-valued

le.go supplies a three-valued absence discipline that is the actual cure for
the disease that runs through both repos: fields that are *declared but never
populated*.

## The ladder

| Snap | Rule | Consequence |
| --- | --- | --- |
| `null` | absence is **no plane** — never a value you can put in the graph | the hole is not a zero |
| `not null` | *"null exists"* is itself a fact; unknown ≠ absent | an unfilled field is information |
| `0 > 1` | a zeroed field is a **claim** that disconnects the graph | a placeholder that looks like a value is worse than nothing |
| `42 = 0` | every universe agrees where zero sits | one shared origin, not one per feature |

Ladder: `null → null exists → 0 is not null → -1 < 0 < 1`.

## It sorts pinballctl's failures into two kinds

The eight unavailable mode wizards, with typed prerequisites and empty `rules`
lists, are **`null exists`** — the correct representation: the hole is declared
and is information.

`mode-priority` as a tag is **charge 0** — a field occupied by a token that
claims meaning and carries none. That is the worse defect, and the system names
it as inadmissible by construction, not by policy. The fix is not "add a
priority field"; it is that a tag cannot be a priority, because a tag is a
zero-charge placeholder.

## The phase-cancellation law

`q_a + q_b = 0`: a lone `+1` is a half-edge that cannot enter the mesh — not by
policy, but by construction.

In pinball terms: every rule needs its complement. A flag set with no clear, a
mode started with nothing that ends it, a cooldown with no expiry — all
half-edges.

This explains *why* the unavailable set is exactly `mode-cancellation`,
`mode-cooldown`, `mode-restart`, `mode-completion`: they are all the `−1` to
somebody's `+1`. One structural rule accounts for four of the eight blockers at
once. The caveat is whether the action list really lacks a clear/cancel
primitive — if it exists, the analogy weakens to "no *paired* primitive".

## The projector doctrine

"The classic styles are faithful, lossy projections — the projector does not
fix them," and each style is annotated with what it drops. Nothing is lost
until you ask for a flat shadow.

That is pinballctl's Pi→ESP pipeline, stated correctly. The ESP blob is a flat
shadow of the authored config. What pinballctl lacks is the computed,
per-profile loss manifest — see [/blockers/the-pi-esp-split](/blockers/the-pi-esp-split).
