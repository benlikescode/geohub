import { ObjectId } from 'mongodb'

export type RecentSearchItem = {
  type: 'term' | 'user' | 'map'
  term?: string
  userId?: ObjectId
  mapId?: ObjectId
  createdAt: Date
}

type RecentSearch = {
  _id: ObjectId
  userId: ObjectId
  searches: RecentSearchItem[]
}

export default RecentSearch
