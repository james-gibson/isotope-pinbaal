---
title: Why flags are not states
description: Flags and counters are persisted named booleans with no owner, no exclusivity and no transition hook — so they cannot stand in for a mode.
order: 2
updated: 2026-11-17
tags: pinballctl, flags, modes
---

# Why flags are not states

The rules engine has persistent state: named counters, flags and timers with
Global / Per-game / Per-player scope. Evaluation is serial in event-ingress
order, so a later rule sees changes made by an earlier one for the same event.
That lets you hand-build small state machines — a `GAME_STATE` flag toggling
between `ATTRACT` and `BALL_ACTIVE`.

It does not let you guarantee one. Three properties are missing.

## No exclusivity

Flags are persisted named booleans that any rule can set. Two rules can both
decide "mode A is active" and "mode B is active" with no conflict detection.
There is no exclusive-state enforcement, no registry that a name is claimed by
one owner, and no error when two owners write the same name.

## No transition hook

Actions run per rule. There is no point that fires on entering or leaving a
state — nothing to attach entry/exit behaviour to. A "mode" only exists as an
event *name* (`MODE_STARTED` and friends) and as a tag grouping rules.

## No ordering or arbitration

Priority is only expressible as a *tag* grouping rules, not as an arbitration
mechanism. There is no partial order over which mode outranks which, and no
moment at which that order is totalised.

## The tag is a zero-charge placeholder

This is the sharpest version of the defect, and it comes from le.go's absence
discipline rather than from pinballctl itself.

The three-valued ladder runs `null → null exists → 0 is inadmissible →
-1 < 0 < 1`. A charge-`0` field is a field occupied by a token that claims
meaning and carries none. `mode-priority` as a tag is exactly that: a field
named *priority* whose value is a grouping label with no ordering semantics.

So the fix is not "add a priority field". The fix is to recognise that a tag
cannot be a priority, because a tag is a zero-charge placeholder. See
[/gates/absence-is-three-valued](/gates/absence-is-three-valued).

## What flags remain good for

Flags and counters are the right primitive for what they are: scoped, mutable,
serially-evaluated bookkeeping. The failure is using them as the *only*
primitive and then expecting them to carry exclusivity, transition and
arbitration — the three things a mode lifecycle service exists to provide.
