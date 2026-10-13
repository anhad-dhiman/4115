import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { Badge, SectionHeading, FilterBar } from '../components/ui'
import { StatTile } from '../components/season'
import { auctionEvents, auctionResults, auctionSummary, formatCAD } from '../data/auction'
import { formatDate } from '../data/season'

export default function Auction() {
  const [buyer, setBuyer] = useState('All buyers')
  const rows = useMemo(
    () =>
      auctionResults
        .filter((r) => buyer === 'All buyers' || (buyer === 'Vikings only' ? r.buyer === 'Vancouver Vikings' : r.buyer !== 'Vancouver Vikings'))
        .sort((a, b) => b.price - a.price),
    [buyer],
  )

  return (
    <>
      <PageHeader
        title="Auction"
        description="Upcoming auction events, the Vikings' budget for each, and the results of the last player auction."
        crumbs={[{ label: 'Auction' }]}
      />

      <div className="container-page space-y-14 py-10">
        <section aria-labelledby="upcoming">
          <SectionHeading id="upcoming" title="Upcoming auction events" />
          <ul className="grid gap-5 md:grid-cols-3">
            {auctionEvents.map((e) => (
              <li key={e.id} className="card flex flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-navy">{e.title}</h3>
                  <Badge tone={e.status === 'Upcoming' ? 'navy' : 'green'}>{e.status}</Badge>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2"><Icon name="calendar" className="h-4 w-4" />{formatDate(e.date, { month: 'long', day: 'numeric', year: 'numeric' })}</li>
                  <li className="flex items-center gap-2"><Icon name="pin" className="h-4 w-4" />{e.location}</li>
                </ul>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
                  <div>
                    <dt className="text-xs text-muted">Vikings budget</dt>
                    <dd className="text-xl font-bold text-navy">{formatCAD(e.budget)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Open slots</dt>
                    <dd className="text-xl font-bold text-navy">{e.slots}</dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <p className="text-xs text-muted">Participating teams</p>
                  <p className="mt-1 flex flex-wrap gap-1">
                    {e.teams.map((t) => <Badge key={t}>{t}</Badge>)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="summary">
          <SectionHeading id="summary" title={`${auctionSummary.event} — summary`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Players bought" value={auctionSummary.playersBought} />
            <StatTile label="Total spend" value={formatCAD(auctionSummary.totalSpend)} note={`of ${formatCAD(auctionSummary.purse)} purse`} />
            <StatTile label="Top buy" value={formatCAD(auctionSummary.topBuy.price)} note={auctionSummary.topBuy.player} />
            <StatTile label="Purse remaining" value={formatCAD(auctionSummary.purse - auctionSummary.totalSpend)} />
          </div>
        </section>

        <section aria-labelledby="results">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="results" className="text-xl font-bold text-navy sm:text-2xl">Auction results</h2>
            <FilterBar label="Filter results by buyer" options={['All buyers', 'Vikings only', 'Other teams']} value={buyer} onChange={setBuyer} />
          </div>
          <div className="card overflow-x-auto">
            <table className="table-base">
              <caption className="sr-only">Auction results: player, buyer and price</caption>
              <thead>
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col">Role</th>
                  <th scope="col">Buyer</th>
                  <th scope="col" className="text-right">Price (CAD)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.player}>
                    <td className="font-medium">{r.player}</td>
                    <td className="text-muted">{r.role}</td>
                    <td className={r.buyer === 'Vancouver Vikings' ? 'font-semibold text-green-700' : ''}>{r.buyer}</td>
                    <td className="text-right font-semibold tabular-nums">{formatCAD(r.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}
