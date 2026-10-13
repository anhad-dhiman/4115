import { useMemo, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import { Avatar, Badge, FilterBar, SectionHeading } from '../../components/ui'
import { players, roles } from '../../data/players'
import { articles } from '../../data/news'
import { ArticleSummary } from './News'

const columns = [
  { key: 'matches', label: 'M' },
  { key: 'runs', label: 'Runs' },
  { key: 'avg', label: 'Avg' },
  { key: 'sr', label: 'SR' },
  { key: 'wickets', label: 'Wkts' },
  { key: 'econ', label: 'Econ' },
]

// Averages, strike rates and economy always show one decimal place.
const fmt = (key, v) => (v == null ? '—' : ['avg', 'sr', 'econ'].includes(key) ? v.toFixed(1) : v)

export default function Players() {
  const [role, setRole] = useState('All')
  const [sort, setSort] = useState({ key: 'runs', dir: 'desc' })

  const rows = useMemo(() => {
    const list = players.filter((p) => role === 'All' || p.role === role)
    return [...list].sort((a, b) => {
      const av = a.stats[sort.key] ?? -1
      const bv = b.stats[sort.key] ?? -1
      return sort.dir === 'desc' ? bv - av : av - bv
    })
  }, [role, sort])

  const toggleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }))

  const playerNews = articles.filter((a) => a.tag === 'Players')

  return (
    <>
      <PageHeader
        title="Players"
        description="Player profiles, positions and season statistics. Select a column heading to sort."
        crumbs={[{ label: 'News', to: '/news' }, { label: 'Players' }]}
      />

      <div className="container-page space-y-12 py-10">
        <section aria-labelledby="player-table">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="player-table" className="text-xl font-bold text-navy sm:text-2xl">Player statistics</h2>
            <FilterBar label="Filter by role" options={roles} value={role} onChange={setRole} />
          </div>
          <div className="card overflow-x-auto">
            <table className="table-base">
              <caption className="sr-only">Player profiles and season statistics</caption>
              <thead>
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col" className="hidden md:table-cell">Role</th>
                  <th scope="col" className="hidden lg:table-cell">Style</th>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className="text-right"
                      aria-sort={sort.key === c.key ? (sort.dir === 'desc' ? 'descending' : 'ascending') : 'none'}
                    >
                      <button type="button" onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-1 uppercase hover:text-navy">
                        {c.label}
                        <span aria-hidden="true" className={sort.key === c.key ? 'text-green-700' : 'opacity-30'}>
                          {sort.key === c.key && sort.dir === 'asc' ? '▲' : '▼'}
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span className="flex items-center gap-3">
                        <Avatar name={p.name} size="h-9 w-9 text-xs" />
                        <span>
                          <span className="block font-semibold text-navy">{p.name}</span>
                          <span className="block text-xs text-muted">#{p.number} · {p.country}</span>
                        </span>
                      </span>
                    </td>
                    <td className="hidden md:table-cell"><Badge tone="navy">{p.role}</Badge></td>
                    <td className="hidden text-xs text-muted lg:table-cell">{p.batting}<br />{p.bowling}</td>
                    {columns.map((c) => (
                      <td key={c.key} className={`text-right tabular-nums ${sort.key === c.key ? 'font-semibold text-navy' : ''}`}>
                        {fmt(c.key, p.stats[c.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="player-news">
          <SectionHeading id="player-news" title="Player news" to="/news" linkLabel="All news" />
          <ul className="grid gap-4 lg:grid-cols-2">
            {playerNews.map((a) => <li key={a.slug}><ArticleSummary a={a} /></li>)}
          </ul>
        </section>
      </div>
    </>
  )
}
