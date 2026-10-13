import { Avatar, SectionHeading } from '../../components/ui'
import { StatTile } from '../../components/season'
import { players } from '../../data/players'
import { teamStats } from '../../data/season'

const labels = {
  runs: 'Runs', wickets: 'Wickets', sr: 'Strike rate', econ: 'Economy', avg: 'Average',
}

// Ranked table of players by a stat. Used here and on the Season overview.
export function TopTable({ title, stat, limit = 5, ascending = false, filter = () => true }) {
  const rows = players
    .filter((p) => p.stats[stat] != null && filter(p))
    .sort((a, b) => (ascending ? a.stats[stat] - b.stats[stat] : b.stats[stat] - a.stats[stat]))
    .slice(0, limit)

  return (
    <div className="card overflow-hidden">
      <h3 className="border-b border-line bg-surface px-4 py-3 text-sm font-semibold text-navy">{title}</h3>
      <ol>
        {rows.map((p, i) => (
          <li key={p.id} className="flex items-center gap-3 border-t border-line px-4 py-3 first:border-t-0">
            <span className={`w-5 text-sm font-bold ${i === 0 ? 'text-green-700' : 'text-muted'}`}>{i + 1}</span>
            <Avatar name={p.name} size="h-9 w-9 text-xs" />
            <span className="flex-1">
              <span className="block text-sm font-semibold">{p.name}</span>
              <span className="block text-xs text-muted">{p.role}</span>
            </span>
            <span className="text-right">
              <span className="block text-lg font-bold tabular-nums text-navy">{p.stats[stat]}</span>
              <span className="block text-[11px] uppercase tracking-wide text-muted">{labels[stat]}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Stats() {
  return (
    <div className="container-page space-y-12 py-10">
      <section aria-labelledby="team-stats">
        <SectionHeading id="team-stats" title="Team statistics" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamStats.map((s) => <StatTile key={s.label} {...s} />)}
        </div>
      </section>

      <section aria-labelledby="batting">
        <SectionHeading id="batting" title="Batting leaders" />
        <div className="grid gap-5 md:grid-cols-2">
          <TopTable title="Most runs" stat="runs" />
          <TopTable title="Best strike rate (min. 150 runs)" stat="sr" filter={(p) => p.stats.runs >= 150} />
        </div>
      </section>

      <section aria-labelledby="bowling">
        <SectionHeading id="bowling" title="Bowling leaders" />
        <div className="grid gap-5 md:grid-cols-2">
          <TopTable title="Most wickets" stat="wickets" />
          <TopTable title="Best economy (min. 8 wickets)" stat="econ" ascending filter={(p) => p.stats.wickets >= 8} />
        </div>
      </section>
    </div>
  )
}
