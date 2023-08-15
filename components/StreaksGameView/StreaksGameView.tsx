import { FC } from 'react'
import Game from '@backend/models/game'
import { StandardFinalResults, StandardResults, StreakFinalResults, StreakResults } from '@components/resultCards'
import { StreakContinueCard } from '@components/resultCards/StreakContinueCard'
import { StreakEndedCard } from '@components/resultCards/StreakEndedCard'
import { ResultMap } from '@components/ResultMap'
import { StreaksResultMap } from '@components/StreaksResultMap'
import { StreetView } from '@components/StreetView'
import { GameViewType } from '@types'
import { StyledStreaksGameView } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StreaksGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  return (
    <StyledStreaksGameView>
      <div className="play-wrapper" style={{ display: view === 'Game' ? 'block' : 'none' }}>
        <StreetView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      </div>

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

          {view === 'FinalResults' && (
            <StreakFinalResults gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
          )}
        </div>
      </div>
    </StyledStreaksGameView>
  )
}

export default StreaksGameView
