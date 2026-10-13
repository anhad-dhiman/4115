import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import { Avatar, Badge, SectionHeading } from '../../components/ui'
import { StatTile } from '../../components/season'
import { players, previousSquads, roles } from '../../data/players'
import { club } from '../../data/club'

export default function SquadOverview() {
  const captain = players.find((p) => p.captain)
  const vice = players.find((p) => p.viceCaptain)
  const overseas = players.filter((p) => p.country !== 'Canada').length

  return (
    <div className="container-page space-y-12 py-10">
      <section aria-label="Squad at a glance" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Players" value={players.length} />
        <StatTile label="Canadian players" value={players.length - overseas} />
        <StatTile label="Overseas players" value={overseas} />
        <StatTile label="Seasons on record" value={previousSquads.length + 1} />
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {[
          { to: '/squad/current', title: 'Current Squad', text: `All ${players.length} players for the ${club.season} season, with roles and season stats.`, icon: 'users' },
          { to: '/squad/previous', title: 'Previous Squads', text: `Line-ups from ${previousSquads.map((s) => s.season).join(', ')} — including the 2024 title-winning side.`, icon: 'trophy' },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="card group flex items-center gap-5 p-6 transition hover:border-navy/30 hover:shadow-md">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-navy text-white">
              <Icon name={c.icon} className="h-7 w-7" />
            </span>
            <span className="flex-1">
              <span className="block text-lg font-semibold text-navy">{c.title}</span>
              <span className="mt-1 block text-sm text-muted">{c.text}</span>
            </span>
            <Icon name="arrow" className="h-5 w-5 text-muted transition group-hover:translate-x-1 group-hover:text-navy" />
          </Link>
        ))}
      </section>

      <section aria-labelledby="leaders">
        <SectionHeading id="leaders" title="Leadership group" />
        <div className="grid gap-5 sm:grid-cols-2">
          {[[captain, 'Captain'], [vice, 'Vice-captain']].map(([p, title]) => (
            <Link key={p.id} to="/news/players" className="card flex items-center gap-4 p-5 hover:shadow-md">
              <Avatar name={p.name} />
              <div>
                <Badge tone="green">{title}</Badge>
                <p className="mt-1 text-lg font-semibold text-navy">{p.name}</p>
                <p className="text-sm text-muted">{p.role} · {p.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="by-role">
        <SectionHeading id="by-role" title="Squad by role" to="/squad/current" linkLabel="Full squad" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.slice(1).map((r) => {
            const list = players.filter((p) => p.role === r)
            return (
              <div key={r} className="card p-5">
                <p className="flex items-center justify-between font-semibold text-navy">
                  {r}s <span className="text-sm font-normal text-muted">{list.length}</span>
                </p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {list.map((p) => <li key={p.id}>{p.name}</li>)}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
