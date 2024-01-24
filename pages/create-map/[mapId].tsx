import 'allotment/dist/style.css'
import { Allotment } from 'allotment'
import throttle from 'lodash/throttle'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { CreateMapDropdown } from '@components/dropdowns/CreateMapDropdown'
import { NotFound } from '@components/errorViews'
import { GoogleMapsSearch } from '@components/GoogleMapsSearch'
import { Meta } from '@components/Meta'
import { CreateMapModal, SaveMapModal } from '@components/modals'
import { SelectMapLayers } from '@components/selects/SelectMapLayers'
import { Avatar, Button, Skeleton } from '@components/system'
import { ChevronLeftIcon, PencilAltIcon, PencilIcon } from '@heroicons/react/outline'
import StyledCreateMapPage from '@styles/CreateMapPage.Styled'
import { GoogleMapsConfigType, LocationType, MapType, PageType, StreetViewCoverageType } from '@types'
import { PREVIEW_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { formatMonthYear, formatTimeAgo } from '@utils/dateHelpers'
import { formatLargeNumber, mailman } from '@utils/helpers'
import { useBreakpoint, useConfirmLeave } from '@utils/hooks'

const SelectionMap = dynamic(() => import('@components/SelectionMap/SelectionMap'), {
  ssr: false,
})

const CreateMapPage: PageType = () => {
  const router = useRouter()
  const mapId = router.query.mapId as string

  const [locations, setLocations] = useState<LocationType[]>([])
  const [addedLocations, setAddedLocations] = useState<LocationType | null>(null)
  const [deletedLocations, setDeletedLocations] = useState<LocationType | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null)
  const [haveLocationsChanged, setHaveLocationsChanged] = useState(false)
  const [initiallyPublished, setInitiallyPublished] = useState<boolean | null>(null)
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

  const { isBreakpoint } = useBreakpoint(600)

  const svServiceRef = useRef<google.maps.StreetViewService | null>(null)
  const svPanoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)

  useConfirmLeave(haveLocationsChanged)

  useEffect(() => {
    if (!mapId) return

    getMapDetails()
  }, [mapId])

  useEffect(() => {
    if (!googleMapsConfig) return

    handleLoadPreviewMap()
  }, [googleMapsConfig])

  useEffect(() => {
    loadNewPano()
  }, [selectedLocation])

  const getMapDetails = async () => {
    const res = await mailman(`maps/custom/${mapId}`)

    if (res.error) {
      return setShowErrorPage(true)
    }

    setMapDetails(res)
    setLocations(res.locations)
    setInitiallyPublished(res.isPublished)
    setLastSave(res.lastUpdatedAt)

    setIsLoading(false)
  }

  const addNewLocations = (newLocations: LocationType[] | LocationType) => {
    setHaveLocationsChanged(true)

    if (Array.isArray(newLocations)) {
      setLocations((prevLocations: LocationType[]) => [...prevLocations, ...newLocations]);
      setAddedLocations((prevLocations: LocationType[]) => [...prevLocations, ...newLocations]);
    } else {
      setLocations((prevLocations: LocationType[]) => [...prevLocations, newLocations]);
      setAddedLocations((prevLocations: LocationType[]) => [...prevLocations, newLocations]);
    }
    setSelectedLocation(newLocations)
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

        setModifiedZoom(newZoom)
      }, 300)
    )

    svServiceRef.current = svService
    svPanoramaRef.current = svPanorama
  }

  const loadNewPano = () => {
    const svService = svServiceRef.current
    const svPanorama = svPanoramaRef.current

    if (!svService || !svPanorama || !selectedLocation) return

    svService.getPanorama({ location: selectedLocation }, (data) => {
      if (!data || !data.location || !data.location.latLng) return

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

      svPanorama.setPano(data.location.pano)
      svPanorama.setPov({
        heading: selectedLocation.heading || 0,
        pitch: selectedLocation.pitch || 0,
      })
      svPanorama.setZoom(selectedLocation.zoom || 0)
      svPanorama.setVisible(true)
    })

    setShowPreviewMap(true)
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

    setHaveLocationsChanged(true)
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
    setHaveLocationsChanged(true)
    setShowPreviewMap(false)

    // If we have not selected a location, we remove the most recently added
    if (!selectedLocation) {
      setLocations((prev: LocationType[]) => {
        const updatedLocations = prev.slice(0, -1);
        const deletedLocation = prev[prev.length - 1];
        setDeletedLocations((prevDeleted: LocationType[]) => [...prevDeleted, deletedLocation]);
        return updatedLocations;
      });
    } else {
      setLocations((prev: LocationType[]) => {
        const updatedLocations = prev.filter((x) => x !== selectedLocation);
        setDeletedLocations((prevDeleted: LocationType[]) => [...prevDeleted, selectedLocation]);
        return updatedLocations;
      });
      setSelectedLocation(null);
    }
  }

  if (showErrorPage) {
    return <NotFound title="Page Not Found" message="You are not authorized to edit this map." />
  }

  return (
    <>
      <StyledCreateMapPage showPreviewMap={showPreviewMap}>
        <Meta title="Map Editor" />

        <Allotment vertical={isBreakpoint}>
          <Allotment.Pane className="allotment-item border">
            <div className="menu-group">
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
                <div>
                  <div className="map-details">
                    <Skeleton height={34} width={34} />
                    <Skeleton height={20} width={200} noBorder />
                  </div>
                </div>
              )}

              <GoogleMapsSearch
                googleMapsConfig={googleMapsConfig as GoogleMapsConfigType}
                addNewLocations={addNewLocations}
              />
            </div>

            <div className="selection-map-wrapper">
              {/* <div className="map-top-menu">
                  <GoogleMapsSearch
                    googleMapsConfig={googleMapsConfig as GoogleMapsConfigType}
                    addNewLocations={addNewLocations}
                  />

                  {googleMapsConfig && <SelectMapLayers selectionMap={googleMapsConfig.map} />}
                </div> */}
              <SelectionMap
                googleMapsConfig={googleMapsConfig}
                setGoogleMapsConfig={setGoogleMapsConfig}
                locations={locations}
                addNewLocations={addNewLocations}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>

            <div className="menu-group">
              {googleMapsConfig && <SelectMapLayers selectionMap={googleMapsConfig.map} />}
            </div>
          </Allotment.Pane>

          <Allotment.Pane className="allotment-item">
            <div className="menu-group">
              {!isLoading ? (
                <span className="locations-count">{`${formatLargeNumber(locations.length)} location${
                  locations.length !== 1 ? 's' : ''
                }`}</span>
              ) : (
                <Skeleton height={20} width={100} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="save-map-wrapper">
                  {lastSave && <div className="last-save-date">{`Saved ${formatTimeAgo(lastSave)}`}</div>}
                  <Button onClick={() => setSaveModalOpen(true)} size="md">
                    Save Map
                  </Button>
                </div>

                <CreateMapDropdown locations={locations} addNewLocations={addNewLocations} />
              </div>
            </div>

            <div className="preview-map-wrapper">
              <div className="preview-map">
                <div id="previewMap"></div>
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

            <div className="menu-group">
              <div className="preview-bottom">
                {/* {pastCoverage && <SelectCoverage coverageOptions={pastCoverage} onChange={loadNewPanoById} />} */}
                {panoMetaData && <span className="pano-description">{panoMetaData.location?.description}</span>}
                <div className="preview-action-buttons">
                  <Button variant="solidGray" size="md" onClick={() => handleUpdateLocation()}>
                    Update Location
                  </Button>
                  <Button variant="destroy" size="md" onClick={() => handleRemoveLocation()}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Allotment.Pane>
        </Allotment>
      </StyledCreateMapPage>

      {mapDetails && (
        <CreateMapModal
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          mapDetails={mapDetails as MapType}
          setMapDetails={setMapDetails}
        />
      )}

      {initiallyPublished !== null && (
        <SaveMapModal
          isOpen={saveModalOpen}
          closeModal={() => setSaveModalOpen(false)}
          locations={locations}
          addedLocations={addedLocations}
          deletedLocations={deletedLocations}
          setLastSave={setLastSave}
          initiallyPublished={initiallyPublished}
          setInitiallyPublished={setInitiallyPublished}
          haveLocationsChanged={haveLocationsChanged}
          setHaveLocationsChanged={setHaveLocationsChanged}
        />
      )}
    </>
  )
}

CreateMapPage.noLayout = true

export default CreateMapPage
