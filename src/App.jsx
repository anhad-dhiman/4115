import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Auction from './pages/Auction'
import Gallery from './pages/Gallery'
import OtherTeams from './pages/OtherTeams'
import NotFound from './pages/NotFound'
import SquadLayout from './pages/squad/SquadLayout'
import SquadOverview from './pages/squad/SquadOverview'
import CurrentSquad from './pages/squad/CurrentSquad'
import PreviousSquads from './pages/squad/PreviousSquads'
import News from './pages/news/News'
import Article from './pages/news/Article'
import Teams from './pages/news/Teams'
import Players from './pages/news/Players'
import SeasonLayout from './pages/season/SeasonLayout'
import SeasonOverview from './pages/season/SeasonOverview'
import Standing from './pages/season/Standing'
import Stats from './pages/season/Stats'
import Fixtures from './pages/season/Fixtures'

// Routes mirror the site hierarchy from the proposal:
// Home → Auction | Gallery | Squad (Current, Previous) | News (Teams, Players)
//      | Season Updates (Standing, Stats, Fixtures) | Other Teams
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auction" element={<Auction />} />
        <Route path="gallery" element={<Gallery />} />

        <Route path="squad" element={<SquadLayout />}>
          <Route index element={<SquadOverview />} />
          <Route path="current" element={<CurrentSquad />} />
          <Route path="previous" element={<PreviousSquads />} />
        </Route>

        <Route path="news">
          <Route index element={<News />} />
          <Route path="teams" element={<Teams />} />
          <Route path="players" element={<Players />} />
          <Route path=":slug" element={<Article />} />
        </Route>

        <Route path="season" element={<SeasonLayout />}>
          <Route index element={<SeasonOverview />} />
          <Route path="standing" element={<Standing />} />
          <Route path="stats" element={<Stats />} />
          <Route path="fixtures" element={<Fixtures />} />
        </Route>

        <Route path="other-teams" element={<OtherTeams />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
