import { GameSettingsType, GuessType, LocationType } from '@types'
import Map from './map'
import User from './user'

// TODO: update types
type Challenge = {
  id: string
  map: Map
  gameSettings: GameSettingsType
  rounds: LocationType[]
  guesses: GuessType[]
  player: User | string
}

export default Challenge
