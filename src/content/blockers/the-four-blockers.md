---
title: The four blockers
description: What pinballctl records as missing, verbatim, from the prerequisites field of its own wizard definitions.
order: 1
updated: 2026-11-17
tags: pinballctl, blockers, state-machine
---

# The four blockers

Pinballctl is a browser-authored control platform for homebrew machines: a
Flask web app and bridge daemon on the Raspberry Pi, an ESP32-S3 real-time
runtime. It is a config-authoring-and-deploy pipeline with an event-rule engine
on top — not a state-machine framework.

The blockers are not in a roadmap doc. They live in the `prerequisites` field of
the bundled wizard definitions, which are machine-readable and validated:
unavailable definitions must carry concrete prerequisites and an empty `rules`
list.

## A. Mode lifecycle service

> Requires a mode lifecycle service with scheduling, cancellation and priority ownership; Rules flags alone do not provide these semantics.

Cited by at least eight Game modes entries — `multi-stage-mode`, `mode-priority`,
`mode-stacking`, `mode-cancellation`, `mode-restart`, `mode-completion`,
`mode-cooldown`, `wizard-mode`.

What is missing is an **owner** for "this mode is running": something that
schedules starts, cancels pending work, and arbitrates which mode outranks
which. Flags are global mutable booleans with no owner, no priority ordering,
and no lifecycle event on transition.

## B. No scheduler — time is a comparison, not a callback

> Requires cancellable scheduled events and a reliable timed mode lifecycle. Time-since-event conditions only run when an event arrives; they cannot schedule a timeout.

Cited by `timed-mode`, `mode-timeout`, `countdown-challenge`.

The play clock only *accumulates* elapsed playable time at authoritative game
transitions (`BALL_ACTIVE` boundaries), and `elapsed()` is computed on demand
from an accumulator plus `now - since`. Nothing walks a timer queue and emits an
event when a deadline passes. The gap is concrete: no wakeup, and nothing to
cancel.

## C. No authoritative gameplay/mode/scoring lifecycle

> Requires an authoritative gameplay/mode/scoring lifecycle and validated cross-feature reset rules; this candidate is not representable by current standalone Rules actions.

Cited by `mission-selector` and `super-mode`.

This is a single source of truth spanning Rules + Scoring + Lighting/Media, plus
proof that reset switches (new game, ball, player) actually reset everything
they claim to.

## C2. Per-player mode progress: state exists, the generator does not

`per-player-mode-progress` is a different kind of blocker — not a missing
runtime, but a missing *authoring* path. Game and Ball Management already
provide authoritative state; the candidate still needs a dedicated
configuration-aware wizard and verified mechanism-specific behaviour.

## The cross-cutting gates

Two gates are not mode-specific, and both sit on the authoring path:

- Both Pi and ESP must report **rules-runtime version 2**; an older connected
  ESP blocks preview and creation.
- The compiler refuses raw `pulse`/`set`/`emit` injection and arbitrary
  rule-graph editing, and requires a device-aware generator before mechanism or
  safety templates can be offered. This is a *safety* gate, not a lifecycle gate.
- The engine today has no timer primitive at all: no timer actions, NFC, random
  selection, ball search, or game/mode services. Even the "available" timed-entry
  recipes are built from scheduled event comparisons, not real timers.

## How it maps onto "state machine"

| State-machine feature | Status in pinballctl | Blocking statement |
| --- | --- | --- |
| Named states | Approximated by flags/counters; free-form names, no registry, no exclusivity | A |
| Transition table / guards | Conditions per rule (`eq`/`gt`/`time-since`), but no transition matrix | A |
| Entry/exit actions | Not modelled; actions run per rule | A |
| Mode stack / priority | Not present; `mode-priority` is a tag, not arbitration | A |
| Timeout / self-transition | Not possible without an incoming event | B |
| Hierarchical states | No | A |
| Cross-feature coherence | Unverified | C |
| Per-player mode state | Managers own it; wizard path absent | C2 |

The honest summary: the blockers are **one missing service (mode
lifecycle/scheduler) with two manifestations** — no ownership/priority/
exclusivity, and no cancellable wakeup — plus **one missing authoritative
cross-feature lifecycle** and **one unwritten authoring wizard**.
