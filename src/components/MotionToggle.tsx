import { ToggleGroup, ToggleGroupItem } from 'fancy-ui-react'
import { useMotion, type MotionMode } from '../lib/motion'

const OPTIONS: { value: MotionMode; label: string; title: string }[] = [
  { value: 'still', label: 'Still', title: 'No ambient motion' },
  { value: 'calm', label: 'Calm', title: 'Reveals and counting numbers, no loops' },
  { value: 'full', label: 'Full', title: 'Everything the design calls for' },
]

/**
 * A stored motion preference, defaulting to the calm budget outside /design.
 * fancy-ui's own ToggleGroup, because a control for the design system should be
 * part of the design system.
 */
export function MotionToggle() {
  const { mode, auto, setMode, reduced } = useMotion()

  return (
    <div className="flex items-center gap-2">
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(next) => {
          if (typeof next === 'string' && next) setMode(next as MotionMode)
        }}
        size="sm"
        label="Motion preference"
        disabled={reduced}
      >
        {OPTIONS.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} label={option.title}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <span className="hidden font-mono text-[10px] text-muted xl:inline" aria-live="polite">
        {reduced ? 'os: reduced' : `motion: ${auto}`}
      </span>
    </div>
  )
}
