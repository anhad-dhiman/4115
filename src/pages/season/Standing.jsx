import { StandingsTable } from '../../components/season'
import { FormPill } from '../../components/ui'
import { standings } from '../../data/season'

export default function Standing() {
  return (
    <div className="container-page space-y-6 py-10">
      <StandingsTable rows={standings} />
      <div className="card flex flex-col gap-3 p-5 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
        <span><strong className="text-ink">P</strong> Played</span>
        <span><strong className="text-ink">W</strong> Won</span>
        <span><strong className="text-ink">L</strong> Lost</span>
        <span><strong className="text-ink">NR</strong> No result</span>
        <span><strong className="text-ink">NRR</strong> Net run rate</span>
        <span><strong className="text-ink">Pts</strong> 2 per win, 1 per no result</span>
        <span className="flex items-center gap-1"><FormPill r="W" /><FormPill r="L" /><FormPill r="N" /> Last five results</span>
        <span>Top four qualify for the playoffs.</span>
      </div>
    </div>
  )
}
