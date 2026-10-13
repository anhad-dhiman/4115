import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { contents, issue } from '../data/issue'

// Full-screen "Contents" page — the magazine's site navigation.
export default function Contents({ open, onClose }) {
  const { pathname } = useLocation()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const Entry = ({ item, sub }) => {
    const current = pathname === item.path
    return (
      <li>
        <Link
          to={item.path}
          onClick={onClose}
          aria-current={current ? 'page' : undefined}
          className={`group flex items-baseline gap-3 py-2 ${sub ? 'pl-8 sm:pl-12' : 'border-t border-rule pt-4'}`}
        >
          <span className={`font-display font-black tabular-nums ${sub ? 'w-10 text-lg text-ink-soft' : 'w-12 text-3xl text-green-700'}`}>{item.page}</span>
          <span className={`${sub ? 'font-serif text-lg' : 'font-display text-2xl font-bold uppercase sm:text-3xl'} group-hover:text-navy ${current ? 'text-navy underline decoration-green decoration-2 underline-offset-4' : ''}`}>
            {item.label}
          </span>
          <span aria-hidden="true" className="mx-2 flex-1 translate-y-[-4px] border-b border-dotted border-ink-soft/50" />
          <span className="kicker text-ink-soft">{sub ? 'p.' + item.page : item.coverline ?? 'Front page'}</span>
        </Link>
      </li>
    )
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Contents" className="fixed inset-0 z-50 overflow-y-auto bg-paper">
      <div className="sheet py-8">
        <div className="flex items-start justify-between border-b-4 border-ink pb-4">
          <div>
            <p className="kicker text-ink-soft">{issue.title} · Issue {issue.number} · {issue.season}</p>
            <h2 className="headline mt-2 text-6xl sm:text-7xl">Contents</h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="kicker border-2 border-ink px-4 py-2 hover:bg-ink hover:text-paper">
            Close ✕
          </button>
        </div>
        <ol className="mt-6">
          {contents.map((c) => (
            <li key={c.path}>
              <ol>
                <Entry item={c} />
                {c.children?.map((k) => <Entry key={k.path} item={k} sub />)}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
