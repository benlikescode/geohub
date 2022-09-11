import { ObjectId } from 'mongodb'

import { GameSettingsType, GuessType, LocationType } from '@types'

import User from './user'

type Game = {
  id?: ObjectId
  mapId: string
  mapObjectId: ObjectId
  mapName?: string
  userId: ObjectId
  userName?: string
  userAvatar?: string
  gameSettings: GameSettingsType
  rounds: LocationType[]
  guesses: GuessType[]
  round: number
  totalPoints: number
  totalDistance: number
  totalTime: number
  difficulty?: 'Normal' | 'Easy' | 'Challenging'
  countryCode?: string
  challengeId?: ObjectId | string | null
  userDetails?: [User]
  createdAt?: Date
}

export default Game
