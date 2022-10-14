import { ObjectId } from 'mongodb'

import { LocationType } from './'
import User from './User'

type Map = {
  _id?: ObjectId | string
  name: string
  description?: string
  previewImg: string
  creator: 'GeoHub' | ObjectId
  usersPlayed: number
  avgScore?: number
  likes?: { numLikes: number; likedByUser: boolean }
  isPublished?: boolean
  createdAt?: Date
  locations?: LocationType[]
  // backwards compatibility
  locationCount: number
  creatorDetails: User
}

export default Map
