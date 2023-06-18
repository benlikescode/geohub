/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import { Marker } from '@components/Marker'
import { GameType, LocationType } from '@types'
// import countryBounds from '@utils/constants/countryBounds.json'
import { getMapsKey } from '@utils/helpers'
import { useAppSelector } from '../../redux-utils'
import { StyledStreaksSummaryMap } from './'

type Props = {
  gameData: GameType
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
    // loadCountryGeojson(resultMapRef.current)
  }, [gameData])

  const loadMapMarkers = () => {
    setActualMarkers(gameData.rounds.slice(0, gameData.round - 1))
  }

  // const loadCountryGeojson = (map: google.maps.Map) => {
  //   const countryGeoJsons = countryBounds as any
  //   const actualLocations = gameData.rounds.slice(0, gameData.round - 1)

  //   // Remove duplicate countries so we dont add multiple layers of the same country
  //   const seen = new Set()

  //   const uniqueLocations = actualLocations.filter((loc) => {
  //     const duplicate = seen.has(loc.countryCode)
  //     seen.add(loc.countryCode)
  //     return !duplicate
  //   })

  //   uniqueLocations.map((actualLocation) => {
  //     const geojson = countryGeoJsons.features.find(
  //       (country: any) => country?.properties?.code?.toLowerCase() === actualLocation.countryCode?.toLowerCase()
  //     )

  //     map.data.addGeoJson(geojson)
  //   })

  //   map.data.setStyle((feature: google.maps.Data.Feature) => {
  //     const code = feature.getProperty('code')
  //     const mostRecentRoundCode = actualLocations[actualLocations.length - 1].countryCode
  //     const isMostRecentRound = code?.toLowerCase() === mostRecentRoundCode?.toLowerCase()

  //     const color = isMostRecentRound ? '#a63152' : '#39a857'

  //     return {
  //       fillColor: color,
  //       strokeColor: color,
  //       strokeOpacity: 0.5,
  //       fillOpacity: 0.5,
  //       cursor: 'crosshair',
  //     }
  //   })

  //   // getMapBounds(map)
  // }

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
    <StyledStreaksSummaryMap>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
          center={{ lat: 0, lng: 0 }}
          zoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            loadMapMarkers()
            // loadCountryGeojson(map)
            resultMapRef.current = map
          }}
          options={{
            clickableIcons: false,
            minZoom: 2,
            disableDefaultUI: true,
            gestureHandling: 'greedy',
          }}
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
