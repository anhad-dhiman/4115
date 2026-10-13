import PageHeader from '../../components/PageHeader'
import { Badge, SectionHeading } from '../../components/ui'
import { Crest } from '../../components/Logo'
import { franchiseTeams } from '../../data/teams'
import { articles } from '../../data/news'
import { ArticleSummary } from './News'

export default function Teams() {
  const teamNews = articles.filter((a) => a.tag === 'Teams')

  return (
    <>
      <PageHeader
        title="Teams"
        description="The Vikings franchise fields teams in leagues across four countries. Here's every one of them."
        crumbs={[{ label: 'News', to: '/news' }, { label: 'Teams' }]}
      />

      <div className="container-page space-y-12 py-10">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {franchiseTeams.map((t) => (
            <li key={t.id} className="card flex flex-col p-6">
              <div className="flex items-center gap-4">
                <Crest className="h-12 w-12 shrink-0" />
                <div>
                  <h2 className="font-semibold leading-tight text-navy">{t.name}</h2>
                  <p className="text-sm text-muted">{t.league}</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm text-muted">{t.summary}</p>
              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-sm">
                <div><dt className="text-xs text-muted">Country</dt><dd className="font-medium">{t.country}</dd></div>
                <div><dt className="text-xs text-muted">Founded</dt><dd className="font-medium">{t.founded}</dd></div>
                <div><dt className="text-xs text-muted">Captain</dt><dd className="font-medium">{t.captain}</dd></div>
                <div><dt className="text-xs text-muted">Head coach</dt><dd className="font-medium">{t.coach}</dd></div>
              </dl>
              <div className="mt-4 flex items-center justify-between">
                <Badge tone={t.status.startsWith('In season') ? 'green' : 'grey'}>{t.status}</Badge>
                <span className="text-sm text-muted">Titles: <strong className="text-navy">{t.titles}</strong></span>
              </div>
            </li>
          ))}
        </ul>

        <section aria-labelledby="team-news">
          <SectionHeading id="team-news" title="Team news" to="/news" linkLabel="All news" />
          <ul className="grid gap-4 lg:grid-cols-2">
            {teamNews.map((a) => <li key={a.slug}><ArticleSummary a={a} /></li>)}
          </ul>
        </section>
      </div>
    </>
  )
}
