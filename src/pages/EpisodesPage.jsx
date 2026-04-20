import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetEpisodesQuery } from '../features/rickmorty/rickMortyApi'
import SearchBox from '../components/SearchBox'
import Pagination from '../components/Pagination'

// Parse "S01E02" from episode code
function parseEpisode(code = '') {
  const match = code.match(/S(\d+)E(\d+)/i)
  if (!match) return { season: '?', episode: code }
  return { season: `Season ${parseInt(match[1])}`, episode: `Ep ${parseInt(match[2])}` }
}

const SEASON_COLORS = [
  'border-rm-green/40 text-rm-green',
  'border-rm-cyan/40 text-rm-cyan',
  'border-purple-400/40 text-purple-400',
  'border-yellow-400/40 text-yellow-400',
  'border-pink-400/40 text-pink-400',
]

export default function EpisodesPage() {
  const [searchParams]  = useSearchParams()
  const highlightEp     = searchParams.get('highlight')

  const [inputValue,      setInputValue]      = useState('')
  const [debouncedQuery,  setDebouncedQuery]  = useState('')
  const [page,            setPage]            = useState(1)

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQuery(inputValue); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [inputValue])

  const { data, isLoading, isFetching, isError } = useGetEpisodesQuery({
    page,
    name: debouncedQuery,
  })

  const episodes   = data?.results ?? []
  const totalPages = data?.info?.pages ?? 1
  const totalCount = data?.info?.count ?? 0

  // Scroll to highlighted episode on load
  useEffect(() => {
    if (highlightEp) {
      const el = document.getElementById(`ep-${highlightEp}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [highlightEp, episodes])

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-5xl md:text-7xl tracking-widest text-rm-light mb-1">
          EPISODES
        </h1>
        <p className="text-rm-muted text-sm">
          {totalCount > 0
            ? `${totalCount} episode${totalCount !== 1 ? 's' : ''} across all seasons`
            : 'Loading episodes…'}
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchBox value={inputValue} onChange={setInputValue} isSearching={isFetching && !isLoading} />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center h-64 gap-3 text-rm-muted">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeLinecap="round" />
          </svg>
          <span>Loading episodes…</span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <span className="text-5xl">📺</span>
          <p className="text-rm-light font-medium">No episodes found</p>
          <p className="text-rm-muted text-sm">Try a different search.</p>
        </div>
      )}

      {/* Episodes grid */}
      {!isLoading && !isError && episodes.length > 0 && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-200 ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
          {episodes.map((ep) => {
            const { season, episode } = parseEpisode(ep.episode)
            const seasonNum = parseInt(ep.episode.match(/S(\d+)/i)?.[1] ?? 1)
            const colorClass = SEASON_COLORS[(seasonNum - 1) % SEASON_COLORS.length]
            const isHighlighted = String(ep.id) === highlightEp

            return (
              <div
                id={`ep-${ep.id}`}
                key={ep.id}
                className={`bg-rm-card rounded-2xl p-5 border transition-all duration-300 animate-fade-in ${
                  isHighlighted
                    ? 'border-rm-green shadow-lg shadow-rm-green/10'
                    : 'border-rm-border hover:border-rm-border/80'
                }`}
              >
                {/* Episode code badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-transparent ${colorClass}`}>
                    {ep.episode}
                  </span>
                  {isHighlighted && (
                    <span className="text-[10px] text-rm-green font-medium uppercase tracking-wider">
                      ← from character
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-display text-xl tracking-wide text-rm-light leading-tight mb-1">
                  {ep.name}
                </h3>

                {/* Season / episode labels */}
                <p className="text-rm-muted text-xs mb-3">{season} · {episode}</p>

                {/* Air date */}
                <div className="flex items-center gap-1.5 text-xs text-rm-muted/60 border-t border-rm-border/50 pt-3 mt-auto">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {ep.air_date}
                </div>

                {/* Character count */}
                <p className="text-[10px] text-rm-muted/50 mt-1">
                  {ep.characters.length} character{ep.characters.length !== 1 ? 's' : ''}
                </p>
              </div>
            )
          })}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
    </main>
  )
}
