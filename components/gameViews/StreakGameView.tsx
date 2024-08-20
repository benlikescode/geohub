import { FC } from 'react'
import Game from '@backend/models/game'
import { StreakContinueCard, StreakEndedCard } from '@components/resultCards'
import { StreaksResultMap } from '@components/StreaksResultMap'
import { StreetView } from '@components/StreetView'
import { GameViewType } from '@types'
import { StyledGameView } from './'
import StreetViewLite from '@components/StreetViewLite'
import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { hideSVChangesLink } from '@redux/slices'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StreakGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  return (
    <StyledGameView>
      {user.showSVChangesLink && (
        <Link href="/updates/streetview-changes" onClick={() => dispatch(hideSVChangesLink())}>
          <a className="news-btn">
            Changes to StreetView
            <ExternalLinkIcon />
          </a>
        </Link>
      )}

      {gameData.isUsingApi && (
        <div className="play-wrapper" style={{ display: view === 'Game' ? 'block' : 'none' }}>
          <StreetView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
        </div>
      )}

      {!gameData.isUsingApi && view === 'Game' && (
        <StreetViewLite gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      )}

      <div
        className="results-wrapper"
        style={{ display: view === 'Result' || view === 'FinalResults' ? 'grid' : 'none' }}
      >
        <StreaksResultMap gameData={gameData} resetMap={view === 'Result' || view === 'FinalResults'} />

        <div className="results-card-wrapper">
          {view === 'Result' && gameData.state === 'started' && (
            <StreakContinueCard gameData={gameData} view={view} setView={setView} />
          )}

          {view === 'Result' && gameData.state === 'finished' && (
            <StreakEndedCard gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
          )}
        </div>
      </div>
    </StyledGameView>
  )
}

export default StreakGameView
