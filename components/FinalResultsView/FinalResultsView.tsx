import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledFinalResultsView } from '.'
import { selectGame } from '../../redux/game'
import { LocationType } from '../../types'
import { getDistance, getPoints } from '../../utils/helperFunctions'
import { FinalResultsCard } from '../FinalResultsCard'
import { ResultMap } from '../ResultMap'
import { ResultsCard } from '../ResultsCard'

type Props = {
  guessedLocations: LocationType[]
  actualLocations: LocationType[]
}

const FinalResultsView: FC<Props> = ({ guessedLocations, actualLocations }) => {
  const game = useSelector(selectGame)

  return (
    <StyledFinalResultsView>
      <ResultMap guessedLocations={guessedLocations} actualLocations={actualLocations} />
      <div className="resultsWrapper">
        <FinalResultsCard totalPoints={game.totalPoints}/>
      </div>
    </StyledFinalResultsView>
  )
}

export default FinalResultsView
