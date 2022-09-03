/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from 'react'
import { StyledResultMap } from '.'
import Map, { Layer, Marker, Source } from 'react-map-gl'
import { GuessType, LocationType } from '@types'
import { useSelector } from 'react-redux'
import { selectUser } from '@redux/user'
import { getDistance, getResultMapValues } from '@utils/helperFunctions'

type Props = {
  guessedLocations: GuessType[]
  actualLocations: LocationType[]
  round: number
  isFinalResults?: boolean
}

const ResultMap: FC<Props> = ({ guessedLocations, actualLocations, round, isFinalResults }) => {
  const guessedLocation = guessedLocations[guessedLocations.length - 1]
  const actualLocation = actualLocations[round - 2]
  const user = useSelector(selectUser)
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [zoom, setZoom] = useState(2)

  const layerStyle = {
    type: 'line',
    paint: {
      'line-color': '#202020',
      'line-width': 2,
      'line-dasharray': [1, 1],
    },
  } as any

  const generateLineData = (guessedLoc: GuessType, actualLoc: LocationType) => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [guessedLoc.lng, guessedLoc.lat],
              [actualLoc.lng, actualLoc.lat],
            ],
          },
        },
      ],
    } as any
  }

  const getLongitude = () => {
    if (isFinalResults) return 0

    return (guessedLocation.lng + actualLocation.lng) / 2
  }

  const getLatitude = () => {
    if (isFinalResults) return 0

    return (guessedLocation.lat + actualLocation.lat) / 2
  }

  // NEED TO FIX THIS
  const calculateZoom = () => {
    let zoom = 1

    if (!isFinalResults) {
      const distance = getDistance(guessedLocation, actualLocation) as number

      const diffLat = Math.abs(guessedLocation.lat - actualLocation.lat)
      const diffLng = Math.abs(guessedLocation.lng - actualLocation.lng)

      // start at zoom 7 and adjust based on distance
      zoom = 7

      if (distance < 100) zoom = 8
      else if (distance < 1000) zoom = 7
      else zoom -= Math.floor(distance / 500)

      console.log(`ZOOM BEFORE: ${zoom}`)

      // compensate for distances that are more vertical (zoom out more)
      const vertToHorRatio = Math.floor(diffLat / diffLng)
      const compensate = Math.floor(vertToHorRatio / 2)

      zoom -= compensate

      if (zoom < 1) {
        zoom = 1
      }

      console.log(`ZOOM AFTER: ${zoom}`)
    }

    return zoom
  }

  /*
  useEffect(() => {
    const { center, zoom } = getResultMapValues(guessedLocation, actualLocation, isFinalResults)

    setLat(center.lat)
    setLng(center.lng)
    setZoom(zoom)
  }, [])
  */
  return (
    <StyledResultMap>
      <Map
        initialViewState={{
          longitude: getLongitude(),
          latitude: getLatitude(),
          zoom: calculateZoom(),
        }}
        style={{ width: '100%', height: 'calc(100vh - 300px)' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        dragRotate={false}
        attributionControl={false}
      >
        {!isFinalResults && (
          <>
            <Marker longitude={guessedLocation.lng} latitude={guessedLocation.lat}>
              <img className="userMarker" src={`/images/avatars/default3.jpg`} alt="User Map Pin" />
            </Marker>

            <Marker longitude={actualLocation.lng} latitude={actualLocation.lat}>
              <img src={`/images/markers/actualMarker.png`} alt="Actual Location Pin" />
            </Marker>

            <Source id="results" type="geojson" data={generateLineData(guessedLocation, actualLocation)}>
              <Layer {...layerStyle} />
            </Source>
          </>
        )}

        {isFinalResults &&
          guessedLocations.map((guessedLoc, idx) => (
            <Marker key={idx} longitude={guessedLoc.lng} latitude={guessedLoc.lat}>
              <img className="userMarker" src={`/images/avatars/default3.jpg`} alt="User Map Pin" />
            </Marker>
          ))}

        {isFinalResults &&
          actualLocations.map((actualLoc, idx) => (
            <Marker key={idx} longitude={actualLoc.lng} latitude={actualLoc.lat}>
              <div className="markerNumbered">
                <img src={`/images/markers/actualMarker.png`} alt="Actual Location Pin" />
                <div className="roundNumber">
                  <span>{idx + 1}</span>
                </div>
              </div>
            </Marker>
          ))}

        {isFinalResults &&
          actualLocations.map((actualLoc, idx) => (
            <Source
              key={idx}
              id={`finalsResult-${idx + 1}`}
              type="geojson"
              data={generateLineData(guessedLocations[idx], actualLoc)}
            >
              <Layer id={`finalResult-${idx + 1}`} {...layerStyle} />
            </Source>
          ))}
      </Map>
    </StyledResultMap>
  )
}

export default ResultMap
