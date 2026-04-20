import { useGetCharactersQuery } from '../features/rickmorty/rickMortyApi'
import { useCharacterSearch } from '../hooks/useCharacterSearch'
import CharacterCard from '../components/CharacterCard'
import SearchBox from '../components/SearchBox'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'

function Spinner() {
  return (
    <div className="flex items-center justify-center h-64 gap-3 text-rm-muted">
      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeLinecap="round" />
      </svg>
      <span>Scanning the multiverse…</span>
    </div>
  )
}

export default function ListingPage() {
  const {
    inputValue, handleSearch,
    debouncedQuery,
    status, handleStatusChange,
    species, handleSpeciesChange,
    page, handlePageChange,
    resetFilters, hasActiveFilters,
  } = useCharacterSearch()

  const { data, isLoading, isFetching, isError } = useGetCharactersQuery({
    page,
    name:    debouncedQuery,
    status,
    species,
  })

  const characters = data?.results ?? []
  const totalPages = data?.info?.pages ?? 1
  const totalCount = data?.info?.count ?? 0

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-5xl md:text-7xl tracking-widest text-rm-light mb-1">
          CHARACTERS
        </h1>
        <p className="text-rm-muted text-sm">
          {hasActiveFilters
            ? `${totalCount} result${totalCount !== 1 ? 's' : ''} matching filters`
            : `${totalCount.toLocaleString()} characters across all dimensions`}
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 mb-8">
        <SearchBox value={inputValue} onChange={handleSearch} isSearching={isFetching && !isLoading} />
        <FilterBar
          status={status}           onStatusChange={handleStatusChange}
          species={species}         onSpeciesChange={handleSpeciesChange}
          hasActiveFilters={hasActiveFilters}
          onReset={resetFilters}
        />
      </div>

      {/* Loading */}
      {isLoading && <Spinner />}

      {/* Error / empty */}
      {isError && (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <span className="text-5xl">🛸</span>
          <p className="text-rm-light font-medium text-lg">No characters found</p>
          <p className="text-rm-muted text-sm">Try adjusting your search or filters.</p>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="mt-2 text-sm text-rm-green hover:underline">
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {!isLoading && !isError && characters.length > 0 && (
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-opacity duration-200 ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
          {characters.map((char) => (
            <CharacterCard key={char.id} {...char} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isError && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </main>
  )
}
