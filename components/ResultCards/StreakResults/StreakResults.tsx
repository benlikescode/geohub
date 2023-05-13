/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { FC, useState } from 'react'

import Game from '@backend/models/game'
import { Button } from '@components/System'
import { useAppDispatch } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import countries from '@utils/constants/countries'

import { ResultsWrapper } from '../ResultsWrapper'
import { StyledStreakResults } from './'

type Props = {
  gameData: Game
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const StreakResults: FC<Props> = ({ gameData, setView }) => {
  const dispatch = useAppDispatch()

  const hasStreak = gameData.state !== 'finished'

  const guessedCountryCode = gameData.guesses[gameData.guesses.length - 1].streakLocationCode
  const correctCountryCode = gameData.rounds[gameData.round - 2].countryCode

  const guessedCountry = countries.find((x) => x.code === guessedCountryCode)?.name
  const correctCountry = countries.find((x) => x.code === correctCountryCode)?.name

  const handleNextRound = () => {
    // Store start time
    dispatch(updateStartTime({ startTime: new Date().getTime() }))
    setView('Game')
  }

  return (
    <ResultsWrapper>
      <StyledStreakResults>
        {hasStreak ? (
          <div className="result-wrapper">
            <div className="correct-country">
              <span>{`The country was indeed ${correctCountry}`}</span>
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${correctCountryCode?.toUpperCase()}.svg`}
                alt={correctCountry}
              />
            </div>
            <p className="streak-count">
              {`Your streak is now at ${gameData.streak} ${gameData.streak === 1 ? 'country' : 'countries'}`}.
            </p>
          </div>
        ) : (
          <div className="result-wrapper">
            {guessedCountryCode ? (
              <div className="correct-country">
                {`You guessed `}
                <div className="answer-label">
                  <span> {guessedCountry}</span>
                  <img
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${guessedCountryCode?.toUpperCase()}.svg`}
                    alt={guessedCountry}
                  />
                </div>
                {` but the correct country was `}
                <div className="answer-label">
                  <span>{correctCountry}</span>
                  <img
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${correctCountryCode?.toUpperCase()}.svg`}
                    alt={correctCountry}
                  />
                </div>
              </div>
            ) : (
              <div className="correct-country">
                The correct country was
                <div className="answer-label">
                  <span>{correctCountry}</span>
                  <img
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${correctCountryCode?.toUpperCase()}.svg`}
                    alt={correctCountry}
                  />
                </div>
              </div>
            )}

            <p className="streak-count">
              {`Your streak ended at ${gameData.streak} ${gameData.streak === 1 ? 'country' : 'countries'}`}.
            </p>
          </div>
        )}

        {hasStreak ? (
          <div className="actionButtons">
            <Button type="solidPurple" callback={handleNextRound}>
              Play Next Round
            </Button>
          </div>
        ) : (
          <div className="actionButtons">
            {/* <Link
              href={
                gameData.mapId
                  ? IS_CHALLENGE
                    ? `/results/challenge/${gameData.challengeId}`
                    : `/results/${gameData.id}`
                  : '/'
              }
            >
              <a>
                <Button type="ghostLight">{gameData.mapId ? 'Detailed Results' : 'Return To Home'}</Button>
              </a>
            </Link> */}

            <Link href={`/streaks`}>
              <a>
                <Button type="solidPurple">Play Again</Button>
              </a>
            </Link>

            <Button type="solidGray" callback={() => setView('FinalResults')}>
              View Summary
            </Button>
          </div>
        )}
      </StyledStreakResults>
    </ResultsWrapper>
  )
}

export default StreakResults
