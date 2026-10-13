import Spread from '../../components/Spread'
import { Headline, Byline, Headshot } from '../../components/print'
import { players } from '../../data/players'
import { teamStats } from '../../data/season'
import { PullNumber } from './shared'

const ranked = (stat, { asc = false, min = () => true } = {}) =>
  players.filter((p) => p.stats[stat] != null && min(p)).sort((a, b) => (asc ? a.stats[stat] - b.stats[stat] : b.stats[stat] - a.stats[stat]))

function Leaderboard({ title, stat, rows, unit }) {
  const max = Math.max(...rows.map((p) => p.stats[stat]))
  return (
    <section aria-label={title}>
      <h3 className="headline border-b-4 border-ink pb-2 text-2xl">{title}</h3>
      <ol>
        {rows.slice(0, 5).map((p, i) => (
          <li key={p.id} className="grid grid-cols-[28px_36px_1fr_auto] items-center gap-3 border-b border-rule py-3">
            <span className="font-display text-xl font-black text-ink-soft">{i + 1}</span>
            <Headshot name={p.name} size="h-9 w-9 text-[11px]" />
            <span>
              <span className="block font-serif font-semibold">{p.name}</span>
              <span className="mt-1 block h-1.5 bg-paper-dark" aria-hidden="true">
                <span className={`block h-full ${i === 0 ? 'bg-green' : 'bg-navy'}`} style={{ width: `${(p.stats[stat] / max) * 100}%` }} />
              </span>
            </span>
            <span className="text-right">
              <span className="block font-display text-2xl font-black tabular-nums text-navy">{stat === 'runs' || stat === 'wickets' ? p.stats[stat] : p.stats[stat].toFixed(1)}</span>
              <span className="kicker block text-[9px] text-ink-soft">{unit}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function Stats() {
  const runs = ranked('runs')
  const wkts = ranked('wickets')
  const sr = ranked('sr', { min: (p) => p.stats.runs >= 150 })
  const econ = ranked('econ', { asc: true, min: (p) => p.stats.wickets >= 8 })

  return (
    <Spread>
      <div className="mt-8">
        <Headline top="By the" bottom="Numbers" />
        <Byline>Who's scoring, who's taking wickets, and how the team measures up.</Byline>
      </div>

      <section aria-label="Season leaders" className="mt-10 grid grid-cols-2 gap-8 border-y-2 border-ink py-10 lg:grid-cols-4">
        {[
          [runs[0], 'runs', 'Most runs'],
          [wkts[0], 'wickets', 'Most wickets'],
          [sr[0], 'sr', 'Best strike rate'],
          [econ[0], 'econ', 'Best economy'],
        ].map(([p, k, label], i) => (
          <div key={k}>
            <PullNumber value={k === 'sr' || k === 'econ' ? p.stats[k].toFixed(1) : p.stats[k]} label={label} accent={i === 0} />
            <p className="mt-1 font-serif italic text-ink-soft">{p.name}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="team-h" className="mt-10">
        <h2 id="team-h" className="kicker text-ink-soft">The team</h2>
        <dl className="mt-3 grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-6">
          {teamStats.map((s) => (
            <div key={s.label} className="border-t border-ink py-3">
              <dd className="font-display text-3xl font-black text-navy">{s.value}</dd>
              <dt className="font-serif text-sm">{s.label}{s.note && <span className="block text-xs italic text-ink-soft">{s.note}</span>}</dt>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <Leaderboard title="Most Runs" stat="runs" rows={runs} unit="Runs" />
        <Leaderboard title="Most Wickets" stat="wickets" rows={wkts} unit="Wkts" />
        <Leaderboard title="Strike Rate (150+ runs)" stat="sr" rows={sr} unit="SR" />
        <Leaderboard title="Economy (8+ wickets)" stat="econ" rows={econ} unit="Econ" />
      </div>
    </Spread>
  )
}
