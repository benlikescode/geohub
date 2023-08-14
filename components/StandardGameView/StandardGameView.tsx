import { FC } from 'react'
import Game from '@backend/models/game'
import { StandardFinalResults, StandardResults } from '@components/resultCards'
import { ResultMap } from '@components/ResultMap'
import { StreetView } from '@components/StreetView'
import { GameViewType } from '@types'
import { StyledStandardGameView } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StandardGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  return (
    <StyledStandardGameView>
      <div className="play-wrapper" style={{ display: view === 'Game' ? 'block' : 'none' }}>
        <StreetView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      </div>

      <div
        className="results-wrapper"
        style={{ display: view === 'Result' || view === 'FinalResults' ? 'block' : 'none' }}
      >
        <ResultMap
          guessedLocations={gameData.guesses}
          actualLocations={gameData.rounds}
          round={gameData.round}
          resetMap={view === 'Result' || view === 'FinalResults'}
          isFinalResults={view === 'FinalResults'}
        />
        <div className="results-card-wrapper">
          {view === 'Result' ? (
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
          ) : (
            <StandardFinalResults gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
          )}
        </div>
      </div>
    </StyledStandardGameView>
  )
}

export default StandardGameView
