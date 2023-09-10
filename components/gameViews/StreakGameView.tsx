import { FC } from 'react'
import { StreakContinueCard, StreakEndedCard } from '@components/resultCards'
import { StreaksResultMap } from '@components/StreaksResultMap'
import { StreetView } from '@components/StreetView'
import { GameType, GameViewType } from '@types'
import { StyledGameView } from './'

type Props = {
  gameData: GameType
  setGameData: (gameData: GameType) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StreakGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  return (
    <StyledGameView>
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
        </div>
      </div>
    </StyledGameView>
  )
}

export default StreakGameView
