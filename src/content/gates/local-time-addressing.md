---
title: local-time's addressing
description: local-time has no rule engine, but its zero-reference epoch and signed offsets are the right authoring surface for mode-relative time.
order: 1
updated: 2026-11-17
tags: local-time, addressing, time
---

# local-time's addressing

The instinct to look for a rule engine in local-time is worth checking, but it
does not hold: local-time is a temporal-ontology library, not an evaluation
engine. It has no trigger, no condition tree, no action set, no action
executor, no rule registry, no conflict resolution, no scheduling.

What it does have is a model of time that the pinball blocker is missing.

## The transferable shape

local-time models time as **data points in a timeline you query**, addressed
relative to a fixed zero point:

- a named `zeroPoint`, with `beforePrefix`/`afterPrefix`, giving string addresses
  like `nasa:apollo11:1969:launch:T-00:05:30`;
- a `TimePrecision` enum for how precise an offset is;
- signed offsets either side of zero, with the sign carried by the address.

That is exactly how a mode-relative timeline wants to be authored on a Pi and
then handed to firmware: a named zero (`BALL_START`, `MODE_START`), a signed
offset address, a declared precision.

## An address is a noun, not a callback

The transfer stops there. An address names a point on a clock; it does not fire
at that point. You still need the queue that wakes at `T+00:00:30` and the
handle that cancels it — the scheduler both projects lack.

So local-time supplies the **authoring surface** for timers, not the timer. The
distinction matters: pinballctl's `timed-mode`/`mode-timeout` gap is a
*representation* problem as much as a runtime one, and the addressing model
solves the representation half. The runtime half is still absent — see
[/missing/epoch-bound-actuation](/missing/epoch-bound-actuation).

## What local-time declines

The library's own Challenges list concedes there is no ergonomic time
construction: timestamps are raw bigint-nanosecond math. Containment was
retired in favour of static parent pointers. Persistence is declared and
unused. A `Universe` is a describe-once record, not a mutable active set.

None of that is a defect against the pinball problem — it is a different
category of thing. The useful reading is narrow: take the address shape, leave
the rest.
