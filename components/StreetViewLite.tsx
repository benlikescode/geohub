/* eslint-disable react/display-name */
import { FC, memo, useEffect, useRef, useState } from 'react'
import { StyledStreetViewLite } from './'
import { GameViewType, GoogleMapsConfigType } from '@types'
import { Game } from '@backend/models'
import { GameStatus } from '@components/GameStatus'
import { useStreetView } from '@utils/hooks/useStreetView'
import { GuessMap } from '@components/GuessMap'
import { StreaksGuessMap } from '@components/StreaksGuessMap'
import { MapIcon } from '@heroicons/react/outline'
import { LoadingPage } from '@components/layout'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StreetViewLite: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  const [mobileMapOpen, setMobileMapOpen] = useState(false)
  const [googleMapsConfig, setGoogleMapsConfig] = useState<GoogleMapsConfigType>()
  const [isLoading, setIsLoading] = useState(true)

  const location = useRef(gameData.rounds[gameData.round - 1])

  const { currGuess, setCurrGuess, countryStreakGuess, setCountryStreakGuess, handleSubmitGuess } = useStreetView({
    gameData,
    view,
    setGameData,
    setView,
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)

    return () => clearTimeout(timer)
  }, [currGuess, countryStreakGuess])

  return (
    <StyledStreetViewLite>
      {isLoading && <LoadingPage />}
      <StreetViewIframe location={location.current} />
      <GameStatus gameData={gameData} handleSubmitGuess={handleSubmitGuess} />

      {gameData.mode === 'standard' && (
        <div style={{ position: 'absolute', bottom: 4, right: 50 }}>
          <GuessMap
            currGuess={currGuess}
            setCurrGuess={setCurrGuess}
            handleSubmitGuess={handleSubmitGuess}
            mobileMapOpen={mobileMapOpen}
            closeMobileMap={() => setMobileMapOpen(false)}
            googleMapsConfig={googleMapsConfig}
            setGoogleMapsConfig={setGoogleMapsConfig}
            resetMap={view === 'Game'}
            gameData={gameData}
          />
        </div>
      )}

      {gameData.mode === 'streak' && (
        <div style={{ position: 'absolute', bottom: 4, right: 50 }}>
          <StreaksGuessMap
            countryStreakGuess={countryStreakGuess}
            setCountryStreakGuess={setCountryStreakGuess}
            handleSubmitGuess={handleSubmitGuess}
            mobileMapOpen={mobileMapOpen}
            closeMobileMap={() => setMobileMapOpen(false)}
            googleMapsConfig={googleMapsConfig}
            setGoogleMapsConfig={setGoogleMapsConfig}
            resetMap={view === 'Game'}
          />
        </div>
      )}
      <button className="toggle-map-button" onClick={() => setMobileMapOpen(true)}>
        <MapIcon />
      </button>
    </StyledStreetViewLite>
  )
}

type IframeProps = {
  location: any
}

const StreetViewIframe: FC<IframeProps> = memo(({ location }) => (
  <div className="streetview-iframe-wrapper">
    <iframe
      src={`https://www.google.com/maps/embed?pb=!4v${Date.now()}!6m8!1m7!1sgHjWQk96ZlAUz14frhTF5G!2m2!1d${
        location.lat
      }!2d${location.lng}!3f${location.heading}!4f${location.pitch}!5f${location.zoom}`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
))

export default StreetViewLite
