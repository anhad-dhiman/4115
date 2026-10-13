import { Link } from 'react-router-dom'
import Icon from './Icon'

// Title band used at the top of every inner page.
// `crumbs` = [{ label, to? }] — shows where the page sits in the hierarchy.
export default function PageHeader({ title, description, crumbs = [], children }) {
  const trail = [{ label: 'Home', to: '/' }, ...crumbs]
  return (
    <section className="border-b border-line bg-white">
      <div className="container-page py-8 sm:py-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
            {trail.map((c, i) => {
              const last = i === trail.length - 1
              return (
                <li key={c.label} className="flex items-center gap-1">
                  {c.to && !last ? (
                    <Link to={c.to} className="hover:text-navy hover:underline underline-offset-4">{c.label}</Link>
                  ) : (
                    <span aria-current={last ? 'page' : undefined} className={last ? 'font-medium text-ink' : ''}>{c.label}</span>
                  )}
                  {!last && <Icon name="chevron" className="h-3.5 w-3.5" />}
                </li>
              )
            })}
          </ol>
        </nav>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h1>
            {description && <p className="mt-2 max-w-2xl text-muted">{description}</p>}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
