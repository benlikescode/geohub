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
  avgScore?: number
  usersPlayed?: number
  dailyChallengeId?: ObjectId
}

export default MapLeaderboard
