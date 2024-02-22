import { ObjectId } from 'mongodb'

export type TopScore = {
  gameId: ObjectId
  userId: ObjectId
  totalPoints: number
  totalTime: number
}

type MapLeaderboard = {
  _id: ObjectId
  mapId: ObjectId | string
  scores: TopScore[]
}

export default MapLeaderboard
