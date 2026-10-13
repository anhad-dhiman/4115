// Season Updates data (Standing, Stats, Fixtures). All figures fictional.

export const standings = [
  { pos: 1, team: 'Vancouver Vikings', code: 'VAN', p: 11, w: 8, l: 2, nr: 1, pts: 17, nrr: '+1.142', form: ['L', 'W', 'W', 'W', 'W'] },
  { pos: 2, team: 'Toronto Titans', code: 'TOR', p: 11, w: 7, l: 3, nr: 1, pts: 15, nrr: '+0.684', form: ['W', 'L', 'W', 'W', 'W'] },
  { pos: 3, team: 'Calgary Chinooks', code: 'CGY', p: 11, w: 6, l: 5, nr: 0, pts: 12, nrr: '+0.210', form: ['L', 'W', 'W', 'L', 'W'] },
  { pos: 4, team: 'Montreal Mariners', code: 'MTL', p: 11, w: 5, l: 5, nr: 1, pts: 11, nrr: '-0.032', form: ['W', 'L', 'L', 'W', 'L'] },
  { pos: 5, team: 'Brampton Blazers', code: 'BRA', p: 11, w: 4, l: 7, nr: 0, pts: 8, nrr: '-0.415', form: ['L', 'W', 'L', 'L', 'W'] },
  { pos: 6, team: 'Winnipeg Whiteouts', code: 'WPG', p: 11, w: 3, l: 7, nr: 1, pts: 7, nrr: '-0.588', form: ['L', 'L', 'W', 'L', 'L'] },
  { pos: 7, team: 'Edmonton Eagles', code: 'EDM', p: 11, w: 3, l: 8, nr: 0, pts: 6, nrr: '-0.921', form: ['L', 'L', 'L', 'W', 'L'] },
]

export const seasonSummary = [
  { label: 'League position', value: '1st' },
  { label: 'Points', value: '17' },
  { label: 'Net run rate', value: '+1.142' },
  { label: 'Wins', value: '8 / 11' },
]

export const teamStats = [
  { label: 'Highest total', value: '231/4', note: 'vs Edmonton Eagles' },
  { label: 'Lowest total', value: '138', note: 'vs Montreal Mariners' },
  { label: 'Average 1st-innings score', value: '187' },
  { label: 'Sixes hit', value: '112' },
  { label: 'Run rate (batting)', value: '9.64' },
  { label: 'Economy (bowling)', value: '7.48' },
]

export const fixtures = [
  { id: 1, week: 'Match 1', date: '2026-08-15', opponent: 'Toronto Titans', venue: 'Stanley Park Oval', home: true, result: 'Won by 18 runs' },
  { id: 2, week: 'Match 2', date: '2026-08-20', opponent: 'Calgary Chinooks', venue: 'McMahon Oval, Calgary', home: false, result: 'Won by 6 wickets' },
  { id: 3, week: 'Match 3', date: '2026-08-24', opponent: 'Montreal Mariners', venue: 'Stanley Park Oval', home: true, result: 'Lost by 9 runs' },
  { id: 4, week: 'Match 4', date: '2026-08-29', opponent: 'Edmonton Eagles', venue: 'Stanley Park Oval', home: true, result: 'Won by 72 runs' },
  { id: 5, week: 'Match 5', date: '2026-09-03', opponent: 'Winnipeg Whiteouts', venue: 'Red River Ground, Winnipeg', home: false, result: 'No result' },
  { id: 6, week: 'Match 6', date: '2026-09-07', opponent: 'Brampton Blazers', venue: 'Brampton Park', home: false, result: 'Won by 4 wickets' },
  { id: 7, week: 'Match 7', date: '2026-09-12', opponent: 'Toronto Titans', venue: 'Maple Leaf Ground, Toronto', home: false, result: 'Lost by 3 wickets' },
  { id: 8, week: 'Match 8', date: '2026-09-18', opponent: 'Calgary Chinooks', venue: 'Stanley Park Oval', home: true, result: 'Won by 31 runs' },
  { id: 9, week: 'Match 9', date: '2026-09-25', opponent: 'Montreal Mariners', venue: 'Parc Jarry, Montreal', home: false, result: 'Won by 7 wickets' },
  { id: 10, week: 'Match 10', date: '2026-10-02', opponent: 'Edmonton Eagles', venue: 'Eagles Ground, Edmonton', home: false, result: 'Won by 22 runs' },
  { id: 11, week: 'Match 11', date: '2026-10-11', opponent: 'Winnipeg Whiteouts', venue: 'Stanley Park Oval', home: true, result: 'Won by 5 wickets' },
  { id: 12, week: 'Match 12', date: '2026-10-17', time: '7:00 PM PT', opponent: 'Brampton Blazers', venue: 'Stanley Park Oval', home: true },
  { id: 13, week: 'Match 13', date: '2026-10-22', time: '4:30 PM PT', opponent: 'Toronto Titans', venue: 'Maple Leaf Ground, Toronto', home: false },
  { id: 14, week: 'Match 14', date: '2026-10-27', time: '7:00 PM PT', opponent: 'Calgary Chinooks', venue: 'Stanley Park Oval', home: true },
  { id: 15, week: 'Qualifier 1', date: '2026-11-03', time: '7:00 PM PT', opponent: 'TBD', venue: 'Stanley Park Oval', home: true },
  { id: 16, week: 'Final', date: '2026-11-10', time: '6:00 PM PT', opponent: 'TBD', venue: 'BC Place (cricket configuration)', home: true },
]

export const upcomingFixtures = fixtures.filter((f) => !f.result)
export const results = fixtures.filter((f) => f.result)

export const formatDate = (iso, opts = { weekday: 'short', month: 'short', day: 'numeric' }) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-CA', opts)
