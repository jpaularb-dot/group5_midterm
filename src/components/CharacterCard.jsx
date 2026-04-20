import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

const statusClass = {
  Alive:   'status-alive',
  Dead:    'status-dead',
  unknown: 'status-unknown',
}

const statusDot = {
  Alive:   'bg-green-400',
  Dead:    'bg-red-400',
  unknown: 'bg-gray-400',
}

export default function CharacterCard({ id, name, status, species, location, image }) {
  return (
    <Link
      to={`/character/${id}`}
      className="group bg-rm-card rounded-2xl overflow-hidden border border-rm-border hover:border-rm-green/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rm-green/5 animate-fade-in flex flex-col"
    >
      {/* Avatar */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Status badge */}
        <span className={`absolute top-2.5 left-2.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5 ${statusClass[status] ?? statusClass.unknown}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status] ?? statusDot.unknown}`} />
          {status}
        </span>
        {/* Favorite button */}
        <div className="absolute top-2 right-2">
          <FavoriteButton id={id} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-display text-xl tracking-wide text-rm-light leading-tight line-clamp-1">
          {name}
        </h3>
        <p className="text-rm-muted text-xs">{species}</p>

        <div className="mt-auto pt-3 border-t border-rm-border/60">
          <p className="text-[10px] uppercase tracking-widest text-rm-muted mb-0.5">Last seen</p>
          <p className="text-rm-light/70 text-xs line-clamp-1">{location.name}</p>
        </div>
      </div>

      <div className="h-0.5 bg-gradient-to-r from-rm-green to-rm-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  )
}
