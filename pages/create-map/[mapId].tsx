/* eslint-disable @next/next/no-img-element */
import GoogleMapReact from 'google-map-react'
import { throttle } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { NotFound } from '@components/errorViews'
import { Head } from '@components/Head'
import { MobileNav, Navbar } from '@components/layout'
import { CreateMapModal } from '@components/modals'
import { Avatar, Button, Skeleton, Spinner, ToggleSwitch } from '@components/system'
import { CloudUploadIcon, PencilIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import StyledCreateMapPage from '@styles/CreateMapPage.Styled'
import { LocationType, MapType, PageType } from '@types'
import { createMapMarker, getMapsKey, mailman, showErrorToast, showSuccessToast } from '@utils/helpers'
import { useConfirmLeave } from '../../utils/hooks'

const SELECTED_MARKER_ICON = '/images/selected-pin.png'
const REGULAR_MARKER_ICON = '/images/regular-pin.png'
const SELECTED_MARKER_SIZE = 40
const REGULAR_MARKER_SIZE = 30

const CreateMapPage: PageType = () => {
  const [locations, _setLocations] = useState<LocationType[]>([])
  const [haveLocationsChanged, setHaveLocationsChanged] = useState(false)
  const [isShowingPreview, setIsShowingPreview] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [initiallyPublished, setInitiallyPubished] = useState(false)
  const [mapName, setMapName] = useState('')
  const [mapDescription, setMapDescription] = useState('')
  const [mapAvatar, setMapAvatar] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIndex, _setSelectedIndex] = useState(-1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false)

  const [modifiedHeading, setModifiedHeading] = useState<number | null>(null)
  const [modifiedPitch, setModifiedPitch] = useState<number | null>(null)
  const [modifiedPosition, setModifiedPosition] = useState<{ lat: number; lng: number } | null>(null)

  const [showErrorPage, setShowErrorPage] = useState(false)

  const router = useRouter()
  const mapId = router.query.mapId as string
  const user = useAppSelector((state) => state.user)

  // Refs used to access recent state in event listeners
  const prevMarkersRef = useRef<google.maps.Marker[]>([])
  const locationsRef = useRef<LocationType[]>([])
  const selectedIndexRef = useRef(-1)

  useConfirmLeave(haveLocationsChanged)

  const setLocations = (newLocations: LocationType[]) => {
    locationsRef.current = newLocations
    _setLocations(newLocations)
  }

  const setSelectedIndex = (newIndex: number) => {
    selectedIndexRef.current = newIndex
    _setSelectedIndex(newIndex)
  }

  useEffect(() => {
    if (!mapId || !googleMapsLoaded) return
    handleMount()
  }, [mapId, googleMapsLoaded])

  useEffect(() => {
    if (!isLoading) {
      setPreviewMap()
    }
  }, [isLoading])

  const handleMount = async () => {
    const shouldContinue = await getMapDetails()

    if (shouldContinue) {
      setSelectionMap()
    }
  }

  const getMapDetails = async () => {
    const res = await mailman(`maps/custom/${mapId}`)

    if (res.error) {
      setShowErrorPage(true)
      return false
    }

    const { name, description, previewImg, isPublished, locations } = res as MapType

    setLocations(locations || [])

    setIsPublished(isPublished || false)
    setInitiallyPubished(isPublished || false) // To check if value has been updated

    setMapName(name)
    setMapDescription(description || '')
    setMapAvatar(previewImg)
    setIsLoading(false)

    return true
  }

  const handleMarkerClick = (marker: google.maps.Marker) => {
    // If a marker was selected before click -> reset its icon to regular
    if (selectedIndexRef.current !== -1) {
      prevMarkersRef.current[selectedIndexRef.current].setIcon({
        url: REGULAR_MARKER_ICON,
        scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
      })
    }

    marker.setIcon({
      url: SELECTED_MARKER_ICON,
      scaledSize: new google.maps.Size(SELECTED_MARKER_SIZE, SELECTED_MARKER_SIZE),
    })

    const markerIndex = prevMarkersRef.current.indexOf(marker)

    setSelectedIndex(markerIndex)
    setPreviewMap(markerIndex)
    setIsShowingPreview(true)
  }

  const setSelectionMap = () => {
    const map = new window.google.maps.Map(document.getElementById('selectionMap') as HTMLElement, {
      zoom: 2,
      minZoom: 2,
      center: { lat: 0, lng: 0 },
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: 'greedy',
      draggableCursor: 'crosshair',
      disableDoubleClickZoom: true,
    })

    // Add markers for locations already stored for this map
    locationsRef.current.map((location) => {
      const marker = createMapMarker(location, map, REGULAR_MARKER_ICON, REGULAR_MARKER_SIZE)
      prevMarkersRef.current.push(marker)

      marker.addListener('click', () => handleMarkerClick(marker))
    })

    // Click event listener for the selection map
    map.addListener('click', async (e: any) => {
      setHaveLocationsChanged(true)
      setIsShowingPreview(false)

      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }

      // Return early if clicked location has no coverage
      let isLocationCovered = true
      const streetViewService = new google.maps.StreetViewService()

      await streetViewService.getPanorama({ location: e.latLng, radius: 1000 }, (data: any, status: any) => {
        if (status !== 'OK') {
          isLocationCovered = false
        }
      })

      if (!isLocationCovered) {
        return
      }

      setLocations([...locationsRef.current, location])

      // If previously selected marker -> reset its icon to regular
      if (selectedIndexRef.current !== -1) {
        prevMarkersRef.current[selectedIndexRef.current].setIcon({
          url: REGULAR_MARKER_ICON,
          scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
        })
      }

      const marker = createMapMarker(location, map, SELECTED_MARKER_ICON, SELECTED_MARKER_SIZE)
      prevMarkersRef.current.push(marker)

      const markerIndex = prevMarkersRef.current.indexOf(marker)
      setSelectedIndex(markerIndex)

      setPreviewMap()
      setIsShowingPreview(true)

      marker.addListener('click', () => handleMarkerClick(marker))
    })

    const svLayer = new window.google.maps.StreetViewCoverageLayer()
    svLayer.setMap(map)
  }

  const setPreviewMap = (indexOfLoc?: number) => {
    const location = locationsRef.current[indexOfLoc !== undefined ? indexOfLoc : locationsRef.current.length - 1]

    const streetViewService = new window.google.maps.StreetViewService()
    const panorama = new window.google.maps.StreetViewPanorama(document.getElementById('previewMap') as HTMLElement, {
      addressControl: false,
      panControl: true,
      panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      enableCloseButton: false,
      zoomControl: false,
      showRoadLabels: false,
      position: location,
    })

    panorama.addListener('position_changed', () => {
      const newLatLng = panorama.getPosition()
      if (!newLatLng) return

      setModifiedPosition({ lat: newLatLng.lat(), lng: newLatLng.lng() })
    })

    panorama.addListener(
      'pov_changed',
      throttle(() => {
        const { heading, pitch } = panorama.getPov()

        setModifiedHeading(heading)
        setModifiedPitch(pitch)
      }, 300)
    )

    const processSVData = (data: any, status: any) => {
      //setIsShowingPreview(true)
      const adjustedLat = data.location.latLng.lat()
      const adjustedLng = data.location.latLng.lng()
      const adjustedLocation = { ...location, lat: adjustedLat, lng: adjustedLng }

      const locationsCopy = [...locationsRef.current]
      locationsCopy[indexOfLoc !== undefined ? indexOfLoc : locationsCopy.length - 1] = adjustedLocation
      setLocations(locationsCopy)

      panorama.setPano(data.location.pano)
      panorama.setPov({
        heading: location.heading || 0,
        pitch: location.pitch || 0,
      })
      panorama.setZoom(location.zoom || 0)
      panorama.setVisible(true)
    }

    streetViewService.getPanorama(
      {
        location: location,
        radius: 1000,
      },
      processSVData
    )
  }

  // Updates locations and isPublished if they have changed in this session
  const handleSaveMap = async () => {
    const isPublishedHasChanged = initiallyPublished !== isPublished

    if (!isPublishedHasChanged && !haveLocationsChanged) {
      return showErrorToast('You have not made any changes.')
    }

    setIsSubmitting(true)

    const res = await mailman(
      `maps/custom/${mapId}`,
      'PUT',
      JSON.stringify({ locations: locationsRef.current, isPublished })
    )

    setIsSubmitting(false)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setInitiallyPubished(isPublished)
    setHaveLocationsChanged(false)

    return showSuccessToast('Your changes have been saved')
  }

  // Removes a location from locations array, unlinks marker from map, removes marker from marker array
  const handleRemoveLocation = () => {
    const markers = prevMarkersRef.current

    // If we have not selected a location, we remove the most recently added
    if (selectedIndex === -1) {
      const newLocations = locationsRef.current.slice(0, -1)
      setLocations(newLocations)

      markers[markers.length - 1].setMap(null)
      prevMarkersRef.current = prevMarkersRef.current.slice(0, -1)
    }
    // If we have selected a location, we remove at that index
    else {
      locationsRef.current.splice(selectedIndex, 1)

      markers[selectedIndex].setMap(null)
      prevMarkersRef.current.splice(selectedIndex, 1)
      setSelectedIndex(-1)
    }

    setHaveLocationsChanged(true)
    setIsShowingPreview(false)
  }

  const handleSaveLocation = () => {
    setHaveLocationsChanged(true)
    setIsShowingPreview(false)

    // If location has been modified in the preview window -> update the respective fields
    if (modifiedPosition) {
      locationsRef.current[selectedIndexRef.current].lat = modifiedPosition.lat
      locationsRef.current[selectedIndexRef.current].lng = modifiedPosition.lng

      prevMarkersRef.current[selectedIndexRef.current].setPosition({
        lat: modifiedPosition.lat,
        lng: modifiedPosition.lng,
      })
    }

    if (modifiedHeading) {
      locationsRef.current[selectedIndexRef.current].heading = modifiedHeading
    }

    if (modifiedPitch) {
      locationsRef.current[selectedIndexRef.current].pitch = modifiedPitch
    }

    // Reset the marker to unselected icon
    prevMarkersRef.current[selectedIndexRef.current].setIcon({
      url: REGULAR_MARKER_ICON,
      scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
    })

    setSelectedIndex(-1)
  }

  // Callback passed into edit modal
  const updateMapDetails = (name: string, description: string, avatar: string) => {
    setMapName(name)
    setMapDescription(description)
    setMapAvatar(avatar)
  }

  if (showErrorPage) {
    return <NotFound title="Page Not Found" message="You are not authorized to edit this map." />
  }

  return (
    <StyledCreateMapPage isShowingPreview={isShowingPreview /*& test1*/}>
      <Head title="Create A Map" />
      <Navbar />

      <div className="main-content">
        <div className="selection-map-wrapper">
          {!isLoading ? (
            <div className="map-top-menu">
              <div className="map-details">
                <Avatar type="map" src={mapAvatar} size={40} outlineColor="rgba(255, 255, 255, 0.5)" />
                <div className="map-name-wrapper">
                  <span className="map-name">{mapName}</span>
                </div>
              </div>
              <div className="map-action-buttons">
                <Button variant="solidGray" onClick={() => setEditModalOpen(true)}>
                  Edit Details
                </Button>
                <Button onClick={handleSaveMap} isLoading={isSubmitting} disabled={isSubmitting}>
                  Save Map
                </Button>
              </div>
              <div className="map-action-buttons mobile">
                <button className="edit-button" onClick={() => setEditModalOpen(true)}>
                  <PencilIcon />
                </button>
                <button onClick={handleSaveMap} disabled={isSubmitting}>
                  {isSubmitting ? <Spinner size={20} /> : <CloudUploadIcon />}
                </button>
              </div>
            </div>
          ) : (
            <div className="map-top-menu">
              <div className="map-details">
                <Skeleton variant="circular" height={40} width={40} />
                <Skeleton height={20} width={200} noBorder />
              </div>
              <div className="map-action-buttons">
                <Skeleton height={36} width={120} />
                <Skeleton height={36} width={120} />
              </div>
            </div>
          )}

          <div id="selectionMap"></div>
        </div>

        <div className="preview-map-wrapper">
          {!isLoading ? (
            <div className="map-top-menu">
              <span className="locations-count">{`${locations.length} location${
                locations.length !== 1 ? 's' : ''
              }`}</span>

              <div className="visibility-selection">
                <h2 className="visibility-warning">Publish Map</h2>
                <ToggleSwitch isActive={isPublished} setIsActive={setIsPublished} />
              </div>
            </div>
          ) : (
            <div className="map-top-menu">
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={200} />
            </div>
          )}

          <div className="preview-map">
            <div id="previewMap"></div>
            <div className="preview-action-buttons">
              <Button variant="destroy" onClick={handleRemoveLocation}>
                Remove Location
              </Button>
              <Button variant="solidGray" onClick={handleSaveLocation}>
                Save Location
              </Button>
            </div>
          </div>

          {!isLoading && locationsRef.current.length === 0 && (
            <div className="no-locations-wrapper">
              <div className="no-locations">
                <img
                  src="https://ouch-cdn2.icons8.com/wheN45aua7reMiicprxTGUEcr9SLNm7f2PyQGGlf5Os/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMTE4/LzcyOGU3NTM1LWE2/ZmYtNDYwZi05MTlh/LTE1YzIyYjk3NDQ0/OC5wbmc.png"
                  alt=""
                />
                <h2>No locations added</h2>
                <h3>Click a location on the map to preview it here.</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      <GoogleMapReact
        bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
        center={{ lat: 0, lng: 0 }}
        zoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={() => setGoogleMapsLoaded(true)}
      ></GoogleMapReact>

      <MobileNav />

      <CreateMapModal
        isOpen={editModalOpen}
        closeModal={() => setEditModalOpen(false)}
        mapId={mapId}
        mapName={mapName}
        mapDescription={mapDescription}
        mapAvatar={mapAvatar}
        updateMapDetails={updateMapDetails}
      />
    </StyledCreateMapPage>
  )
}

CreateMapPage.noLayout = true

export default CreateMapPage
