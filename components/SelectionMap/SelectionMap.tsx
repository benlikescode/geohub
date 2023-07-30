import GoogleMapReact from 'google-map-react'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMapsSearch } from '@components/GoogleMapsSearch'
import { SelectMapLayers } from '@components/selects/SelectMapLayers'
import { PickingInfo } from '@deck.gl/core/typed'
import { GoogleMapsOverlay } from '@deck.gl/google-maps/typed'
import { IconLayer } from '@deck.gl/layers/typed'
import { useAppSelector } from '@redux/hook'
import { GoogleMapsConfigType, LocationType } from '@types'
import { SELECTION_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { REGULAR_MARKER_ICON, REGULAR_MARKER_SIZE, SELECTED_MARKER_ICON } from '@utils/constants/random'
import { getMapsKey, showErrorToast } from '@utils/helpers'
import { StyledSelectionMap } from './'

type Props = {
  googleMapsConfig: GoogleMapsConfigType | undefined
  setGoogleMapsConfig: (config: GoogleMapsConfigType) => void
  locations: LocationType[]
  addNewLocations: (locations: LocationType[] | LocationType) => void
  // selectedIndex: number
  // setSelectedIndex: (selectedIndex: number) => void
  selectedLocation: LocationType | null
  setSelectedLocation: any
}

const SelectionMap: FC<Props> = ({
  googleMapsConfig,
  setGoogleMapsConfig,
  locations,
  addNewLocations,
  selectedLocation,
  setSelectedLocation,
}) => {
  const user = useAppSelector((state) => state.user)
  const deckRef = useRef<GoogleMapsOverlay | null>(null)
  const deckLayerRef = useRef<IconLayer | null>(null)
  const hoveringIconRef = useRef(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    handleSetupSelectionMap()
  }, [googleMapsConfig])

  useEffect(() => {
    handleLocationChange()
  }, [deckRef.current, locations, selectedLocation])

  const handleSetupSelectionMap = () => {
    if (!googleMapsConfig) return

    const { map } = googleMapsConfig

    map.addListener('click', (e: google.maps.MapMouseEvent) => handleSelectionMapClick(e))

    const svLayer = new window.google.maps.StreetViewCoverageLayer()
    svLayer.setMap(map)

    const overlay = new GoogleMapsOverlay({})
    overlay.setMap(map)
    deckRef.current = overlay
  }

  const handleLocationChange = () => {
    if (!deckRef.current) return

    const data = locations.map((location) => {
      return {
        position: [location.lng, location.lat],
        icon: location === selectedLocation ? SELECTED_MARKER_ICON : REGULAR_MARKER_ICON,
      }
    })

    const layer = new IconLayer({
      id: 'icon-layer',
      data: data,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      sizeScale: 30,
      onHover: (d) => handleMarkerHover(d),
      onClick: (d) => handleMarkerClick(d),
      getIcon: (d) => ({
        url: d.icon,
        width: 128,
        height: 128,
        anchorY: 128,
      }),
    })

    deckRef.current.setProps({ layers: [layer] })
  }

  const handleMarkerHover = (d: PickingInfo) => {
    hoveringIconRef.current = !!d.object

    // Little bit hacky... but best solution I found for setting cursor: pointer on icon hover
    googleMapsConfig?.map.setOptions({ draggableCursor: d.object ? 'pointer' : 'crosshair' })
  }

  const handleMarkerClick = (d: PickingInfo) => {
    console.log(d)
    console.log(locations[d.index])
    setSelectedLocation(locations[d.index])

    // setSelectedIndex(d.index)
  }

  const handleSelectionMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || hoveringIconRef.current === true) return

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

    setSelectedLocation(null)
    addNewLocations(location)
  }

  return (
    <StyledSelectionMap ref={wrapperRef}>
      {/* <div className="allotment-indicator">
                  <SwitchHorizontalIcon />
                </div> */}

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
        {/* <DeckGL
          
          controller={true}
          layers={[layer]} // Use the same IconLayer instance here
        /> */}
      </div>
    </StyledSelectionMap>
  )
}

export default SelectionMap
