import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Cover from './pages/Cover'
import Auction from './pages/Auction'
import Gallery from './pages/Gallery'
import OtherTeams from './pages/OtherTeams'
import NotFound from './pages/NotFound'
import Squad from './pages/squad/Squad'
import CurrentSquad from './pages/squad/CurrentSquad'
import PreviousSquads from './pages/squad/PreviousSquads'
import News from './pages/news/News'
import Article from './pages/news/Article'
import Teams from './pages/news/Teams'
import Players from './pages/news/Players'
import Season from './pages/season/Season'
import Standing from './pages/season/Standing'
import Stats from './pages/season/Stats'
import Fixtures from './pages/season/Fixtures'

// Same hierarchy as Design 1 — only the presentation changes.
// Page numbers for each route live in src/data/issue.js.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Cover />} />
        <Route path="auction" element={<Auction />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="squad">
          <Route index element={<Squad />} />
          <Route path="current" element={<CurrentSquad />} />
          <Route path="previous" element={<PreviousSquads />} />
        </Route>
        <Route path="news">
          <Route index element={<News />} />
          <Route path="teams" element={<Teams />} />
          <Route path="players" element={<Players />} />
          <Route path=":slug" element={<Article />} />
        </Route>
        <Route path="season">
          <Route index element={<Season />} />
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
