---
title: The Pi/ESP split
description: Deployment is hybrid, not a pure config push — and the sync refuses rather than describing what it drops.
order: 3
updated: 2026-11-17
tags: pinballctl, deployment, esp32
---

# The Pi/ESP split

Deployment is genuinely hybrid rather than a pure config push. The flow is
`Browser UI → Pi Services → Bridge → ESP Runtime`, and where a rule executes
depends on what the rule is.

## What runs where

- **Simple hardware-only rules** — no conditions, no multi-input ALL — execute
  locally on the ESP for lowest latency.
- **Rules with conditions, state actions, or Pi-side actions** — audio, media,
  lighting scenes, custom events — are owned by the Pi. Hardware actions are
  then sent back to the ESP as framed JSON and re-checked against arming,
  cooldown and pulse limits.
- **The sync refuses** Pi-owned rules unless the connected firmware advertises
  rules-runtime version 2.

## The split is a projection

This is the projector doctrine, applied to a machine. The ESP blob is a *flat
shadow* of the authored config: it drops conditions, Pi-side actions,
multi-input ALL groups, and scene control. The full truth lives on the Pi; the
ESP holds the shadow that is safe to run at microsecond latency.

Pinballctl does this projection by **prose and refusal** — it says which rules
run where, and it refuses to sync when the runtime is too old.

## What is missing: the loss manifest

What pinballctl lacks is the computed, per-profile **loss manifest** the
projector prints under every style. The sync should emit "this ESP profile
drops: …" — the exact list of conditions, Pi-side actions and scene controls
that did not make it into the shadow — rather than only refusing when the
runtime is too old.

That is a concrete gap with a concrete shape: a projection is safe only when the
person authoring it can see what was thrown away. Refusal is binary; a manifest
is a measure.

## Why it matters to the blockers

The split does not cause the missing mode lifecycle — it is orthogonal to it.
But it is the natural place for two of the missing pieces to land:

- **Epoch-bound actuation** belongs on the ESP, because the ESP is the last
  component that can stop the action. See
  [/missing/epoch-bound-actuation](/missing/epoch-bound-actuation).
- **The drift measure** — how far the running machine has drifted from the
  authored source — is the difference between "accepted" and "refused", and
  today it is binary. A loss manifest is the first step toward a number.
