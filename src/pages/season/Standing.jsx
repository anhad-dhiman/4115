import { Fragment } from 'react'
import Spread from '../../components/Spread'
import { Headline, Byline, th, td } from '../../components/print'
import { standings } from '../../data/season'
import { club } from '../../data/club'

export default function Standing() {
  return (
    <Spread>
      <div className="mt-8">
        <Headline top="The" bottom="Table" />
        <Byline>{club.league}, {club.season}. Two points for a win, one for a no result. Top four reach the playoffs.</Byline>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full font-serif">
          <caption className="sr-only">{club.league} standings</caption>
          <thead>
            <tr>
              <th scope="col" className={th}>Pos</th>
              <th scope="col" className={th}>Team</th>
              <th scope="col" className={`${th} text-center`}>P</th>
              <th scope="col" className={`${th} text-center`}>W</th>
              <th scope="col" className={`${th} text-center`}>L</th>
              <th scope="col" className={`${th} hidden text-center sm:table-cell`}>NR</th>
              <th scope="col" className={`${th} text-right`}>NRR</th>
              <th scope="col" className={`${th} text-right`}>Pts</th>
              <th scope="col" className={`${th} hidden md:table-cell`}>Form</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((r) => {
              const us = r.code === 'VAN'
              return (
                <Fragment key={r.code}>
                  <tr className={us ? 'bg-paper-dark/70' : ''}>
                    <td className={`${td} font-display text-4xl font-black leading-none ${us ? 'text-green-700' : 'text-navy'}`}>{r.pos}</td>
                    <td className={`${td} align-middle`}>
                      <span className={`font-display text-xl ${us ? 'font-black' : 'font-bold'}`}>{r.team}</span>
                    </td>
                    <td className={`${td} text-center align-middle`}>{r.p}</td>
                    <td className={`${td} text-center align-middle`}>{r.w}</td>
                    <td className={`${td} text-center align-middle`}>{r.l}</td>
                    <td className={`${td} hidden text-center align-middle sm:table-cell`}>{r.nr}</td>
                    <td className={`${td} text-right align-middle tabular-nums`}>{r.nrr}</td>
                    <td className={`${td} text-right align-middle font-display text-2xl font-black`}>{r.pts}</td>
                    <td className={`${td} hidden align-middle md:table-cell`}>
                      <span className="font-label text-sm font-bold tracking-[0.3em]">
                        {r.form.map((f, i) => <span key={i} className={f === 'W' ? 'text-green-700' : 'text-ink-soft'}>{f}</span>)}
                      </span>
                    </td>
                  </tr>
                  {r.pos === 4 && (
                    <tr aria-hidden="true">
                      <td colSpan={9} className="p-0">
                        <div className="relative border-t-2 border-dashed border-green">
                          <span className="kicker absolute right-0 -top-3 bg-paper pl-2 text-green-700">Playoff line</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="caption mt-4">Form reads oldest to newest, last five matches. W = win, L = loss, N = no result.</p>
    </Spread>
  )
}
