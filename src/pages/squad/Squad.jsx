import { Link } from 'react-router-dom'
import Spread from '../../components/Spread'
import { Headline, Byline, Headshot, TurnTo, th, td } from '../../components/print'
import { players, getPlayer, previousSquads } from '../../data/players'
import { club } from '../../data/club'

const lineup = ['shubman-gill', 'travis-head', 'jos-buttler', 'harry-brook', 'heinrich-klaasen', 'glenn-maxwell', 'hardik-pandya', 'marco-jansen', 'rashid-khan', 'jasprit-bumrah', 'trent-boult']

export default function Squad() {
  const credits = [...players].sort((a, b) => a.number - b.number)
  const canadians = players.filter((p) => p.country === 'Canada').length

  return (
    <Spread>
      <div className="mt-8 grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-0">
        {/* Credits-style numbered roster */}
        <aside aria-labelledby="roster-h" className="lg:border-r-2 lg:border-ink lg:pr-8">
          <h2 id="roster-h" className="kicker border-b-2 border-ink pb-2 text-ink-soft">The {club.season} roster</h2>
          <ol className="divide-y divide-rule">
            {credits.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-2.5">
                <Headshot name={p.name} size="h-10 w-10 text-xs" />
                <span className="w-8 font-display text-xl font-black tabular-nums text-green-700">{p.number}</span>
                <span className="min-w-0">
                  <span className="block truncate font-serif font-semibold">
                    {p.name}{p.captain && <span className="kicker ml-1 text-navy">(C)</span>}
                  </span>
                  <span className="block font-serif text-xs italic text-ink-soft">{p.role}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>

        {/* Main column */}
        <div className="lg:pl-10">
          <Headline top="Meet the" bottom="Players" />
          <Byline>Sixteen players, six countries, one dressing room. Portraits by Club Media.</Byline>

          <div className="body-copy dropcap mt-8 max-w-2xl">
            <p>
              This is the squad that has taken the Vikings to the top of the {club.league}. It is built around a rare
              blend: a world-class pace attack led by Jasprit Bumrah, the leg-spin of Rashid Khan, and a batting order deep
              enough that Glenn Maxwell often walks out at number six.
            </p>
            <p>
              Captain Jos Buttler keeps wicket and sets the tone at the top. Alongside the overseas stars sit {canadians} Canadian
              players — proof that the academy pathway is starting to deliver.
            </p>
          </div>

          <section aria-labelledby="lineup-h" className="mt-10">
            <div className="flex items-end justify-between border-b-4 border-ink pb-2">
              <h2 id="lineup-h" className="headline text-3xl">Starting Lineup</h2>
              <p className="kicker text-ink-soft">vs Winnipeg · Oct 11</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-serif">
                <caption className="sr-only">Starting lineup in batting order</caption>
                <thead>
                  <tr>
                    <th scope="col" className={th}>No.</th>
                    <th scope="col" className={th}>Player</th>
                    <th scope="col" className={th}>Role</th>
                    <th scope="col" className={`${th} hidden sm:table-cell`}>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {lineup.map((id, i) => {
                    const p = getPlayer(id)
                    return (
                      <tr key={id}>
                        <td className={`${td} font-display font-black text-navy`}>{i + 1}</td>
                        <td className={`${td} font-semibold`}>{p.name}{p.captain ? ' (c, wk)' : ''}</td>
                        <td className={`${td} italic text-ink-soft`}>{p.role}</td>
                        <td className={`${td} hidden sm:table-cell`}>{p.country}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-10 grid gap-6 border-t-2 border-ink pt-6 sm:grid-cols-2">
            <div>
              <p className="font-serif text-ink-soft">Full profiles and season numbers for every player.</p>
              <div className="mt-2"><TurnTo to="/squad/current" page="4.1">Current Squad</TurnTo></div>
            </div>
            <div>
              <p className="font-serif text-ink-soft">
                The sides of {previousSquads.map((s) => s.season).join(', ')} — including the{' '}
                <Link to="/squad/previous" className="ink-link">2024 champions</Link>.
              </p>
              <div className="mt-2"><TurnTo to="/squad/previous" page="4.2">Previous Squads</TurnTo></div>
            </div>
          </div>
        </div>
      </div>
    </Spread>
  )
}
