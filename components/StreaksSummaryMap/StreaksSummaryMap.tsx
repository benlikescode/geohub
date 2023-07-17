/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import Game from '@backend/models/game'
import { Marker } from '@components/Marker'
import { LocationType } from '@types'
import { RESULT_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { POLYGON_STYLES } from '@utils/constants/polygonStyles'
import { formatPolygon, getMapsKey } from '@utils/helpers'
import { useAppSelector } from '../../redux-utils'
import { StyledStreaksSummaryMap } from './'

type Props = {
  gameData: Game
}

const StreaksSummaryMap: FC<Props> = ({ gameData }) => {
  const [actualMarkers, setActualMarkers] = useState<LocationType[]>([])

  const resultMapRef = useRef<google.maps.Map | null>(null)
  const user = useAppSelector((state) => state.user)

  // If locations change (because we toggle the view on challenge results) -> reload the markers
  useEffect(() => {
    if (!resultMapRef.current) return

    loadMapMarkers()
    resultMapRef.current.data.forEach((x) => resultMapRef.current?.data.remove(x))
    loadCountryGeojson(resultMapRef.current)
  }, [gameData])

  const loadMapMarkers = () => {
    setActualMarkers(gameData.rounds.slice(0, gameData.round - 1))
  }

  const loadCountryGeojson = async (map: google.maps.Map) => {
    const { default: countryBounds } = await import('@utils/constants/countryBounds.json')

    const bounds = countryBounds as any
    const actualLocations = gameData.rounds.slice(0, gameData.round - 1)

    // Remove duplicate countries so we dont add multiple layers of the same country
    const seen = new Set()

    const uniqueLocations = actualLocations.filter((loc) => {
      const duplicate = seen.has(loc.countryCode)
      seen.add(loc.countryCode)
      return !duplicate
    })

    uniqueLocations.map((actualLocation) => {
      const { countryCode } = actualLocation

      if (!countryCode) return

      const countryCodeLowerCase = countryCode.toLowerCase()
      const polygon = formatPolygon(bounds[countryCodeLowerCase], { code: countryCodeLowerCase })

      map.data.addGeoJson(polygon)
    })

    map.data.setStyle((feature: google.maps.Data.Feature) => {
      const code = feature.getProperty('code')
      const mostRecentRoundCode = actualLocations[actualLocations.length - 1].countryCode
      const isMostRecentRound = code?.toLowerCase() === mostRecentRoundCode?.toLowerCase()

      return POLYGON_STYLES[isMostRecentRound ? 'incorrect' : 'correct']
    })
  }

  return (
    <StyledStreaksSummaryMap>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: getMapsKey(user.mapsAPIKey) }}
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
          {actualMarkers.map((marker, idx) => (
            <Marker
              key={idx}
              type="actual"
              lat={marker.lat}
              lng={marker.lng}
              roundNumber={idx + 1}
              isFinalResults={false}
            />
          ))}
        </GoogleMapReact>
      </div>
    </StyledStreaksSummaryMap>
  )
}
export default StreaksSummaryMap
