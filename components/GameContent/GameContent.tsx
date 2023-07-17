import { FC, useEffect, useState } from 'react'
import Game from '@backend/models/game'
import { NewGuessMap } from '@components/NewGuessMap'
import { NewStreetview } from '@components/NewStreetview'
import { Loader } from '@googlemaps/js-api-loader'
import { getStreetviewOptions, GUESS_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { StyledGameContent } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: 'Game' | 'Result' | 'FinalResults'
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const GEOHUB_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

const GameContent: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null)
  const [renderMapRoot, setRenderMapRoot] = useState(true)

  const [google, setGoogle] = useState<typeof window.google | null>(null)

  useEffect(() => {
    // if (!mapRef || !mapRef.current) return

    const loader = new Loader({
      apiKey: GEOHUB_MAPS_KEY, // Replace with your own Google Maps API key
      version: 'weekly',
    })

    loader.load().then((google) => {
      const map = new google.maps.Map(document.getElementById('map-root') as HTMLElement, GUESS_MAP_OPTIONS)

      setGoogleMap(map)
      setGoogle(google)
    })
  }, [])

  return (
    <StyledGameContent>
      <>
        {renderMapRoot && <div id="map-root" style={{ height: '100%', width: '100%' }}></div>}

        {google && googleMap && (
          <div className="play-view">
            <NewStreetview
              google={google}
              googleMap={googleMap}
              gameData={gameData}
              setGameData={setGameData}
              setView={setView}
            />
          </div>
        )}
      </>
    </StyledGameContent>
  )
}

export default GameContent
