import { ObjectId } from 'mongodb'
import { LocationType } from '.'
import User from './User'

type Map = {
  _id?: ObjectId | string
  name: string
  description?: string
  previewImg: string
  creator: 'GeoHub' | ObjectId
  isPublished?: boolean
  isDeleted?: boolean
  createdAt?: Date
  lastUpdatedAt?: Date
  locations?: LocationType[]
  creatorDetails?: User
  avgScore: number
  usersPlayed: number
  locationCount: number
  likes?: { numLikes: number; likedByUser: boolean }
  bounds?: { min: { lat: number; lng: number }; max: { lat: number; lng: number } }
  scoreFactor?: number
}

export default Map
