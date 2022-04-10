import mapboxgl from 'mapbox-gl';
import React, { FC, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { StyledNewResultMap } from '.'
import { selectUser } from '../../redux/user';
import { GuessType, LocationType } from '../../types';

type Props = {
  guessedLocations: GuessType[];
  actualLocations: LocationType[];
  round: number;
  isFinalResults?: boolean;
}

const NewResultMap: FC<Props> = ({ guessedLocations, actualLocations, round, isFinalResults }) => {
  const guessedLocation = guessedLocations[guessedLocations.length - 1]
  const actualLocation = actualLocations[round -2]
  const user = useSelector(selectUser)
  const mapRef = useRef<any>()
  const resultMap = useRef<any>()

  const createMapLine = (guessedLoc: GuessType, actualLoc: LocationType, map: mapboxgl.Map, sourceId: string) => {
    map.on('load', () => {
      map.addSource(sourceId, {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [guessedLoc.lng, guessedLoc.lat],
              [actualLoc.lng, actualLoc.lat]              
            ]
          }
        }
      })
      map.addLayer({
        'id': sourceId,
        'type': 'line',
        'source': sourceId,
        'paint': {
          'line-color': '#202020',
          'line-width': 2,
          'line-dasharray': [1, 1]
        }
      })
    })
  }

  useEffect(() => {
    if (!resultMap.current) return

    const map = new mapboxgl.Map({
      container: resultMap.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1,
      attributionControl: false,
      dragRotate: false,
    })

    if (isFinalResults) {
      for (let i = 0; i < actualLocations.length; i++) {
        const guessMarker = document.createElement('div')
        const actualMarker = document.createElement('div')
        guessMarker.className = 'guessMarker'
        actualMarker.className = `actualMarker`
        
        new mapboxgl.Marker(guessMarker).setLngLat([guessedLocations[i].lng, guessedLocations[i].lat]).addTo(map)
        new mapboxgl.Marker(actualMarker).setLngLat([actualLocations[i].lng, actualLocations[i].lat]).addTo(map)

        createMapLine(guessedLocations[i], actualLocations[i], map, `finalResults-${i}`)
      }
    }
    else {
      const guessMarker = document.createElement('div')
      const actualMarker = document.createElement('div')
      guessMarker.className = 'guessMarker'
      actualMarker.className = 'actualMarker'

      new mapboxgl.Marker(guessMarker).setLngLat([guessedLocation.lng, guessedLocation.lat]).addTo(map)
      new mapboxgl.Marker(actualMarker).setLngLat([actualLocation.lng, actualLocation.lat]).addTo(map)

      createMapLine(guessedLocation, actualLocation, map, 'results')
    }
  }, [])
  
  return (
    <StyledNewResultMap userAvatar={user.avatar}>
      <div className="resultMap" ref={resultMap}></div>
    </StyledNewResultMap>
  )
}

export default NewResultMap