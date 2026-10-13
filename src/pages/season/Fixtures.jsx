import { useState } from 'react'
import { FilterBar } from '../../components/ui'
import { FixtureTable } from '../../components/season'
import { fixtures, upcomingFixtures, results } from '../../data/season'

const views = { All: fixtures, Upcoming: upcomingFixtures, Results: results }

export default function Fixtures() {
  const [view, setView] = useState('Upcoming')
  const rows = views[view]
  const wins = results.filter((r) => r.result.startsWith('Won')).length

  return (
    <div className="container-page py-10">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterBar label="Show fixtures" options={Object.keys(views)} value={view} onChange={setView} />
        <p className="text-sm text-muted">
          {results.length} played · {wins} won · {upcomingFixtures.length} to play
        </p>
      </div>
      <FixtureTable rows={rows} />
      <p className="mt-4 text-sm text-muted">All times Pacific. "vs" = home match, "@" = away match.</p>
    </div>
  )
}
