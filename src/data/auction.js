// Auction data. Amounts in CAD. All figures fictional.

export const auctionEvents = [
  { id: 'mpl-mini-2026', title: 'MPL Mini Auction 2027', date: '2026-12-06', location: 'Vancouver Convention Centre',
    budget: 2_400_000, slots: 5, teams: ['VAN', 'TOR', 'MTL', 'CGY', 'EDM', 'WPG', 'BRA'], status: 'Upcoming' },
  { id: 'gsl-2027', title: 'Gulf Super League Draft', date: '2027-01-18', location: 'Dubai, UAE',
    budget: 1_800_000, slots: 8, teams: ['Dubai Vikings', '+ 5 league teams'], status: 'Upcoming' },
  { id: 'wml-2027', title: "Women's Maple League Auction", date: '2027-02-08', location: 'Toronto, ON',
    budget: 950_000, slots: 6, teams: ['VAN', 'TOR', 'MTL', 'CGY', 'WPG'], status: 'Registration open' },
]

export const auctionSummary = {
  event: 'MPL Mega Auction 2026',
  date: '2026-02-14',
  playersBought: 9,
  totalSpend: 6_820_000,
  purse: 7_500_000,
  topBuy: { player: 'Jasprit Bumrah', price: 1_650_000 },
}

// Results table: who bought whom, and for how much.
export const auctionResults = [
  { player: 'Jasprit Bumrah', role: 'Bowler', buyer: 'Vancouver Vikings', price: 1_650_000 },
  { player: 'Travis Head', role: 'Batter', buyer: 'Vancouver Vikings', price: 1_200_000 },
  { player: 'Heinrich Klaasen', role: 'Wicket-keeper', buyer: 'Vancouver Vikings', price: 1_050_000 },
  { player: 'Pat Cummins', role: 'Bowler', buyer: 'Toronto Titans', price: 1_400_000 },
  { player: 'Rachin Ravindra', role: 'All-rounder', buyer: 'Calgary Chinooks', price: 880_000 },
  { player: 'Hardik Pandya', role: 'All-rounder', buyer: 'Vancouver Vikings', price: 950_000 },
  { player: 'Phil Salt', role: 'Wicket-keeper', buyer: 'Montreal Mariners', price: 760_000 },
  { player: 'Kagiso Rabada', role: 'Bowler', buyer: 'Vancouver Vikings', price: 720_000 },
  { player: 'Wanindu Hasaranga', role: 'All-rounder', buyer: 'Montreal Mariners', price: 700_000 },
  { player: 'Harry Brook', role: 'Batter', buyer: 'Vancouver Vikings', price: 650_000 },
  { player: 'Naveen-ul-Haq', role: 'Bowler', buyer: 'Edmonton Eagles', price: 410_000 },
  { player: 'Marco Jansen', role: 'All-rounder', buyer: 'Vancouver Vikings', price: 380_000 },
  { player: 'Shimron Hetmyer', role: 'Batter', buyer: 'Brampton Blazers', price: 360_000 },
  { player: 'Kaleem Sana', role: 'Bowler', buyer: 'Vancouver Vikings', price: 120_000 },
  { player: 'Aaron Johnson', role: 'Batter', buyer: 'Vancouver Vikings', price: 100_000 },
  { player: 'Mark Wood', role: 'Bowler', buyer: 'Winnipeg Whiteouts', price: 540_000 },
]

export const formatCAD = (n) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1000)}K`
