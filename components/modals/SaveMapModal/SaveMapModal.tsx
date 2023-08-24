import { useRouter } from 'next/router'
import pako from 'pako'
import { FC, useState } from 'react'
import { MainModal } from '@components/modals'
import { ToggleSwitch } from '@components/system'
import { LocationType } from '@types'
import { MAX_ALLOWED_CUSTOM_LOCATIONS } from '@utils/constants/random'
import { formatLargeNumber, mailman, showToast } from '@utils/helpers'
import { StyledSaveMapModal } from './'

type Props = {
  isOpen: boolean
  closeModal: () => void
  locations: LocationType[]
  setLastSave: (lastSave: Date) => void
  initiallyPublished: boolean
  setInitiallyPublished: (initiallyPublished: boolean) => void
  haveLocationsChanged: boolean
  setHaveLocationsChanged: (haveLocationsChanged: boolean) => void
}

const SaveMapModal: FC<Props> = ({
  isOpen,
  closeModal,
  locations,
  setLastSave,
  initiallyPublished,
  setInitiallyPublished,
  haveLocationsChanged,
  setHaveLocationsChanged,
}) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isPublished, setIsPublished] = useState(initiallyPublished)

  const router = useRouter()
  const mapId = router.query.mapId as string

  const handleSaveMap = async () => {
    const publishedHasChanged = initiallyPublished !== isPublished

    if (!haveLocationsChanged && !publishedHasChanged) {
      return showToast('error', 'No changes since last save', 'mapEditor')
    }

    if (locations.length > MAX_ALLOWED_CUSTOM_LOCATIONS) {
      return showToast(
        'error',
        `The max locations allowed is ${formatLargeNumber(MAX_ALLOWED_CUSTOM_LOCATIONS)}`,
        'mapEditor'
      )
    }

    setIsSaving(true)

    // const body = {
    //   locations: deflate(JSON.stringify(locations)),
    //   isPublished,
    // }

    const jsonString = JSON.stringify(locations)

    const compressed = pako.deflate(jsonString)
    console.log(compressed)

    // const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }))
    // console.log(restored)

    // const compressedBuffer = Buffer.from(compressedData)

    const resRaw = await fetch(`/api/maps/custom/${mapId}`, {
      method: 'PUT',
      body: compressed,
    })

    // console.log(resRaw)

    // const res = await mailman(`maps/custom/${mapId}`, 'PUT', compressedData)

    setIsSaving(false)

    // if (res.error) {
    //   return showToast('error', res.error.message, 'mapEditor')
    // }

    setLastSave(new Date())
    setInitiallyPublished(isPublished)
    setHaveLocationsChanged(false)

    closeModal()

    return showToast('success', 'Your changes have been saved', 'mapEditor')
  }

  return (
    <MainModal
      isOpen={isOpen}
      onClose={closeModal}
      title="Save Map"
      onAction={() => handleSaveMap()}
      actionButtonText="Save"
      isSubmitting={isSaving}
      maxWidth="500px"
    >
      <StyledSaveMapModal>
        <div className="publish-wrapper">
          <div className="publish-text">
            <div className="publish-header">Publish Map</div>
            <p className="publish-subheader">Make your map visible to others</p>
          </div>
          <ToggleSwitch isActive={isPublished} setIsActive={setIsPublished} />
        </div>
      </StyledSaveMapModal>
    </MainModal>
  )
}

export default SaveMapModal
