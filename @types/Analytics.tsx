import { GameType, UserType } from './'

type Analytics = {
  counts: [{ title: string; count: number }]
  recentUsers: (Pick<UserType, '_id' | 'name' | 'avatar' | 'createdAt'> & { gamesPlayed: number })[]
  recentGames: (GameType & { userDetails: UserType })[]
  newUsersByDay: { count: number; date: string }[]
  gamesPlayedByDay: { count: number; date: string }[]
}

export default Analytics
