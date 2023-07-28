import saveAs from 'file-saver'
import { ChangeEvent, FC } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { Content, Item, Portal, Root, Separator, Trigger } from '@radix-ui/react-dropdown-menu'
import { LocationType } from '@types'
import { showErrorToast, showSuccessToast } from '@utils/helpers'
import { StyledCreateMapDropdown } from './'

type Props = {
  locations: LocationType[]
  addNewLocations: (locations: LocationType[], markerType: 'selected' | 'regular') => void
  setDeleteModalOpen: (deleteModalOpen: boolean) => void
}

const CreateMapDropdown: FC<Props> = ({ locations, addNewLocations, setDeleteModalOpen }) => {
  const handleImportJSON = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const file = e.target.files[0]

    const jsonData = await parseJSONFile(file)
    // const isDataValid = isArray(jsonData) && hasValidCoordinates(jsonData)

    // if (!isDataValid) return

    // const newLocations = (jsonData as LocationType[]).map((location) => {
    //   return formatLocationForImportExport(location)
    // })

    addNewLocations(jsonData as any, 'regular')

    closeDropdown()

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
      showErrorToast('Uploaded data is not an array', {
        position: 'bottom-center',
        style: { backgroundColor: '#282828' },
      })
      return false
    }

    return true
  }

  const hasValidCoordinates = (input: any) => {
    let isValid = true

    input.some((location: any) => {
      if (!location.lat || !location.lng) {
        isValid = false
        return showErrorToast('One or more locations is missing a lat or lng value', {
          position: 'bottom-center',
          style: { backgroundColor: '#282828' },
        })
      }

      if (!isLocationValid(location)) {
        isValid = false
        return showErrorToast('Location coordinate is invalid', {
          position: 'bottom-center',
          style: { backgroundColor: '#282828' },
        })
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

  const closeDropdown = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
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
              <div>
                <input type="file" id="import-input" accept=".json" onChange={(e) => handleImportJSON(e)} />
                <label className="new-item-wrapper" htmlFor="import-input">
                  Import JSON
                </label>
              </div>

              <Item className="new-item-wrapper" onClick={handleExportJSON}>
                Export JSON
              </Item>

              <Separator className="DropdownMenuSeparator" />

              <Item className="new-item-wrapper destructive" onClick={() => setDeleteModalOpen(true)}>
                Delete Map
              </Item>
            </Content>
          </StyledCreateMapDropdown>
        </Portal>
      </Root>
    </StyledCreateMapDropdown>
  )
}

export default CreateMapDropdown
