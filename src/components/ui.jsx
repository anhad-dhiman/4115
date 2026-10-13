import { useId } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'

// Image placeholder — stands in for photography in the prototype.
export function Placeholder({ label, icon = 'image', className = 'aspect-[4/3]', tone = 'navy' }) {
  const patternId = useId()
  const bg =
    tone === 'green'
      ? 'from-green-700 to-green'
      : tone === 'grey'
        ? 'from-slate-300 to-slate-200 text-slate-500'
        : 'from-navy to-navy-600'
  return (
    <div
      role="img"
      aria-label={label ? `Photo: ${label}` : 'Photo placeholder'}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${bg} ${tone === 'grey' ? '' : 'text-white/70'} ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden="true">
        <defs>
          <pattern id={patternId} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <Icon name={icon} className="relative h-10 w-10" />
    </div>
  )
}

export function Avatar({ name, size = 'h-14 w-14 text-lg', tone = 'navy' }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('')
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold ${
        tone === 'green' ? 'bg-green-50 text-green-700' : 'bg-navy-50 text-navy'
      } ${size}`}
    >
      {initials}
    </span>
  )
}

export function Badge({ children, tone = 'grey' }) {
  const tones = {
    grey: 'bg-surface text-muted border-line',
    green: 'bg-green-50 text-green-700 border-green/20',
    navy: 'bg-navy-50 text-navy border-navy/15',
    red: 'bg-red-50 text-red-700 border-red-200',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function SectionHeading({ title, to, linkLabel = 'View all', id }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 id={id} className="text-xl font-bold text-navy sm:text-2xl">{title}</h2>
      {to && (
        <Link to={to} className="link inline-flex shrink-0 items-center gap-1 text-sm">
          {linkLabel} <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

// Route-based tabs (each tab is a real page/URL).
export function TabLinks({ tabs, label }) {
  return (
    <nav aria-label={label} className="border-b border-line bg-white">
      <ul className="container-page flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <li key={t.to}>
            <NavLink
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `inline-block whitespace-nowrap border-b-[3px] px-4 py-3.5 text-sm font-semibold transition-colors ${
                  isActive ? 'border-green text-navy' : 'border-transparent text-muted hover:text-navy'
                }`
              }
            >
              {t.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Button-based filter (state on the same page).
export function FilterBar({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            value === o ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-navy'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function FormPill({ r }) {
  const tone = r === 'W' ? 'bg-green text-white' : r === 'L' ? 'bg-red-600 text-white' : 'bg-slate-300 text-ink'
  const label = r === 'W' ? 'Win' : r === 'L' ? 'Loss' : 'No result'
  return (
    <span title={label} className={`inline-flex h-6 w-6 items-center justify-center rounded text-[11px] font-bold ${tone}`}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{r}</span>
    </span>
  )
}
