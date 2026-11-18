---
title: The traps
description: Four collapses that each fail in one direction: death is not a rotation, ¬live is not complement, reads are not writes, and staleness must never confer.
order: 4
updated: 2026-11-17
tags: missing, traps, negation
---

# The traps

Four shorthand moves that each look safe and each fail in a specific direction.

## Death is not a rotation

Rotation is common-mode: both statements displace identically, so the rotation
"carries no similarity between them". A re-zero preserves the interval — same
absolute span, two origins.

Rotating a dead ball into place asserts *nothing changed but the address*, which
is false in the strongest way a pinball machine can say it: a drained ball is
not the same ball re-labelled, it is a new identity. Death is an **epoch bump
plus a new isotope**, not a quarter turn. Modelling it as rotation is exactly
the error the frame contract exists to forbid.

## ¬live is not complement

A boolean `live` has two values where the machine needs three:

- *no ball exists* (`null exists` — a known-empty trough),
- *ball state unknown* (a missing plane — jammed trough, dead opto),
- *a field somebody zeroed* (the inadmissible one).

`¬live` collapses all three into "dead". For lamps the collapse fails safe
(dark). For the inverse gate — may this mode start, may this coil fire — it
fails **open**: an unknown ball reads as not-live, negation flips it, and the
permission is granted. One predicate, opposite failure directions, depending on
which side you read it from.

## Reads are not writes

The rung ladder limits what a caller may read. Observation grade is not
actuation authority — a caller at rung 0 sees nothing and can still fire the
flippers, because the surface that admits it is the surface that dispatches.

## Staleness must revoke, never confer

A gate of the form "if stale for less than N, allow" is the laundering bug: the
far end of the band wraps to permit. A measurement of "very stale" becomes a
verdict of "clean". Legality of a lit lamp is a *grant* (a live ball epoch),
not a *measurement* (time since ball death). The predicate must be total and
monotone, with an explicit reject past the last band.

## Position is not precedence

The shortest of them, and the one the canon states itself: position is a
scalar, precedence is a partial order, and a common-mode displacement cancels in
comparisons. See [/missing/precedence](/missing/precedence).
