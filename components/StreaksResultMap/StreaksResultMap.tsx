/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import { Marker } from '@components/Marker'
import { GameType, LocationType } from '@types'
// import countryBounds from '@utils/constants/countryBounds.json'
import { useAppSelector } from '../../redux-utils'
import getMapsKey from '../../utils/helpers/getMapsKey'
import { StyledStreaksResultMap } from './'

type Props = {
  gameData: GameType
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

  const loadMapMarkers = () => {
    setActualMarker(actualCountry)
  }

  // const loadCountryGeojson = (map: google.maps.Map) => {
  //   const countryGeoJsons = countryBounds as any
  //   const actualCountryGeoJson = countryGeoJsons.features.find(
  //     (x: any) => x?.properties?.code?.toLowerCase() === actualCountry.countryCode?.toLowerCase()
  //   )

  //   map.data.addGeoJson(actualCountryGeoJson)

  //   const isCorrect = gameData.state !== 'finished'

  //   if (isCorrect) {
  //     map.data.setStyle({
  //       fillColor: '#39a857',
  //       strokeColor: '#39a857',
  //       strokeOpacity: 0.5,
  //       fillOpacity: 0.5,
  //       cursor: 'crosshair',
  //     })
  //   } else {
  //     map.data.setStyle({
  //       fillColor: '#a63152',
  //       strokeColor: '#a63152',
  //       strokeOpacity: 0.5,
  //       fillOpacity: 0.5,
  //       cursor: 'crosshair',
  //     })
  //   }

  //   getMapBounds(map)
  // }

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
