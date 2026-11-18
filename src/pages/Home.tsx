import { Link } from 'react-router-dom'
import {
  BentoGrid,
  BentoGridCard,
  CopyButton,
  GradientButton,
  Marquee,
  RainbowButton,
} from 'fancy-ui-react'
import { PAGES, SECTIONS, pagesIn } from '../lib/content'
import { MotionBeam, MotionReveal, MotionTicker, useMotion } from '../lib/motion'
import { usePageMeta } from '../lib/usePageMeta'

const base = import.meta.env.BASE_URL
const QUESTION =
  'A pinball machine is a chain of 42i isotopes. The chain is the transcript. Where do refusal and precedence live?'

export function Home() {
  usePageMeta(
    undefined,
    'A chain of 42i isotopes is a transcript, not a state machine. The blockers pinballctl records, what each repository supplies, and the pieces nobody ships.',
  )
  const { mode } = useMotion()
  const still = mode === 'still'
  const full = mode === 'full'

  const facts = [
    { k: 'Pages', v: PAGES.length },
    { k: 'Sections', v: SECTIONS.length },
    { k: 'Missing pieces', v: 3 },
  ]

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="plot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <MotionReveal preset="fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs tracking-wide text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-pulse" />
                a pinball machine, decomposed
              </p>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={60}>
              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-cream sm:text-6xl">
                A chain of 42i isotopes is a transcript,
                <br />
                not a <span className="text-pulse">state machine</span>.
              </h1>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={120}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                The transcript you can build today. Pinballctl records its blockers in
                machine-readable fields; local-time, isotope, le.go and the lab each supply a piece.
                What nobody ships is the part that makes it a machine — refusal, and precedence.
              </p>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {full ? (
                  <RainbowButton href={`${base}question/the-wild-pinball`}>
                    The question<span className="sr-only"> — the wild pinball</span>
                  </RainbowButton>
                ) : (
                  <GradientButton colors={['#ff2d95', '#ffc2dd', '#d9d3c6']} duration={3400} borderRadius={12} blur={5}>
                    The question
                  </GradientButton>
                )}
                <Link
                  to="/missing/precedence"
                  className="text-sm text-muted underline decoration-line underline-offset-4 hover:text-cream"
                >
                  the missing pieces
                </Link>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal preset="fade-up" delay={140}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/90 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
              <MotionBeam colorFrom="#ff2d95" colorTo="#ffc2dd" duration={11} size={220} glow={0.5} />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">The question</p>
                <CopyButton value={QUESTION} label="Copy" copiedLabel="Copied" size="sm" />
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-line-soft bg-[#0c0a0c] p-4 font-mono text-[13px] leading-6 text-cream/90">
                <code>{QUESTION}</code>
              </pre>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pulse" />
                  The chain is a ledger: it accepts what it is handed.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pulse" />
                  Refusal is a guard: it declines a successor before the append.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                  Precedence is an arbiter: a partial order, totalised once.
                </li>
              </ul>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="border-b border-line/70 bg-surface/30">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-3 gap-6 px-5 py-10 sm:px-8">
          {facts.map((fact) => (
            <div key={fact.k}>
              <p className="font-mono text-3xl font-semibold text-cream sm:text-4xl">
                <MotionTicker value={fact.v} />
              </p>
              <p className="mt-1 text-xs tracking-[0.14em] text-muted uppercase">{fact.k}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
              Four sections, one argument
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              The question, the blockers pinballctl records, the gates each repository supplies,
              and the pieces nobody ships.
            </p>
          </div>
        </div>

        <MotionReveal preset="fade-up" className="mt-8">
          <BentoGrid accent="#ff2d95" className="w-full" reveal={!still}>
            {SECTIONS.map((section) => (
              <BentoGridCard
                key={section.id}
                name={section.label}
                description={section.blurb}
                href={`${base}${section.id}`}
                cta={`${pagesIn(section.id).length} pages`}
                icon={<span className="font-mono text-xs text-pulse">{section.id}</span>}
              />
            ))}
          </BentoGrid>
        </MotionReveal>
      </section>

      <section className="overflow-hidden border-y border-line/70 bg-surface/40 py-6">
        {still ? (
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {['isotope', 'rotation', 'receipt', 'refusal', 'precedence'].map((phrase) => (
              <span key={phrase} className="text-xs tracking-[0.24em] text-muted uppercase">
                {phrase}
              </span>
            ))}
          </div>
        ) : (
          <Marquee repeat={3} speed={0.8} fade pauseOnHover>
            {['isotope', 'rotation', 'receipt', 'refusal', 'precedence'].map((phrase) => (
              <span key={phrase} className="mx-7 text-xs tracking-[0.24em] text-muted uppercase">
                {phrase}
              </span>
            ))}
          </Marquee>
        )}
      </section>
    </>
  )
}
