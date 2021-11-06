import * as mongoDB from 'mongodb'

export const collections: {
  users?: mongoDB.Collection,
  games?: mongoDB.Collection,
  maps?: mongoDB.Collection
} = {}

export const dbConnect = async () => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.NEXT_PUBLIC_MONGO_URI as string)
    await client.connect()
  
    const db: mongoDB.Db = client.db(process.env.NEXT_PUBLIC_DB_NAME)
  
    const usersCollection: mongoDB.Collection = db.collection('users')
    const gamesCollection: mongoDB.Collection = db.collection('games')
    const mapsCollection: mongoDB.Collection = db.collection('maps')

    collections.users = usersCollection
    collections.games = gamesCollection
    collections.maps = mapsCollection
  
    console.log(`Successfully connected to database: ${db.databaseName}`)
}