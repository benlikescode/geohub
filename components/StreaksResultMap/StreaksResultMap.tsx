/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import Game from '@backend/models/Game'
import { Marker } from '@components/Marker'
import { LocationType } from '@types'
import { RESULT_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { POLYGON_STYLES } from '@utils/constants/polygonStyles'
import { formatPolygon } from '@utils/helpers'
import { useAppSelector } from '../../redux-utils'
import getMapsKey from '../../utils/helpers/getMapsKey'
import { StyledStreaksResultMap } from './'

type Props = {
  gameData: Game
  resetMap?: boolean
}

const ResultMap: FC<Props> = ({ gameData, resetMap }) => {
  const [actualMarker, setActualMarker] = useState<LocationType>()
  const [countryBounds, setCountryBounds] = useState<any>()

  const guessedCountry = gameData.guesses[gameData.guesses.length - 1]
  const actualCountry = gameData.rounds[gameData.round - 2]

  const resultMapRef = useRef<google.maps.Map | null>(null)
  const prevCountriesRef = useRef<any>(null)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    loadCountryBounds()
  }, [])

  // If locations change (because we toggle the view on challenge results) -> reload the markers
  useEffect(() => {
    if (!resultMapRef.current) return

    loadMapMarkers()
  }, [guessedCountry, actualCountry])

  useEffect(() => {
    if (resetMap && resultMapRef.current && gameData.guesses.length > 0) {
      loadMapMarkers()
      getMapBounds(resultMapRef.current)
      loadCountryGeojson(resultMapRef.current)
    }
  }, [resetMap])

  const loadCountryBounds = async () => {
    const { default: countryBounds } = await import('@utils/constants/countryBounds.json')

    setCountryBounds(countryBounds)
  }

  const loadMapMarkers = () => {
    setActualMarker(actualCountry)
  }

  const loadCountryGeojson = async (map: google.maps.Map) => {
    const { countryCode } = actualCountry

    if (!countryCode) return

    const countryCodeLowerCase = countryCode.toLowerCase()
    const polygon = formatPolygon(countryBounds[countryCodeLowerCase], { code: countryCodeLowerCase })

    const isCorrect = gameData.state !== 'finished'

    removeCountryPolygons(map)

    const newCountry = map.data.addGeoJson(polygon)
    prevCountriesRef.current = newCountry

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

  const removeCountryPolygons = (map: google.maps.Map) => {
    prevCountriesRef.current &&
      prevCountriesRef.current.map((feature: any) => {
        map.data.remove(feature)
      })
  }

  return (
    <StyledStreaksResultMap>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
          center={{ lat: 0, lng: 0 }}
          zoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            loadMapMarkers()
            loadCountryGeojson(map)
            resultMapRef.current = map
          }}
          options={RESULT_MAP_OPTIONS}
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
