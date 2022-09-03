import { ObjectId } from 'mongodb'

import { GameSettingsType, GuessType, LocationType } from './'

type Game = {
  id: ObjectId | string
  mapId: string
  mapName?: string
  userId: string
  round: number
  totalPoints: number
  totalDistance: number
  currView: 'Game' | 'Result' | 'FinalResults'
  guesses: GuessType[]
  rounds: LocationType[]
  gameSettings: GameSettingsType
}

export default Game