import { Link } from 'react-router-dom'
import { PAGES, SECTIONS } from '../lib/content'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line/80 bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="text-sm font-semibold text-cream">
              isotope<span className="text-pulse">-</span>pinbaal
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              A pinball machine as a chain of 42i isotopes. The chain is the transcript; the
              missing pieces are refusal and precedence.
            </p>
            <p className="mt-4 font-mono text-xs text-muted">
              {PAGES.length} pages · {SECTIONS.length} sections
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {SECTIONS.map((section) => (
              <div key={section.id}>
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  {section.label}
                </p>
                <ul className="mt-3 space-y-2">
                  {PAGES.filter((p) => p.section === section.id)
                    .slice(0, 4)
                    .map((page) => (
                      <li key={page.path}>
                        <Link
                          to={`/${page.section}/${page.slug}`}
                          className="text-sm text-muted transition-colors hover:text-cream"
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-line-soft px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          Built with React, Vite and Tailwind. Motion by{' '}
          <a
            href="https://fancy-ui.rama.app"
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted underline decoration-line underline-offset-4 hover:text-cream"
          >
            fancy-ui
          </a>
          .
        </p>
        <p className="font-mono">
          <a
            href="https://github.com/james-gibson/isotope-pinbaal"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-cream"
          >
            james-gibson/isotope-pinbaal
          </a>{' '}
          · AGPL-3.0
        </p>
      </div>
    </footer>
  )
}
