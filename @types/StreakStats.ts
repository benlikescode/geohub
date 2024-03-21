import { TopScore } from '@backend/models'

type StreakStats = {
  avgScore: number
  locationCount: number
  countryCount: number
  usersPlayed: number
  scores: TopScore[]
}

export default StreakStats
