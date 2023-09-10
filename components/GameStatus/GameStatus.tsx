import { FC, useEffect, useState } from 'react'
import { LightningBoltIcon } from '@heroicons/react/solid'
import { GameType } from '@types'
import { formatLargeNumber, formatStatusTimer } from '@utils/helpers'
import { StyledGameStatus } from './'

type Props = {
  gameData: GameType
  handleSubmitGuess: (timedOut?: boolean) => void
  hasCustomRoundLength?: boolean
}

const GameStatus: FC<Props> = ({ gameData, handleSubmitGuess, hasCustomRoundLength }) => {
  const timeLimit = gameData.gameSettings?.timeLimit
  const hasTimeLimit = gameData.gameSettings.timeLimit !== 0

  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    if (hasTimeLimit) {
      if (timeLeft === 0) {
        return handleSubmitGuess(true)
      }

      const timer = setTimeout(() => {
        setTimeLeft((timeLeft as number) - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [hasTimeLimit, timeLeft])

  return (
    <StyledGameStatus>
      {gameData.mode === 'standard' && (
        <>
          <div className="infoSection mapName">
            <div className="label">
              <span>Map</span>
            </div>
            <div className="value">
              <span>{gameData.mapDetails?.name}</span>
            </div>
          </div>

          <div className="infoSection">
            <div className="label">
              <span>Round</span>
            </div>
            <div className="value">
              <span>{`${gameData.round} / ${hasCustomRoundLength ? gameData.rounds.length : 5}`}</span>
            </div>
          </div>

          <div className="infoSection">
            <div className="label">
              <span>Points</span>
            </div>
            <div className="value">
              <span>{formatLargeNumber(gameData.totalPoints)}</span>
            </div>
          </div>

          {hasTimeLimit && (
            <div className="infoSection">
              <div className="label">
                <span>Time</span>
              </div>
              <div className="value time">
                <span>{formatStatusTimer(timeLeft as number)}</span>
              </div>
            </div>
          )}
        </>
      )}

      {gameData.mode === 'streak' && (
        <>
          <div className="streak-section">
            <LightningBoltIcon />
            {gameData.streak}
          </div>

          {hasTimeLimit && (
            <div className="infoSection">
              <div className="label">
                <span>Time</span>
              </div>
              <div className="value time">
                <span>{formatStatusTimer(timeLeft as number)}</span>
              </div>
            </div>
          )}
        </>
      )}
    </StyledGameStatus>
  )
}

export default GameStatus
