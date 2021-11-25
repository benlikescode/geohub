import * as mongoDB from 'mongodb'

export const collections: {
  users?: mongoDB.Collection,
  games?: mongoDB.Collection,
  maps?: mongoDB.Collection,
  bingoGames?: mongoDB.Collection,
  bingoSuggestions?: mongoDB.Collection
} = {}

export const dbConnect = async () => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URI as string)
    await client.connect()
  
    const db: mongoDB.Db = client.db(process.env.DB_NAME)
  
    const usersCollection: mongoDB.Collection = db.collection('users')
    const gamesCollection: mongoDB.Collection = db.collection('games')
    const mapsCollection: mongoDB.Collection = db.collection('maps')
    const bingoGames: mongoDB.Collection = db.collection('bingoGames')
    const bingoSuggestions: mongoDB.Collection = db.collection('bingoSuggestions')

    collections.users = usersCollection
    collections.games = gamesCollection
    collections.maps = mapsCollection
    collections.bingoGames = bingoGames
    collections.bingoSuggestions = bingoSuggestions
  
    console.log(`Successfully connected to database: ${db.databaseName}`)
}