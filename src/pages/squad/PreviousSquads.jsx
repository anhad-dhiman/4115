import { useState } from 'react'
import { Avatar, Badge } from '../../components/ui'
import { previousSquads } from '../../data/players'

export default function PreviousSquads() {
  const [season, setSeason] = useState(previousSquads[0].season)
  const squad = previousSquads.find((s) => s.season === season)

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
      {/* Season picker */}
      <aside>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted" id="season-list">Season</h2>
        <ul aria-labelledby="season-list" className="flex gap-2 lg:flex-col">
          {previousSquads.map((s) => (
            <li key={s.season}>
              <button
                type="button"
                aria-pressed={season === s.season}
                onClick={() => setSeason(s.season)}
                className={`flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-sm transition-colors ${
                  season === s.season ? 'border-navy bg-navy text-white' : 'border-line bg-white hover:border-navy'
                }`}
              >
                <span className="font-semibold">{s.season}</span>
                <span className={`hidden text-xs sm:inline ${season === s.season ? 'text-white/80' : 'text-muted'}`}>{s.finish}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section aria-labelledby="squad-title">
        <div className="card mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 p-5">
          <h2 id="squad-title" className="text-xl font-bold text-navy">{squad.season} squad</h2>
          <p className="text-sm"><span className="text-muted">Finish:</span> <Badge tone={squad.finish === 'Champions' ? 'green' : 'navy'}>{squad.finish}</Badge></p>
          <p className="text-sm"><span className="text-muted">Captain:</span> <strong>{squad.captain}</strong></p>
          <p className="text-sm"><span className="text-muted">Head coach:</span> <strong>{squad.coach}</strong></p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {squad.players.map((p) => (
            <li key={p.name} className="card flex items-center gap-4 p-4">
              <Avatar name={p.name} size="h-12 w-12 text-base" />
              <div>
                <p className="font-semibold text-navy">
                  {p.name}
                  {p.name === squad.captain && <span className="ml-1 text-xs font-bold text-green-700">(C)</span>}
                </p>
                <p className="text-sm text-muted">{p.role} · {p.country}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
