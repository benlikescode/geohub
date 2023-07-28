import 'allotment/dist/style.css'
import { Allotment } from 'allotment'
import GoogleMapReact from 'google-map-react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppLogo } from '@components/AppLogo'
import { CreateMapDropdown } from '@components/dropdowns/CreateMapDropdown'
import { NotFound } from '@components/errorViews'
import { GoogleMapsSearch } from '@components/GoogleMapsSearch'
import { Head } from '@components/Head'
import { PreviewMap } from '@components/map-maker/PreviewMap'
import { SelectionMap } from '@components/map-maker/SelectionMap'
import { CreateMapModal, DestroyModal } from '@components/modals'
import { SaveMapModal } from '@components/modals/SaveMapModal'
import { SelectCoverage } from '@components/selects/SelectCoverage'
import { SelectMapLayers } from '@components/selects/SelectMapLayers'
import { Avatar, Button, Skeleton } from '@components/system'
import { CloudUploadIcon, PencilIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import {
  setChanges,
  setLastSave,
  setLocations,
  setMapDetails,
  setSelectedMarkerIdx,
  setShowPreviewMap,
} from '@redux/slices'
import StyledNewCreateMapPage from '@styles/NewCreateMapPage.Styled'
import { GoogleMapsConfigType, LocationType, MapType, PageType, StreetViewCoverageType } from '@types'
import {
  REGULAR_MARKER_ICON,
  REGULAR_MARKER_SIZE,
  SELECTED_MARKER_ICON,
  SELECTED_MARKER_SIZE,
} from '@utils/constants/random'
import { formatMonthYear, formatTimeAgo } from '@utils/dateHelpers'
import { createMapMarker, getMapsKey, mailman, showErrorToast, showSuccessToast } from '@utils/helpers'
import { useConfirmLeave, useIsMobile } from '@utils/hooks'

const CreateMapPage: PageType = () => {
  const router = useRouter()
  const mapId = router.query.mapId as string
  const user = useAppSelector((state) => state.user)
  const mapMakerState = useAppSelector((state) => state.mapMaker)
  const dispatch = useDispatch()

  const [showErrorPage, setShowErrorPage] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [initiallyPublished, setInitiallyPubished] = useState(false)
  const [googleMapsConfig, setGoogleMapsConfig] = useState<GoogleMapsConfigType>()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [isSavingMap, setIsSavingMap] = useState(false)

  const [pastCoverage, setPastCoverage] = useState<StreetViewCoverageType[]>()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [saveModalOpen, setSaveModalOpen] = useState(false)

  const { isMobile } = useIsMobile()

  const svServiceRef = useRef<google.maps.StreetViewService | null>(null)
  const svPanoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)
  const locationsRef = useRef<LocationType[]>([])
  const markersRef = useRef<google.maps.Marker[]>([])
  const selectedMarkerIndexRef = useRef(-1)

  const handleSetLocations = (newLocations: LocationType[]) => {
    locationsRef.current = newLocations
    dispatch(setLocations(newLocations))
  }

  const handleSetSelectedIndex = (newIndex: number) => {
    selectedMarkerIndexRef.current = newIndex
    dispatch(setSelectedMarkerIdx(newIndex))
  }

  useEffect(() => {
    if (!mapId) return

    getMapDetails()
  }, [mapId])

  const getMapDetails = async () => {
    const res = await mailman(`maps/custom/${mapId}`)

    if (res.error) {
      setShowErrorPage(true)
    }

    dispatch(setMapDetails(res))
    dispatch(setLastSave(res.lastUpdatedAt))

    handleSetLocations(res.locations)

    setInitiallyPubished(res.isPublished || false)
    setIsLoading(false)
  }

  const addNewLocations = (locations: LocationType[], markerType: 'selected' | 'regular' = 'selected') => {
    if (!googleMapsConfig) return

    // If previously selected marker -> reset its icon to regular
    if (selectedMarkerIndexRef.current !== -1) {
      markersRef.current[selectedMarkerIndexRef.current].setIcon({
        url: REGULAR_MARKER_ICON,
        scaledSize: new google.maps.Size(REGULAR_MARKER_SIZE, REGULAR_MARKER_SIZE),
      })
    }

    locations.map((location) => {
      const marker = createMapMarker(
        location,
        googleMapsConfig.map,
        markerType === 'selected' ? SELECTED_MARKER_ICON : REGULAR_MARKER_ICON,
        markerType === 'selected' ? SELECTED_MARKER_SIZE : REGULAR_MARKER_SIZE
      )

      markersRef.current.push(marker)

      marker.addListener('click', () => handleMarkerClick(marker))

      // const markerIndex = markersRef.current.indexOf(marker)
      // setSelectedIndex(markerIndex)
    })

    const newLocations = [...locationsRef.current, ...locations]

    handleSetLocations(newLocations)
    dispatch(setChanges('add'))

    if (markerType === 'selected') {
      loadNewPano()
    }
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

    handleSetSelectedIndex(markerIndex)
    loadNewPano(markerIndex)
  }

  const loadNewPano = (indexOfLoc?: number) => {
    const location = locationsRef.current[indexOfLoc !== undefined ? indexOfLoc : locationsRef.current.length - 1]

    const svService = svServiceRef.current
    const svPanorama = svPanoramaRef.current

    if (!svService || !svPanorama) return

    svService.getPanorama({ location, radius: 1000 }, (data) => {
      if (!data || !data.location || !data.location.latLng) return

      // Idk why google doesn't have a type def for time but it does exist...
      // const pastCoverage: StreetViewCoverageType[] = (data as any)?.time?.map((x: any) => {
      //   return {
      //     pano: x.pano,
      //     date: formatMonthYear(x.yp),
      //     isCurrent: data.location?.pano === x.pano,
      //   }
      // })

      // setPastCoverage(pastCoverage)

      const adjustedLat = data.location.latLng.lat()
      const adjustedLng = data.location.latLng.lng()
      const adjustedLocation = { ...location, lat: adjustedLat, lng: adjustedLng }

      const locationsCopy = [...locationsRef.current]
      locationsCopy[indexOfLoc !== undefined ? indexOfLoc : locationsCopy.length - 1] = adjustedLocation
      handleSetLocations(locationsCopy)

      svPanorama.setPano(data.location.pano)
      svPanorama.setPov({
        heading: location.heading || 0,
        pitch: location.pitch || 0,
      })
      svPanorama.setZoom(location.zoom || 0)
      svPanorama.setVisible(true)
    })

    dispatch(setShowPreviewMap(true))
  }

  const handleDeleteMap = async () => {
    setIsDeleting(true)

    const res = await mailman(`maps/custom/${mapId}`, 'DELETE')

    if (res.error) {
      showErrorToast('Failed to delete map')
    }

    if (res.message) {
      setDeleteModalOpen(false)
      router.push('/my-maps')
    }

    setIsDeleting(false)
  }

  if (showErrorPage) {
    return <NotFound title="Page Not Found" message="You are not authorized to edit this map." />
  }

  return (
    <>
      <StyledNewCreateMapPage>
        <Head title="Create A Map" />

        <div className="header">
          {/* <AppLogo /> */}

          {!isLoading && mapMakerState.mapDetails ? (
            <div className="map-details">
              <Avatar type="map" src={mapMakerState.mapDetails.previewImg} size={34} />
              <div className="map-name-wrapper">
                <span className="map-name">{mapMakerState.mapDetails.name}</span>
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
              {mapMakerState.lastSave && (
                <div className="last-save-date">{`Saved ${formatTimeAgo(mapMakerState.lastSave)}`}</div>
              )}
              <Button onClick={() => setSaveModalOpen(true)} isLoading={isSavingMap} disabled={isSavingMap}>
                Save Map
              </Button>
            </div>

            <CreateMapDropdown
              locations={mapMakerState.locations}
              addNewLocations={addNewLocations}
              setDeleteModalOpen={setDeleteModalOpen}
            />
          </div>
        </div>

        <div className="main-content">
          <Allotment vertical={isMobile} key={isMobile ? 1 : 0} className="allotment-wrapper">
            <Allotment.Pane>
              {mapMakerState.mapDetails && (
                <SelectionMap
                  googleMapsConfig={googleMapsConfig}
                  setGoogleMapsConfig={setGoogleMapsConfig}
                  addNewLocations={addNewLocations}
                  locationsRef={locationsRef}
                  markersRef={markersRef}
                  handleMarkerClick={handleMarkerClick}
                />
              )}
            </Allotment.Pane>

            <Allotment.Pane>
              {googleMapsConfig && (
                <PreviewMap
                  svServiceRef={svServiceRef}
                  svPanoramaRef={svPanoramaRef}
                  locationsRef={locationsRef}
                  markersRef={markersRef}
                  selectedMarkerIndexRef={selectedMarkerIndexRef}
                />
              )}
            </Allotment.Pane>
          </Allotment>
        </div>
      </StyledNewCreateMapPage>

      {mapMakerState.mapDetails && (
        <CreateMapModal
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          mapDetails={mapMakerState.mapDetails}
          setMapDetails={setMapDetails}
        />
      )}

      <DestroyModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onAction={() => handleDeleteMap()}
        title="Confirm Delete"
        message="This map and all it's locations will be permanently deleted."
        isSubmitting={isDeleting}
      />

      {/* <SaveMapModal
        isOpen={saveModalOpen}
        closeModal={() => setSaveModalOpen(false)}
        changes={mapMakerState.changes}
        locationsRef={locationsRef}
        setLastSave={setLastSave}
      /> */}
    </>
  )
}

CreateMapPage.noLayout = true

export default CreateMapPage
