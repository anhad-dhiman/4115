import { useMemo, useState } from 'react'
import Spread from '../../components/Spread'
import { Headline, Byline, Photo, Caption, Headshot, th, td } from '../../components/print'
import { players, roles, getPlayer } from '../../data/players'
import { articles } from '../../data/news'
import { Brief } from './News'

const cols = [
  { key: 'matches', label: 'M' },
  { key: 'runs', label: 'Runs' },
  { key: 'avg', label: 'Avg' },
  { key: 'sr', label: 'SR' },
  { key: 'wickets', label: 'Wkts' },
  { key: 'econ', label: 'Econ' },
]
const fmt = (k, v) => (v == null ? '—' : ['avg', 'sr', 'econ'].includes(k) ? v.toFixed(1) : v)

export default function Players() {
  const [role, setRole] = useState('All')
  const [sort, setSort] = useState('runs')
  const potm = getPlayer('jasprit-bumrah')

  const rows = useMemo(
    () =>
      players
        .filter((p) => role === 'All' || p.role === role)
        .sort((a, b) => (sort === 'econ' ? (a.stats.econ ?? 99) - (b.stats.econ ?? 99) : (b.stats[sort] ?? -1) - (a.stats[sort] ?? -1))),
    [role, sort],
  )

  return (
    <Spread>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <Headline top="The Numbers" bottom="Behind the Names" size="text-4xl sm:text-6xl" />
          <Byline>Every player's position, style and season figures. Choose a column heading to re-rank the list.</Byline>
        </div>
        {/* Player of the month callout */}
        <aside className="border-2 border-ink">
          <p className="kicker bg-green px-4 py-2 text-paper">Player of the Month · September</p>
          <div className="grid grid-cols-[110px_1fr] gap-4 p-4">
            <Photo className="aspect-[3/4]" tone="paper" motif="portrait" label={`Portrait of ${potm.name}`} />
            <div>
              <p className="font-display text-2xl font-bold leading-tight">{potm.name}</p>
              <p className="font-serif text-sm italic text-ink-soft">{potm.bowling}</p>
              <p className="mt-2 font-display text-5xl font-black leading-none text-navy">{potm.stats.wickets}</p>
              <p className="kicker text-ink-soft">Wickets this season</p>
            </div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="index-h" className="mt-12">
        <div className="flex flex-col gap-3 border-b-4 border-ink pb-2 md:flex-row md:items-end md:justify-between">
          <h2 id="index-h" className="headline text-3xl">Player Index</h2>
          <div role="group" aria-label="Filter by role" className="flex flex-wrap gap-x-4 gap-y-1">
            {roles.map((r) => (
              <button key={r} type="button" aria-pressed={role === r} onClick={() => setRole(r)}
                className={`font-label text-xs font-bold uppercase tracking-wider ${role === r ? 'border-b-2 border-green text-ink' : 'text-ink-soft hover:text-ink'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-serif">
            <caption className="sr-only">Player index with season statistics</caption>
            <thead>
              <tr>
                <th scope="col" className={th}>Player</th>
                <th scope="col" className={`${th} hidden md:table-cell`}>Position</th>
                {cols.map((c) => (
                  <th key={c.key} scope="col" className={`${th} text-right`} aria-sort={sort === c.key ? (c.key === 'econ' ? 'ascending' : 'descending') : 'none'}>
                    <button type="button" onClick={() => setSort(c.key)} className={`uppercase ${sort === c.key ? 'text-navy underline decoration-green decoration-2 underline-offset-4' : 'hover:text-ink'}`}>
                      {c.label}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td className={td}>
                    <span className="flex items-center gap-3">
                      <Headshot name={p.name} size="h-9 w-9 text-[11px]" />
                      <span>
                        <span className="block font-semibold">{p.name}</span>
                        <span className="block text-xs italic text-ink-soft">#{p.number} · {p.country}</span>
                      </span>
                    </span>
                  </td>
                  <td className={`${td} hidden text-sm md:table-cell`}>{p.role}<span className="block text-xs italic text-ink-soft">{p.batting}</span></td>
                  {cols.map((c) => (
                    <td key={c.key} className={`${td} text-right tabular-nums ${sort === c.key ? 'font-display text-lg font-bold text-navy' : ''}`}>{fmt(c.key, p.stats[c.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="pnews" className="mt-12 grid gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          <h2 id="pnews" className="headline border-b-4 border-ink pb-2 text-3xl">Player News</h2>
          {articles.filter((a) => a.tag === 'Players').map((a) => <Brief key={a.slug} a={a} />)}
        </div>
        <figure>
          <Photo className="aspect-[4/3]" motif="ball" label="Heinrich Klaasen on his way to a 16-ball fifty" />
          <Caption>Heinrich Klaasen on his way to the fastest fifty in club history.</Caption>
        </figure>
      </section>
    </Spread>
  )
}
