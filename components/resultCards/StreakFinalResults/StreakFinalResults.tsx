import Link from 'next/link'
import { FC } from 'react'
import { StreakCountryList } from '@components/StreakCountryList'
import { Button } from '@components/system'
import { GameType } from '@types'
import { ResultsWrapper } from '../'
import { StyledStreakFinalResults } from './'

type Props = {
  gameData: GameType
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const StreakFinalResults: FC<Props> = ({ gameData, setView }) => {
  return (
    <ResultsWrapper>
      <StyledStreakFinalResults>
        <div>
          <p className="streak-count">
            {`Your streak ended at ${gameData.streak} ${gameData.streak === 1 ? 'country' : 'countries'}`}.
          </p>

          <div className="country-list">
            <StreakCountryList gameData={gameData} />
          </div>

          <div className="actionButtons">
            <Link href="/streaks">
              <a>
                <Button>Play Again</Button>
              </a>
            </Link>

            <Link href="/">
              <a>
                <Button variant="solidGray">Return To Home</Button>
              </a>
            </Link>
          </div>
        </div>
      </StyledStreakFinalResults>
    </ResultsWrapper>
  )
}

export default StreakFinalResults
