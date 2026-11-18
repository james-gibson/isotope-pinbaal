import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * File mode: show the source file instead of the hosted page.
 *
 * The site loads every page as raw text anyway — that string is how the
 * navigation, the table of contents and the previous/next links are built. This
 * mode stops before the parsing and prints the string, frontmatter and all,
 * which is the only honest answer to "what is this, really?"
 */
export type View = 'page' | 'file'

const STORAGE_KEY = 'isotope-pinbaal.view'

type FileViewState = {
  view: View
  setView: (view: View) => void
}

const FileViewContext = createContext<FileViewState | null>(null)

export function FileViewProvider({ children }: { children: ReactNode }) {
  const [explicit, setExplicit] = useState<View | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'file' || stored === 'page' ? stored : null
  })

  const view: View = explicit ?? 'page'

  const setView = useCallback((next: View) => {
    setExplicit(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage disabled: the choice applies to this session only.
    }
  }, [])

  const value = useMemo(() => ({ view, setView }), [view, setView])
  return <FileViewContext.Provider value={value}>{children}</FileViewContext.Provider>
}

export function useFileView(): FileViewState {
  const state = useContext(FileViewContext)
  if (!state) throw new Error('useFileView must be used inside <FileViewProvider>')
  return state
}

/** Use inside a component that must re-render on view changes. */
export function useIsFileView(): boolean {
  return useFileView().view === 'file'
}

// Keeps the module honest about its one effect on the document.
export function useFileViewDocumentFlag(): void {
  const { view } = useFileView()
  useEffect(() => {
    document.documentElement.dataset.view = view
  }, [view])
}
