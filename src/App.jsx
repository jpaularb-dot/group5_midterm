import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ListingPage from './pages/ListingPage'
import DetailPage from './pages/DetailPage'
import EpisodesPage from './pages/EpisodesPage'
import FavoritesPage from './pages/FavoritesPage'

export default function App() {
  return (
    <div className="min-h-screen bg-rm-dark">
      <Navbar />
      <Routes>
        <Route path="/"             element={<ListingPage />} />
        <Route path="/character/:id" element={<DetailPage />} />
        <Route path="/episodes"     element={<EpisodesPage />} />
        <Route path="/favorites"    element={<FavoritesPage />} />
      </Routes>
    </div>
  )
}
