import saveAs from 'file-saver'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useState } from 'react'
import { DestroyModal } from '@components/modals'
import { DotsHorizontalIcon } from '@heroicons/react/outline'
import { Content, Item, Portal, Root, Separator, Trigger } from '@radix-ui/react-dropdown-menu'
import { LocationType } from '@types'
import { mailman, parseJsonFile, showToast } from '@utils/helpers'
import { StyledCreateMapDropdown } from './'

type Props = {
  locations: LocationType[]
  clearLocations: () => void
  addNewLocations: (locations: LocationType[]) => void
}

const CreateMapDropdown: FC<Props> = ({ locations, clearLocations, addNewLocations }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const router = useRouter()
  const mapId = router.query.mapId as string

  const handleImportJSON = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const file = e.target.files[0]

    const jsonData = await parseJsonFile(file)

    const jsonArray = containsArrayCheck(jsonData)

    if (!jsonArray) {
      return showToast('error', 'File must contain an array', 'mapEditor')
    }

    const validateCoords = hasValidCoordinates(jsonArray)

    if (!validateCoords.valid) {
      return showToast('error', validateCoords.error, 'mapEditor')
    }

    const newLocations = jsonArray.map((location) => {
      return formatLocationForImportExport(location)
    })

    addNewLocations(newLocations)

    closeDropdown()

    showToast('success', 'Successfully uploaded locations', 'mapEditor')
  }

  const containsArrayCheck = (jsonData: any): any[] | undefined => {
    if (Array.isArray(jsonData)) return jsonData

    // Check if data is an object that contains an array
    if (typeof jsonData === 'object' && jsonData !== null) {
      const valuesArray = Object.values(jsonData) as any[]

      return valuesArray.find((value) => Array.isArray(value))
    }
  }

  const hasValidCoordinates = (jsonArray: any[]) => {
    let result = { valid: true, error: '' }

    jsonArray.some((location: any) => {
      if (!location.lat || !location.lng) {
        result = { valid: false, error: 'Every location must have a lat & lng' }
      }

      if (!isLocationValid(location)) {
        result = { valid: false, error: 'Location coordinate is invalid' }
      }
    })

    return result
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

  const handleExportJSON = () => {
    const formattedLocations = locations.map((x: any) => formatLocationForImportExport(x))
    const jsonData = JSON.stringify(formattedLocations)
    const blob = new Blob([jsonData], { type: 'application/json' })
    saveAs(blob, 'locations.json')
  }

  const closeDropdown = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  }

  const handleDeleteMap = async () => {
    setIsDeleting(true)

    const res = await mailman(`maps/custom/${mapId}`, 'DELETE')

    if (res.error) {
      setIsDeleting(false)
      return showToast('error', res.error.message, 'mapEditor')
    }

    setDeleteModalOpen(false)
    router.push('/my-maps')
  }

  return (
    <>
      <StyledCreateMapDropdown>
        <Root>
          <Trigger asChild>
            <button className="trigger-button" aria-label="More options">
              <DotsHorizontalIcon />
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

                <Item className="new-item-wrapper destructive" onClick={() => clearLocations()}>
                  Clear Locations
                </Item>

                {mapId && (
                  <Item className="new-item-wrapper destructive" onClick={() => setDeleteModalOpen(true)}>
                    Delete Map
                  </Item>
                )}
              </Content>
            </StyledCreateMapDropdown>
          </Portal>
        </Root>
      </StyledCreateMapDropdown>

      <DestroyModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onAction={() => handleDeleteMap()}
        title="Confirm Delete"
        message="This map and all it's locations will be permanently deleted."
        isSubmitting={isDeleting}
      />
    </>
  )
}

export default CreateMapDropdown
