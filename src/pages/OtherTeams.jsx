import PageHeader from '../components/PageHeader'
import { otherTeams } from '../data/teams'
import { standings } from '../data/season'

export default function OtherTeams() {
  return (
    <>
      <PageHeader
        title="Other Teams"
        description="Every rival in the Maple Premier League, with the Vikings' head-to-head record against each."
        crumbs={[{ label: 'Other Teams' }]}
      />

      <div className="container-page py-10">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherTeams.map((t) => {
            const pos = standings.find((s) => s.code === t.code)?.pos
            const pct = Math.round((t.h2h.won / t.h2h.played) * 100)
            return (
              <li key={t.id} className="card flex flex-col p-6">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-sm font-extrabold text-white"
                    style={{ backgroundColor: t.color }}
                    aria-hidden="true"
                  >
                    {t.code}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-navy">{t.name}</h2>
                    <p className="text-sm text-muted">{t.city} · Est. {t.founded}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm text-muted">{t.summary}</p>
                <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
                  <div>
                    <dt className="text-xs text-muted">League pos.</dt>
                    <dd className="text-lg font-bold text-navy">{pos}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">H2H (W–L)</dt>
                    <dd className="text-lg font-bold text-navy">{t.h2h.won}–{t.h2h.lost}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Coach</dt>
                    <dd className="truncate text-sm font-semibold text-navy" title={t.coach}>{t.coach}</dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted">
                    <span>Vikings win rate</span><span className="font-semibold text-ink">{pct}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface" role="presentation">
                    <div className="h-full rounded-full bg-green" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
