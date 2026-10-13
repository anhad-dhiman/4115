// Core club information shared across every page.
// The club, league and rival teams are fictional. Player names are real
// cricketers used for the course prototype only; all season stats are made up.

export const club = {
  name: 'Vancouver Vikings',
  shortName: 'Vikings',
  code: 'VAN',
  founded: 2019,
  league: 'Maple Premier League',
  leagueShort: 'MPL',
  homeGround: 'Stanley Park Oval, Vancouver',
  season: '2026',
  tagline: 'One club. Every league. All heart.',
  email: 'info@vancouvervikings.example',
  phone: '+1 (604) 555-0142',
}

// Primary navigation (level 1 of the site hierarchy).
export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'Squad', to: '/squad' },
  { label: 'Auction', to: '/auction' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'News', to: '/news' },
  { label: 'Season', to: '/season' },
  { label: 'Other Teams', to: '/other-teams' },
]

// Home page link cards — one per top-level section, matching the sketch.
export const sectionCards = [
  { title: 'Squad', to: '/squad', blurb: 'Meet the current Vikings and look back at previous squads.', icon: 'users' },
  { title: 'Auction', to: '/auction', blurb: 'Upcoming auction events, budgets and the latest signings.', icon: 'gavel' },
  { title: 'Gallery', to: '/gallery', blurb: 'Photos from match days, club events and training.', icon: 'image' },
  { title: 'News', to: '/news', blurb: 'Club announcements, match reports and player news.', icon: 'news' },
  { title: 'Season Updates', to: '/season', blurb: 'Standings, statistics and upcoming fixtures.', icon: 'chart' },
  { title: 'Other Teams', to: '/other-teams', blurb: 'Profiles and head-to-head records for every rival.', icon: 'shield' },
]
