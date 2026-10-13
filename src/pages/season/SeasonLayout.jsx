import { Outlet, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import { TabLinks } from '../../components/ui'
import { club } from '../../data/club'

const sub = {
  '/season/standing': { label: 'Standing', description: `The full ${club.leagueShort} ${club.season} points table.` },
  '/season/stats': { label: 'Stats', description: 'Team and player statistics for the season so far.' },
  '/season/fixtures': { label: 'Fixtures', description: 'Every match this season — results and upcoming games.' },
}

const tabs = [
  { label: 'Overview', to: '/season', end: true },
  { label: 'Standing', to: '/season/standing' },
  { label: 'Stats', to: '/season/stats' },
  { label: 'Fixtures', to: '/season/fixtures' },
]

export default function SeasonLayout() {
  const { pathname } = useLocation()
  const page = sub[pathname.replace(/\/$/, '')]

  return (
    <>
      <PageHeader
        title={page ? page.label : 'Season Updates'}
        description={page ? page.description : `How the ${club.season} ${club.league} season is going — standings, stats and fixtures at a glance.`}
        crumbs={page ? [{ label: 'Season Updates', to: '/season' }, { label: page.label }] : [{ label: 'Season Updates' }]}
      />
      <TabLinks label="Season sections" tabs={tabs} />
      <Outlet />
    </>
  )
}
