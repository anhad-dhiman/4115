import { Link, useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Icon from '../../components/Icon'
import { Placeholder, Badge } from '../../components/ui'
import { articles, getArticle } from '../../data/news'
import { formatDate } from '../../data/season'
import NotFound from '../NotFound'

export default function Article() {
  const { slug } = useParams()
  const a = getArticle(slug)
  if (!a) return <NotFound />

  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <>
      <PageHeader title={a.title} crumbs={[{ label: 'News', to: '/news' }, { label: 'Article' }]} />
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_300px]">
        <article className="card overflow-hidden">
          <Placeholder className="aspect-[16/8]" icon="ball" label={a.title} />
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <Badge tone="green">{a.tag}</Badge>
              <span>By {a.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={a.date}>{formatDate(a.date, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            </div>
            <p className="mt-5 text-lg font-medium text-ink">{a.excerpt}</p>
            <div className="mt-5 max-w-prose space-y-4 leading-relaxed text-ink/90">
              {a.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <Link to="/news" className="link mt-8 inline-flex items-center gap-1 text-sm">
              <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to all news
            </Link>
          </div>
        </article>

        <aside>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Related stories</h2>
          <ul className="mt-3 space-y-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to={`/news/${r.slug}`} className="card block p-4 hover:shadow-md">
                  <span className="text-xs text-muted">{r.tag}</span>
                  <span className="mt-1 block text-sm font-semibold leading-snug text-navy">{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  )
}
