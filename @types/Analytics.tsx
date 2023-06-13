import { GameType, UserType } from './'

type Analytics = {
  counts: [{ title: string; count: number }]
  recentUsers: (Pick<UserType, '_id' | 'name' | 'avatar' | 'createdAt'> & { gamesPlayed: number })[]
  recentGames: (GameType & { userDetails: UserType })[]
}

export default Analytics
