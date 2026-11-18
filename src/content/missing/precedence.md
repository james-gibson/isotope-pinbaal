---
title: Precedence
description: Mode priority is a partial order over concurrent claimants, totalised at arbitration. Position is not precedence — and neither is the trust rung.
order: 1
updated: 2026-11-17
tags: missing, precedence, arbitration
---

# Precedence

The first open piece. A pinball machine has concurrent modes — modes really are
concurrent — and concurrency needs arbitration. No repository ships it, and the
thread's negative result is the important part: two of the things you might
reach for are provably wrong.

## Position is not precedence

The frame contract is blunt: both statements displace by the same `42 − 42i`,
"the displacement is the same for both / and so the rotation carries no
similarity between them". A common-mode frame displacement cancels in
comparisons and carries zero information about which mode outranks which.

So `42i` position — a scalar distance from nominal — cannot produce precedence.
Building `mode-priority` out of 42i position would be anchor-dependent and
would rank on a constant.

## The trust rung is not precedence either

The rung is a scalar, a total order over trust. Mode priority is a *partial
order* over concurrent claimants, totalised only at arbitration. Those are two
different orders on the same set.

Conflating them produces a specific, quotable failure: a high-trust attract
loop outranks a low-trust ball-save. Safety-critical logic loses to
well-attested logic. The canon's laundering bug is the same shape one level
down — a distance that falls back to the most-trusted state, so "very stale"
grades as "clean".

## The two rules precedence must obey

1. **Staleness must revoke, never confer.** Legality is a *grant* (a live ball
   epoch), not a *measurement* (time since ball death). A gate of the form "if
   stale for less than N, allow" is the laundering bug — the far end of the band
   wraps to permit.
2. **The order is partial until arbitration, total after.** You cannot compare
   two modes in general; you can only totalise them at the moment a single
   winner must run.

## What is missing

A partial order over claimants, a totalisation rule, and a place the arbiter
lives. The chain supplies the substrate; the guard supplies admission; nothing
yet supplies the arbiter. That is the one thing both the lab and pinballctl
leave as prose.
