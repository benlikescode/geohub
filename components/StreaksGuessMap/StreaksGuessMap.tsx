/* eslint-disable @next/next/no-img-element */
import GoogleMapReact from 'google-map-react'
import { FC, useRef, useState } from 'react'
import { Button } from '@components/system'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { multiPolygon, polygon } from '@turf/helpers'
import countries from '@utils/constants/countries'
import { GUESS_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { POLYGON_STYLES } from '@utils/constants/polygonStyles'
import { formatPolygon, getGuessMapSize, getMapsKey } from '@utils/helpers'
import useGuessMap from '@utils/hooks/useGuessMap'
import { StyledStreaksGuessMap } from './'

type Props = {
  countryStreakGuess: string
  setCountryStreakGuess: (countryStreakGuess: string) => void
  mobileMapOpen?: boolean
  closeMobileMap: () => void
  handleSubmitGuess: () => void
}

const StreaksGuessMap: FC<Props> = ({
  countryStreakGuess,
  setCountryStreakGuess,
  mobileMapOpen,
  closeMobileMap,
  handleSubmitGuess,
}) => {
  const [selectedCountryName, setSelectedCountryName] = useState('')
  const { mapHeight, mapWidth, hovering, handleMapHover, handleMapLeave, changeMapSize } = useGuessMap()

  const user = useAppSelector((state) => state.user)
  const prevCountriesRef = useRef<any>(null)

  const onInit = async (map: any, maps: any) => {
    const { default: countryBounds } = await import('@utils/constants/countryBounds.json')

    maps.event.addListener(map, 'click', (e: any) => {
      const clickedCoords = [e.latLng.lng(), e.latLng.lat()]
      const clickedPoint = formatPolygon(clickedCoords, {}, 'Point')

      Object.entries(countryBounds).map(([code, bounds]) => {
        const poly = bounds.length > 1 ? multiPolygon(bounds.map((x) => [x])) : polygon(bounds)

        const isPointInThisCountry = booleanPointInPolygon(clickedPoint as any, poly as any)

        if (isPointInThisCountry) {
          prevCountriesRef.current &&
            prevCountriesRef.current.map((feature: any) => {
              map.data.remove(feature)
            })

          const newCountry = map.data.addGeoJson(formatPolygon(bounds, { code }))

          map.data.setStyle(POLYGON_STYLES['guess'])

          prevCountriesRef.current = newCountry

          setSelectedCountryName(countries.find((x) => x.code === code)?.name || '')
          setCountryStreakGuess(code)
        }
      })
    })
  }

  return (
    <StyledStreaksGuessMap mapHeight={mapHeight} mapWidth={mapWidth} mobileMapOpen={mobileMapOpen}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
        {hovering && (
          <div className="controls">
            <button
              className={`controlBtn increase ${user.guessMapSize === 4 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('increase')}
              disabled={user.guessMapSize === 4}
            >
              <ArrowRightIcon />
            </button>

            <button
              className={`controlBtn decrease ${user.guessMapSize === 1 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('decrease')}
              disabled={user.guessMapSize === 1}
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}

        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: getMapsKey(user.mapsAPIKey) }}
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => onInit(map, maps)}
            options={GUESS_MAP_OPTIONS}
          ></GoogleMapReact>

          {countryStreakGuess && selectedCountryName && (
            <div className="selected-country">
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryStreakGuess?.toUpperCase()}.svg`}
                alt={countryStreakGuess}
              />
              <span>{selectedCountryName}</span>
            </div>
          )}
        </div>

        <button className="close-map-button" onClick={closeMobileMap}>
          <XIcon />
        </button>

        <div className="submit-button-wrapper">
          <Button width="100%" disabled={!countryStreakGuess} onClick={() => handleSubmitGuess()}>
            Submit Guess
          </Button>
        </div>
      </div>
    </StyledStreaksGuessMap>
  )
}

export default StreaksGuessMap
