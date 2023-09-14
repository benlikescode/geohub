import { ObjectId } from 'mongodb'

type MapLeaderboard = {
  _id: ObjectId
  userId: ObjectId
  userName: string
  userAvatar: { emoji: string; color: string }
  gameId: ObjectId
  totalPoints?: number
  totalTime?: number
  streak?: number
  createdAt?: Date
  highlight?: boolean
}

export default MapLeaderboard
