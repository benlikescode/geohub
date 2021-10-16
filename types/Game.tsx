import { GameSettingsType, LocationType, RoundResultType } from "."

type Game = {
  id: string
  map: string
  round: number
  currGuess: LocationType,
  guessedLocations: LocationType[]
  actualLocations: LocationType[]
  roundTimes: number[]
  roundPoints: number
  totalPoints: number
  currView: 'Game' | 'Result' | 'FinalResults'
  compassHeading: number
  atStart: boolean
  gameSettings: GameSettingsType
  roundResults: RoundResultType[]
}

export default Game