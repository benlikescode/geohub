import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Game } from '@backend/models'
import { mailman } from '@backend/utils/mailman'
import { selectGame } from '@redux/game'
import { selectUser } from '@redux/user'
import { LocationType } from '@types'
import { formatLargeNumber, formatTimeLeft } from '@utils/helperFunctions'

import { StyledGameStatus } from './'

type Props = {
  gameData: Game
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
  setGameData: any
  currGuess: LocationType | null
  noTime?: boolean
  hasCustomRoundLength?: boolean
}

const GameStatus: FC<Props> = ({ gameData, setView, setGameData, currGuess, noTime, hasCustomRoundLength }) => {
  const startTime = noTime ? null : gameData.gameSettings?.timeLimit
  const [timeLeft, setTimeLeft] = useState(startTime)
  const hasTimeLimit = !noTime && gameData.gameSettings.timeLimit !== 0
  const game = useSelector(selectGame)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (hasTimeLimit) {
      if (timeLeft === 0) {
        handleTimeOver()
      }

      const timer = setTimeout(() => {
        setTimeLeft((timeLeft as number) - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [hasTimeLimit, timeLeft])

  const handleTimeOver = async () => {
    if (!startTime) return

    const guessTime = (new Date().getTime() - game.startTime) / 1000

    // If guess time is greater than the timeLimit (due to slight inaccuracies with startTime and timer)
    // then just set the guessTime to be the timeLimit (used all the time)
    const body = {
      guess: currGuess ? currGuess : { lat: 0, lng: 0 },
      guessTime: guessTime > startTime ? startTime : guessTime,
      localRound: gameData.round,
      userLocation: user.location,
      timedOut: true,
      timedOutWithGuess: currGuess != null,
    }

    const { status, res } = await mailman(`games/${gameData.id}`, 'PUT', JSON.stringify(body))

    if (status !== 400 && status !== 500) {
      setGameData({ id: res._id, ...res })
      setView('Result')
    }
  }

  return (
    <StyledGameStatus>
      <div className="infoSection mapName">
        <div className="label">
          <span>Map</span>
        </div>
        <div className="value">
          <span>{noTime ? 'Aerial' : gameData.mapDetails?.name}</span>
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

      {!noTime && hasTimeLimit && (
        <div className="infoSection">
          <div className="label">
            <span>Time</span>
          </div>
          <div className="value time">
            <span>{formatTimeLeft(timeLeft as number)}</span>
          </div>
        </div>
      )}
    </StyledGameStatus>
  )
}

export default GameStatus
