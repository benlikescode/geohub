import { LocationType } from './'
import User from './User'

type Map = {
  _id: string
  name: string
  description?: string
  previewImg: string
  creator: 'GeoHub' | string
  isPublished?: boolean
  isDeleted?: boolean
  createdAt?: Date
  lastUpdatedAt?: Date
  locations?: LocationType[]
  creatorDetails?: User
  bounds?: { min: { lat: number; lng: number }; max: { lat: number; lng: number } }
  scoreFactor?: number
}

export type MapWithStatsType = Map & {
  likes: { numLikes: number; likedByUser: boolean }
  avgScore: number
  locationCount: number
  usersPlayed: number
}

export default Map
