import { Link } from 'react-router-dom'
import Spread from '../../components/Spread'
import { Photo, Caption, Byline, PullQuote, TurnTo } from '../../components/print'
import { articles } from '../../data/news'
import { formatDate } from '../../data/season'

const dateLong = { month: 'long', day: 'numeric', year: 'numeric' }

export function Brief({ a, thumb = true }) {
  return (
    <article className="grid grid-cols-[1fr_88px] gap-4 border-t border-rule py-4">
      <div>
        <p className="kicker text-green-700">{a.tag}</p>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug">
          <Link to={`/news/${a.slug}`} className="hover:text-navy hover:underline decoration-green decoration-2 underline-offset-4">{a.title}</Link>
        </h3>
        <p className="mt-1 font-serif text-xs italic text-ink-soft">{formatDate(a.date, dateLong)}</p>
      </div>
      {thumb && <Photo className="aspect-square" tone={a.tag === 'Teams' ? 'green' : 'navy'} motif="portrait" label={a.title} />}
    </article>
  )
}

export default function News() {
  const [lead, ...rest] = articles
  const quote = lead.body.find((p) => p.startsWith('"'))

  return (
    <Spread>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Lead story */}
        <div>
          <p className="kicker text-green-700">Lead story · {lead.tag}</p>
          <h1 className="headline mt-3 text-4xl sm:text-6xl">{lead.title}</h1>
          <Byline>By {lead.author} · {formatDate(lead.date, dateLong)}</Byline>

          <figure className="mt-6 -mx-4 sm:mx-0">
            <Photo className="aspect-[16/9]" motif="ball" label="Shubman Gill drives through the covers during his unbeaten 61" />
            <Caption>Shubman Gill drives through the covers during his unbeaten 61.</Caption>
          </figure>

          <div className="body-copy dropcap mt-6 gap-8 md:columns-2">
            {lead.body.filter((p) => p !== quote).slice(0, 3).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <PullQuote cite="Jos Buttler, captain">That's the kind of balance we've been looking for all season.</PullQuote>
          <Link to={`/news/${lead.slug}`} className="ink-link font-label text-sm font-bold uppercase tracking-wider">
            Continue reading →
          </Link>
        </div>

        {/* Ruled sidebar: more headlines + departments */}
        <aside className="lg:border-l lg:border-ink lg:pl-8">
          <h2 className="headline border-b-4 border-ink pb-2 text-2xl">More Headlines</h2>
          {rest.map((a) => <Brief key={a.slug} a={a} />)}

          <div className="mt-8 border-2 border-ink p-5">
            <h2 className="kicker text-ink-soft">Departments</h2>
            <ul className="mt-3 space-y-4">
              <li>
                <TurnTo to="/news/teams" page="5.1">Teams</TurnTo>
                <p className="mt-1 font-serif text-sm italic text-ink-soft">The Vikings in four countries.</p>
              </li>
              <li>
                <TurnTo to="/news/players" page="5.2">Players</TurnTo>
                <p className="mt-1 font-serif text-sm italic text-ink-soft">Profiles, positions and the numbers.</p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </Spread>
  )
}
