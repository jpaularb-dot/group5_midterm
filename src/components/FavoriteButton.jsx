import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite, selectIsFavorite } from '../features/favorites/favoritesSlice'

export default function FavoriteButton({ id, className = '' }) {
  const dispatch    = useDispatch()
  const isFavorite  = useSelector(selectIsFavorite(id))

  const handleClick = (e) => {
    e.preventDefault()   // prevent Link navigation when inside a card
    e.stopPropagation()
    dispatch(toggleFavorite(id))
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
        ${isFavorite
          ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
          : 'bg-rm-dark/60 text-rm-muted border border-rm-border hover:border-red-500/40 hover:text-red-400'
        } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}
