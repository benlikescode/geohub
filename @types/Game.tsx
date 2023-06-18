import { DistanceType, GameSettingsType, GuessType, LocationType, MapType, UserType } from './'

type Game = {
  _id?: string
  mapId: string
  mapName?: string
  userId: string
  userName?: string
  userAvatar?: { emoji: string; color: string }
  gameSettings: GameSettingsType
  rounds: LocationType[]
  guesses: GuessType[]
  round: number
  totalPoints: number
  totalDistance: DistanceType
  totalTime: number
  countryCode?: string
  challengeId?: string | null
  userDetails?: UserType
  createdAt?: Date
  mapDetails?: MapType[]
  state: 'started' | 'finished'
  mode: 'standard' | 'streak'
  streak: number
  isDailyChallenge?: boolean
}

export default Game
