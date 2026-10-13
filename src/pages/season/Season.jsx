import Spread from '../../components/Spread'
import { Headline, TurnTo } from '../../components/print'
import { standings, upcomingFixtures, seasonSummary } from '../../data/season'
import { players } from '../../data/players'
import { club } from '../../data/club'
import { PullNumber, FixtureLine } from './shared'

const leader = (stat) => [...players].sort((a, b) => b.stats[stat] - a.stats[stat])[0]

export default function Season() {
  const us = standings.find((s) => s.code === 'VAN')
  const topRuns = leader('runs')
  const topWkts = leader('wickets')

  return (
    <Spread>
      <div className="mt-8">
        <Headline top="Standings, Stats" bottom="& Fixtures" />
        <p className="deck mt-3">A statistical look at the {club.season} {club.league} season so far.</p>
      </div>

      {/* Oversized pull-numbers */}
      <section aria-label="Season in numbers" className="mt-10 grid grid-cols-2 gap-8 border-b-2 border-ink pb-10 md:grid-cols-4">
        <PullNumber value={seasonSummary[0].value} label="League standing" accent />
        <PullNumber value={us.pts} label="Points this season" />
        <PullNumber value={us.nrr} label="Net run rate" />
        <PullNumber value={`${us.w}–${us.l}`} label="Won – lost" />
      </section>

      <div className="mt-10 grid gap-12 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-rule">
        {/* Standing preview */}
        <section aria-labelledby="p-standing" className="lg:pr-8">
          <h2 id="p-standing" className="headline border-b-4 border-ink pb-2 text-2xl">The Table</h2>
          <ol className="font-serif">
            {standings.slice(0, 4).map((r) => (
              <li key={r.code} className={`flex items-baseline gap-3 border-b border-rule py-3 ${r.code === 'VAN' ? 'font-semibold text-navy' : ''}`}>
                <span className="w-6 font-display text-2xl font-black">{r.pos}</span>
                <span className="flex-1">{r.team}</span>
                <span className="tabular-nums">{r.pts} pts</span>
              </li>
            ))}
          </ol>
          <div className="mt-4"><TurnTo to="/season/standing" page="6.1">Full standing</TurnTo></div>
        </section>

        {/* Stats preview */}
        <section aria-labelledby="p-stats" className="lg:px-8">
          <h2 id="p-stats" className="headline border-b-4 border-ink pb-2 text-2xl">The Leaders</h2>
          <dl className="divide-y divide-rule">
            {[[topRuns, 'runs', 'Most runs'], [topWkts, 'wickets', 'Most wickets']].map(([p, k, label]) => (
              <div key={k} className="py-4">
                <dt className="kicker text-ink-soft">{label}</dt>
                <dd className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="font-display text-xl font-bold">{p.name}</span>
                  <span className="font-display text-4xl font-black text-green-700">{p.stats[k]}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-4"><TurnTo to="/season/stats" page="6.2">All stats</TurnTo></div>
        </section>

        {/* Fixtures preview */}
        <section aria-labelledby="p-fixtures" className="lg:pl-8">
          <h2 id="p-fixtures" className="headline border-b-4 border-ink pb-2 text-2xl">Coming Up</h2>
          <ul>
            {upcomingFixtures.slice(0, 3).map((f) => (
              <li key={f.id} className="border-b border-rule py-3 font-serif">
                <p className="kicker text-green-700">{f.week}</p>
                <p className="font-display text-lg font-bold">{f.home ? 'vs' : '@'} {f.opponent}</p>
                <p className="text-sm italic text-ink-soft">{new Date(f.date + 'T12:00').toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })} · {f.time}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4"><TurnTo to="/season/fixtures" page="6.3">All fixtures</TurnTo></div>
        </section>
      </div>

      <section aria-labelledby="next-h" className="mt-14">
        <h2 id="next-h" className="headline border-b-4 border-ink pb-2 text-3xl">Upcoming Fixtures</h2>
        <ul>{upcomingFixtures.map((f) => <FixtureLine key={f.id} f={f} />)}</ul>
      </section>
    </Spread>
  )
}
