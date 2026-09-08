export type Piece = {
  id: number
  title: string
  artist: string
  price: string
  image: string
}

export async function fetchPieces(): Promise<Piece[]> {
  const response = await fetch('/api/pieces')

  if (!response.ok) {
    throw new Error('Failed to load pieces from database')
  }

  return response.json()
}
