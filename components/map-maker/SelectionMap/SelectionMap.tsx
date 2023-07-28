// import { ScatterplotLayer } from 'deck.gl/typed'
import GoogleMapReact from 'google-map-react'
import React, { FC, useEffect, useState } from 'react'
import { GoogleMapsSearch } from '@components/GoogleMapsSearch'
import { SelectMapLayers } from '@components/selects/SelectMapLayers'
// import { GoogleMapsOverlay } from '@deck.gl/google-maps/typed'
import { useAppSelector } from '@redux/hook'
import { setChanges, setSelectedMarkerIdx } from '@redux/slices'
import { GoogleMapsConfigType, LocationType } from '@types'
import { SELECTION_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import {
  REGULAR_MARKER_ICON,
  REGULAR_MARKER_SIZE,
  SELECTED_MARKER_ICON,
  SELECTED_MARKER_SIZE,
} from '@utils/constants/random'
import { createMapMarker, getMapsKey, showErrorToast } from '@utils/helpers'
import { useConfirmLeave } from '@utils/hooks'
import { StyledSelectionMap } from './'

type Props = {
  googleMapsConfig: GoogleMapsConfigType | undefined
  setGoogleMapsConfig: (config: GoogleMapsConfigType) => void
  addNewLocations: any
  locationsRef: React.MutableRefObject<LocationType[]>
  markersRef: React.MutableRefObject<google.maps.Marker[]>
  handleMarkerClick: (marker: google.maps.Marker) => void
}

const SelectionMap: FC<Props> = ({
  googleMapsConfig,
  setGoogleMapsConfig,
  addNewLocations,
  locationsRef,
  markersRef,
  handleMarkerClick,
}) => {
  const user = useAppSelector((state) => state.user)
  const mapMakerState = useAppSelector((state) => state.mapMaker)

  // useConfirmLeave(Object.values(mapMakerState.changes).some((count) => count > 0))

  useEffect(() => {
    handleSetupSelectionMap()
  }, [googleMapsConfig])

  const handleSetupSelectionMap = () => {
    if (!googleMapsConfig) return

    const { map } = googleMapsConfig

    locationsRef.current.map((location) => {
      const marker = createMapMarker(location, map, REGULAR_MARKER_ICON, REGULAR_MARKER_SIZE)
      markersRef.current.push(marker)

      marker.addListener('click', () => handleMarkerClick(marker))
    })

    map.addListener('click', (e: google.maps.MapMouseEvent) => handleSelectionMapClick(e))

    const svLayer = new window.google.maps.StreetViewCoverageLayer()

    svLayer.setMap(map)

    // DECKGL
    // const overlay = new GoogleMapsOverlay({
    //   layers: [
    //     new ScatterplotLayer({
    //       id: 'geojson-layer',
    //       data: 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json',
    //       opacity: 0.8,
    //       stroked: true,
    //       filled: true,
    //       radiusMinPixels: 2,
    //       radiusMaxPixels: 10,
    //       lineWidthMinPixels: 1,
    //       lineWidthMaxPixels: 3,
    //       getPosition: (d) => d.the_geom.coordinates,
    //       getFillColor: [255, 0, 0, 128], // Red color with 50% opacity
    //       getLineColor: () => [0, 0, 0],
    //     }),
    //   ],
    // })
  }

  const handleSelectionMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return

    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() }

    // Return early if clicked location has no coverage
    let isLocationCovered = true
    const streetViewService = new google.maps.StreetViewService()

    await streetViewService.getPanorama({ location: e.latLng, radius: 1000 }, (data) => {
      if (!data || !data.location) {
        isLocationCovered = false
      }
    })

    if (!isLocationCovered) {
      return showErrorToast('No coverage found here')
    }

    addNewLocations([location])
  }

  return (
    <StyledSelectionMap>
      <div className="selection-map-wrapper">
        <div className="map-top-menu">
          <GoogleMapsSearch
            googleMapsConfig={googleMapsConfig as GoogleMapsConfigType}
            addNewLocations={addNewLocations}
          />

          {googleMapsConfig && <SelectMapLayers selectionMap={googleMapsConfig.map} />}
        </div>

        <div className="selection-map">
          <GoogleMapReact
            bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
            center={{ lat: 0, lng: 0 }}
            zoom={2}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => setGoogleMapsConfig({ isLoaded: true, map, mapsApi: maps })}
            options={SELECTION_MAP_OPTIONS}
          ></GoogleMapReact>
        </div>
      </div>
    </StyledSelectionMap>
  )
}

export default SelectionMap
