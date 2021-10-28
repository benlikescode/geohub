import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledResultView } from '.'
import { selectGameNew } from '../../redux/gameNew'
import { LocationType, ResultType, GameType } from '../../types'
import { getDistance, getPoints } from '../../utils/helperFunctions'
import { FinalResultsCard } from '../FinalResultsCard'
import { ResultMap } from '../ResultMap'
import { ResultsCard } from '../ResultsCard'

type Props = {
  isFinalResults?: boolean
}

const ResultView: FC<Props> = ({ isFinalResults }) => {
  const gameNew = useSelector(selectGameNew)
  const guesses = gameNew.guesses
  const actual = gameNew.rounds

  return (
    <StyledResultView>
      <ResultMap guessedLocations={guesses} actualLocations={actual} isFinalResults={isFinalResults} />
      <div className="resultsWrapper">
        {isFinalResults ? 
          <FinalResultsCard totalPoints={gameNew.totalPoints} /> :
          <ResultsCard /> 
        }       
      </div>
    </StyledResultView>
  )
}

export default ResultView
