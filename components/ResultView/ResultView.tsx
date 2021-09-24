import { FC } from 'react'
import { StyledResultView } from '.'
import { ResultType } from '../../types'
import { ResultMap } from '../ResultMap'
import { ResultsCard } from '../ResultsCard'

const ResultView: FC = () => {

  const locations = [
    {lat: 40, lng: 45},
    {lat: 60, lng: 45},
    {lat: 80, lng: 45},
    {lat: -40, lng: 45},
    {lat: 45, lng: 75}
  ]

  const result: ResultType = {
    round: 3,
    distanceAway: 567,
    points: 100
  }

  return (
    <StyledResultView>
      <ResultMap locations={locations} />
      <div className="resultsWrapper">
        <ResultsCard result={result}/>
      </div>
    </StyledResultView>
  )
}

export default ResultView
