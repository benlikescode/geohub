import { Collection, Db, MongoClient } from 'mongodb'

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
  aerialGames?: Collection
  locations?: Collection
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

    const usersCollection: Collection = db.collection('users')
    const gamesCollection: Collection = db.collection('games')
    const challengesCollection: Collection = db.collection('challenges')
    const mapsCollection: Collection = db.collection('maps')
    const bingoGames: Collection = db.collection('bingoGames')
    const bingoSuggestions: Collection = db.collection('bingoSuggestions')
    const mapLikes: Collection = db.collection('mapLikes')
    const friends: Collection = db.collection('friends')
    const aerialGames: Collection = db.collection('aerialGames')
    const locations: Collection = db.collection('locations')

    collections.users = usersCollection
    collections.games = gamesCollection
    collections.challenges = challengesCollection
    collections.maps = mapsCollection
    collections.bingoGames = bingoGames
    collections.bingoSuggestions = bingoSuggestions
    collections.mapLikes = mapLikes
    collections.friends = friends
    collections.aerialGames = aerialGames
    collections.locations = locations

    return cachedDb
  } catch (err) {
    console.log(err)
  }
}

export const closeDbConnection = async () => {
  try {
    await client.close()
  } catch (err) {
    console.log('Could not close DB connection')
    console.log(err)
  }
}
