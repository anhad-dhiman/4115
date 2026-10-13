import { Link } from 'react-router-dom'
import { Photo } from '../components/print'
import { useOpenContents } from '../components/contentsContext'
import { contents, issue } from '../data/issue'
import { club } from '../data/club'
import { articles } from '../data/news'
import { standings, upcomingFixtures, formatDate } from '../data/season'

function Barcode() {
  const bars = [3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2]
  let x = 0
  return (
    <svg viewBox="0 0 90 46" className="h-12 w-24 bg-paper p-1" aria-hidden="true">
      {bars.map((w, i) => {
        const r = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="34" fill="#16181d" /> : null
        x += w + 1
        return r
      })}
      <text x="0" y="44" fontSize="8" fontFamily="monospace" fill="#16181d">0 72026 00007 4</text>
    </svg>
  )
}

export default function Cover() {
  const openContents = useOpenContents()
  const story = articles[0]
  const us = standings.find((s) => s.code === 'VAN')
  const next = upcomingFixtures[0]
  const lines = contents.filter((c) => c.coverline)

  return (
    <div className="bg-paper">
      {/* Masthead */}
      <header className="sheet pt-6">
        <div className="flex items-center justify-between">
          <p className="kicker text-ink-soft">{club.league} · Official Publication</p>
          <button type="button" onClick={openContents} className="kicker border-2 border-ink px-3 py-2 hover:bg-ink hover:text-paper" aria-haspopup="dialog">
            ☰ Contents
          </button>
        </div>
        <p className="kicker mt-4 text-center text-green-700">Vancouver</p>
        <h1 className="text-center font-display text-[22vw] font-black leading-[0.82] tracking-tight text-navy sm:text-[10rem] lg:text-[12rem]">
          {issue.title}
        </h1>
        <p className="mt-2 text-center font-label text-xs font-semibold uppercase tracking-[0.35em] text-ink-soft sm:text-sm">
          {issue.subtitle}
        </p>
        <div className="mt-4 flex items-center justify-between border-b-4 border-ink pb-2">
          <p className="kicker">Issue No. {issue.number}</p>
          <p className="kicker hidden sm:block">Cricket · Culture · Club</p>
          <p className="kicker">{issue.season}</p>
        </div>
      </header>

      {/* Full-bleed cover photograph with cover lines */}
      <section className="relative mt-0 lg:mx-auto lg:max-w-6xl lg:px-8" aria-label="Cover story">
        <div className="relative">
          <Photo className="h-[62vh] min-h-[420px] w-full lg:h-[760px]" motif="ball" label="Captain Jos Buttler raises his bat to the Stanley Park crowd" />

          {/* Sticker */}
          <div className="absolute left-4 top-4 flex h-28 w-28 rotate-[-10deg] flex-col items-center justify-center rounded-full bg-green text-center text-paper shadow-lg sm:left-8 sm:top-8 sm:h-36 sm:w-36">
            <span className="kicker text-[10px] text-paper/90">Top of the</span>
            <span className="font-display text-4xl font-black leading-none sm:text-5xl">{us.pos}st</span>
            <span className="kicker text-[10px] text-paper/90">{club.leagueShort} table</span>
          </div>

          {/* Cover lines (desktop: right edge over the photo) */}
          <nav aria-label="In this issue" className="absolute right-0 top-8 hidden w-[380px] md:block">
            <ul className="space-y-3">
              {lines.map((c) => (
                <li key={c.path}>
                  <Link to={c.path} className="group flex items-baseline justify-between gap-4 bg-paper px-5 py-3.5 shadow-md transition hover:-translate-x-2 hover:bg-ink hover:text-paper">
                    <span className="font-label text-sm font-extrabold uppercase tracking-wide">{c.coverline}</span>
                    <span className="font-display text-lg font-black text-green-700 group-hover:text-paper">p.{c.page}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cover story tease (lower left) */}
          <div className="absolute bottom-0 left-0 hidden max-w-[560px] bg-paper p-8 pr-12 md:block">
            <p className="kicker text-green-700">Cover story · p.5</p>
            <p className="headline mt-3 text-6xl lg:text-7xl">
              <span className="block">Top of</span>
              <span className="block text-navy">the table.</span>
            </p>
            <p className="deck mt-3">{story.excerpt}</p>
            <Link to={`/news/${story.slug}`} className="ink-link mt-4 inline-block font-label text-sm font-bold uppercase tracking-wider">
              Read the cover story →
            </Link>
          </div>

          <div className="absolute bottom-4 right-4 hidden md:block"><Barcode /></div>
        </div>
      </section>

      {/* Mobile: cover story + cover lines stacked below the photo */}
      <section className="sheet md:hidden">
        <div className="border-b-2 border-ink py-6">
          <p className="kicker text-green-700">Cover story · p.5</p>
          <p className="headline mt-2 text-5xl">
            <span className="block">Top of</span>
            <span className="block text-navy">the table.</span>
          </p>
          <p className="deck mt-3">{story.excerpt}</p>
          <Link to={`/news/${story.slug}`} className="ink-link mt-3 inline-block font-label text-sm font-bold uppercase tracking-wider">Read the cover story →</Link>
        </div>
        <nav aria-label="In this issue">
          <p className="kicker mt-6 text-ink-soft">Inside this issue</p>
          <ul className="mt-2">
            {lines.map((c) => (
              <li key={c.path} className="border-b border-rule">
                <Link to={c.path} className="flex items-baseline justify-between gap-4 py-4">
                  <span className="font-label text-sm font-extrabold uppercase tracking-wide">{c.coverline}</span>
                  <span className="font-display text-lg font-black text-green-700">p.{c.page}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Strip under the cover: next match, like a cover "flash" */}
      <section className="sheet mt-8" aria-label="Next match">
        <Link to="/season/fixtures" className="group grid items-center gap-2 border-y-2 border-ink py-4 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
          <span className="kicker text-green-700">Next match · {next.week}</span>
          <span className="font-display text-2xl font-bold group-hover:text-navy">
            {next.home ? 'Vikings vs' : 'Vikings @'} {next.opponent}
          </span>
          <span className="font-serif italic text-ink-soft">
            {formatDate(next.date, { weekday: 'long', month: 'long', day: 'numeric' })} · {next.time} · {next.venue}
          </span>
        </Link>
      </section>
    </div>
  )
}
