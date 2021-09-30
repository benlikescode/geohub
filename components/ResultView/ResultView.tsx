import { FC } from 'react'
import { StyledResultView } from '.'
import { LocationType, ResultType } from '../../types'
import { getDistance, getPoints } from '../../utils/helperFunctions'
import { ResultMap } from '../ResultMap'
import { ResultsCard } from '../ResultsCard'

type Props = {
  guessedLocation: LocationType
  actualLocation: LocationType
  currRound: number
}

const ResultView: FC<Props> = ({ guessedLocation, actualLocation, currRound }) => {
  
  const getResultData = () => {
    const distance = getDistance(guessedLocation, actualLocation)
    const points = getPoints(distance)
    
    return {
      round: currRound, 
      distanceAway: distance, 
      points: points   
    }
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
