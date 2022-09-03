import { ObjectId } from 'mongodb'

import { User } from '@backend/models'

import { LocationType, UserType } from './'

type Map = {
  id: ObjectId | string
  slug: string | null
  name: string
  description: string
  previewImg: string
  creator: 'GeoHub' | string | User
  usersPlayed: number
  locationCount: number
  avgScore: number
  likes: number
  isPublished?: boolean
  createdAt?: Date
  customLocations?: LocationType[]
}

export default Map
