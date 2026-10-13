// The magazine's "contents": every page in reading order with its page number.
// Level-2 sections get whole numbers (from the proposal sketches); their
// level-3 sub-pages get decimal folios (4.1, 4.2 …).

export const issue = {
  title: 'VIKINGS',
  subtitle: 'The Official Season Magazine',
  number: '07',
  season: 'Fall 2026',
}

export const contents = [
  { page: '1', path: '/', label: 'Cover', kicker: 'Cover' },
  { page: '2', path: '/auction', label: 'Auction', kicker: 'Feature — Auction', coverline: 'Auction: inside the room' },
  { page: '3', path: '/gallery', label: 'Gallery', kicker: 'Photo Essay — Gallery', coverline: 'Gallery: a season in pictures' },
  { page: '4', path: '/squad', label: 'Squad', kicker: 'Roster — Squad', coverline: 'Squad: meet the players',
    children: [
      { page: '4.1', path: '/squad/current', label: 'Current Squad', kicker: 'Roster — Current Squad' },
      { page: '4.2', path: '/squad/previous', label: 'Previous Squads', kicker: 'Roster — From the Archive' },
    ] },
  { page: '5', path: '/news', label: 'News', kicker: 'The Front — News', coverline: 'News: the week in cricket',
    children: [
      { page: '5.1', path: '/news/teams', label: 'Teams', kicker: 'The Front — Teams' },
      { page: '5.2', path: '/news/players', label: 'Players', kicker: 'The Front — Players' },
    ] },
  { page: '6', path: '/season', label: 'Season Updates', kicker: 'Season Updates — By the Numbers', coverline: 'Standings & fixtures',
    children: [
      { page: '6.1', path: '/season/standing', label: 'Standing', kicker: 'Season Updates — Standing' },
      { page: '6.2', path: '/season/stats', label: 'Stats', kicker: 'Season Updates — Stats' },
      { page: '6.3', path: '/season/fixtures', label: 'Fixtures', kicker: 'Season Updates — Fixtures' },
    ] },
  { page: '7', path: '/other-teams', label: 'Other Teams', kicker: 'Scouting Report — Other Teams', coverline: 'Scouting the rivals' },
]

// Flat reading order for "previous page / next page" controls.
export const readingOrder = contents.flatMap((c) => [c, ...(c.children ?? [])])

export const pageFor = (path) => {
  const clean = path.replace(/\/$/, '') || '/'
  return readingOrder.find((p) => p.path === clean)
}

export const parentOf = (path) =>
  contents.find((c) => c.children?.some((k) => k.path === path)) ??
  // News articles (/news/:slug) sit under News even though they aren't in the contents.
  (path.startsWith('/news/') ? contents.find((c) => c.path === '/news') : undefined)
