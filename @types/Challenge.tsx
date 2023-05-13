import { ObjectId } from 'mongodb'

import { GameSettingsType, LocationType, MapType } from './'

type Challenge = {
  id: ObjectId | string
  mapId: string
  gameSettings: GameSettingsType
  locations: LocationType[]
  creatorId: ObjectId | string
  creatorName: string
  creatorAvatar: { emoji: string; color: string }
  isDailyChallenge?: boolean
  mapDetails?: MapType[]
  mode: 'standard' | 'streak'
}

export default Challenge
