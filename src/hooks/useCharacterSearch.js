import { useState, useEffect } from 'react'

/**
 * Manages search + filter + page state for the listing page.
 * Any filter or search change resets page to 1.
 */
export function useCharacterSearch() {
  const [inputValue,     setInputValue]     = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [status,         setStatus]         = useState('')
  const [species,        setSpecies]        = useState('')
  const [page,           setPage]           = useState(1)

  // Debounce name input by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue)
      setPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [inputValue])

  const handleSearch = (value) => setInputValue(value)

  const handleStatusChange = (value) => {
    setStatus(value)
    setPage(1)
  }

  const handleSpeciesChange = (value) => {
    setSpecies(value)
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetFilters = () => {
    setInputValue('')
    setDebouncedQuery('')
    setStatus('')
    setSpecies('')
    setPage(1)
  }

  const hasActiveFilters = inputValue || status || species

  return {
    inputValue, handleSearch,
    debouncedQuery,
    status, handleStatusChange,
    species, handleSpeciesChange,
    page, handlePageChange,
    resetFilters,
    hasActiveFilters,
  }
}
