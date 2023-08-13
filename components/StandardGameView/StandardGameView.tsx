import { FC, useRef, useState } from 'react'
import Game from '@backend/models/game'
import { StandardFinalResults, StandardResults } from '@components/resultCards'
import { ResultMap } from '@components/ResultMap'
import { StreetView } from '@components/StreetView'
import { GoogleMapsConfigType } from '@types'
import { StyledStandardGameView } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: 'Game' | 'Result' | 'FinalResults'
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const StandardGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  const [googleMapsConfig, setGoogleMapsConfig] = useState<GoogleMapsConfigType>()

  const polylinesRef = useRef<google.maps.Polyline[]>([])
  const markersRef = useRef<google.maps.Marker[]>([])

  const clearMapItems = () => {
    polylinesRef.current.map((polyline) => polyline.setMap(null))
    markersRef.current.map((marker) => marker.setMap(null))
  }

  return (
    <StyledStandardGameView>
      <div className="play-wrapper" style={{ display: view === 'Game' ? 'block' : 'none' }}>
        <StreetView
          gameData={gameData}
          setGameData={setGameData}
          view={view}
          setView={setView}
          googleMapsConfig={googleMapsConfig}
          setGoogleMapsConfig={setGoogleMapsConfig}
          clearMapItems={clearMapItems}
        />
      </div>

      {(view === 'Result' || view === 'FinalResults') && (
        <div className="results-wrapper">
          <ResultMap
            guessedLocations={gameData.guesses}
            actualLocations={gameData.rounds}
            round={gameData.round}
            resetMap={true}
            googleMapsConfig={googleMapsConfig}
            isFinalResults={view === 'FinalResults'}
            polylinesRef={polylinesRef}
            markersRef={markersRef}
            clearMapItems={clearMapItems}
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
      )}
    </StyledStandardGameView>
  )
}

export default StandardGameView
