import { ObjectId } from 'mongodb'
import { DistanceType, GameSettingsType, GuessType, LocationType, MapType } from '@types'

type Game = {
  _id?: ObjectId
  mapId: ObjectId
  userId: ObjectId
  challengeId?: ObjectId
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
}

// type GameWithExtra = {
//   _id: ObjectId
//   mapId: ObjectId
//   userId: ObjectId
//   challengeId?: ObjectId | string | null
//   mode: 'standard' | 'streak'
//   gameSettings: GameSettingsType
//   guesses: GuessType[]
//   rounds: LocationType[]
//   round: number
//   totalPoints: number
//   totalDistance: DistanceType
//   totalTime: number
//   streak: number
//   state: 'started' | 'finished'
//   isDailyChallenge?: boolean
//   createdAt?: Date
//   userDetails?: User
//   mapDetails?: MapType
//   userName?: string
//   userAvatar?: { emoji: string; color: string }
// }

export default Game
