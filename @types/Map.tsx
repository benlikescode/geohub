import { ObjectId } from 'mongodb'

import { LocationType } from './'

type Map = {
  _id?: ObjectId
  slug: string | null // remove this in future -> official maps can use _id too
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
}

export default Map
