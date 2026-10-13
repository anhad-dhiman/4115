import { useLocation } from 'react-router-dom'
import { pageFor } from '../data/issue'
import { Folio } from './print'

// Wrapper for every inner page: sheet width + folio line taken from the contents.
export default function Spread({ children, className = '' }) {
  const { pathname } = useLocation()
  const page = pageFor(pathname)
  return (
    <article className={`sheet pt-8 ${className}`}>
      {page && <Folio kicker={page.kicker} page={page.page} />}
      {children}
    </article>
  )
}
