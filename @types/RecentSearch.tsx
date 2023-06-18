export type RecentSearchItem = {
  type: 'term' | 'user' | 'map'
  term?: string
  userId?: string
  mapId?: string
  createdAt: Date
}

type RecentSearch = {
  _id: string
  userId: string
  searches: RecentSearchItem[]
}

export default RecentSearch
