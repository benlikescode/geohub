import GoogleMapReact from 'google-map-react'
import React, { FC, useEffect, useRef } from 'react'
import { PickingInfo } from '@deck.gl/core/typed'
import { GoogleMapsOverlay } from '@deck.gl/google-maps/typed'
import { IconLayer } from '@deck.gl/layers/typed'
import { useAppSelector } from '@redux/hook'
import { GoogleMapsConfigType, LocationType } from '@types'
import { SELECTION_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { getMapsKey, showToast } from '@utils/helpers'
import { StyledSelectionMap } from './'

const REGULAR_MARKER_ICON = '/images/regular-pin.png'
const SELECTED_MARKER_ICON = '/images/selected-pin.png'

type Props = {
  googleMapsConfig: GoogleMapsConfigType | undefined
  setGoogleMapsConfig: (config: GoogleMapsConfigType) => void
  locations: LocationType[]
  addNewLocations: (locations: LocationType[] | LocationType) => void
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

    const overlay = new GoogleMapsOverlay({ pickingRadius: 10 })
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
      sizeScale: 26,
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
    setSelectedLocation(locations[d.index])
  }

  const handleSelectionMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng || hoveringIconRef.current === true) return

    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() }

    // Return early if clicked location has no coverage
    let isLocationCovered = true
    let adjustedLocation
    const streetViewService = new google.maps.StreetViewService()

    await streetViewService.getPanorama({ location: e.latLng }, (data) => {
      if (!data || !data.location || !data.location.latLng) {
        isLocationCovered = false
        return
      }

      adjustedLocation = { lat: data.location.latLng.lat(), lng: data.location.latLng.lng() }
    })

    if (!isLocationCovered) {
      return showToast('error', 'No coverage found here', 'mapEditor')
    }

    addNewLocations(adjustedLocation || location)
  }

  return (
    <StyledSelectionMap ref={wrapperRef}>
      <GoogleMapReact
        bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => setGoogleMapsConfig({ isLoaded: true, map, mapsApi: maps })}
        options={SELECTION_MAP_OPTIONS}
      ></GoogleMapReact>
    </StyledSelectionMap>
  )
}

export default SelectionMap
