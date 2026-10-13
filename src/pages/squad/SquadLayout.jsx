import { Outlet, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import { TabLinks } from '../../components/ui'

const sub = {
  '/squad/current': { label: 'Current Squad', description: 'The players representing the Vikings this season.' },
  '/squad/previous': { label: 'Previous Squads', description: 'Former line-ups, captains and finishes from earlier seasons.' },
}

const tabs = [
  { label: 'Overview', to: '/squad', end: true },
  { label: 'Current Squad', to: '/squad/current' },
  { label: 'Previous Squads', to: '/squad/previous' },
]

export default function SquadLayout() {
  const { pathname } = useLocation()
  const page = sub[pathname.replace(/\/$/, '')]

  return (
    <>
      <PageHeader
        title={page ? page.label : 'Squad'}
        description={page ? page.description : 'Everything about the Vikings squad — this season and seasons past.'}
        crumbs={page ? [{ label: 'Squad', to: '/squad' }, { label: page.label }] : [{ label: 'Squad' }]}
      />
      <TabLinks label="Squad sections" tabs={tabs} />
      <Outlet />
    </>
  )
}
