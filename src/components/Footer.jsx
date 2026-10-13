import { Link } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import { club } from '../data/club'

// Footer doubles as a sitemap, so every page is reachable from anywhere.
const columns = [
  { title: 'Club', links: [['Squad', '/squad'], ['Current Squad', '/squad/current'], ['Previous Squads', '/squad/previous'], ['Auction', '/auction']] },
  { title: 'Media', links: [['News', '/news'], ['Teams', '/news/teams'], ['Players', '/news/players'], ['Gallery', '/gallery']] },
  { title: 'Season', links: [['Season Updates', '/season'], ['Standing', '/season/standing'], ['Stats', '/season/stats'], ['Fixtures', '/season/fixtures'], ['Other Teams', '/other-teams']] },
]

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy text-white/80">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm">{club.tagline}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Icon name="pin" className="h-4 w-4" />{club.homeGround}</li>
            <li className="flex items-center gap-2"><Icon name="mail" className="h-4 w-4" />{club.email}</li>
            <li className="flex items-center gap-2"><Icon name="phone" className="h-4 w-4" />{club.phone}</li>
          </ul>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={`${col.title} links`}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">{col.title}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white hover:underline underline-offset-4">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {club.name}. A fictional club built for a course project.</p>
          <ul className="flex gap-4" aria-label="Social media">
            {['Instagram', 'X', 'YouTube', 'Facebook'].map((s) => (
              <li key={s}><a href="#" className="hover:text-white">{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
