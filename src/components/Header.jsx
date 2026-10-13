import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import { mainNav } from '../data/club'

const linkClass = ({ isActive }) =>
  `relative px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'text-white after:absolute after:inset-x-3 after:-bottom-[17px] after:h-[3px] after:bg-green' : 'text-white/75 hover:text-white'
  }`

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 bg-navy shadow-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/season/fixtures" className="hidden btn-primary lg:inline-flex">
          Fixtures
        </NavLink>

        <button
          type="button"
          className="rounded-md p-2 text-white hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 bg-navy-800 lg:hidden">
          <ul className="container-page py-2">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-md px-3 py-3 text-base ${
                      isActive ? 'bg-white/10 font-semibold text-white' : 'text-white/80'
                    }`
                  }
                >
                  {item.label}
                  <Icon name="chevron" className="h-4 w-4 opacity-60" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
