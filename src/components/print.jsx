// Editorial building blocks shared by every magazine page.
import { useId } from 'react'
import { Link } from 'react-router-dom'

// Photo placeholder: a duotone halftone "print" image standing in for photography.
export function Photo({ label, className = 'aspect-[4/3]', tone = 'navy', motif = 'ball' }) {
  const id = useId()
  const tones = {
    navy: { bg: 'from-navy via-navy-600 to-navy', dot: '#ffffff', stroke: 'rgba(255,255,255,0.35)' },
    green: { bg: 'from-green-700 via-green to-green-700', dot: '#ffffff', stroke: 'rgba(255,255,255,0.4)' },
    paper: { bg: 'from-paper-dark via-[#e2dac8] to-paper-dark', dot: '#00205b', stroke: 'rgba(0,32,91,0.3)' },
  }
  const t = tones[tone]
  return (
    <div role="img" aria-label={label ? `Photograph: ${label}` : 'Photograph'} className={`relative overflow-hidden bg-gradient-to-br ${t.bg} ${className}`}>
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
        <defs>
          <pattern id={`${id}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.1" fill={t.dot} opacity="0.13" />
          </pattern>
          <radialGradient id={`${id}-fade`} cx="70%" cy="35%" r="70%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${id}-dots)`} />
        <rect width="400" height="300" fill={`url(#${id}-fade)`} />
        {motif === 'ball' && (
          <g fill="none" stroke={t.stroke} strokeWidth="2">
            <circle cx="280" cy="120" r="70" />
            <path d="M232 70c26 30 26 70 0 100M328 70c-26 30-26 70 0 100" strokeDasharray="5 6" />
          </g>
        )}
        {motif === 'stumps' && (
          <g stroke={t.stroke} strokeWidth="6" strokeLinecap="round">
            <path d="M170 90v150M200 90v150M230 90v150" />
            <path d="M165 84h35M200 84h35" strokeWidth="4" />
          </g>
        )}
        {motif === 'crowd' && (
          <g fill={t.stroke}>
            {Array.from({ length: 26 }).map((_, i) => (
              <circle key={i} cx={10 + i * 15.5} cy={250 - (i % 3) * 10} r={9 + (i % 4)} />
            ))}
          </g>
        )}
        {motif === 'portrait' && (
          <g fill={t.stroke}>
            <circle cx="200" cy="120" r="48" />
            <path d="M110 300c0-70 40-110 90-110s90 40 90 110z" />
          </g>
        )}
      </svg>
    </div>
  )
}

export function Caption({ children }) {
  return <p className="caption">{children}</p>
}

// Folio line at the top of each spread: section kicker + page number.
export function Folio({ kicker, page }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-ink pb-2">
      <p className="kicker text-green-700">{kicker}</p>
      <p className="kicker text-ink-soft">Page {page}</p>
    </div>
  )
}

// Two-line serif headline; second line in the spot colour.
export function Headline({ top, bottom, as: Tag = 'h1', size = 'text-5xl sm:text-6xl lg:text-7xl' }) {
  return (
    <Tag className={`headline ${size}`}>
      <span className="block text-ink">{top}</span>
      {bottom && <span className="block text-navy">{bottom}</span>}
    </Tag>
  )
}

export function Byline({ children }) {
  return <p className="mt-4 font-serif text-sm italic text-ink-soft">{children}</p>
}

export function PullQuote({ children, cite }) {
  return (
    <figure className="my-8 border-y-2 border-green py-6">
      <blockquote className="font-display text-2xl font-bold italic leading-snug text-navy sm:text-3xl">
        “{children}”
      </blockquote>
      {cite && <figcaption className="kicker mt-3 text-ink-soft">— {cite}</figcaption>}
    </figure>
  )
}

// Boxed sidebar with a solid header bar ("Auction at a Glance").
export function SidebarBox({ title, children }) {
  return (
    <aside className="border-2 border-ink bg-paper">
      <h2 className="kicker bg-navy px-4 py-3 text-center text-[12px] text-paper">{title}</h2>
      <div className="p-5">{children}</div>
    </aside>
  )
}

// "Continued on p.X" style cross-reference link.
export function TurnTo({ to, page, children }) {
  return (
    <Link to={to} className="group inline-flex items-baseline gap-2 font-label text-sm font-bold uppercase tracking-wider text-navy">
      <span className="border-b-2 border-green pb-0.5 group-hover:text-green-700">{children}</span>
      <span className="font-serif text-sm font-normal normal-case italic tracking-normal text-ink-soft">turn to p.{page} →</span>
    </Link>
  )
}

// Ruled editorial table header cell / cells.
export const th = 'kicker border-b-2 border-ink px-3 py-2 text-left text-ink-soft'
export const td = 'border-b border-rule px-3 py-3 align-top'

// Circle headshot with initials.
export function Headshot({ name, size = 'h-12 w-12 text-sm', className = '' }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('')
  return (
    <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-paper ${size} ${className}`}>
      {initials}
    </span>
  )
}
