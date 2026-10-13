import { FormPill, Badge } from './ui'
import { formatDate } from '../data/season'

export function StandingsTable({ rows, compact = false }) {
  return (
    <div className="card overflow-x-auto">
      <table className="table-base">
        <caption className="sr-only">Maple Premier League standings</caption>
        <thead>
          <tr>
            <th scope="col" className="w-12">#</th>
            <th scope="col">Team</th>
            <th scope="col" className="text-center">P</th>
            <th scope="col" className="text-center">W</th>
            <th scope="col" className="text-center">L</th>
            {!compact && <th scope="col" className="text-center">NR</th>}
            <th scope="col" className="text-center">NRR</th>
            <th scope="col" className="text-center">Pts</th>
            {!compact && <th scope="col">Last 5</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const us = r.code === 'VAN'
            return (
              <tr key={r.code} className={us ? 'bg-green-50/70 font-semibold' : ''}>
                <td className="text-muted">{r.pos}</td>
                <td className={us ? 'text-navy' : ''}>
                  <span className="hidden sm:inline">{r.team}</span>
                  <span className="sm:hidden">{r.code}</span>
                  {r.pos <= 4 && !compact && <span className="ml-2 align-middle"><Badge tone="green">Playoffs</Badge></span>}
                </td>
                <td className="text-center">{r.p}</td>
                <td className="text-center">{r.w}</td>
                <td className="text-center">{r.l}</td>
                {!compact && <td className="text-center">{r.nr}</td>}
                <td className="text-center tabular-nums">{r.nrr}</td>
                <td className="text-center font-bold text-navy">{r.pts}</td>
                {!compact && (
                  <td>
                    <span className="flex gap-1">{r.form.map((f, i) => <FormPill key={i} r={f} />)}</span>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function FixtureTable({ rows, showResult = true }) {
  return (
    <div className="card overflow-x-auto">
      <table className="table-base">
        <caption className="sr-only">Fixtures</caption>
        <thead>
          <tr>
            <th scope="col">Match</th>
            <th scope="col">Date</th>
            <th scope="col">Opponent</th>
            <th scope="col" className="hidden md:table-cell">Venue</th>
            <th scope="col">{showResult ? 'Result / Time' : 'Time'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((f) => (
            <tr key={f.id}>
              <td className="font-semibold text-navy whitespace-nowrap">{f.week}</td>
              <td className="whitespace-nowrap">{formatDate(f.date)}</td>
              <td>
                <span className="text-muted">{f.home ? 'vs' : '@'}</span> {f.opponent}
              </td>
              <td className="hidden text-muted md:table-cell">{f.venue}</td>
              <td className="whitespace-nowrap">
                {f.result ? (
                  <Badge tone={f.result.startsWith('Won') ? 'green' : f.result.startsWith('Lost') ? 'red' : 'grey'}>{f.result}</Badge>
                ) : (
                  <span className="font-medium">{f.time}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StatTile({ label, value, note }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-3xl font-bold tabular-nums text-navy">{value}</p>
      {note && <p className="mt-1 text-sm text-muted">{note}</p>}
    </div>
  )
}
