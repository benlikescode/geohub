import { DistanceType } from './'

type Guess = {
  lat: number
  lng: number
  points: number
  distance: DistanceType
  time: number
  timedOut?: boolean
  timedOutWithGuess?: boolean
  streakLocationCode?: string
}

export default Guess
