import { ObjectId } from 'mongodb'
import { LocationType } from '@types'

type Map = {
  _id?: ObjectId
  name: string
  description?: string
  previewImg: string
  creator: 'GeoHub' | ObjectId
  isPublished?: boolean
  isDeleted?: boolean
  createdAt?: Date
  lastUpdatedAt?: Date
  locations?: LocationType[]
  avgScore: number
  usersPlayed: number
  locationCount: number
  likes?: { numLikes: number; likedByUser: boolean }
  bounds?: { min: { lat: number; lng: number }; max: { lat: number; lng: number } }
  scoreFactor?: number
}

export default Map
