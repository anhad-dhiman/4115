// Franchise teams in other leagues (News > Teams) — all fictional.
export const franchiseTeams = [
  { id: 'vancouver', name: 'Vancouver Vikings', league: 'Maple Premier League', country: 'Canada', founded: 2019,
    captain: 'Jos Buttler', coach: 'Ricky Ponting', titles: 1, status: 'In season — 1st',
    summary: 'The flagship side. Plays home games at Stanley Park Oval and leads the MPL this season.' },
  { id: 'vancouver-women', name: 'Vancouver Vikings Women', league: "Women's Maple League", country: 'Canada', founded: 2022,
    captain: 'Meg Lanning', coach: 'Lisa Keightley', titles: 2, status: 'Pre-season',
    summary: 'Two-time champions and the most successful team in the franchise so far.' },
  { id: 'cape-town', name: 'Cape Town Vikings', league: 'Southern Cross T20', country: 'South Africa', founded: 2023,
    captain: 'Aiden Markram', coach: 'Mark Boucher', titles: 0, status: 'Off-season',
    summary: 'Launched in 2023 and reached the playoffs in its second year.' },
  { id: 'dubai', name: 'Dubai Vikings', league: 'Gulf Super League', country: 'UAE', founded: 2024,
    captain: 'Sikandar Raza', coach: 'Andy Flower', titles: 0, status: 'Auction phase',
    summary: 'The newest side, built around spin-friendly conditions in the Gulf.' },
  { id: 'texas', name: 'Texas Vikings', league: 'Lone Star League', country: 'USA', founded: 2024,
    captain: 'Steven Taylor', coach: 'Stephen Fleming', titles: 0, status: 'Off-season',
    summary: 'Building a US base with a strong local talent pathway.' },
  { id: 'academy', name: 'Vikings Academy U-19', league: 'BC Youth Premier', country: 'Canada', founded: 2020,
    captain: 'Rotating', coach: 'Nikhil Dutta', titles: 3, status: 'In season — 2nd',
    summary: 'The development pathway that has produced four MPL players.' },
]

// Rival league teams (Other Teams) — all fictional.
export const otherTeams = [
  { id: 'toronto-titans', name: 'Toronto Titans', code: 'TOR', city: 'Toronto, ON', founded: 2019, coach: 'Tom Moody',
    h2h: { played: 12, won: 7, lost: 5 }, color: '#7a1f2b',
    summary: 'Last season\'s champions. Heavy batting line-up built around power hitters in the middle order.' },
  { id: 'montreal-mariners', name: 'Montreal Mariners', code: 'MTL', city: 'Montreal, QC', founded: 2019, coach: 'Daniel Vettori',
    h2h: { played: 12, won: 6, lost: 6 }, color: '#1d4e89',
    summary: 'A spin-heavy attack that is hard to score against at home.' },
  { id: 'calgary-chinooks', name: 'Calgary Chinooks', code: 'CGY', city: 'Calgary, AB', founded: 2020, coach: 'Trevor Bayliss',
    h2h: { played: 10, won: 6, lost: 4 }, color: '#b34a00',
    summary: 'Pace-first bowling unit that thrives at altitude.' },
  { id: 'edmonton-eagles', name: 'Edmonton Eagles', code: 'EDM', city: 'Edmonton, AB', founded: 2020, coach: 'Justin Langer',
    h2h: { played: 10, won: 7, lost: 3 }, color: '#3d3d3d',
    summary: 'Young squad still finding consistency, but dangerous on their day.' },
  { id: 'winnipeg-whiteouts', name: 'Winnipeg Whiteouts', code: 'WPG', city: 'Winnipeg, MB', founded: 2021, coach: 'Gary Kirsten',
    h2h: { played: 8, won: 5, lost: 3 }, color: '#4b5d73',
    summary: 'Disciplined and defensive — lowest economy rate in the league last season.' },
  { id: 'brampton-blazers', name: 'Brampton Blazers', code: 'BRA', city: 'Brampton, ON', founded: 2021, coach: 'Andy Moles',
    h2h: { played: 8, won: 4, lost: 4 }, color: '#8a6d00',
    summary: 'Strong local following and one of the league\'s best fielding sides.' },
]

export const teamByCode = (code) =>
  code === 'VAN' ? { name: 'Vancouver Vikings', code: 'VAN' } : otherTeams.find((t) => t.code === code)
