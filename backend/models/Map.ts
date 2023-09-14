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
  bounds?: { min: { lat: number; lng: number }; max: { lat: number; lng: number } }
  scoreFactor?: number
}

export default Map
