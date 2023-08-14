/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { FC } from 'react'
import Game from '@backend/models/game'
import { Button } from '@components/system'
import { useAppDispatch } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import { GameViewType } from '@types'
import countries from '@utils/constants/countries'
import { ResultsWrapper } from '../ResultsWrapper'
import { StyledStreakResults } from './'

type Props = {
  gameData: Game
  setView: (view: GameViewType) => void
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
                You guessed <span>{guessedCountry}</span>
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${guessedCountryCode?.toUpperCase()}.svg`}
                  alt={guessedCountry}
                />
                but the correct country was <span>{correctCountry}</span>
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${correctCountryCode?.toUpperCase()}.svg`}
                  alt={correctCountry}
                />
              </div>
            ) : (
              <div className="correct-country">
                The correct country was <span>{correctCountry}</span>
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${correctCountryCode?.toUpperCase()}.svg`}
                  alt={correctCountry}
                />
              </div>
            )}

            <p className="streak-count">
              {`Your streak ended at ${gameData.streak} ${gameData.streak === 1 ? 'country' : 'countries'}`}.
            </p>
          </div>
        )}

        {hasStreak ? (
          <div className="actionButtons">
            <Button onClick={handleNextRound}>Play Next Round</Button>
          </div>
        ) : (
          <div className="actionButtons">
            <Link href={`/streaks`}>
              <a>
                <Button>Play Again</Button>
              </a>
            </Link>

            <Button variant="solidGray" onClick={() => setView('FinalResults')}>
              View Summary
            </Button>
          </div>
        )}
      </StyledStreakResults>
    </ResultsWrapper>
  )
}

export default StreakResults
