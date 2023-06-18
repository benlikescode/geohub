import { GameSettingsType, LocationType, MapType } from './'

type Challenge = {
  id: string
  mapId: string
  gameSettings: GameSettingsType
  locations: LocationType[]
  creatorId: string
  creatorName: string
  creatorAvatar: { emoji: string; color: string }
  isDailyChallenge?: boolean
  mapDetails?: MapType
  mode: 'standard' | 'streak'
}

export default Challenge
