import { createSlice } from '@reduxjs/toolkit'

// Load saved favorites from localStorage on startup
const loadFavorites = () => {
  try {
    const saved = localStorage.getItem('rm_favorites')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: loadFavorites(), // array of character IDs (numbers)
  },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload
      const idx = state.ids.indexOf(id)
      if (idx === -1) {
        state.ids.push(id)
      } else {
        state.ids.splice(idx, 1)
      }
      // Persist to localStorage
      localStorage.setItem('rm_favorites', JSON.stringify(state.ids))
    },
    clearFavorites(state) {
      state.ids = []
      localStorage.removeItem('rm_favorites')
    },
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer

// Selectors
export const selectFavoriteIds     = (state) => state.favorites.ids
export const selectIsFavorite = (id) => (state) => state.favorites.ids.includes(id)
