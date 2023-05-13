import { FC, useEffect, useState } from 'react'
import { Game } from '@backend/models'
import { LightningBoltIcon } from '@heroicons/react/solid'
import { formatLargeNumber, formatTimeLeft } from '@utils/helperFunctions'
import { MapType } from '../../@types'
import { mailman } from '../../backend/utils/mailman'
import { setMapName, useAppDispatch, useAppSelector } from '../../redux-utils'
import { StyledGameStatus } from './'

type Props = {
  gameData: Game
  handleSubmitGuess: (timedOut?: boolean) => void
  hasCustomRoundLength?: boolean
}

const GameStatus: FC<Props> = ({ gameData, handleSubmitGuess, hasCustomRoundLength }) => {
  const timeLimit = gameData.gameSettings?.timeLimit
  const hasTimeLimit = gameData.gameSettings.timeLimit !== 0

  const [timeLeft, setTimeLeft] = useState(timeLimit)

  const dispatch = useAppDispatch()
  const game = useAppSelector((state) => state.game)

  useEffect(() => {
    if (gameData.round === 1) {
      getMapName()
    }
  }, [])

  const getMapName = async () => {
    const mapDetails = (await mailman(`maps/${gameData.mapId}`)) as MapType
    console.log('YOOOO', mapDetails)

    dispatch(setMapName(mapDetails.name))
  }

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
              {/* <span>{gameData.mapDetails?.name || gameData?.mapName}</span> */}
              <span>{game.mapName}</span>
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
                <span>{formatTimeLeft(timeLeft as number)}</span>
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
                <span>{formatTimeLeft(timeLeft as number)}</span>
              </div>
            </div>
          )}
        </>
      )}
    </StyledGameStatus>
  )
}

export default GameStatus
