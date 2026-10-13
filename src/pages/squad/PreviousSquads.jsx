import Spread from '../../components/Spread'
import { Headline, Byline } from '../../components/print'
import { previousSquads } from '../../data/players'

const notes = {
  2025: 'So close. A final lost off the last ball, and a squad that would form the core of the side that leads the league today.',
  2024: 'The title year. Pollard\'s side won eight of its last nine and lifted the trophy in front of a sold-out Oval.',
  2023: 'The breakthrough. A first playoff appearance, built on Gayle\'s hitting and Tahir\'s guile.',
}

export default function PreviousSquads() {
  return (
    <Spread>
      <div className="mt-8 max-w-3xl">
        <Headline top="From the" bottom="Archive" />
        <Byline>The squads that came before — captains, coaches and the players who wore the shirt.</Byline>
      </div>

      <div className="mt-10">
        {previousSquads.map((s) => (
          <section key={s.season} aria-labelledby={`season-${s.season}`} className="grid gap-6 border-t-4 border-ink py-8 lg:grid-cols-[260px_1fr] lg:gap-10">
            <div>
              <h2 id={`season-${s.season}`} className="font-display text-8xl font-black leading-none tracking-tight text-navy">{s.season}</h2>
              <p className={`kicker mt-3 inline-block px-2 py-1 ${s.finish === 'Champions' ? 'bg-green text-paper' : 'border border-ink'}`}>{s.finish}</p>
              <dl className="mt-4 space-y-1 font-serif text-sm">
                <div><dt className="inline italic text-ink-soft">Captain — </dt><dd className="inline font-semibold">{s.captain}</dd></div>
                <div><dt className="inline italic text-ink-soft">Head coach — </dt><dd className="inline font-semibold">{s.coach}</dd></div>
              </dl>
            </div>
            <div>
              <p className="font-display text-2xl italic leading-snug">{notes[s.season]}</p>
              <ul className="mt-6 gap-x-8 font-serif sm:columns-2 xl:columns-3">
                {s.players.map((p) => (
                  <li key={p.name} className="break-inside-avoid border-b border-rule py-2">
                    <span className="font-semibold">{p.name}</span>
                    {p.name === s.captain && <span className="kicker ml-1 text-navy">(C)</span>}
                    <span className="block text-xs italic text-ink-soft">{p.role}, {p.country}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </Spread>
  )
}
