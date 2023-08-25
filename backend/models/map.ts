import { ObjectId } from 'mongodb'
import { LocationType } from '@types'

type Map = {
  _id?: ObjectId
  name: string
  description?: string
  previewImg: string
  creator: 'GeoHub' | ObjectId
  usersPlayed: number
  avgScore?: number
  likes?: { numLikes: number; likedByUser: boolean }
  isPublished?: boolean
  isDeleted?: boolean
  createdAt?: Date
  lastUpdatedAt?: Date
  locations?: LocationType[]
  // backwards compatibility
  locationCount: number
  bounds?: { min: { lat: number; lng: number }; max: { lat: number; lng: number } }
}

export default Map
