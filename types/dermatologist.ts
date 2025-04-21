export interface DermatologistInfo {
  id: string
  name: string
  address: string
  distance: number
  rating: number
  totalRatings: number
  phone?: string
  website?: string
  openNow?: boolean
  openingHours?: string[]
  photoUrl?: string
} 