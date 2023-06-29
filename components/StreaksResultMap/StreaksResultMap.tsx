/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import Game from '@backend/models/game'
import { Marker } from '@components/Marker'
import { LocationType } from '@types'
import countryBounds from '@utils/constants/countryBounds.json'
import { POLYGON_STYLES } from '@utils/constants/polygonStyles'
import { formatPolygon } from '@utils/helpers'
import { useAppSelector } from '../../redux-utils'
import getMapsKey from '../../utils/helpers/getMapsKey'
import { StyledStreaksResultMap } from './'

type Props = {
  gameData: Game
}

const ResultMap: FC<Props> = ({ gameData }) => {
  const [actualMarker, setActualMarker] = useState<LocationType>()

  const guessedCountry = gameData.guesses[gameData.guesses.length - 1]
  const actualCountry = gameData.rounds[gameData.round - 2]

  const resultMapRef = useRef<google.maps.Map | null>(null)
  const user = useAppSelector((state) => state.user)

  // If locations change (because we toggle the view on challenge results) -> reload the markers
  useEffect(() => {
    if (!resultMapRef.current) return

    loadMapMarkers()
  }, [guessedCountry, actualCountry])

  const loadMapMarkers = () => {
    setActualMarker(actualCountry)
  }

  const loadCountryGeojson = (map: google.maps.Map) => {
    const bounds = countryBounds as any

    const { countryCode } = actualCountry

    if (!countryCode) return

    const countryCodeLowerCase = countryCode.toLowerCase()
    const polygon = formatPolygon(bounds[countryCodeLowerCase], { code: countryCodeLowerCase })

    const isCorrect = gameData.state !== 'finished'

    map.data.addGeoJson(polygon)
    map.data.setStyle(POLYGON_STYLES[isCorrect ? 'correct' : 'incorrect'])

    getMapBounds(map)
  }

  const getMapBounds = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds()

    map.data.forEach((feature) => {
      const geometry = feature.getGeometry()

      if (geometry) {
        geometry.forEachLatLng(function (latlng) {
          bounds.extend(latlng)
        })
      }
    })

    map.fitBounds(bounds)
    map.setCenter(bounds.getCenter())
  }

  return (
    <StyledStreaksResultMap>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
          center={{ lat: actualCountry.lat, lng: actualCountry.lng }}
          zoom={4}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            loadMapMarkers()
            loadCountryGeojson(map)
            resultMapRef.current = map
          }}
          options={{
            clickableIcons: false,
            minZoom: 2,
            disableDefaultUI: true,
            gestureHandling: 'greedy',
          }}
        >
          {actualMarker && (
            <Marker
              type="actual"
              lat={actualMarker.lat}
              lng={actualMarker.lng}
              roundNumber={1}
              isFinalResults={false}
            />
          )}
        </GoogleMapReact>
      </div>
    </StyledStreaksResultMap>
  )
}
export default ResultMap
