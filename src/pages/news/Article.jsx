import { useParams } from 'react-router-dom'
import { Photo, Caption, Folio, Byline } from '../../components/print'
import { articles, getArticle } from '../../data/news'
import { formatDate } from '../../data/season'
import { Brief } from './News'
import NotFound from '../NotFound'

export default function Article() {
  const { slug } = useParams()
  const a = getArticle(slug)
  if (!a) return <NotFound />
  const more = articles.filter((x) => x.slug !== slug).slice(0, 3)

  return (
    <article className="sheet pt-8">
      <Folio kicker={`The Front — ${a.tag}`} page="5" />
      <header className="mx-auto mt-10 max-w-3xl text-center">
        <p className="kicker text-green-700">{a.tag}</p>
        <h1 className="headline mt-3 text-4xl sm:text-6xl">{a.title}</h1>
        <p className="deck mt-4 text-xl">{a.excerpt}</p>
        <Byline>By {a.author} · {formatDate(a.date, { month: 'long', day: 'numeric', year: 'numeric' })}</Byline>
      </header>

      <figure className="mt-8 -mx-4 sm:mx-0">
        <Photo className="aspect-[21/9]" motif="ball" label={a.title} />
        <Caption>{a.excerpt}</Caption>
      </figure>

      <div className="mx-auto mt-8 grid max-w-5xl gap-10 lg:grid-cols-[1fr_260px]">
        <div className="body-copy dropcap">
          {a.body.map((p, i) => <p key={i}>{p}</p>)}
          <p className="font-display text-navy" aria-hidden="true">■</p>
        </div>
        <aside className="lg:border-l lg:border-ink lg:pl-6">
          <h2 className="kicker border-b-2 border-ink pb-2">More from the front</h2>
          {more.map((m) => <Brief key={m.slug} a={m} thumb={false} />)}
        </aside>
      </div>
    </article>
  )
}
