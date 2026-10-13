import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-green-700">404</p>
      <h1 className="mt-2 text-3xl font-bold text-navy">Page not found</h1>
      <p className="mt-2 text-muted">That page has been bowled out. Try one of the main sections instead.</p>
      <Link to="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  )
}
