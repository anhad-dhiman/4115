import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Placeholder, SectionHeading, Badge } from '../components/ui'
import { club, sectionCards } from '../data/club'
import { articles } from '../data/news'
import { upcomingFixtures, seasonSummary, formatDate } from '../data/season'

export default function Home() {
  const next = upcomingFixtures[0]
  const latest = articles.slice(0, 3)

  return (
    <>
      {/* Hero banner + tagline */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-30">
          <Placeholder className="h-full w-full" icon="ball" label="Vikings players celebrating at Stanley Park Oval" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
        <div className="container-page relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-50/90">
              {club.league} · Season {club.season}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {club.tagline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              The official home of the {club.name} — squad news, season updates, auction coverage and more,
              from Stanley Park to every league we play in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/squad" className="btn-primary">Meet the squad <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link to="/season" className="btn-outline">Season updates</Link>
            </div>
          </div>

          {/* Next match card */}
          <div className="rounded-lg bg-white p-6 text-ink shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Next match</p>
              <Badge tone="navy">{next.week}</Badge>
            </div>
            <p className="mt-4 text-2xl font-bold text-navy">
              {next.home ? 'vs' : '@'} {next.opponent}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2"><Icon name="calendar" className="h-4 w-4" />{formatDate(next.date, { weekday: 'long', month: 'long', day: 'numeric' })} · {next.time}</li>
              <li className="flex items-center gap-2"><Icon name="pin" className="h-4 w-4" />{next.venue}</li>
            </ul>
            <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5">
              {seasonSummary.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <dt className="text-xs text-muted">{s.label}</dt>
                  <dd className="text-xl font-bold text-navy">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Six section link cards */}
      <section aria-labelledby="explore" className="container-page py-14">
        <SectionHeading id="explore" title="Explore the club" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectionCards.map((c) => (
            <li key={c.to}>
              <Link
                to={c.to}
                className="card group flex h-full items-start gap-4 p-6 transition hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy group-hover:bg-navy group-hover:text-white">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="flex items-center gap-1 text-lg font-semibold text-navy">
                    {c.title}
                    <Icon name="arrow" className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-sm text-muted">{c.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Latest news preview strip */}
      <section aria-labelledby="latest" className="border-y border-line bg-white py-14">
        <div className="container-page">
          <SectionHeading id="latest" title="Latest news" to="/news" linkLabel="All news" />
          <ul className="grid gap-6 md:grid-cols-3">
            {latest.map((a) => (
              <li key={a.slug}>
                <article className="group h-full">
                  <Link to={`/news/${a.slug}`} className="block">
                    <Placeholder className="aspect-[16/9] rounded-md" icon="news" label={a.title} />
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                      <Badge tone="green">{a.tag}</Badge>
                      <time dateTime={a.date}>{formatDate(a.date, { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                    </div>
                    <h3 className="mt-2 font-semibold leading-snug text-navy group-hover:underline underline-offset-4">{a.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{a.excerpt}</p>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
