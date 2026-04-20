import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGetCharacterByIdQuery } from '../features/rickmorty/rickMortyApi'
import FavoriteButton from '../components/FavoriteButton'

const statusStyle = {
  Alive:   { dot: 'bg-green-400', text: 'text-green-400', badge: 'bg-green-500/10 border-green-500/30' },
  Dead:    { dot: 'bg-red-400',   text: 'text-red-400',   badge: 'bg-red-500/10 border-red-500/30' },
  unknown: { dot: 'bg-gray-400',  text: 'text-gray-400',  badge: 'bg-gray-500/10 border-gray-500/30' },
}

function InfoRow({ label, value }) {
  if (!value || value === 'unknown') return null
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-rm-muted mb-0.5">{label}</p>
      <p className="text-rm-light text-sm font-medium">{value}</p>
    </div>
  )
}

export default function DetailPage() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const { data: character, isLoading, isError } = useGetCharacterByIdQuery(id)

  const prevId = Number(id) > 1   ? Number(id) - 1 : null
  const nextId = Number(id) < 826 ? Number(id) + 1 : null

  if (isLoading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 flex items-center justify-center gap-3 text-rm-muted">
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeLinecap="round" />
        </svg>
        <span>Opening dimension portal…</span>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🛸</p>
        <p className="text-rm-light font-medium text-lg">Character not found in this dimension.</p>
        <button onClick={() => navigate(-1)} className="mt-5 text-sm text-rm-muted hover:text-rm-light transition-colors">
          ← Go back
        </button>
      </main>
    )
  }

  const s = statusStyle[character.status] ?? statusStyle.unknown
  const episodeCount = character.episode.length
  const firstEp      = character.episode[0]?.split('/').pop()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 animate-slide-up">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-rm-muted hover:text-rm-light transition-colors">
          ← All Characters
        </Link>
        <div className="flex items-center gap-2 text-sm text-rm-muted">
          <FavoriteButton id={character.id} />
          <span className="text-xs">Favorite</span>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-rm-card rounded-3xl border border-rm-border overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-56 shrink-0">
            <img src={character.image} alt={character.name} className="w-full sm:h-full object-cover" />
          </div>
          <div className="p-7 flex flex-col gap-4 flex-1">
            <span className={`self-start flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${s.badge} ${s.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              {character.status}
            </span>

            <div>
              <h1 className="font-display text-4xl md:text-5xl tracking-widest text-rm-light leading-tight">
                {character.name}
              </h1>
              <p className="text-rm-muted mt-1">
                {character.species}{character.type ? ` · ${character.type}` : ''}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <InfoRow label="Gender"        value={character.gender} />
              <InfoRow label="Origin"        value={character.origin?.name} />
              <InfoRow label="Last seen"     value={character.location?.name} />
              <InfoRow label="First episode" value={firstEp ? `Episode ${firstEp}` : null} />
            </div>
          </div>
        </div>

        {/* Episodes */}
        <div className="px-7 py-5 border-t border-rm-border">
          <p className="text-[10px] uppercase tracking-widest text-rm-muted mb-3">
            Appeared in {episodeCount} episode{episodeCount !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {character.episode.slice(0, 20).map((epUrl) => {
              const epNum = epUrl.split('/').pop()
              return (
                <Link
                  key={epUrl}
                  to={`/episodes?highlight=${epNum}`}
                  className="px-2.5 py-1 rounded-lg text-xs bg-rm-dark text-rm-muted border border-rm-border hover:border-rm-green/30 hover:text-rm-green transition-colors"
                >
                  EP {epNum}
                </Link>
              )
            })}
            {episodeCount > 20 && (
              <span className="px-2.5 py-1 rounded-lg text-xs text-rm-muted italic">+{episodeCount - 20} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <div className="flex justify-between mt-6">
        {prevId
          ? <Link to={`/character/${prevId}`} className="px-5 py-2.5 rounded-xl bg-rm-card border border-rm-border hover:border-rm-green/40 text-sm transition-all">← #{prevId}</Link>
          : <span />}
        {nextId
          ? <Link to={`/character/${nextId}`} className="px-5 py-2.5 rounded-xl bg-rm-card border border-rm-border hover:border-rm-green/40 text-sm transition-all">#{nextId} →</Link>
          : <span />}
      </div>
    </main>
  )
}
