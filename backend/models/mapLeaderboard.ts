import { ObjectId } from 'mongodb'

export type TopScores = {
  gameId: ObjectId
  userId: ObjectId
  totalPoints: number
  totalTime: number
}

type MapLeaderboard = {
  _id: ObjectId
  mapId: ObjectId
  scores: TopScores[]
}

export default MapLeaderboard
