import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectFavoriteIds, clearFavorites } from '../features/favorites/favoritesSlice'
import { useGetCharactersByIdsQuery } from '../features/rickmorty/rickMortyApi'
import CharacterCard from '../components/CharacterCard'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-4 text-center">
      {/* Animated portal */}
      <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-30" fill="none">
        <circle cx="40" cy="40" r="36" stroke="#00D26A" strokeWidth="2" />
        <circle cx="40" cy="40" r="26" stroke="#00D26A" strokeWidth="2" />
        <circle cx="40" cy="40" r="16" stroke="#00D26A" strokeWidth="2" />
        <circle cx="40" cy="40" r="7"  fill="#00D26A" />
      </svg>
      <p className="text-rm-light font-display text-3xl tracking-widest">NO FAVORITES YET</p>
      <p className="text-rm-muted text-sm max-w-xs">
        Hit the ♥ button on any character card or detail page to save them here.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2.5 rounded-xl bg-rm-green text-rm-dark font-semibold text-sm hover:bg-rm-green/90 transition-colors"
      >
        Browse Characters
      </Link>
    </div>
  )
}

export default function FavoritesPage() {
  const dispatch    = useDispatch()
  const favoriteIds = useSelector(selectFavoriteIds)

  const { data: characters, isLoading, isError } = useGetCharactersByIdsQuery(
    favoriteIds,
    { skip: favoriteIds.length === 0 }
  )

  const isEmpty = favoriteIds.length === 0

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-5xl md:text-7xl tracking-widest text-rm-light mb-1">
            FAVORITES
          </h1>
          <p className="text-rm-muted text-sm">
            {isEmpty
              ? 'No saved characters'
              : `${favoriteIds.length} saved character${favoriteIds.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {!isEmpty && (
          <button
            onClick={() => dispatch(clearFavorites())}
            className="mt-2 px-4 py-2 rounded-xl text-sm text-rm-muted border border-rm-border hover:border-red-500/40 hover:text-red-400 transition-all"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Empty */}
      {isEmpty && <EmptyState />}

      {/* Loading */}
      {!isEmpty && isLoading && (
        <div className="flex items-center justify-center h-64 gap-3 text-rm-muted">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeLinecap="round" />
          </svg>
          <span>Loading your favorites…</span>
        </div>
      )}

      {/* Error */}
      {!isEmpty && isError && (
        <div className="text-center py-20">
          <p className="text-rm-light">Failed to load favorites. Try refreshing.</p>
        </div>
      )}

      {/* Grid */}
      {!isEmpty && !isLoading && !isError && characters && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {characters.map((char) => (
            <CharacterCard key={char.id} {...char} />
          ))}
        </div>
      )}
    </main>
  )
}
