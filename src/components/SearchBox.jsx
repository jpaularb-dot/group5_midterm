export default function SearchBox({ value, onChange, isSearching }) {
  return (
    <div className="relative max-w-sm w-full">
      {/* Icon: spinner while searching, magnifier otherwise */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rm-muted pointer-events-none">
        {isSearching ? (
          <svg className="animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40" strokeLinecap="round" />
          </svg>
        ) : (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name…"
        className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-rm-card border border-rm-border focus:border-rm-green/50 focus:outline-none text-rm-light placeholder-rm-muted/50 transition-colors text-sm"
      />

      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-rm-muted hover:text-rm-light transition-colors text-xl leading-none"
          aria-label="Clear"
        >
          ×
        </button>
      )}
    </div>
  )
}
