import Spread from '../components/Spread'
import { Headline, Byline, Photo, PullQuote } from '../components/print'
import { otherTeams } from '../data/teams'
import { standings } from '../data/season'

const h2hLine = ({ won, lost }) =>
  won > lost ? `Vikings lead ${won}–${lost}` : won < lost ? `Vikings trail ${won}–${lost}` : `All square at ${won}–${lost}`

export default function OtherTeams() {
  const byPos = [...otherTeams].sort(
    (a, b) => standings.find((s) => s.code === a.code).pos - standings.find((s) => s.code === b.code).pos,
  )

  return (
    <Spread>
      <div className="mt-8 max-w-3xl">
        <Headline top="Scouting" bottom="the Rivals" />
        <Byline>Six opponents, ranked by where they sit in the table. What they do well, who runs the dressing room, and how we've fared against them.</Byline>
      </div>

      <div className="mt-10 grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
        {byPos.map((t) => {
          const pos = standings.find((s) => s.code === t.code)
          return (
            <article key={t.id} className="border-t-4 border-ink py-6">
              <div className="relative">
                <Photo className="aspect-[4/3]" tone={pos.pos <= 4 ? 'navy' : 'paper'} motif="crowd" label={`${t.name} players in the field`} />
                <span className="absolute left-0 top-0 bg-paper px-3 py-1 font-display text-2xl font-black" style={{ color: t.color }}>{t.code}</span>
              </div>
              <p className="kicker mt-4 text-green-700">{pos.pos === 1 ? 'Top' : `${pos.pos}${['', 'st', 'nd', 'rd'][pos.pos] ?? 'th'}`} in the table · {pos.pts} pts</p>
              <h2 className="mt-1 font-display text-3xl font-bold">{t.name}</h2>
              <p className="font-serif text-sm italic text-ink-soft">{t.city} · Est. {t.founded} · Coach: {t.coach}</p>
              <p className="mt-3 font-serif leading-relaxed">{t.summary}</p>
              <p className="mt-4 border-t border-rule pt-3 font-label text-sm font-bold uppercase tracking-wide">
                Head-to-head: <span className={t.h2h.won > t.h2h.lost ? 'text-green-700' : 'text-ink'}>{h2hLine(t.h2h)}</span>
                <span className="font-serif text-xs font-normal normal-case italic tracking-normal text-ink-soft"> in {t.h2h.played} meetings</span>
              </p>
            </article>
          )
        })}
      </div>

      <PullQuote cite="Vikings dressing room">Toronto are the benchmark. Everyone else is playing for third.</PullQuote>
    </Spread>
  )
}
