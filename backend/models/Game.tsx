import { ObjectId } from 'mongodb'
import { DistanceType, GameSettingsType, GuessType, LocationType } from '@types'

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

export default Game
