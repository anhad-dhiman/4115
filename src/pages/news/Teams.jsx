import Spread from '../../components/Spread'
import { Headline, Byline, Photo, Caption } from '../../components/print'
import { franchiseTeams } from '../../data/teams'
import { articles } from '../../data/news'
import { Brief } from './News'

const city = (name) => name.replace(/ Vikings.*$/, '').replace('Vikings Academy U-19', 'Vancouver').toUpperCase()

export default function Teams() {
  const totalTitles = franchiseTeams.reduce((n, t) => n + t.titles, 0)
  const countries = new Set(franchiseTeams.map((t) => t.country)).size

  return (
    <Spread>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <Headline top="The Vikings" bottom="Abroad" />
          <Byline>One franchise, {franchiseTeams.length} teams, {countries} countries. A guide to every side that wears the badge.</Byline>
        </div>
        <dl className="grid grid-cols-3 gap-4 self-end border-y-2 border-ink py-4 text-center">
          {[[franchiseTeams.length, 'Teams'], [countries, 'Countries'], [totalTitles, 'Titles']].map(([v, k]) => (
            <div key={k}>
              <dd className="font-display text-5xl font-black text-navy">{v}</dd>
              <dt className="kicker text-ink-soft">{k}</dt>
            </div>
          ))}
        </dl>
      </div>

      <ol className="mt-10">
        {franchiseTeams.map((t, i) => (
          <li key={t.id} className="grid gap-6 border-t-2 border-ink py-8 md:grid-cols-[80px_1fr_280px]">
            <p className="font-display text-6xl font-black leading-none text-green-700">{String(i + 1).padStart(2, '0')}</p>
            <div>
              <h2 className="font-display text-3xl font-bold">{t.name}</h2>
              <p className="kicker mt-1 text-ink-soft">{t.league} · Est. {t.founded}</p>
              <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed">
                <span className="font-label text-sm font-extrabold tracking-wider">{city(t.name)} — </span>
                {t.summary} Captained by {t.captain} and coached by {t.coach}
                {t.titles > 0 ? `, with ${t.titles} title${t.titles > 1 ? 's' : ''} to date.` : '; still chasing a first title.'}
              </p>
              <p className="mt-3 font-serif text-sm italic text-ink-soft">Status: {t.status}</p>
            </div>
            <figure>
              <Photo className="aspect-[4/3]" tone={i % 2 ? 'green' : 'navy'} motif={i % 3 === 0 ? 'crowd' : i % 3 === 1 ? 'portrait' : 'stumps'} label={`${t.name} team photo`} />
              <Caption>{t.name}, {t.country}.</Caption>
            </figure>
          </li>
        ))}
      </ol>

      <section aria-labelledby="team-news" className="mt-6">
        <h2 id="team-news" className="headline border-b-4 border-ink pb-2 text-3xl">Team News</h2>
        <div className="grid gap-x-10 md:grid-cols-2">
          {articles.filter((a) => a.tag === 'Teams').map((a) => <Brief key={a.slug} a={a} />)}
        </div>
      </section>
    </Spread>
  )
}
