import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFavoriteIds } from '../features/favorites/favoritesSlice'

function PortalIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#00D26A" strokeWidth="2" opacity="0.3" />
      <circle cx="20" cy="20" r="13" stroke="#00D26A" strokeWidth="2" opacity="0.5" />
      <circle cx="20" cy="20" r="8"  stroke="#00D26A" strokeWidth="2" opacity="0.7" />
      <circle cx="20" cy="20" r="4"  fill="#00D26A" />
    </svg>
  )
}

export default function Navbar() {
  const { pathname }   = useLocation()
  const favoriteCount  = useSelector(selectFavoriteIds).length

  const navLink = (to, label, badge = null) => {
    const active = pathname === to
    return (
      <Link
        to={to}
        className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors ${
          active ? 'text-rm-green' : 'text-rm-muted hover:text-rm-light'
        }`}
      >
        {label}
        {badge !== null && badge > 0 && (
          <span className="ml-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rm-green text-rm-dark text-[10px] font-bold flex items-center justify-center">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-rm-dark/80 backdrop-blur-md border-b border-rm-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <PortalIcon className="w-8 h-8 group-hover:animate-spin" />
          <div className="leading-none">
            <span className="font-display text-2xl tracking-widest text-rm-green block">RICK & MORTY</span>
            <span className="text-[10px] text-rm-muted tracking-[0.2em] uppercase">Character Database</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {navLink('/',          'Characters')}
          {navLink('/episodes',  'Episodes')}
          {navLink('/favorites', 'Favorites', favoriteCount)}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rm-muted/40 hover:text-rm-muted text-xs transition-colors hidden sm:block"
          >
            API ↗
          </a>
        </nav>
      </div>
    </header>
  )
}
