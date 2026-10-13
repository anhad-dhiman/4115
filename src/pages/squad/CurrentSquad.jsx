import { useState } from 'react'
import { Avatar, Badge, FilterBar } from '../../components/ui'
import { players, roles } from '../../data/players'

export function PlayerCard({ p }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative flex items-center justify-center bg-gradient-to-br from-navy to-navy-600 py-8">
        <Avatar name={p.name} size="h-20 w-20 text-2xl" tone="green" />
        <span className="absolute left-4 top-3 text-3xl font-extrabold text-white/20" aria-hidden="true">{p.number}</span>
        {(p.captain || p.viceCaptain) && (
          <span className="absolute right-3 top-3 rounded bg-green px-2 py-0.5 text-[11px] font-bold text-white">
            {p.captain ? 'C' : 'VC'}
            <span className="sr-only">{p.captain ? ' (captain)' : ' (vice-captain)'}</span>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-navy">{p.name}</h3>
        <p className="text-sm text-muted">#{p.number} · {p.country}</p>
        <div className="mt-3"><Badge tone="navy">{p.role}</Badge></div>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center text-xs">
          <div><dt className="text-muted">M</dt><dd className="font-semibold">{p.stats.matches}</dd></div>
          <div><dt className="text-muted">Runs</dt><dd className="font-semibold">{p.stats.runs}</dd></div>
          <div><dt className="text-muted">Wkts</dt><dd className="font-semibold">{p.stats.wickets}</dd></div>
        </dl>
      </div>
    </article>
  )
}

export default function CurrentSquad() {
  const [role, setRole] = useState('All')
  const list = players.filter((p) => role === 'All' || p.role === role)

  return (
    <div className="container-page py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterBar label="Filter by role" options={roles} value={role} onChange={setRole} />
        <p className="text-sm text-muted" aria-live="polite">Showing {list.length} of {players.length} players</p>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => <li key={p.id}><PlayerCard p={p} /></li>)}
      </ul>
    </div>
  )
}
