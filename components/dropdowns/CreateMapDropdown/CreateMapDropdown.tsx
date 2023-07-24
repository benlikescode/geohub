import saveAs from 'file-saver'
import { ChangeEvent, FC, MutableRefObject } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { Content, Item, Portal, Root, Separator, Trigger } from '@radix-ui/react-dropdown-menu'
import { LocationType } from '@types'
import { createMapMarker, showErrorToast, showSuccessToast } from '@utils/helpers'
import { StyledCreateMapDropdown } from './'

const REGULAR_MARKER_ICON = '/images/regular-pin.png'
const REGULAR_MARKER_SIZE = 30

type Props = {
  googleMapsConfig: any
  markersRef: MutableRefObject<google.maps.Marker[]>
  setLocations: any
  setHaveLocationsChanged: any
  locations: any
  handleMarkerClick: any
}

const CreateMapDropdown: FC<Props> = ({
  googleMapsConfig,
  markersRef,
  setLocations,
  setHaveLocationsChanged,
  locations,
  handleMarkerClick,
}) => {
  const handleImportJSON = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log('fireee')
    if (!e.target.files?.length) return

    const file = e.target.files[0]

    const jsonData = await parseJSONFile(file)
    const isDataValid = isArray(jsonData) && hasValidCoordinates(jsonData)

    if (!isDataValid || !googleMapsConfig) return

    const { selectionMap } = googleMapsConfig

    const newLocations = (jsonData as LocationType[]).map((x) => {
      const location = formatLocationForImportExport(x)

      const marker = createMapMarker(location, selectionMap, REGULAR_MARKER_ICON, REGULAR_MARKER_SIZE)
      markersRef.current.push(marker)

      marker.addListener('click', () => handleMarkerClick(marker))

      return location
    })

    setLocations([...locations, ...newLocations])
    setHaveLocationsChanged(true)

    showSuccessToast('Successfully uploaded locations')
  }

  const parseJSONFile = async (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = (event: any) => resolve(JSON.parse(event.target.result))
      fileReader.onerror = (error) => reject(error)
      fileReader.readAsText(file)
    })
  }

  const formatLocationForImportExport = (location: LocationType) => {
    return {
      lat: location.lat,
      lng: location.lng,
      panoId: location.panoId,
      heading: location.heading,
      pitch: location.pitch,
      zoom: location.zoom,
      countryCode: location.countryCode,
    }
  }

  const isLocationValid = (location: LocationType) => {
    if (typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return false
    }

    if (location.lat > 90 || location.lat < -90 || location.lng > 180 || location.lng < -180) {
      return false
    }

    return true
  }

  const isArray = (input: any) => {
    if (!Array.isArray(input)) {
      showErrorToast('Uploaded data is not an array')
      return false
    }

    return true
  }

  const hasValidCoordinates = (input: any) => {
    let isValid = true

    input.some((location: any) => {
      if (!location.lat || !location.lng) {
        isValid = false
        return showErrorToast('One or more locations is missing a lat or lng value')
      }

      if (!isLocationValid(location)) {
        isValid = false
        return showErrorToast('Location coordinate is invalid')
      }
    })

    return isValid
  }

  const handleExportJSON = () => {
    const formattedLocations = locations.map((x: any) => formatLocationForImportExport(x))
    const jsonData = JSON.stringify(formattedLocations)
    const blob = new Blob([jsonData], { type: 'application/json' })
    saveAs(blob, 'locations.json')
  }

  return (
    <StyledCreateMapDropdown>
      <Root>
        <Trigger asChild>
          <button className="trigger-button" aria-label="More options">
            <MenuIcon />
          </button>
        </Trigger>

        <Portal>
          <StyledCreateMapDropdown>
            <Content className="DropdownMenuContent" sideOffset={5} align="end">
              <Item className="DropdownMenuItem">
                <label htmlFor="import-input" className="item-button">
                  <input
                    type="file"
                    id="import-input"
                    accept=".json"
                    onChange={(e) => {
                      handleImportJSON(e)
                      e.stopPropagation()
                    }}
                  />
                  Import JSON
                </label>
              </Item>

              <Item className="DropdownMenuItem" onClick={handleExportJSON}>
                <div className="item-button">Export JSON</div>
              </Item>

              <Separator className="DropdownMenuSeparator" />

              <Item className="DropdownMenuItem">
                <div className="item-button">Unpublish Map</div>
              </Item>

              <Item className="DropdownMenuItem">
                <div className="item-button destructive">Delete Map</div>
              </Item>
            </Content>
          </StyledCreateMapDropdown>
        </Portal>
      </Root>
    </StyledCreateMapDropdown>
  )
}

export default CreateMapDropdown
