import { ObjectId } from 'mongodb'
import { DistanceType, GameSettingsType, GuessType, LocationType, MapType } from '.'

type Game = {
  id: ObjectId | string
  _id?: string // replace id with _id throughout app
  mapId: string
  mapName?: string
  userId: string
  round: number
  totalPoints: number
  totalDistance: DistanceType
  currView: 'Game' | 'Result' | 'FinalResults'
  guesses: GuessType[]
  rounds: LocationType[]
  gameSettings: GameSettingsType
  createdAt?: Date
  mapDetails?: MapType[]
  state: 'started' | 'finished'
  mode: 'standard' | 'streak'
  streak: number
  isDailyChallenge?: boolean
}

export default Game
