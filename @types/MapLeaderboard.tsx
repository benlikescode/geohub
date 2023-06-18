type MapLeaderboard = {
  _id: string
  userId: string
  userName: string
  userAvatar: { emoji: string; color: string }
  gameId: string
  totalPoints?: number
  totalTime?: number
  streak?: number
  difficulty?: 'Normal' | 'Easy' | 'Challenging'
  countryCode?: string
  createdAt?: Date
  highlight?: boolean
}

export default MapLeaderboard
