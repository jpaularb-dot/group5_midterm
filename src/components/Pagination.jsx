export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null

  const getPages = () => {
    const delta = 2
    const range = []
    const result = []
    let last

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i)
      }
    }

    for (const i of range) {
      if (last && i - last === 2) result.push(last + 1)
      else if (last && i - last !== 1) result.push('…')
      result.push(i)
      last = i
    }
    return result
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-10 flex-wrap" aria-label="Pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-xl text-sm font-medium bg-rm-card border border-rm-border hover:border-rm-green/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        ← Prev
      </button>

      <div className="flex gap-1">
        {getPages().map((num, idx) =>
          num === '…' ? (
            <span key={`d${idx}`} className="px-2 py-2 text-rm-muted text-sm">…</span>
          ) : (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                num === page
                  ? 'bg-rm-green text-rm-dark font-semibold'
                  : 'bg-rm-card border border-rm-border hover:border-rm-green/40 text-rm-light'
              }`}
            >
              {num}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-xl text-sm font-medium bg-rm-card border border-rm-border hover:border-rm-green/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Next →
      </button>
    </nav>
  )
}
