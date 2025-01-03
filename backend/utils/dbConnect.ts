import { Collection, Db, MongoClient } from 'mongodb'
import { RecentSearch, UserBansType, FeatureFlagsType } from '@types'
import { MapLeaderboard } from '@backend/models'

export const collections: {
  users?: Collection
  games?: Collection
  challenges?: Collection
  maps?: Collection
  mapLikes?: Collection
  locations?: Collection
  userLocations?: Collection
  recentSearches?: Collection<RecentSearch>
  passwordResets?: Collection
  featureFlags?: Collection<FeatureFlagsType>
  mapLeaderboard?: Collection<MapLeaderboard>
  userBans?: Collection<UserBansType>
  analytics?: Collection
} = {}

const MONGO_URI = process.env.MONGO_URI as string

let cachedDb: Db | null = null

const client = new MongoClient(MONGO_URI)

export const dbConnect = async () => {
  if (cachedDb) {
    console.log('Using existing DB connection')
    return cachedDb
  }

  try {
    const dbConnection = await client.connect()
    const db = dbConnection.db(process.env.DB_NAME)

    console.log('Using new DB connection')

    cachedDb = db

    collections.users = db.collection('users')
    collections.games = db.collection('games')
    collections.challenges = db.collection('challenges')
    collections.maps = db.collection('maps')
    collections.mapLikes = db.collection('mapLikes')
    collections.locations = db.collection('locations')
    collections.userLocations = db.collection('userLocations')
    collections.recentSearches = db.collection('recentSearches')
    collections.passwordResets = db.collection('passwordResets')
    collections.featureFlags = db.collection('featureFlags')
    collections.mapLeaderboard = db.collection('mapLeaderboard')
    collections.userBans = db.collection('userBans')
    collections.analytics = db.collection('analytics')

    return cachedDb
  } catch (err) {
    console.log(err)
  }
}
