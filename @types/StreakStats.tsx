import { TopScore } from '@backend/models'

type StreakStats = {
  avgStreak: number
  locationCount: number
  countryCount: number
  usersPlayed: number
  scores: TopScore[]
}

export default StreakStats
