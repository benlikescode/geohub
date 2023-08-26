import { ObjectId } from 'mongodb'
import { LocationType } from './'
import User from './User'

type Map = {
  _id?: ObjectId | string
  name: string
  description?: string
  previewImg: string
  creator: 'GeoHub' | ObjectId
  likes?: { numLikes: number; likedByUser: boolean }
  isPublished?: boolean
  isDeleted?: boolean
  createdAt?: Date
  lastUpdatedAt?: Date
  locations?: LocationType[]
  // backwards compatibility
  locationCount?: number
  creatorDetails?: User
  usersPlayed?: number
  avgScore?: number
  bounds?: { min: { lat: number; lng: number }; max: { lat: number; lng: number } }
  scoreFactor?: number
}

export default Map
