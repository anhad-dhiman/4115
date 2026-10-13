import { formatDate } from '../../data/season'

// Big magazine "pull number" stat callout.
export function PullNumber({ value, label, accent = false }) {
  return (
    <div>
      <p className={`font-display text-5xl font-black leading-none tracking-tight sm:text-6xl xl:text-7xl ${accent ? 'text-green-700' : 'text-navy'}`}>{value}</p>
      <p className="kicker mt-2 text-ink">{label}</p>
    </div>
  )
}

// One ruled line of the fixture list.
export function FixtureLine({ f }) {
  const won = f.result?.startsWith('Won')
  return (
    <li className="grid grid-cols-[64px_1fr] gap-x-4 gap-y-1 border-b border-rule py-4 sm:grid-cols-[90px_140px_1fr_auto] sm:items-baseline">
      <p className="font-display text-3xl font-black leading-none text-navy">
        {formatDate(f.date, { day: 'numeric' })}
        <span className="kicker block pt-1 text-[10px] text-ink-soft">{formatDate(f.date, { month: 'short' })}</span>
      </p>
      <p className="kicker text-ink-soft sm:order-none">{f.week}</p>
      <p className="col-start-2 font-serif sm:col-start-auto">
        <span className="font-display text-xl font-bold">{f.home ? 'vs' : '@'} {f.opponent}</span>
        <span className="block text-sm italic text-ink-soft">{f.venue}</span>
      </p>
      <p className={`col-start-2 font-label text-sm font-bold uppercase tracking-wide sm:col-start-auto sm:text-right ${f.result ? (won ? 'text-green-700' : 'text-ink-soft') : 'text-ink'}`}>
        {f.result ?? f.time}
      </p>
    </li>
  )
}
