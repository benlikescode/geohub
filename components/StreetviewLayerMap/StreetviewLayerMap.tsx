import GoogleMapReact from 'google-map-react'
import React, { FC, useEffect, useRef, useState } from 'react'

import { LocationType } from '@types'
import { createMarker, getMapTheme } from '@utils/helperFunctions'

import { StyledStreetviewLayerMap } from './'

const StreetviewLayerMap: FC = () => {
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
  const [locations, setLocations] = useState<LocationType[]>([])
  const [showPreviewMap, setShowPreviewMap] = useState(false)
  const prevMarkersRef = useRef<google.maps.Marker[]>([])

  const clearMarkers = (markers: google.maps.Marker[]) => {
    markers.map((marker) => marker.setMap(null))
  }

  const setSelectionMap = () => {
    const map = new window.google.maps.Map(document.getElementById('selectionMap') as HTMLElement, {
      zoom: 2,
      minZoom: 1,
      center: { lat: 0, lng: 0 },
      disableDefaultUI: true,
      styles: getMapTheme('Light'),
      clickableIcons: false,
      gestureHandling: 'greedy',
    })

    window.google.maps.event.addListener(map, 'click', (e: any) => {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }

      setLocations((prev) => prev.concat(location))
      /*
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
      })
*/
      const marker = createMarker(
        location,
        map,
        `https://www.geoguessr.com/_next/static/images/unselected-pin-cf969fcac1571b7f58824eaebb5ed4a5.png`
      )
      prevMarkersRef.current.push(marker)
    })
    // SELECTED PIN: https://www.geoguessr.com/_next/static/images/selected-pin-0bac3f371ed0d5625bcd873ebce4e59e.png
    const svLayer = new window.google.maps.StreetViewCoverageLayer()
    svLayer.setMap(map)
  }

  const setPreviewMap = () => {
    const location = locations[locations.length - 1]

    var sv = new window.google.maps.StreetViewService()
    var panorama = new window.google.maps.StreetViewPanorama(document.getElementById('previewMap') as HTMLElement, {
      addressControl: false,
      panControl: true,
      panControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
      enableCloseButton: false,
      zoomControl: false,
      fullscreenControl: false,
    })
    panorama.setOptions({
      showRoadLabels: false,
    })

    const processSVData = (data: any, status: any) => {
      if (data == null) {
        console.log('There was an error loading the round :(')
      } else {
        const adjustedLat = data.location.latLng.lat()
        const adjustedLng = data.location.latLng.lng()
        const adjustedLocation = { ...location, lat: adjustedLat, lng: adjustedLng }

        const locationsCopy = [...locations]
        locationsCopy[locationsCopy.length - 1] = adjustedLocation

        setLocations(locationsCopy)

        panorama.setPano(data.location.pano)
        panorama.setPov({
          heading: location.heading || 0,
          pitch: location.pitch || 0,
        })
        panorama.setZoom(location.zoom || 0)
        panorama.setVisible(true)
      }
    }

    sv.getPanorama(
      {
        location: location,
        radius: 100000, // 100km radius
        source: google.maps.StreetViewSource.OUTDOOR,
      },
      processSVData
    )
  }

  useEffect(() => {
    if (locations.length !== 0) {
      setPreviewMap()
    }
  }, [locations.length])

  const handleApiLoaded = () => {
    setSelectionMap()
  }

  return (
    <StyledStreetviewLayerMap>
      <div id="selectionMap"></div>
      <div id="previewMap"></div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleKey }}
        center={{ lat: 0, lng: 0 }}
        zoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={() => handleApiLoaded()}
      ></GoogleMapReact>
    </StyledStreetviewLayerMap>
  )
}

export default StreetviewLayerMap
