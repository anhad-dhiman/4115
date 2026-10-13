import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Icon from '../../components/Icon'
import { Placeholder, Badge, SectionHeading } from '../../components/ui'
import { articles } from '../../data/news'
import { formatDate } from '../../data/season'

const dateLong = { month: 'long', day: 'numeric', year: 'numeric' }

export function ArticleSummary({ a }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden sm:flex-row">
      <Link to={`/news/${a.slug}`} className="sm:w-56 sm:shrink-0" tabIndex={-1} aria-hidden="true">
        <Placeholder className="aspect-[16/9] h-full sm:aspect-auto" icon="news" label={a.title} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Badge tone="green">{a.tag}</Badge>
          <time dateTime={a.date}>{formatDate(a.date, dateLong)}</time>
        </div>
        <h3 className="mt-2 font-semibold leading-snug text-navy">
          <Link to={`/news/${a.slug}`} className="hover:underline underline-offset-4">{a.title}</Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{a.excerpt}</p>
      </div>
    </article>
  )
}

export default function News() {
  const [featured, ...rest] = articles

  return (
    <>
      <PageHeader
        title="News"
        description="Match reports, player news and announcements from across the franchise."
        crumbs={[{ label: 'News' }]}
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          {/* Featured article */}
          <article className="card overflow-hidden">
            <Placeholder className="aspect-[16/8]" icon="ball" label={featured.title} />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Badge tone="green">{featured.tag}</Badge>
                <span>Featured</span>
                <span aria-hidden="true">·</span>
                <time dateTime={featured.date}>{formatDate(featured.date, dateLong)}</time>
              </div>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-navy sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-muted">{featured.excerpt}</p>
              <Link to={`/news/${featured.slug}`} className="btn-primary mt-5">
                Read article <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <section aria-labelledby="more-news">
            <SectionHeading id="more-news" title="More stories" />
            <ul className="space-y-4">
              {rest.map((a) => <li key={a.slug}><ArticleSummary a={a} /></li>)}
            </ul>
          </section>
        </div>

        {/* Sidebar quick links (News > Teams, News > Players) */}
        <aside className="space-y-6">
          <nav aria-labelledby="quick-links" className="card p-5">
            <h2 id="quick-links" className="text-sm font-semibold uppercase tracking-wide text-muted">Quick links</h2>
            <ul className="mt-3 divide-y divide-line">
              {[
                { to: '/news/teams', label: 'Teams', text: 'Every Vikings team worldwide', icon: 'globe' },
                { to: '/news/players', label: 'Players', text: 'Profiles and season stats', icon: 'users' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group flex items-center gap-3 py-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-50 text-navy group-hover:bg-navy group-hover:text-white">
                      <Icon name={l.icon} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-navy">{l.label}</span>
                      <span className="block text-xs text-muted">{l.text}</span>
                    </span>
                    <Icon name="chevron" className="h-4 w-4 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="card p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Topics</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[...new Set(articles.map((a) => a.tag))].map((t) => (
                <li key={t}><Badge tone="navy">{t}</Badge></li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-navy p-5 text-white">
            <h2 className="font-semibold">Club newsletter</h2>
            <p className="mt-1 text-sm text-white/75">Match reports and ticket news, once a week.</p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" required placeholder="you@example.com" className="rounded-md border-0 px-3 py-2 text-sm text-ink" />
              <button type="submit" className="btn-primary justify-center">Subscribe</button>
            </form>
          </div>
        </aside>
      </div>
    </>
  )
}
