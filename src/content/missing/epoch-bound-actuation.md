---
title: Epoch-bound actuation
description: The tick is liveness, not safety. Correctness gates on the write — a recomputable receipt and a ball-epoch generation, held where the actuator can refuse locally.
order: 2
updated: 2026-11-17
tags: missing, actuation, epoch, nonce
---

# Epoch-bound actuation

The second open piece. The read ladder gates what a caller may *see*; the write
gate — what a caller may *do* — is missing at transport, in the lab exactly as
in pinballctl.

## The tick is liveness, not safety

A rolling tick proves **presence**, never absence. Any design where the tick is
the safety net has a window equal to the tick period, so the wrong thing is
allowed for exactly one tick, every time.

Correctness has to be gated on the **write**, not the tick. The predicate is
checked at actuation — the moment the lamp or coil is about to move — against a
state the actuator itself holds.

## The nonce lesson is the replay bug

Two writes inside one tick are byte-identical, so a stale write replayed after
ball death is indistinguishable from a fresh one. A lamp command keyed on
`(mode, ball, tick)` has exactly this edge.

The field the line does not determine is the **ball-epoch generation counter** —
consumed on ball death, held by the ESP, incremented monotonically, never
reused. Writes bearing a retired epoch are refused, not repaired.

## Where the head lives

Whichever component owns *ball liveness* must also hold the *head* of the
lamp-state chain, or neither can prove absence. In pinballctl's split,
authoritative game/ball transitions live on the Pi and lamp actuation is pushed
to the ESP as framed JSON. If the Pi owns liveness and the ESP owns lamps, the
head sits on the Pi and the ESP cannot refuse locally.

The fix: replicate ball liveness to the ESP as a **fenced epoch**, chain lamp
writes onto that epoch locally, and let the ESP refuse. Then the gap is provable
by the party that can actually stop the action.

## The shape

| Property | Mechanism | Where it must live |
| --- | --- | --- |
| No gameplay lamp lit with dead ball | epoch fence on the write, checked at actuation | ESP, locally, holding the epoch head |
| No stale write replayed | nonce/generation the command line does not determine | ESP, consumed on ball death |
| No gap (lamp should be dark, no record) | chained write log + refusal records that do not advance the epoch | ESP, head in ESP state |
| Latency bound ε | watchdog: no tick in K ms → blank the matrix | ESP, fail-closed on the actuator |
| Exempt classes | declared, `null exists`, never inferred | authoring, refused if unclassified |
