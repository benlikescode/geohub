import { FC } from 'react'
import Game from '@backend/models/game'
import { StandardFinalResults, StandardResults } from '@components/resultCards'
import { ResultMap } from '@components/ResultMap'
import { StreetView } from '@components/StreetView'
import { StyledStandardGameView } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: 'Game' | 'Result' | 'FinalResults'
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const StandardGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  return (
    <StyledStandardGameView>
      <div className="play-wrapper" style={{ display: view === 'Game' ? 'block' : 'none' }}>
        <StreetView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      </div>

      {gameData.guesses.length > 0 && (
        <div className="results-wrapper" style={{ display: view === 'Result' ? 'block' : 'none' }}>
          <ResultMap
            guessedLocations={gameData.guesses}
            actualLocations={gameData.rounds}
            round={gameData.round}
            resetMap={view === 'Result'}
          />
          <div className="results-card-wrapper">
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
          </div>
        </div>
      )}

      {view === 'FinalResults' && (
        <div className="results-wrapper" style={{ display: view === 'FinalResults' ? 'block' : 'none' }}>
          <ResultMap
            guessedLocations={gameData.guesses}
            actualLocations={gameData.rounds}
            round={gameData.round}
            resetMap={false}
            isFinalResults
          />
          <div className="results-card-wrapper">
            <StandardFinalResults gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
          </div>
        </div>
      )}
    </StyledStandardGameView>
  )
}

export default StandardGameView
