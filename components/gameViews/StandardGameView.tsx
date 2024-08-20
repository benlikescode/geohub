import { FC } from 'react'
import Game from '@backend/models/game'
import { StandardFinalResults, StandardResults } from '@components/resultCards'
import { ResultMap } from '@components/ResultMap'
import { LeaderboardCard } from '@components/Results'
import { StreetView } from '@components/StreetView'
import { ChevronLeftIcon, ExternalLinkIcon } from '@heroicons/react/outline'
import { GameViewType, MapType } from '@types'
import { StyledGameView } from './'
import { StreetViewLite } from '@components/index'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { hideSVChangesLink } from '@redux/slices'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const RESULT_VIEWS = ['Result', 'FinalResults', 'Leaderboard']

const StandardGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
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

      <div className="results-wrapper" style={{ display: RESULT_VIEWS.includes(view) ? 'grid' : 'none' }}>
        <ResultMap
          guessedLocations={gameData.guesses}
          actualLocations={gameData.rounds}
          round={gameData.round}
          resetMap={view === 'Result' || view === 'FinalResults'}
          isFinalResults={view === 'FinalResults' || view === 'Leaderboard'}
        />

        <div className="results-card-wrapper">
          {view === 'Result' && (
            <StandardResults
              round={gameData.round}
              distance={gameData.guesses[gameData.guesses.length - 1].distance}
              points={gameData.guesses[gameData.guesses.length - 1].points}
              noGuess={
                gameData.guesses[gameData.guesses.length - 1].timedOut &&
                !gameData.guesses[gameData.guesses.length - 1].timedOutWithGuess
              }
              view={view}
              setView={setView}
            />
          )}

          {view === 'FinalResults' && (
            <StandardFinalResults gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
          )}

          {view === 'Leaderboard' && (
            <>
              <LeaderboardCard gameData={[gameData]} mapData={gameData.mapDetails as MapType} />

              <div className="back-btn" onClick={() => setView('FinalResults')}>
                <ChevronLeftIcon />
                <span>Back</span>
              </div>
            </>
          )}
        </div>
      </div>
    </StyledGameView>
  )
}

export default StandardGameView
