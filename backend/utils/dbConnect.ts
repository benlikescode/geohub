import { Collection, Db, MongoClient } from 'mongodb'
import { RecentSearch } from '@types'
import { IS_PROD, MONGO_URI } from './secrets'

export const collections: {
  users?: Collection
  games?: Collection
  challenges?: Collection
  maps?: Collection
  bingoGames?: Collection
  bingoSuggestions?: Collection
  mapLikes?: Collection
  friends?: Collection
  locations?: Collection
  userLocations?: Collection
  recentSearches?: Collection<RecentSearch>
} = {}

let cachedDb: Db | null = null

const client = new MongoClient(MONGO_URI as string)

export const dbConnect = async () => {
  if (cachedDb) {
    console.log(`Using existing DB connection: ${IS_PROD ? 'Prod DB' : 'Local DB'}`)
    return cachedDb
  }

  try {
    const dbConnection = await client.connect()
    const db = dbConnection.db(process.env.DB_NAME)

    console.log(`Using new DB connection: ${IS_PROD ? 'Prod DB' : 'Local DB'}`)

    cachedDb = db

    collections.users = db.collection('users')
    collections.games = db.collection('games')
    collections.challenges = db.collection('challenges')
    collections.maps = db.collection('maps')
    collections.bingoGames = db.collection('bingoGames')
    collections.bingoSuggestions = db.collection('bingoSuggestions')
    collections.mapLikes = db.collection('mapLikes')
    collections.friends = db.collection('friends')
    collections.locations = db.collection('locations')
    collections.userLocations = db.collection('userLocations')
    collections.recentSearches = db.collection('recentSearches')

    return cachedDb
  } catch (err) {
    console.log(err)
  }
}
