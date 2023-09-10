import { ObjectId } from 'mongodb'
import { GameSettingsType, LocationType } from '@types'

type Challenge = {
  _id: ObjectId
  mapId: ObjectId
  creatorId: ObjectId | string
  mode: 'standard' | 'streak'
  gameSettings: GameSettingsType
  locations: LocationType[]
  isDailyChallenge?: boolean
}

export default Challenge
