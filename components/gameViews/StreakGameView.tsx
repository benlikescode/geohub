import { FC, useState } from 'react'
import Game from '@backend/models/game'
import { StreakContinueCard, StreakEndedCard } from '@components/resultCards'
import { StreaksResultMap } from '@components/StreaksResultMap'
import { StreetView } from '@components/StreetView'
import { GameViewType } from '@types'
import { StyledGameView } from './'
import StreetViewLite from '@components/StreetViewLite'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StreakGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  const [useGoogleApi, setUseGoogleApi] = useState(false)

  return (
    <StyledGameView>
      {view === 'Game' && (
        <button className="toggle-streetview-btn" onClick={() => setUseGoogleApi(!useGoogleApi)}>
          Toggle Steetview Type
        </button>
      )}

      {useGoogleApi && (
        <div className="play-wrapper" style={{ display: view === 'Game' ? 'block' : 'none' }}>
          <StreetView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
        </div>
      )}

      {!useGoogleApi && view === 'Game' && (
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
