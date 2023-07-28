import throttle from 'lodash/throttle'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { Button } from '@components/system'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import {
  setChanges,
  setLocations,
  setSelectedMarkerIdx,
  setShowPreviewMap,
  updateLocation,
} from '@redux/slices/mapMakerSlice'
import { LocationType } from '@types'
import { PREVIEW_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { REGULAR_MARKER_ICON, REGULAR_MARKER_SIZE } from '@utils/constants/random'
import { StyledPreviewMap } from './'

type Props = {
  svServiceRef: React.MutableRefObject<google.maps.StreetViewService | null>
  svPanoramaRef: React.MutableRefObject<google.maps.StreetViewPanorama | null>
  locationsRef: React.MutableRefObject<LocationType[]>
  markersRef: React.MutableRefObject<google.maps.Marker[]>
  selectedMarkerIndexRef: React.MutableRefObject<number>
}

const PreviewMap: FC<Props> = ({ svServiceRef, svPanoramaRef, locationsRef, markersRef, selectedMarkerIndexRef }) => {
  const mapMakerState = useAppSelector((state) => state.mapMaker)
  const dispatch = useAppDispatch()

  const [modifiedHeading, setModifiedHeading] = useState<number | null>(null)
  const [modifiedPitch, setModifiedPitch] = useState<number | null>(null)
  const [modifiedPosition, setModifiedPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [modifiedZoom, setModifiedZoom] = useState<number | null>(null)
  const [modifiedPanoId, setModifiedPanoId] = useState<string | null>(null)

  useEffect(() => {
    handleLoadPreviewMap()
  }, [])

  const handleLoadPreviewMap = () => {
    const svService = new google.maps.StreetViewService()

    const svPanorama = new google.maps.StreetViewPanorama(
      document.getElementById('previewMap') as HTMLElement,
      PREVIEW_MAP_OPTIONS
    )

    svPanorama.addListener('position_changed', () => {
      const newLatLng = svPanorama.getPosition()

      if (!newLatLng) return

      setModifiedPosition({ lat: newLatLng.lat(), lng: newLatLng.lng() })
    })

    svPanorama.addListener(
      'pov_changed',
      throttle(() => {
        const { heading, pitch } = svPanorama.getPov()

        setModifiedHeading(heading)
        setModifiedPitch(pitch)
      }, 300)
    )

    svPanorama.addListener(
      'zoom_changed',
      throttle(() => {
        const newZoom = svPanorama.getZoom()

        setModifiedZoom(newZoom)
      }, 300)
    )

    svServiceRef.current = svService
    svPanoramaRef.current = svPanorama
  }

  const handleUpdateLocation = () => {
    dispatch(setChanges('update'))
    dispatch(setShowPreviewMap(false))

    const selectedMarkerIdx = selectedMarkerIndexRef.current
    const markers = markersRef.current

    if (modifiedPosition) {
      dispatch(updateLocation({ newValues: modifiedPosition, index: selectedMarkerIdx }))

      markers[selectedMarkerIdx].setPosition(modifiedPosition)
    }

    if (modifiedHeading) {
      dispatch(updateLocation({ newValues: modifiedHeading, index: selectedMarkerIdx }))
    }

    if (modifiedPitch) {
      dispatch(updateLocation({ newValues: modifiedPitch, index: selectedMarkerIdx }))
    }

    if (modifiedZoom) {
      dispatch(updateLocation({ newValues: modifiedZoom, index: selectedMarkerIdx }))
    }

    if (modifiedPanoId) {
      dispatch(updateLocation({ newValues: modifiedPanoId, index: selectedMarkerIdx }))
    }

    // Reset the marker to unselected icon
    markers[selectedMarkerIdx].setIcon({
      url: REGULAR_MARKER_ICON,
      scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
    })

    dispatch(setSelectedMarkerIdx(-1))
  }

  const handleRemoveLocation = () => {
    dispatch(setChanges('delete'))
    dispatch(setShowPreviewMap(false))

    const { locations, selectedMarkerIdx } = mapMakerState

    // If we have not selected a location, we remove the most recently added
    if (mapMakerState.selectedMarkerIdx === -1) {
      const newLocations = mapMakerState.locations.slice(0, -1)
      dispatch(setLocations(newLocations))

      markersRef.current[markersRef.current.length - 1].setMap(null)
      markersRef.current = markersRef.current.slice(0, -1)

      return
    }

    dispatch(setLocations(locations.splice(selectedMarkerIdx, 1)))

    markersRef.current[selectedMarkerIdx].setMap(null)
    markersRef.current.splice(selectedMarkerIdx, 1)

    dispatch(setSelectedMarkerIdx(-1))
  }

  return (
    <StyledPreviewMap showPreviewMap={mapMakerState.showPreviewMap}>
      <div className="preview-map-wrapper">
        <div className="map-top-menu">
          <span className="locations-count">{`${mapMakerState.locations.length} location${
            mapMakerState.locations.length !== 1 ? 's' : ''
          }`}</span>

          {/* {pastCoverage && <SelectCoverage coverageOptions={pastCoverage} onChange={loadNewPanoById} />} */}
        </div>

        <div className="preview-map">
          <div id="previewMap"></div>
          <div className="preview-action-buttons">
            <Button variant="solidGray" onClick={() => handleUpdateLocation()}>
              Update Location
            </Button>
            <Button variant="destroy" onClick={() => handleRemoveLocation()}>
              Remove
            </Button>
          </div>
        </div>

        {mapMakerState.locations.length === 0 && (
          <div className="no-locations-wrapper">
            <div className="no-locations">
              <Image src="/images/no-locations.png" alt="" height={100} width={100} />
              <h2>No locations added</h2>
              <h3>Click a location on the map to preview it here.</h3>
            </div>
          </div>
        )}
      </div>
    </StyledPreviewMap>
  )
}

export default PreviewMap
