import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { fetchPieces, type Piece } from '../data/pieces'

function Collection() {
  const [pieces, setPieces] = useState<Piece[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchPieces()
      .then((data) => {
        if (isMounted) setPieces(data)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const toggleFavorite = (title: string) => {
    setFavorites((current) =>
      current.includes(title) ? current.filter((t) => t !== title) : [...current, title],
    )
  }

  if (loading) {
    return (
      <section className="bg-black text-white min-h-screen px-6 md:px-10 pt-32 md:pt-40 pb-24 flex items-center justify-center">
        <p className="text-white/60">Loading collection from database...</p>
      </section>
    )
  }

  return (
    <section className="bg-black text-white min-h-screen px-6 md:px-10 pt-32 md:pt-40 pb-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-instrument text-4xl md:text-6xl mb-4">The collection</h1>
        <p className="text-white/50 text-base md:text-lg mb-12 max-w-xl">
          Save what catches your eye, then reserve a private viewing to see it in person.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {pieces.map((piece) => {
            const isFavorite = favorites.includes(piece.title)
            return (
              <div key={piece.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5 border border-white/10 mb-4">
                  <img
                    src={piece.image}
                    alt={piece.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <button
                    type="button"
                    aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
                    onClick={() => toggleFavorite(piece.title)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite ? 'fill-white text-white' : 'text-white/80'}`}
                    />
                  </button>
                </div>
                <h3 className="text-white text-lg">{piece.title}</h3>
                <p className="text-white/50 text-sm mt-1">{piece.artist}</p>
                <p className="text-white/70 text-sm mt-1">{piece.price}</p>
                <Link
                  to={`/reserve?piece=${encodeURIComponent(piece.title)}`}
                  className="inline-block mt-3 text-sm text-white/70 border-b border-white/20 hover:text-white hover:border-white/60 transition-colors"
                >
                  Reserve a viewing
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Collection
