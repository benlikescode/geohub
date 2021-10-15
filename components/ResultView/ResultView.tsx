import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledResultView } from '.'
import { selectGame } from '../../redux/game'
import { LocationType, ResultType, GameType } from '../../types'
import { getDistance, getPoints } from '../../utils/helperFunctions'
import { FinalResultsCard } from '../FinalResultsCard'
import { ResultMap } from '../ResultMap'
import { ResultsCard } from '../ResultsCard'

type Props = {
  isFinalResults?: boolean
}

const ResultView: FC<Props> = ({ isFinalResults }) => {
  const game: GameType = useSelector(selectGame)
  const guessedLocations = game.guessedLocations
  const actualLocations = game.actualLocations
  const round = game.round
  
  const getResultData = () => {
    const distance = getDistance(guessedLocations[round - 1], actualLocations[round - 1])
    const formattedDistance = getDistance(guessedLocations[round - 1], actualLocations[round - 1], true) as string
    const points = getPoints(distance as number)
    
    return {
      round, formattedDistance, points  
    }
  }

  return (
    <StyledResultView>
      <ResultMap guessedLocations={guessedLocations} actualLocations={actualLocations} isFinalResults={isFinalResults} />
      <div className="resultsWrapper">
        {isFinalResults ? 
          <FinalResultsCard totalPoints={game.totalPoints}/> :
          <ResultsCard result={getResultData()}/> 
        }       
      </div>
    </StyledResultView>
  )
}

export default ResultView
