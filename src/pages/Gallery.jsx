import { useEffect, useState } from 'react'
import Spread from '../components/Spread'
import { Photo, Caption } from '../components/print'
import { galleryItems } from '../data/gallery'
import { formatDate } from '../data/season'

const chapters = [
  { id: 'matches', numeral: 'I', category: 'Matches', title: 'Match Day', intro: 'Floodlights, full stands and the moments that decided the season.', tone: 'navy', motif: 'crowd' },
  { id: 'training', numeral: 'II', category: 'Training', title: 'On the Training Ground', intro: 'Where the work gets done, long before the crowd arrives.', tone: 'green', motif: 'stumps' },
  { id: 'events', numeral: 'III', category: 'Events', title: 'Around the Club', intro: 'Fan days, launches and the nights away from the middle.', tone: 'paper', motif: 'portrait' },
]

// Asymmetric "contact sheet" spans, repeated per chapter.
const spans = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-3',
  'md:col-span-3',
]
const aspects = ['aspect-[4/3] md:aspect-auto md:h-full', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[3/2]', 'aspect-[3/2]']

export default function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const activeChapter = active && chapters.find((c) => c.category === active.category)

  return (
    <>
      <Spread>
        {/* Bleed hero image with title */}
        <div className="relative mt-8 -mx-4 sm:-mx-8">
          <Photo className="h-[52vh] min-h-[360px]" motif="ball" label="The Vikings huddle before the opening match of the season" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6 pt-24 sm:p-10 sm:pt-32">
            <p className="kicker text-paper/80">A photo essay</p>
            <h1 className="headline mt-2 text-5xl text-paper sm:text-7xl">A Season<br />in Pictures</h1>
          </div>
        </div>
        <p className="caption">The huddle before the opening match at Stanley Park Oval.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="deck max-w-2xl text-xl">
            Twelve frames from a season that put the Vikings back on top — from the first ball at the Oval to auction night in the war room.
          </p>
          <nav aria-label="Chapters">
            <ol className="flex flex-wrap gap-x-5 gap-y-1">
              {chapters.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="ink-link font-label text-sm font-bold uppercase tracking-wider">
                    {c.numeral}. {c.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {chapters.map((c) => {
          const items = galleryItems.filter((g) => g.category === c.category)
          return (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-h`} className="mt-16 scroll-mt-24">
              <div className="grid gap-2 border-t-4 border-ink pt-3 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-6">
                <p className="font-display text-5xl font-black italic text-green-700">{c.numeral}.</p>
                <div>
                  <h2 id={`${c.id}-h`} className="headline text-3xl sm:text-4xl">{c.title}</h2>
                  <p className="deck mt-1">{c.intro}</p>
                </div>
              </div>
              <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 md:auto-rows-[minmax(0,auto)] md:grid-cols-6">
                {items.map((g, i) => (
                  <li key={g.id} className={`flex flex-col ${spans[i % spans.length]}`}>
                    <button type="button" onClick={() => setActive(g)} className="group block flex-1 text-left" aria-label={`Enlarge photo: ${g.title}`}>
                      <Photo className={`${aspects[i % aspects.length]} min-h-[180px] transition group-hover:opacity-90`} tone={c.tone} motif={c.motif} label={g.title} />
                    </button>
                    <Caption>
                      {g.title}. <span className="not-italic text-ink-soft/80">{formatDate(g.date, { month: 'long', day: 'numeric' })}</span>
                    </Caption>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </Spread>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.title} className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" onClick={() => setActive(null)}>
          <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Photo className="aspect-[16/10]" tone={activeChapter.tone} motif={activeChapter.motif} label={active.title} />
            <figcaption className="mt-3 flex items-start justify-between gap-4 text-paper">
              <span className="font-serif text-lg italic">{active.title}. {formatDate(active.date, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <button type="button" autoFocus onClick={() => setActive(null)} className="kicker border border-paper/70 px-3 py-1.5 hover:bg-paper hover:text-ink">Close ✕</button>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
