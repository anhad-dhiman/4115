import Spread from '../../components/Spread'
import { Headline, Byline } from '../../components/print'
import { upcomingFixtures, results } from '../../data/season'
import { FixtureLine } from './shared'

export default function Fixtures() {
  const wins = results.filter((r) => r.result.startsWith('Won')).length
  return (
    <Spread>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Headline top="The" bottom="Schedule" />
          <Byline>All times Pacific. “vs” is a home match at Stanley Park Oval unless stated; “@” is away.</Byline>
        </div>
        <nav aria-label="Jump to" className="flex gap-6">
          <a href="#to-play" className="ink-link font-label text-sm font-bold uppercase tracking-wider">Still to play ({upcomingFixtures.length})</a>
          <a href="#results" className="ink-link font-label text-sm font-bold uppercase tracking-wider">Results ({results.length})</a>
        </nav>
      </div>

      <section id="to-play" aria-labelledby="to-play-h" className="mt-10 scroll-mt-24">
        <h2 id="to-play-h" className="headline border-b-4 border-ink pb-2 text-3xl">Still to Play</h2>
        <ul>{upcomingFixtures.map((f) => <FixtureLine key={f.id} f={f} />)}</ul>
      </section>

      <section id="results" aria-labelledby="results-h" className="mt-14 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-4 border-ink pb-2">
          <h2 id="results-h" className="headline text-3xl">The Results So Far</h2>
          <p className="font-serif italic text-ink-soft">Played {results.length}, won {wins}.</p>
        </div>
        <ul>{[...results].reverse().map((f) => <FixtureLine key={f.id} f={f} />)}</ul>
      </section>
    </Spread>
  )
}
