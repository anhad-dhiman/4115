import Spread from '../components/Spread'
import { Photo, Caption, Headline, Byline, PullQuote, SidebarBox, th, td } from '../components/print'
import { auctionEvents, auctionResults, auctionSummary, formatCAD } from '../data/auction'
import { formatDate } from '../data/season'

export default function Auction() {
  const ours = auctionResults.filter((r) => r.buyer === 'Vancouver Vikings').sort((a, b) => b.price - a.price)
  const ledger = [...auctionResults].sort((a, b) => b.price - a.price)

  return (
    <Spread>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* Main column */}
        <div>
          <Headline top="Inside the" bottom="Auction Room" />
          <Byline>By the Auction Desk · Photography: Club Media · {auctionSummary.event}, {formatDate(auctionSummary.date, { month: 'long', day: 'numeric', year: 'numeric' })}</Byline>

          <div className="body-copy dropcap mt-8 gap-8 md:columns-2">
            <p>
              The paddles went up early and they stayed up. By the time the hammer fell on the final lot of the {auctionSummary.event},
              the Vikings had spent {formatCAD(auctionSummary.totalSpend)} of a {formatCAD(auctionSummary.purse)} purse and come away
              with {auctionSummary.playersBought} new names — including the most expensive player in the room.
            </p>
            <p>
              That player was {auctionSummary.topBuy.player}. The bidding opened modestly, but once Toronto joined in it climbed in
              fifty-thousand-dollar steps until the Vikings table held its nerve at {formatCAD(auctionSummary.topBuy.price)}.
              "We came for one bowler," the head of recruitment said afterwards. "We weren't leaving without him."
            </p>
            <p>
              Behind the headline buy was a plan built months earlier: a top order with power ({ours[1].player}, {ours[2].player}),
              all-round depth ({ours.find((r) => r.role === 'All-rounder').player}) and, crucially, Canadian talent at the bottom of
              the price list. {ours[ours.length - 1].player} and {ours[ours.length - 2].player} cost a combined{' '}
              {formatCAD(ours[ours.length - 1].price + ours[ours.length - 2].price)}.
            </p>
          </div>

          <PullQuote cite="Head of Recruitment">We didn't just fill gaps in the squad — we built the spine of next season.</PullQuote>

          <div className="body-copy gap-8 md:columns-2">
            <p>
              Rivals were busy too. Toronto answered with Pat Cummins, Montreal doubled down on spin, and Calgary made the
              surprise buy of the night. But no table left the room with a stronger first eleven on paper.
            </p>
            <p>
              The next test comes in December, when the Vikings return to the Convention Centre with {formatCAD(auctionEvents[0].budget)}
              {' '}and {auctionEvents[0].slots} open slots. The shortlist, we're told, is already written.
            </p>
          </div>
        </div>

        {/* Right column: bleed photo, glance box, second photo */}
        <div className="space-y-8">
          <figure className="lg:-mr-8">
            <Photo className="aspect-[4/5]" motif="crowd" label="Bidding war for the club's marquee signing" />
            <Caption>Bidding war for the club's marquee signing.</Caption>
          </figure>

          <SidebarBox title="Auction at a Glance">
            <dl className="divide-y divide-rule font-serif">
              {[
                ['Players bought', auctionSummary.playersBought],
                ['Total spend', formatCAD(auctionSummary.totalSpend)],
                ['Top bid', `${formatCAD(auctionSummary.topBuy.price)} — ${auctionSummary.topBuy.player}`],
                ['Budget remaining', formatCAD(auctionSummary.purse - auctionSummary.totalSpend)],
                ['Auction date', formatDate(auctionSummary.date, { month: 'short', day: 'numeric', year: 'numeric' })],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 py-2.5">
                  <dt className="flex items-center gap-2 text-sm"><span className="h-1.5 w-1.5 rotate-45 bg-green" aria-hidden="true" />{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </SidebarBox>

          <figure>
            <Photo className="aspect-[16/10]" tone="paper" motif="stumps" label="The winning bid is logged" />
            <Caption>The winning bid is logged.</Caption>
          </figure>
        </div>
      </div>

      {/* The Ledger */}
      <section className="mt-16" aria-labelledby="ledger">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-4 border-ink pb-2">
          <h2 id="ledger" className="headline text-4xl">The Ledger</h2>
          <p className="font-serif italic text-ink-soft">Every lot sold, highest first. Vikings signings in bold.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-serif">
            <caption className="sr-only">Auction results: player, role, buyer and price</caption>
            <thead>
              <tr>
                <th scope="col" className={th}>Lot</th>
                <th scope="col" className={th}>Player</th>
                <th scope="col" className={`${th} hidden sm:table-cell`}>Role</th>
                <th scope="col" className={th}>Buyer</th>
                <th scope="col" className={`${th} text-right`}>Price</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((r, i) => {
                const us = r.buyer === 'Vancouver Vikings'
                return (
                  <tr key={r.player} className={us ? 'font-semibold' : ''}>
                    <td className={`${td} font-display text-ink-soft`}>{String(i + 1).padStart(2, '0')}</td>
                    <td className={td}>{r.player}</td>
                    <td className={`${td} hidden italic text-ink-soft sm:table-cell`}>{r.role}</td>
                    <td className={`${td} ${us ? 'text-navy' : ''}`}>{r.buyer}</td>
                    <td className={`${td} text-right tabular-nums`}>{formatCAD(r.price)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dates for the diary */}
      <section className="mt-16" aria-labelledby="diary">
        <h2 id="diary" className="headline border-b-4 border-ink pb-2 text-4xl">Dates for the Diary</h2>
        <ul className="grid md:grid-cols-3">
          {auctionEvents.map((e, i) => (
            <li key={e.id} className={`py-6 md:px-6 ${i > 0 ? 'border-t border-rule md:border-l md:border-t-0' : 'md:pl-0'}`}>
              <p className="font-display text-6xl font-black leading-none text-navy">{formatDate(e.date, { day: 'numeric' })}</p>
              <p className="kicker mt-1 text-green-700">{formatDate(e.date, { month: 'long', year: 'numeric' })} · {e.status}</p>
              <h3 className="mt-3 font-display text-2xl font-bold">{e.title}</h3>
              <p className="mt-1 font-serif italic text-ink-soft">{e.location}</p>
              <p className="mt-3 font-serif">
                Vikings budget <strong>{formatCAD(e.budget)}</strong> for <strong>{e.slots}</strong> slots. Teams: {e.teams.join(', ')}.
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Spread>
  )
}
