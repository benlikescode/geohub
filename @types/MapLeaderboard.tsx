import { ObjectId } from 'mongodb'

type MapLeaderboard = {
  userId: ObjectId
  userName: string
  userAvatar: { emoji: string; color: string }
  gameId: ObjectId
  totalPoints: number
  totalTime?: number
  difficulty?: 'Normal' | 'Easy' | 'Challenging'
  countryCode?: string
  createdAt?: Date
}

export default MapLeaderboard
