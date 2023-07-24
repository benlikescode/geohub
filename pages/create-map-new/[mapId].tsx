import 'allotment/dist/style.css'
import { Allotment } from 'allotment'
import { saveAs } from 'file-saver'
import GoogleMapReact from 'google-map-react'
import throttle from 'lodash/throttle'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { CreateMapDropdown } from '@components/dropdowns/CreateMapDropdown'
import { NotFound } from '@components/errorViews'
import { GoogleMapsSearch } from '@components/GoogleMapsSearch'
import { Head } from '@components/Head'
import { Navbar } from '@components/layout'
import { CreateMapModal } from '@components/modals'
import { SelectCoverage } from '@components/selects/SelectCoverage'
import { SelectMapLayers } from '@components/selects/SelectMapLayers'
import { Avatar, Button, Searchbar, Select, Skeleton, Spinner, ToggleSwitch } from '@components/system'
import { CloudUploadIcon, PencilIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import StyledNewCreateMapPage from '@styles/NewCreateMapPage.Styled'
import { LocationType, MapType, PageType, StreetViewCoverageType } from '@types'
import { PREVIEW_MAP_OPTIONS, SELECTION_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { formatMonthDayYear, formatMonthDayYearTime, formatMonthYear } from '@utils/dateHelpers'
import { createMapMarker, getMapsKey, mailman, showErrorToast, showSuccessToast } from '@utils/helpers'
import { useConfirmLeave, useIsMobile } from '@utils/hooks'

const SELECTED_MARKER_ICON = '/images/selected-pin.png'
const REGULAR_MARKER_ICON = '/images/regular-pin.png'
const SELECTED_MARKER_SIZE = 40
const REGULAR_MARKER_SIZE = 30

type GoogleMapsConfigType = {
  isLoaded: boolean
  selectionMap: google.maps.Map
  mapsApi: typeof google.maps
}

const CreateMapPage: PageType = () => {
  const router = useRouter()
  const mapId = router.query.mapId as string
  const user = useAppSelector((state) => state.user)
  const mapMakerState = useAppSelector((state) => state.mapMaker)

  const [locations, _setLocations] = useState<LocationType[]>([])
  const [selectedMarkerIndex, _setSelectedMarkerIndex] = useState(-1)
  const [haveLocationsChanged, setHaveLocationsChanged] = useState(false)
  const [mapDetails, setMapDetails] = useState<MapType | null>(null)
  const [showErrorPage, setShowErrorPage] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [initiallyPublished, setInitiallyPubished] = useState(false)
  const [showPreviewMap, setShowPreviewMap] = useState(false)
  const [googleMapsConfig, setGoogleMapsConfig] = useState<GoogleMapsConfigType>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [isSavingMap, setIsSavingMap] = useState(false)
  const [lastSave, setLastSave] = useState<Date>()

  const [modifiedHeading, setModifiedHeading] = useState<number | null>(null)
  const [modifiedPitch, setModifiedPitch] = useState<number | null>(null)
  const [modifiedPosition, setModifiedPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [modifiedZoom, setModifiedZoom] = useState<number | null>(null)
  const [modifiedPanoId, setModifiedPanoId] = useState<string | null>(null)

  const [pastCoverage, setPastCoverage] = useState<StreetViewCoverageType[]>()

  const { isMobile } = useIsMobile()

  const svServiceRef = useRef<google.maps.StreetViewService | null>(null)
  const svPanoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)
  const locationsRef = useRef<LocationType[]>([])
  const markersRef = useRef<google.maps.Marker[]>([])
  const selectedMarkerIndexRef = useRef(-1)

  const setLocations = (newLocations: LocationType[]) => {
    locationsRef.current = newLocations
    _setLocations(newLocations)
  }

  const setSelectedIndex = (newIndex: number) => {
    selectedMarkerIndexRef.current = newIndex
    _setSelectedMarkerIndex(newIndex)
  }

  useConfirmLeave(haveLocationsChanged)

  useEffect(() => {
    if (!mapId || !googleMapsConfig) return

    handleMount()
  }, [mapId, googleMapsConfig])

  const handleMount = async () => {
    const success = await getMapDetails()

    if (!success) return

    handleSetupSelectionMap()
    handleLoadPreviewMap()
  }

  const getMapDetails = async () => {
    const res = await mailman(`maps/custom/${mapId}`)

    if (res.error) {
      setShowErrorPage(true)
    }

    setMapDetails(res)
    setLocations(res.locations)
    setInitiallyPubished(res.isPublished || false)
    setLastSave(res.lastUpdatedAt)
    setIsLoading(false)

    return true
  }

  const handleSetupSelectionMap = () => {
    if (!googleMapsConfig) return

    const { selectionMap } = googleMapsConfig

    locationsRef.current.map((location) => {
      const marker = createMapMarker(location, selectionMap, REGULAR_MARKER_ICON, REGULAR_MARKER_SIZE)
      markersRef.current.push(marker)

      marker.addListener('click', () => handleMarkerClick(marker))
    })

    selectionMap.addListener('click', (e: google.maps.MapMouseEvent) => handleSelectionMapClick(e))

    const svLayer = new window.google.maps.StreetViewCoverageLayer()

    svLayer.setMap(selectionMap)
  }

  const handleMarkerClick = (marker: google.maps.Marker) => {
    // If previously selected marker -> reset its icon to regular
    if (selectedMarkerIndexRef.current !== -1) {
      markersRef.current[selectedMarkerIndexRef.current].setIcon({
        url: REGULAR_MARKER_ICON,
        scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
      })
    }

    marker.setIcon({
      url: SELECTED_MARKER_ICON,
      scaledSize: new google.maps.Size(SELECTED_MARKER_SIZE, SELECTED_MARKER_SIZE),
    })

    const markerIndex = markersRef.current.indexOf(marker)

    setSelectedIndex(markerIndex)
    loadNewPano(markerIndex)
  }

  const handleSelectionMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || !googleMapsConfig) return

    setHaveLocationsChanged(true)
    // setShowPreviewMap(false)

    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() }

    // Return early if clicked location has no coverage
    let isLocationCovered = true
    const streetViewService = new google.maps.StreetViewService()

    await streetViewService.getPanorama({ location: e.latLng, radius: 1000 }, (data) => {
      if (!data || !data.location) {
        isLocationCovered = false
      }
    })

    if (!isLocationCovered) return

    setLocations([...locationsRef.current, location])

    // If previously selected marker -> reset its icon to regular
    if (selectedMarkerIndexRef.current !== -1) {
      markersRef.current[selectedMarkerIndexRef.current].setIcon({
        url: REGULAR_MARKER_ICON,
        scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
      })
    }

    const marker = createMapMarker(location, googleMapsConfig.selectionMap, SELECTED_MARKER_ICON, SELECTED_MARKER_SIZE)
    markersRef.current.push(marker)

    const markerIndex = markersRef.current.indexOf(marker)
    setSelectedIndex(markerIndex)

    loadNewPano(markerIndex)

    marker.addListener('click', () => handleMarkerClick(marker))
  }

  const handleLoadPreviewMap = () => {
    const svService = new google.maps.StreetViewService()

    const svPanorama = new google.maps.StreetViewPanorama(
      document.getElementById('previewMap') as HTMLElement,
      PREVIEW_MAP_OPTIONS
    )

    svPanorama.addListener('position_changed', () => {
      const newLatLng = svPanorama.getPosition()

      console.log('updated pano: ', svPanorama.getPano())
      console.log('links', svPanorama.getLinks())
      console.log('location', svPanorama.getLocation())
      console.log('misc', svPanorama.getPhotographerPov(), svPanorama.getStatus())
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
        console.log(newZoom)

        setModifiedZoom(newZoom)
      }, 300)
    )

    svServiceRef.current = svService
    svPanoramaRef.current = svPanorama
  }

  const loadNewPano = (indexOfLoc?: number) => {
    console.log('aappapa', locationsRef.current)
    console.log('indexOfLoc', indexOfLoc)
    const location = locationsRef.current[indexOfLoc !== undefined ? indexOfLoc : locationsRef.current.length - 1]
    console.log('loccc', location)
    const svService = svServiceRef.current
    const svPanorama = svPanoramaRef.current

    if (!svService || !svPanorama) return

    svService.getPanorama({ location, radius: 1000 }, (data) => {
      if (!data || !data.location || !data.location.latLng) return

      // Idk why google doesn't have a type def for time but it does exist...
      const pastCoverage: StreetViewCoverageType[] = (data as any)?.time?.map((x: any) => {
        return {
          pano: x.pano,
          date: formatMonthYear(x.yp),
          isCurrent: data.location?.pano === x.pano,
        }
      })

      setPastCoverage(pastCoverage)

      const adjustedLat = data.location.latLng.lat()
      const adjustedLng = data.location.latLng.lng()
      const adjustedLocation = { ...location, lat: adjustedLat, lng: adjustedLng }

      const locationsCopy = [...locationsRef.current]
      locationsCopy[indexOfLoc !== undefined ? indexOfLoc : locationsCopy.length - 1] = adjustedLocation
      setLocations(locationsCopy)

      svPanorama.setPano(data.location.pano)
      svPanorama.setPov({
        heading: location.heading || 0,
        pitch: location.pitch || 0,
      })
      svPanorama.setZoom(location.zoom || 0)
      svPanorama.setVisible(true)
    })

    setShowPreviewMap(true)
  }

  const loadNewPanoById = (panoId: string) => {
    if (panoId === 'auto-update') {
      return loadNewPano(selectedMarkerIndexRef.current)
    }

    const svService = svServiceRef.current
    const svPanorama = svPanoramaRef.current

    if (!svService || !svPanorama) return
    console.log('PANOIDOIDOAIDOAIDA', panoId)

    svService.getPanorama({ pano: panoId }, () => {
      svPanorama.setPano(panoId)
      svPanorama.setPov({
        heading: 0,
        pitch: 0,
      })
      svPanorama.setZoom(0)
      svPanorama.setVisible(true)
    })

    setModifiedPanoId(panoId)
  }

  const handleUpdateLocation = () => {
    setHaveLocationsChanged(true)
    setShowPreviewMap(false)

    const selectedMarkerIdx = selectedMarkerIndexRef.current
    const locations = locationsRef.current
    const markers = markersRef.current

    if (modifiedPosition) {
      locations[selectedMarkerIdx].lat = modifiedPosition.lat
      locations[selectedMarkerIdx].lng = modifiedPosition.lng

      markers[selectedMarkerIdx].setPosition(modifiedPosition)
    }

    if (modifiedHeading) {
      locations[selectedMarkerIdx].heading = modifiedHeading
    }

    if (modifiedPitch) {
      locations[selectedMarkerIdx].pitch = modifiedPitch
    }

    if (modifiedZoom) {
      locations[selectedMarkerIdx].zoom = modifiedZoom
    }

    if (modifiedPanoId) {
      locations[selectedMarkerIdx].panoId = modifiedPanoId
    }

    // Reset the marker to unselected icon
    markers[selectedMarkerIdx].setIcon({
      url: REGULAR_MARKER_ICON,
      scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
    })

    setSelectedIndex(-1)
  }

  const handleRemoveLocation = () => {
    setHaveLocationsChanged(true)
    setShowPreviewMap(false)

    // If we have not selected a location, we remove the most recently added
    if (selectedMarkerIndex === -1) {
      const newLocations = locationsRef.current.slice(0, -1)
      setLocations(newLocations)

      markersRef.current[markersRef.current.length - 1].setMap(null)
      markersRef.current = markersRef.current.slice(0, -1)

      return
    }

    locationsRef.current.splice(selectedMarkerIndex, 1)

    markersRef.current[selectedMarkerIndex].setMap(null)
    markersRef.current.splice(selectedMarkerIndex, 1)

    setSelectedIndex(-1)
  }

  const handleSaveMap = async () => {
    // const isPublishedHasChanged = initiallyPublished !== isPublished

    if (!haveLocationsChanged) {
      return showErrorToast('No changes since last save')
    }

    setIsSavingMap(true)

    const res = await mailman(`maps/custom/${mapId}`, 'PUT', JSON.stringify({ locations: locationsRef.current }))

    setIsSavingMap(false)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setLastSave(new Date())

    // setInitiallyPubished(isPublished)
    setHaveLocationsChanged(false)

    return showSuccessToast('Your changes have been saved')
  }

  if (showErrorPage) {
    return <NotFound title="Page Not Found" message="You are not authorized to edit this map." />
  }

  return (
    <>
      {/* <OverlayOpacityStyle /> */}
      <StyledNewCreateMapPage showPreviewMap={showPreviewMap}>
        <Head title="Create A Map" />

        <div className="main-content">
          <Allotment vertical={isMobile} key={isMobile ? 1 : 0} className="allotment-wrapper">
            <Allotment.Pane preferredSize="55%">
              <div className="selection-map-wrapper">
                {/* <div className="allotment-indicator">
                <SwitchHorizontalIcon />
              </div> */}
                {!isLoading && mapDetails ? (
                  <div className="map-top-menu">
                    <div className="map-details">
                      <Avatar type="map" src={mapDetails.previewImg} size={36} />
                      <div className="map-name-wrapper">
                        <span className="map-name">{mapDetails.name}</span>
                      </div>
                      <button className="edit-button" onClick={() => setEditModalOpen(true)}>
                        <PencilIcon />
                      </button>
                    </div>
                    {/* <div className="map-action-buttons">
                  <Button variant="solidGray" onClick={() => console.log('yo')}>
                    Edit Details
                  </Button>
                  <Button onClick={() => console.log('yo')} isLoading={false} disabled={false}>
                    Save Map
                  </Button>
                </div> */}

                    {/* <Searchbar /> */}

                    {/* <div className="visibility-selection">
                        <h2 className="visibility-warning">Publish</h2>
                        <ToggleSwitch isActive={true} setIsActive={() => console.log('yo')} />
                      </div> */}

                    {/* <Searchbar /> */}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <GoogleMapsSearch googleMapsConfig={googleMapsConfig as GoogleMapsConfigType} />

                      {googleMapsConfig && <SelectMapLayers selectionMap={googleMapsConfig.selectionMap} />}

                      <Button onClick={() => handleSaveMap()} isLoading={isSavingMap} disabled={isSavingMap}>
                        Save Map
                      </Button>

                      {/* <div className="save-map-wrapper">
                        <div className="last-save-date">{formatMonthDayYearTime(lastSave)}</div>
                        <Button onClick={() => handleSaveMap()} isLoading={isSavingMap} disabled={isSavingMap}>
                          Save Map
                        </Button>
                      </div> */}
                    </div>

                    {/* <div className="map-action-buttons mobile">
                      <button className="edit-button" onClick={() => console.log('yo')}>
                        <PencilIcon />
                      </button>
                      <button onClick={() => console.log('yo')} disabled={false}>
                        {false ? <Spinner size={20} /> : <CloudUploadIcon />}
                      </button>
                    </div> */}
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

                <div className="selection-map">
                  <GoogleMapReact
                    bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
                    center={{ lat: 0, lng: 0 }}
                    zoom={2}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) =>
                      setGoogleMapsConfig({ isLoaded: true, selectionMap: map, mapsApi: maps })
                    }
                    options={SELECTION_MAP_OPTIONS}
                  ></GoogleMapReact>
                </div>
              </div>
            </Allotment.Pane>

            <Allotment.Pane>
              <div className="preview-map-wrapper">
                {!isLoading ? (
                  <div className="map-top-menu">
                    <span className="locations-count">{`${locations.length} location${
                      locations.length !== 1 ? 's' : ''
                    }`}</span>

                    {/* <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div className="import-export">
                        <div className="import-button">
                          <input type="file" id="import-input" accept=".json" onChange={(e) => handleFileUpload(e)} />
                          <label htmlFor="import-input">Import</label>
                        </div>

                        <button className="export-button" onClick={() => handleFileDownload()}>
                          Export
                        </button>
                      </div>
                    </div> */}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {pastCoverage && <SelectCoverage coverageOptions={pastCoverage} onChange={loadNewPanoById} />}

                      <CreateMapDropdown
                        googleMapsConfig={googleMapsConfig}
                        handleMarkerClick={handleMarkerClick}
                        locations={locations}
                        markersRef={markersRef}
                        setHaveLocationsChanged={setHaveLocationsChanged}
                        setLocations={setLocations}
                      />
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
                    <Button variant="solidGray" onClick={() => handleUpdateLocation()}>
                      Update Location
                    </Button>
                    <Button variant="destroy" onClick={() => handleRemoveLocation()}>
                      Remove
                    </Button>
                  </div>
                </div>

                {!isLoading && locationsRef.current.length === 0 && (
                  <div className="no-locations-wrapper">
                    <div className="no-locations">
                      <Image src="/images/no-locations.png" alt="" height={100} width={100} />
                      <h2>No locations added</h2>
                      <h3>Click a location on the map to preview it here.</h3>
                    </div>
                  </div>
                )}
              </div>
            </Allotment.Pane>
          </Allotment>
        </div>
      </StyledNewCreateMapPage>

      {mapDetails && (
        <CreateMapModal
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          mapDetails={mapDetails as MapType}
          setMapDetails={setMapDetails}
        />
      )}
    </>
  )
}

CreateMapPage.noLayout = true

export default CreateMapPage
