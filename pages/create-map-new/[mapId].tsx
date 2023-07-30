import 'allotment/dist/style.css'
import { Allotment } from 'allotment'
import throttle from 'lodash/throttle'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AppLogo } from '@components/AppLogo'
import { CreateMapDropdown } from '@components/dropdowns/CreateMapDropdown'
import { NotFound } from '@components/errorViews'
import { GoogleMapsSearch } from '@components/GoogleMapsSearch'
import { Head } from '@components/Head'
import { CreateMapModal, SaveMapModal } from '@components/modals'
import { SelectCoverage } from '@components/selects/SelectCoverage'
import { SelectMapLayers } from '@components/selects/SelectMapLayers'
import { Avatar, Button, Skeleton } from '@components/system'
import { CloudUploadIcon, PencilIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import StyledNewCreateMapPage from '@styles/NewCreateMapPage.Styled'
import { ChangesType, GoogleMapsConfigType, LocationType, MapType, PageType, StreetViewCoverageType } from '@types'
import { PREVIEW_MAP_OPTIONS, SELECTION_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import {
  REGULAR_MARKER_ICON,
  REGULAR_MARKER_SIZE,
  SELECTED_MARKER_ICON,
  SELECTED_MARKER_SIZE,
} from '@utils/constants/random'
import { formatMonthYear, formatTimeAgo } from '@utils/dateHelpers'
import { createMapMarker, getMapsKey, mailman, showErrorToast, showSuccessToast } from '@utils/helpers'
import { useBreakpoint, useConfirmLeave } from '@utils/hooks'

const SelectionMap = dynamic(() => import('@components/SelectionMap/SelectionMap'), {
  ssr: false,
})

const CreateMapPage: PageType = () => {
  const router = useRouter()
  const mapId = router.query.mapId as string

  const [locations, setLocations] = useState<LocationType[]>([])
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null)
  // const [selectedIndex, setSelectedIndex] = useState(-1)
  const [hasMadeChanges, setHasMadeChanges] = useState(false)
  const [shouldReloadLayer, setShouldReloadLayer] = useState(false)
  // const [selectedMarkerIndex, _setSelectedMarkerIndex] = useState(-1)
  const [mapDetails, setMapDetails] = useState<MapType | null>(null)
  const [showErrorPage, setShowErrorPage] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPreviewMap, setShowPreviewMap] = useState(false)
  const [googleMapsConfig, setGoogleMapsConfig] = useState<GoogleMapsConfigType>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [lastSave, setLastSave] = useState<Date>()

  const [modifiedHeading, setModifiedHeading] = useState<number | null>(null)
  const [modifiedPitch, setModifiedPitch] = useState<number | null>(null)
  const [modifiedPosition, setModifiedPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [modifiedZoom, setModifiedZoom] = useState<number | null>(null)
  const [modifiedPanoId, setModifiedPanoId] = useState<string | null>(null)

  const [pastCoverage, setPastCoverage] = useState<StreetViewCoverageType[]>()
  const [panoMetaData, setPanoMetaData] = useState<google.maps.StreetViewPanoramaData | null>(null)

  const { isBreakpoint } = useBreakpoint('960px')

  const svServiceRef = useRef<google.maps.StreetViewService | null>(null)
  const svPanoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)
  // const locationsRef = useRef<LocationType[]>([])
  // const markersRef = useRef<google.maps.Marker[]>([])
  // const selectedMarkerIndexRef = useRef(-1)

  // const setLocations = (newLocations: LocationType[]) => {
  //   locationsRef.current = newLocations
  //   _setLocations(newLocations)
  // }

  // const setSelectedIndex = (newIndex: number) => {
  //   selectedMarkerIndexRef.current = newIndex
  //   _setSelectedMarkerIndex(newIndex)
  // }

  // const incrementChanges = (type: keyof ChangesType) => {
  //   setChanges((prev) => ({ ...prev, [type]: prev[type] + 1 }))
  // }

  useConfirmLeave(hasMadeChanges)

  useEffect(() => {
    if (!mapId) return

    getMapDetails()
  }, [mapId])

  useEffect(() => {
    if (!googleMapsConfig) return

    handleLoadPreviewMap()
  }, [googleMapsConfig])

  useEffect(() => {
    console.log('fireee')

    loadNewPano()
  }, [selectedLocation])

  const getMapDetails = async () => {
    const res = await mailman(`maps/custom/${mapId}`)

    if (res.error) {
      return setShowErrorPage(true)
    }

    setMapDetails(res)
    setLocations(res.locations)
    setLastSave(res.lastUpdatedAt)

    setIsLoading(false)
  }

  // const handleMarkerClick = (marker: google.maps.Marker) => {
  //   // If previously selected marker -> reset its icon to regular
  //   if (selectedMarkerIndexRef.current !== -1) {
  //     markersRef.current[selectedMarkerIndexRef.current].setIcon({
  //       url: REGULAR_MARKER_ICON,
  //       scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
  //     })
  //   }

  //   marker.setIcon({
  //     url: SELECTED_MARKER_ICON,
  //     scaledSize: new google.maps.Size(SELECTED_MARKER_SIZE, SELECTED_MARKER_SIZE),
  //   })

  //   const markerIndex = markersRef.current.indexOf(marker)

  //   setSelectedIndex(markerIndex)
  //   loadNewPano(markerIndex)
  // }

  const addNewLocations = (newLocations: LocationType[] | LocationType) => {
    // if (!googleMapsConfig) return

    // const { map } = googleMapsConfig

    // If previously selected marker -> reset its icon to regular
    // if (selectedMarkerIndexRef.current !== -1) {
    //   markersRef.current[selectedMarkerIndexRef.current].setIcon({
    //     url: REGULAR_MARKER_ICON,
    //     scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
    //   })
    // }

    // locations.map((location) => {
    //   const marker = createMapMarker(
    //     location,
    //     map,
    //     markerType === 'selected' ? SELECTED_MARKER_ICON : REGULAR_MARKER_ICON,
    //     markerType === 'selected' ? SELECTED_MARKER_SIZE : REGULAR_MARKER_SIZE
    //   )

    //   markersRef.current.push(marker)

    //   marker.addListener('click', () => handleMarkerClick(marker))
    // })

    if (Array.isArray(newLocations)) {
      return setLocations((prev) => [...prev, ...newLocations])
    }

    setLocations((prev) => [...prev, newLocations])
    setSelectedLocation(newLocations)

    // TEMPORARILY just set to first index of newLocations
    // setSelectedLocation(newLocations[0])

    // const newLocations = [...locationsRef.current, ...locations]
    // setLocations(newLocations)
    // incrementChanges('added')
  }

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
        console.log(newZoom)

        setModifiedZoom(newZoom)
      }, 300)
    )

    svServiceRef.current = svService
    svPanoramaRef.current = svPanorama
  }

  const loadNewPano = (indexOfLoc?: number) => {
    console.log('LOAD NEW PANO', indexOfLoc)
    // const location = locations[indexOfLoc !== undefined ? indexOfLoc : locations.length - 1]

    // console.log('LOAD NEW PANO LOC: ', location)

    const svService = svServiceRef.current
    const svPanorama = svPanoramaRef.current

    if (!svService || !svPanorama || !selectedLocation) return

    svService.getPanorama({ location: selectedLocation, radius: 1000 }, (data) => {
      console.log(data)
      if (!data || !data.location || !data.location.latLng) return

      console.log('checkly')

      // Idk why google doesn't have a type def for time but it does exist...
      const pastCoverage: StreetViewCoverageType[] = (data as any)?.time?.map((x: any) => {
        return {
          pano: x.pano,
          date: formatMonthYear(x.zp),
          isCurrent: data.location?.pano === x.pano,
        }
      })

      setPastCoverage(pastCoverage)
      setPanoMetaData(data)

      // const adjustedLat = data.location.latLng.lat()
      // const adjustedLng = data.location.latLng.lng()
      // const adjustedLocation = { ...location, lat: adjustedLat, lng: adjustedLng }

      // const locationsCopy = [...locations]
      // locationsCopy[indexOfLoc !== undefined ? indexOfLoc : locationsCopy.length - 1] = adjustedLocation
      // setLocations(locationsCopy)

      svPanorama.setPano(data.location.pano)
      svPanorama.setPov({
        heading: selectedLocation.heading || 0,
        pitch: selectedLocation.pitch || 0,
      })
      svPanorama.setZoom(selectedLocation.zoom || 0)
      svPanorama.setVisible(true)
    })

    setShowPreviewMap(true)
    // selectedIndex !== -1 && setSelectedIndex(-1)
  }

  // const loadNewPanoById = (panoId: string) => {
  //   if (panoId === 'auto-update') {
  //     return loadNewPano(selectedMarkerIndexRef.current)
  //   }

  //   const svService = svServiceRef.current
  //   const svPanorama = svPanoramaRef.current

  //   if (!svService || !svPanorama) return
  //   console.log('PANOIDOIDOAIDOAIDA', panoId)

  //   svService.getPanorama({ pano: panoId }, () => {
  //     svPanorama.setPano(panoId)
  //     svPanorama.setPov({
  //       heading: 0,
  //       pitch: 0,
  //     })
  //     svPanorama.setZoom(0)
  //     svPanorama.setVisible(true)
  //   })

  //   setShowPreviewMap(true)
  //   setModifiedPanoId(panoId)
  // }

  const handleUpdateLocation = () => {
    if (!selectedLocation) return

    // incrementChanges('updated')
    setShowPreviewMap(false)

    const updatedLocations = [...locations]
    const indexOfSelected = updatedLocations.indexOf(selectedLocation)

    if (modifiedPosition) {
      updatedLocations[indexOfSelected].lat = modifiedPosition.lat
      updatedLocations[indexOfSelected].lng = modifiedPosition.lng
    }

    if (modifiedHeading) {
      updatedLocations[indexOfSelected].heading = modifiedHeading
    }

    if (modifiedPitch) {
      updatedLocations[indexOfSelected].pitch = modifiedPitch
    }

    if (modifiedZoom) {
      updatedLocations[indexOfSelected].zoom = modifiedZoom
    }

    if (modifiedPanoId) {
      updatedLocations[indexOfSelected].panoId = modifiedPanoId
    }

    setLocations(updatedLocations)
    setSelectedLocation(null)
  }

  const handleRemoveLocation = () => {
    // incrementChanges('deleted')
    setShowPreviewMap(false)

    // If we have not selected a location, we remove the most recently added
    if (!selectedLocation) {
      return setLocations((prev) => prev.slice(0, -1))
    }

    setLocations((prev) => prev.filter((x) => x !== selectedLocation))
    // setLocations((prev) => prev.slice(0, selectedIndex).concat(prev.slice(selectedIndex + 1)))
    setSelectedLocation(null)
  }

  if (showErrorPage) {
    return <NotFound title="Page Not Found" message="You are not authorized to edit this map." />
  }

  return (
    <>
      <StyledNewCreateMapPage showPreviewMap={showPreviewMap}>
        <Head title="Create A Map" />

        <div className="header">
          {/* <AppLogo /> */}

          {!isLoading && mapDetails ? (
            <div className="map-details">
              <Avatar type="map" src={mapDetails.previewImg} size={34} />
              <div className="map-name-wrapper">
                <span className="map-name">{mapDetails.name}</span>
              </div>
              <button className="edit-button" onClick={() => setEditModalOpen(true)}>
                <PencilIcon />
              </button>
            </div>
          ) : (
            <div className="map-top-menu">
              <div className="map-details">
                <Skeleton variant="circular" height={40} width={40} />
                <Skeleton height={20} width={200} noBorder />
              </div>
            </div>
          )}

          <div className="header-group">
            <div className="save-map-wrapper">
              {lastSave && <div className="last-save-date">{`Saved ${formatTimeAgo(lastSave)}`}</div>}
              <Button onClick={() => setSaveModalOpen(true)} size="md">
                Save Map
              </Button>
            </div>

            <CreateMapDropdown locations={locations} addNewLocations={addNewLocations} />
          </div>
        </div>

        <div className="main-content">
          <Allotment vertical={isBreakpoint} className="allotment-wrapper">
            <Allotment.Pane>
              {mapDetails && (
                <SelectionMap
                  googleMapsConfig={googleMapsConfig}
                  setGoogleMapsConfig={setGoogleMapsConfig}
                  locations={locations}
                  addNewLocations={addNewLocations}
                  // selectedIndex={selectedIndex}
                  // setSelectedIndex={setSelectedIndex}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              )}
            </Allotment.Pane>

            <Allotment.Pane>
              <div className="preview-map-wrapper">
                {!isLoading ? (
                  <div className="map-top-menu">
                    <span className="locations-count">{`${locations.length} location${
                      locations.length !== 1 ? 's' : ''
                    }`}</span>

                    {/* {pastCoverage && <SelectCoverage coverageOptions={pastCoverage} onChange={loadNewPanoById} />} */}
                  </div>
                ) : (
                  <div className="map-top-menu">
                    <Skeleton height={20} width={100} />
                  </div>
                )}

                <div className="preview-map">
                  <div id="previewMap"></div>
                  <div className="bottom-bar">
                    {/* {pastCoverage && <SelectCoverage coverageOptions={pastCoverage} onChange={loadNewPanoById} />} */}
                    {panoMetaData && <span className="pano-description">{panoMetaData.location?.description}</span>}
                    <div className="preview-action-buttons">
                      <Button
                        variant="solidGray"
                        size="md"
                        // backgroundColor="#000"
                        // color="#fff"
                        onClick={() => handleUpdateLocation()}
                      >
                        Update Location
                      </Button>
                      <Button variant="destroy" size="md" onClick={() => handleRemoveLocation()}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                {!isLoading && locations.length === 0 && (
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

      <SaveMapModal
        isOpen={saveModalOpen}
        closeModal={() => setSaveModalOpen(false)}
        locations={locations}
        setLastSave={setLastSave}
      />
    </>
  )
}

CreateMapPage.noLayout = true

export default CreateMapPage
