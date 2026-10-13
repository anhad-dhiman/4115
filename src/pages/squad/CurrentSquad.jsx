import Spread from '../../components/Spread'
import { Headline, Byline, Photo } from '../../components/print'
import { players } from '../../data/players'

const sections = [
  { role: 'Batter', title: 'The Batters', blurb: 'Timing, power and a top order that rarely lets the run rate drop.' },
  { role: 'Wicket-keeper', title: 'Behind the Stumps', blurb: 'Two keepers who would walk into most sides as batters alone.' },
  { role: 'All-rounder', title: 'The All-Rounders', blurb: 'The balance of the side: overs with the ball, runs at the death.' },
  { role: 'Bowler', title: 'The Attack', blurb: 'Pace, swing and the best leg-spinner in the world.' },
]

function Profile({ p }) {
  const s = p.stats
  return (
    <article className="grid grid-cols-[96px_1fr] gap-4 border-t border-rule py-5 sm:grid-cols-[120px_1fr]">
      <div className="relative">
        <Photo className="aspect-[3/4]" tone="paper" motif="portrait" label={`Portrait of ${p.name}`} />
        <span className="absolute -bottom-2 -right-2 bg-paper px-1 font-display text-3xl font-black leading-none text-green-700" aria-hidden="true">{p.number}</span>
      </div>
      <div>
        <p className="kicker text-ink-soft">{p.country}{p.captain ? ' · Captain' : p.viceCaptain ? ' · Vice-captain' : ''}</p>
        <h3 className="mt-1 font-display text-2xl font-bold leading-tight">{p.name}</h3>
        <p className="font-serif text-sm italic text-ink-soft">{p.batting}{p.bowling !== '—' ? ` · ${p.bowling}` : ''}</p>
        <p className="mt-3 font-serif text-sm">
          <strong>{s.matches}</strong> matches · <strong>{s.runs}</strong> runs at {s.avg.toFixed(1)}
          {s.wickets > 0 && <> · <strong>{s.wickets}</strong> wickets (econ {s.econ.toFixed(1)})</>}
        </p>
      </div>
    </article>
  )
}

export default function CurrentSquad() {
  return (
    <Spread>
      <div className="mt-8 max-w-3xl">
        <Headline top="Who's who" bottom="in the dressing room" size="text-4xl sm:text-6xl" />
        <Byline>A player-by-player guide to the {players.length} Vikings, grouped by role. Numbers are for this season.</Byline>
      </div>

      <nav aria-label="Jump to role" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-y-2 border-ink py-3">
        {sections.map((s) => (
          <a key={s.role} href={`#${s.role.toLowerCase()}`} className="ink-link font-label text-sm font-bold uppercase tracking-wider">
            {s.title} <span className="font-serif font-normal italic normal-case text-ink-soft">({players.filter((p) => p.role === s.role).length})</span>
          </a>
        ))}
      </nav>

      {sections.map((sec) => (
        <section key={sec.role} id={sec.role.toLowerCase()} aria-labelledby={`${sec.role}-h`} className="mt-12 scroll-mt-24">
          <div className="border-b-4 border-ink pb-2">
            <h2 id={`${sec.role}-h`} className="headline text-4xl">{sec.title}</h2>
            <p className="deck">{sec.blurb}</p>
          </div>
          <div className="grid gap-x-10 md:grid-cols-2">
            {players.filter((p) => p.role === sec.role).map((p) => <Profile key={p.id} p={p} />)}
          </div>
        </section>
      ))}
    </Spread>
  )
}
