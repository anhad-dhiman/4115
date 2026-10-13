import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="sheet py-24 text-center">
      <p className="kicker text-green-700">Page 404</p>
      <h1 className="headline mt-3 text-6xl">Torn Out</h1>
      <p className="deck mx-auto mt-3 max-w-md">This page seems to be missing from the issue. Head back to the cover or open the contents.</p>
      <Link to="/" className="ink-link mt-6 inline-block font-label text-sm font-bold uppercase tracking-wider">Back to the cover →</Link>
    </div>
  )
}
