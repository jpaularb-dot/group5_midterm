const STATUS_OPTIONS = [
  { value: '',        label: 'Any Status' },
  { value: 'alive',   label: '🟢 Alive' },
  { value: 'dead',    label: '🔴 Dead' },
  { value: 'unknown', label: '⚪ Unknown' },
]

const SPECIES_OPTIONS = [
  { value: '',           label: 'Any Species' },
  { value: 'human',      label: '👤 Human' },
  { value: 'alien',      label: '👽 Alien' },
  { value: 'humanoid',   label: '🧬 Humanoid' },
  { value: 'robot',      label: '🤖 Robot' },
  { value: 'animal',     label: '🐾 Animal' },
  { value: 'mytholog',   label: '🐉 Mythological' },
  { value: 'unknown',    label: '❓ Unknown' },
]

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2.5 rounded-xl bg-rm-card border border-rm-border focus:border-rm-green/50 focus:outline-none text-rm-light text-sm cursor-pointer transition-colors hover:border-rm-border/80"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-rm-card">
            {o.label}
          </option>
        ))}
      </select>
      {/* chevron */}
      <svg
        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rm-muted pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

export default function FilterBar({
  status, onStatusChange,
  species, onSpeciesChange,
  hasActiveFilters, onReset,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect value={status}  onChange={onStatusChange}  options={STATUS_OPTIONS} />
      <FilterSelect value={species} onChange={onSpeciesChange} options={SPECIES_OPTIONS} />

      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="px-3 py-2.5 rounded-xl text-xs font-medium text-rm-muted border border-rm-border hover:border-red-500/40 hover:text-red-400 transition-all"
        >
          ✕ Clear filters
        </button>
      )}
    </div>
  )
}
