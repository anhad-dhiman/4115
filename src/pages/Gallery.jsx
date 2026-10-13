import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Icon from '../components/Icon'
import { FilterBar, Placeholder, Badge } from '../components/ui'
import { galleryCategories, galleryItems } from '../data/gallery'
import { formatDate } from '../data/season'

const iconFor = { Matches: 'ball', Events: 'users', Training: 'trophy' }

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const items = galleryItems.filter((g) => filter === 'All' || g.category === filter)

  // Close the lightbox with Escape.
  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <>
      <PageHeader
        title="Gallery"
        description="Photos from match days, club events and training sessions."
        crumbs={[{ label: 'Gallery' }]}
      />

      <div className="container-page py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FilterBar label="Filter photos" options={galleryCategories} value={filter} onChange={setFilter} />
          <p className="text-sm text-muted" aria-live="polite">{items.length} photos</p>
        </div>

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setActive(g)}
                className="card group block w-full overflow-hidden text-left transition hover:shadow-md"
              >
                <Placeholder icon={iconFor[g.category]} label={g.title} tone={g.category === 'Training' ? 'green' : 'navy'} />
                <span className="block p-3">
                  <span className="block truncate text-sm font-medium text-ink group-hover:text-navy">{g.title}</span>
                  <span className="mt-1 block text-xs text-muted">{g.category} · {formatDate(g.date, { month: 'short', day: 'numeric' })}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white" onClick={(e) => e.stopPropagation()}>
            <Placeholder className="aspect-[16/9]" icon={iconFor[active.category]} label={active.title} tone={active.category === 'Training' ? 'green' : 'navy'} />
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <Badge tone="navy">{active.category}</Badge>
                <h2 className="mt-2 text-lg font-semibold text-navy">{active.title}</h2>
                <p className="text-sm text-muted">{formatDate(active.date, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <button type="button" autoFocus onClick={() => setActive(null)} className="rounded-md p-2 hover:bg-surface" aria-label="Close">
                <Icon name="close" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
