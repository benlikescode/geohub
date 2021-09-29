import { FC } from 'react'
import { StyledResultView } from '.'
import { LocationType, ResultType } from '../../types'
import { ResultMap } from '../ResultMap'
import { ResultsCard } from '../ResultsCard'

type Props = {
  guessedLocation: LocationType
  actualLocation: LocationType
  currRound: number
}

const ResultView: FC<Props> = ({ guessedLocation, actualLocation, currRound }) => {

  const getResultData = () => {
    const result: ResultType = {
      round: currRound,
      distanceAway: getDistance(guessedLocation, actualLocation),
      points: getPoints()
    }
    return result
  }

  const getDistance = (loc1: LocationType, loc2: LocationType) => {
    const earthRadius = 3958.8

    const lat1Radians = loc1.lat * (Math.PI/180)
    const lat2Radians = loc2.lat * (Math.PI/180)

    const diffLat = lat2Radians - lat1Radians 
    const diffLng = (loc2.lng - loc1.lng) * (Math.PI/180)

    const distance = 2 * earthRadius * Math.asin(Math.sqrt(Math.sin(diffLat/2)*Math.sin(diffLat/2)+Math.cos(lat1Radians)*Math.cos(lat2Radians)*Math.sin(diffLng/2)*Math.sin(diffLng/2)))
    return Math.round(distance)
  }

  const getPoints = () => {
    const distance = getDistance(guessedLocation, actualLocation)
    const score = 5000 - distance

    if (score < 0) {
      return 0
    }

    return score
   
  }

  return (
    <StyledResultView>
      <ResultMap guessedLocations={[guessedLocation]} actualLocations={[actualLocation]} />
      <div className="resultsWrapper">
        <ResultsCard result={getResultData()}/>
      </div>
    </StyledResultView>
  )
}

export default ResultView
