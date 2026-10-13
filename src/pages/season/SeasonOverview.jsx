import { SectionHeading } from '../../components/ui'
import { StandingsTable, FixtureTable, StatTile } from '../../components/season'
import { standings, seasonSummary, upcomingFixtures } from '../../data/season'
import { TopTable } from './Stats'

// Each section previews a child page and links through to the full version.
export default function SeasonOverview() {
  return (
    <div className="container-page space-y-12 py-10">
      <section aria-label="Season summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {seasonSummary.map((s) => <StatTile key={s.label} {...s} />)}
      </section>

      <section aria-labelledby="sec-standing">
        <SectionHeading id="sec-standing" title="Standing" to="/season/standing" linkLabel="Full table" />
        <StandingsTable rows={standings.slice(0, 4)} compact />
      </section>

      <section aria-labelledby="sec-stats">
        <SectionHeading id="sec-stats" title="Stats" to="/season/stats" linkLabel="All stats" />
        <div className="grid gap-5 md:grid-cols-2">
          <TopTable title="Top run scorers" stat="runs" limit={3} />
          <TopTable title="Top wicket takers" stat="wickets" limit={3} />
        </div>
      </section>

      <section aria-labelledby="sec-fixtures">
        <SectionHeading id="sec-fixtures" title="Upcoming fixtures" to="/season/fixtures" linkLabel="All fixtures" />
        <FixtureTable rows={upcomingFixtures.slice(0, 3)} showResult={false} />
      </section>
    </div>
  )
}
