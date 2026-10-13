// News articles. All stories are fictional.
// tag is used for filtering and for linking to the Teams / Players sub-pages.

export const articles = [
  {
    slug: 'vikings-go-top-after-win-over-whiteouts',
    title: 'Vikings go top of the MPL after five-wicket win over Winnipeg',
    date: '2026-10-11', tag: 'Match report', author: 'Club Media',
    excerpt: 'A composed 61* from Shubman Gill saw the Vikings chase down 176 with an over to spare and move two points clear at the top.',
    body: [
      'The Vancouver Vikings moved two points clear at the top of the Maple Premier League on Sunday night, chasing down 176 against the Winnipeg Whiteouts with six balls to spare at Stanley Park Oval.',
      'Shubman Gill anchored the chase with an unbeaten 61 from 44 balls, sharing a 78-run stand with Heinrich Klaasen, whose 38 off 19 broke the game open in the 14th and 15th overs.',
      'Earlier, Rashid Khan returned figures of 3/21 to keep Winnipeg in check through the middle overs after a fast start from their openers.',
      '"We knew the pitch would slow down," said captain Jos Buttler. "Shubman played the situation perfectly and Klaasen did what he does. That\'s the kind of balance we\'ve been looking for all season."',
      'The Vikings host the Brampton Blazers on Friday, October 17.',
    ],
  },
  {
    slug: 'bumrah-named-player-of-the-month',
    title: 'Bumrah named MPL Player of the Month for September',
    date: '2026-10-04', tag: 'Players', author: 'Club Media',
    excerpt: 'Eleven wickets at an economy of 5.9 earn the fast bowler the league\'s monthly award.',
    body: [
      'Jasprit Bumrah has been named the Maple Premier League Player of the Month for September after taking eleven wickets in four matches at an economy rate of 5.9.',
      'His 4/17 against the Calgary Chinooks remains the best bowling figures of the season so far.',
    ],
  },
  {
    slug: 'cape-town-vikings-announce-head-coach',
    title: 'Cape Town Vikings confirm Mark Boucher as head coach',
    date: '2026-09-28', tag: 'Teams', author: 'Franchise Desk',
    excerpt: 'The franchise\'s South African side has its new head coach ahead of the Southern Cross T20 season.',
    body: [
      'The Cape Town Vikings have confirmed Mark Boucher as head coach on a two-year deal ahead of the 2027 Southern Cross T20 season.',
      'Boucher will work closely with the Vancouver coaching staff to share scouting and player development across the franchise.',
    ],
  },
  {
    slug: 'academy-graduates-sign-first-contracts',
    title: 'Two Academy graduates sign first professional contracts',
    date: '2026-09-20', tag: 'Teams', author: 'Club Media',
    excerpt: 'The Vikings Academy U-19 programme produces its fourth and fifth MPL players.',
    body: [
      'Two graduates of the Vikings Academy U-19 programme have signed their first professional contracts with the senior side.',
      'Both players will train with the first team for the remainder of the season.',
    ],
  },
  {
    slug: 'klaasen-fastest-fifty',
    title: 'Klaasen smashes fastest fifty in club history',
    date: '2026-08-30', tag: 'Players', author: 'Club Media',
    excerpt: 'A 16-ball half-century against Edmonton breaks a record that had stood since 2021.',
    body: [
      'Heinrich Klaasen reached fifty from just 16 balls against the Edmonton Eagles, the fastest half-century in Vikings history.',
      'He finished on 74 from 29 balls as the Vikings posted a club-record 231/4.',
    ],
  },
  {
    slug: 'mini-auction-date-confirmed',
    title: 'MPL Mini Auction date confirmed for December 6',
    date: '2026-09-08', tag: 'Club', author: 'Club Media',
    excerpt: 'The Vikings will enter with a $2.4M purse and five open slots.',
    body: [
      'The Maple Premier League has confirmed that the 2027 Mini Auction will take place at the Vancouver Convention Centre on December 6.',
      'The Vikings will enter with a remaining purse of $2.4M and five open squad slots.',
    ],
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
