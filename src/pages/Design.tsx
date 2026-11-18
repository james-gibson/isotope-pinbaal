import type { ReactNode } from 'react'
import {
  BentoGrid,
  BentoGridCard,
  CopyButton,
  GradientButton,
  Marquee,
  RainbowButton,
} from 'fancy-ui-react'
import { MotionBeam, MotionReveal, MotionTicker, useMotion } from '../lib/motion'
import { usePageMeta } from '../lib/usePageMeta'

function Sample({
  title,
  library,
  props,
  note,
  children,
}: {
  title: string
  library: string
  props: string
  note: ReactNode
  children: ReactNode
}) {
  return (
    <section className="border-t border-line-soft py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-cream">{title}</h2>
        <p className="font-mono text-xs text-muted">{library}</p>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{note}</p>
      <p className="mt-3 font-mono text-xs text-pulse">{props}</p>
      <div className="mt-6 rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">{children}</div>
    </section>
  )
}

export function Design() {
  usePageMeta('Design', 'The live design system: every component this site ships, with the props it actually uses.')

  const { mode, auto } = useMotion()
  const still = mode === 'still'

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs tracking-[0.18em] text-pulse uppercase">Design</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        The design system is this page.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Nothing below is a screenshot. Each sample is the same import the rest of the site uses,
        with the same props, rendered by the same bundle.
      </p>

      <p className="mt-3 max-w-2xl text-sm text-muted">
        Motion is provided by{' '}
        <a
          href="https://fancy-ui.rama.app"
          target="_blank"
          rel="noreferrer noopener"
          className="text-pulse underline decoration-pulse/30 underline-offset-4"
        >
          fancy-ui
        </a>
        . Components are used as shipped:{' '}
        <code className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-pulse">
          className
        </code>{' '}
        only appears where the component&apos;s props table declares it.
      </p>

      <div className="mt-8 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
        Motion budget: <span className="font-mono text-cream">{mode}</span> (default{' '}
        <span className="font-mono text-cream">{auto}</span>).
      </div>

      <div className="mt-12">
        <h2 className="text-xs tracking-[0.18em] text-muted uppercase">Palette</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['ink', '#0b0a0b'],
            ['surface', '#121013'],
            ['line', '#2a242a'],
            ['cream', '#d9d3c6'],
            ['muted', '#a49a9e'],
            ['pulse', '#ff2d95'],
            ['violet', '#ffc2dd'],
          ].map(([name, hex]) => (
            <li key={name} className="rounded-xl border border-line bg-surface p-3">
              <span
                className="block h-10 w-full rounded-lg border border-line-soft"
                style={{ backgroundColor: hex }}
              />
              <span className="mt-2 block font-mono text-xs text-cream">{name}</span>
              <span className="block font-mono text-[11px] text-muted">{hex}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14">
        <Sample
          title="BorderBeam"
          library="fancy-ui-react · effects"
          props="colorFrom · colorTo · duration · size · glow"
          note={
            <>
              A comet that rides the border of a card. It fills its nearest positioned parent, so
              the parent is <code className="font-mono text-pulse">relative overflow-hidden</code>.
            </>
          }
        >
          <div className="relative max-w-md overflow-hidden rounded-xl border border-line bg-[#0c0a0c] p-6">
            <MotionBeam colorFrom="#ff2d95" colorTo="#ffc2dd" duration={9} size={180} glow={0.55} />
            <p className="text-sm font-medium text-cream">Ball in play</p>
            <p className="mt-1 text-xs text-muted">epoch 0042 · still lit</p>
          </div>
        </Sample>

        <Sample
          title="RainbowButton"
          library="fancy-ui-react · buttons"
          props="href · speed"
          note="The primary call to action, rendered as an anchor so it survives a hard reload."
        >
          <RainbowButton href="https://fancy-ui.rama.app/docs" speed={2}>
            Read the library docs
          </RainbowButton>
        </Sample>

        <Sample
          title="GradientButton"
          library="fancy-ui-react · buttons"
          props="colors · duration · borderRadius · blur"
          note="The secondary action: a dark face with a beam travelling its border."
        >
          <GradientButton colors={['#ff2d95', '#ffc2dd', '#d9d3c6']} duration={3400} borderRadius={12} blur={5}>
            Fire the flippers
          </GradientButton>
        </Sample>

        <Sample
          title="CopyButton"
          library="fancy-ui-react · actions"
          props="value · label · copiedLabel · size"
          note="Writes to the clipboard and then says so — no toast, no state at the call site."
        >
          <div className="flex flex-wrap items-center gap-4">
            <CopyButton value="npm run build" label="Copy build" size="sm" />
            <CopyButton value="npm run guard" label="Copy guard" size="sm" />
          </div>
        </Sample>

        <Sample
          title="NumberTicker"
          library="fancy-ui-react · text"
          props="value · duration"
          note="Counts up when a stat scrolls into view."
        >
          <p className="font-mono text-3xl text-cream">
            <MotionTicker value={42} />
            <span className="ml-2 text-sm text-muted">the shared origin</span>
          </p>
        </Sample>

        <Sample
          title="Marquee"
          library="fancy-ui-react · layout"
          props="repeat · speed · fade · pauseOnHover"
          note="Pauses on hover and focus — the difference between a flourish and a distraction."
        >
          {still ? (
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {['isotope', 'rotation', 'receipt', 'refusal'].map((word) => (
                <span key={word} className="text-xs tracking-[0.24em] text-muted uppercase">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <Marquee repeat={3} speed={0.7} fade pauseOnHover>
              {['isotope', 'rotation', 'receipt', 'refusal'].map((word) => (
                <span key={word} className="mx-6 text-xs tracking-[0.24em] text-muted uppercase">
                  {word}
                </span>
              ))}
            </Marquee>
          )}
        </Sample>

        <Sample
          title="BentoGrid"
          library="fancy-ui-react · cards"
          props="accent · className"
          note="The section grid on the homepage. Tiles fade up on first scroll."
        >
          <BentoGrid accent="#ffc2dd" className="w-full">
            <BentoGridCard
              name="Refusal"
              description="A write the machine can decline before it lands."
              href="https://fancy-ui.rama.app/docs/components/bento-grid"
              cta="Docs"
              icon={<span className="font-mono text-xs text-violet">01</span>}
            />
            <BentoGridCard
              name="Precedence"
              description="A partial order, totalised only at arbitration."
              href="https://fancy-ui.rama.app/docs/components/bento-grid"
              cta="Docs"
              icon={<span className="font-mono text-xs text-violet">02</span>}
            />
          </BentoGrid>
        </Sample>

        <Sample
          title="Reveal"
          library="fancy-ui-react · effects"
          props="preset · delay · duration · once"
          note="Every section on the homepage enters this way, and it respects reduced motion."
        >
          <MotionReveal
            preset="fade-up"
            delay={120}
            className="rounded-xl border border-line bg-surface p-5"
          >
            <p className="text-sm text-muted">
              This block faded up once, when it entered the viewport, and will not animate again.
            </p>
          </MotionReveal>
        </Sample>
      </div>
    </div>
  )
}
