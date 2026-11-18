---
title: The wild pinball
description: A chain of 42i isotopes is a transcript, not a state machine. The chain is the ledger; refusal and precedence are the missing pieces.
order: 1
updated: 2026-11-17
tags: question, isotope, state-machine
---

# The wild pinball

A pinball machine can be described as a chain of 42i isotopes. The chain is the
transcript: an append-only log of what happened, with identities that survive a
change of frame. That half is solved — or at least well enough specified to
author against.

The other half is not. A transcript accepts what it is handed. A machine refuses
a successor before the append, and arbitrates which of several concurrent
successors runs. Those two things — **refusal** and **precedence** — are the
pieces this site chases, and the reason the question is still open.

## What is settled

- **The transcript is real.** `base64url(sha256(canonical raw))`, with the anchor
  absent from the computation, gives a history that survives re-framing. Re-zero
  the clock and every label changes, no identity does.
- **The blockers are recorded.** Pinballctl does not hand-wave its missing state
  machine. The gaps live in the `prerequisites` field of its bundled wizard
  definitions, machine-readable and validated. See
  [/blockers/the-four-blockers](/blockers/the-four-blockers).
- **Each repository supplies a piece.** local-time supplies the addressing,
  isotope the frame contract, le.go the absence discipline, the lab the receipt.
  See [/gates/the-frame-contract](/gates/the-frame-contract).

## What is not

Three pieces recur as "still absent" across every repository the thread reads:

1. **Precedence.** Mode priority is a *partial order* over concurrent claimants,
   totalised only at arbitration. Position is not precedence — the 42i rung is a
   scalar, and the canon says so itself.
2. **Epoch-bound actuation.** Gating *writes* on a recomputable receipt and a
   ball-epoch generation, held where the actuator can refuse locally. The rung
   ladder gates reads; the write gate is missing at transport.
3. **Absence proof.** "The wrong thing was never allowed" is unprovable. A
   rolling tick proves presence, never absence. The provable statement is
   bounded: no gameplay lamp lit more than ε after ball death.

See [/missing/precedence](/missing/precedence) for the full treatment.

## Why it is called what it is

A *wild pinball* is a caller we may or may not trust to activate the lights or
change state. It is the character at the centre of every gate: a thing with
light-reaching authority whose legitimacy must be checked at the write, not
assumed from the address.
