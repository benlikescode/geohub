/* eslint-disable @next/next/no-img-element */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'

import { NoResults } from '@components/ErrorViews/NoResults'
import { Head } from '@components/Head'
import { Layout, MobileNav, Navbar, PageHeader } from '@components/Layout'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { CreateMapModal } from '@components/Modals/CreateMapModal'
import { SkeletonCards } from '@components/SkeletonCards'
import { StreetviewLayerMap } from '@components/StreetviewLayerMap'
import { Avatar, Button } from '@components/System'
import user from '@redux/user'
import StyledCreateMapPage from '@styles/CreateMapPage.Styled'
import { LocationType } from '@types'
import { createMarker, getMapTheme } from '@utils/helperFunctions'

const CreateMapPage: FC = () => {
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
  const [locations, setLocations] = useState<LocationType[]>([])
  const [isShowingPreview, setIsShowingPreview] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const prevMarkersRef = useRef<google.maps.Marker[]>([])

  const clearMarkers = (markers: google.maps.Marker[]) => {
    markers.map((marker) => marker.setMap(null))
  }

  const setSelectionMap = () => {
    const map = new window.google.maps.Map(document.getElementById('selectionMap') as HTMLElement, {
      zoom: 2,
      minZoom: 2,
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
    if (locations.length !== 0 && !isDeleting) {
      setPreviewMap()
      setIsShowingPreview(true)
    } else {
      setIsShowingPreview(false)
      setIsDeleting(false)
    }
  }, [locations.length])

  const handleApiLoaded = () => {
    setSelectionMap()
  }

  const handleEdit = () => {
    setEditModalOpen(true)
  }

  const handleSaveMap = async () => {}

  const handleRemoveLocation = () => {
    setIsDeleting(true)
    const newLocations = locations.slice(0, -1)
    setLocations(newLocations)

    prevMarkersRef.current[prevMarkersRef.current.length - 1].setMap(null)
  }

  const handleSaveLocation = () => {
    setIsShowingPreview(false)
  }

  return (
    <StyledCreateMapPage isShowingPreview={isShowingPreview}>
      <Head title="Create A Map" />
      <Navbar />

      <div className="main-content">
        <div className="selection-map-wrapper">
          <div className="map-top-menu">
            <div className="map-details">
              <Avatar
                type="map"
                src="https://i.pinimg.com/originals/11/9d/35/119d35b6ee89fb63e43b39c8cd010dd1.jpg"
                size={40}
              />
              <span className="map-name">My New Map</span>
            </div>
            <div className="map-action-buttons">
              <Button type="solidGray" callback={handleEdit}>
                Edit Details
              </Button>
              <Button type="solidPurple" callback={handleSaveMap}>
                Save Map
              </Button>
            </div>
          </div>
          <div id="selectionMap"></div>
        </div>

        <div className="preview-map-wrapper">
          <div className="map-top-menu">
            <span className="locations-count">{`${locations.length} location${
              locations.length !== 1 ? 's' : ''
            }`}</span>
          </div>

          <div id="previewMap"></div>
          <div className="preview-action-buttons">
            <Button type="solidGray" callback={handleRemoveLocation}>
              Remove Location
            </Button>
            <Button type="solidPurple" callback={handleSaveLocation}>
              Save Location
            </Button>
          </div>

          {locations.length === 0 && (
            <div className="no-locations-wrapper">
              <div className="no-locations">
                <img
                  src="https://ouch-cdn2.icons8.com/wheN45aua7reMiicprxTGUEcr9SLNm7f2PyQGGlf5Os/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTE4/LzcyOGU3NTM1LWE2/ZmYtNDYwZi05MTlh/LTE1YzIyYjk3NDQ0/OC5wbmc.png"
                  alt=""
                />
                <h2>No locations added</h2>
                <h3>Click a location on the map to preview it here</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      <GoogleMapReact
        bootstrapURLKeys={{ key: googleKey }}
        center={{ lat: 40, lng: -63 }}
        zoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={() => handleApiLoaded()}
      ></GoogleMapReact>

      <MobileNav />
      {editModalOpen && <CreateMapModal closeModal={() => setEditModalOpen(false)} />}
    </StyledCreateMapPage>
  )
}

export default CreateMapPage
