import { ObjectId } from 'mongodb'
import { DistanceType, GameSettingsType, GuessType, LocationType, MapType, UserType } from './'

type Game = {
  id: ObjectId | string
  _id?: string
  mapId: string
  userId: string
  challengeId?: string
  mode: 'standard' | 'streak'
  gameSettings: GameSettingsType
  guesses: GuessType[]
  rounds: LocationType[]
  round: number
  totalPoints: number
  totalDistance: DistanceType
  totalTime: number
  streak: number
  state: 'started' | 'finished'
  isDailyChallenge?: boolean
  createdAt?: Date
  userDetails?: UserType
  mapDetails?: MapType
  userName?: string
  userAvatar?: { emoji: string; color: string }
}

export default Game
