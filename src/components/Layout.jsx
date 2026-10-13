import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Contents from './Contents'
import { ContentsContext } from './contentsContext'
import { issue, readingOrder, pageFor, parentOf } from '../data/issue'
import { club } from '../data/club'

// Running head on every inner page: magazine name, issue line, contents button.
function RunningHead({ onContents }) {
  const { pathname } = useLocation()
  const page = pageFor(pathname)
  const parent = parentOf(pathname)
  return (
    <header className="sticky top-0 z-40 border-b-4 border-double border-ink bg-paper/95 backdrop-blur">
      <div className="sheet flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-display text-3xl font-black tracking-tight text-navy" aria-label="Vikings magazine — back to cover">
          {issue.title}
        </Link>
        <nav aria-label="You are here" className="hidden min-w-0 flex-1 justify-center md:flex">
          <ol className="kicker flex items-center gap-2 truncate text-ink-soft">
            <li><Link to="/" className="hover:text-navy">Cover</Link></li>
            {parent && (<><li aria-hidden="true">/</li><li><Link to={parent.path} className="hover:text-navy">{parent.label}</Link></li></>)}
            {(page ? page.path !== '/' : true) && (<><li aria-hidden="true">/</li><li aria-current="page" className="text-ink">{page ? page.label : parent ? 'Article' : 'Page not found'}</li></>)}
          </ol>
        </nav>
        <button type="button" onClick={onContents} className="kicker flex items-center gap-2 border-2 border-ink px-3 py-2 hover:bg-ink hover:text-paper" aria-haspopup="dialog">
          <span aria-hidden="true" className="text-base leading-none">☰</span> Contents
        </button>
      </div>
    </header>
  )
}

// Previous / next page controls — "flipping" through the issue.
function PageTurn() {
  const { pathname } = useLocation()
  const page = pageFor(pathname)
  if (!page) return null
  const i = readingOrder.indexOf(page)
  const prev = readingOrder[i - 1]
  const next = readingOrder[i + 1]
  return (
    <nav aria-label="Turn the page" className="sheet mt-16">
      <div className="grid grid-cols-2 border-y-2 border-ink">
        {prev ? (
          <Link to={prev.path} className="group py-5 pr-4">
            <span className="kicker text-ink-soft">← Previous · p.{prev.page}</span>
            <span className="mt-1 block font-display text-xl font-bold group-hover:text-navy sm:text-2xl">{prev.label}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={next.path} className="group border-l border-rule py-5 pl-4 text-right">
            <span className="kicker text-ink-soft">Next · p.{next.page} →</span>
            <span className="mt-1 block font-display text-xl font-bold group-hover:text-navy sm:text-2xl">{next.label}</span>
          </Link>
        ) : (
          <Link to="/" className="group border-l border-rule py-5 pl-4 text-right">
            <span className="kicker text-ink-soft">End of issue</span>
            <span className="mt-1 block font-display text-xl font-bold group-hover:text-navy sm:text-2xl">Back to the cover</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

function Colophon({ onContents }) {
  return (
    <footer className="mt-12 bg-ink text-paper/80">
      <div className="sheet grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl font-black text-paper">{issue.title}</p>
          <p className="mt-2 font-serif italic">{issue.subtitle} of the {club.name}.</p>
          <button type="button" onClick={onContents} className="kicker mt-5 border border-paper/60 px-3 py-2 text-paper hover:bg-paper hover:text-ink">
            Open contents
          </button>
        </div>
        <div className="font-serif text-sm">
          <p className="kicker mb-3 text-paper">Colophon</p>
          <p>Published by the {club.name}, {club.homeGround}.</p>
          <p className="mt-2">Editorial: {club.email}</p>
          <p>Telephone: {club.phone}</p>
        </div>
        <div className="font-serif text-sm">
          <p className="kicker mb-3 text-paper">Follow</p>
          <ul className="space-y-1">
            {['Instagram', 'X', 'YouTube', 'Facebook'].map((s) => <li key={s}><a href="#" className="hover:text-paper hover:underline">{s}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <p className="sheet py-4 text-xs">
          © {new Date().getFullYear()} {club.name} · Issue {issue.number} · A fictional club built for a course project.
        </p>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const [contentsOpen, setContentsOpen] = useState(false)
  const openContents = useCallback(() => setContentsOpen(true), [])
  const closeContents = useCallback(() => setContentsOpen(false), [])
  const isCover = pathname === '/'

  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      {!isCover && <RunningHead onContents={openContents} />}
      <main id="main" className="flex-1">
        <ContentsContext.Provider value={openContents}>
          <Outlet />
        </ContentsContext.Provider>
        {!isCover && <PageTurn />}
      </main>
      <Colophon onContents={openContents} />
      <Contents open={contentsOpen} onClose={closeContents} />
    </div>
  )
}
