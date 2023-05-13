import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import Game from '@backend/models/game'
import countries from '@utils/constants/countries'
import { StreakCountryList } from '../../StreakCountryList'
import { Button } from '../../System'
import { ResultsWrapper } from '../ResultsWrapper'
import { StyledStreakFinalResults } from './'

type Props = {
  gameData: Game
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
