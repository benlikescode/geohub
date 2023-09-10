import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { MainModal } from '@components/modals'
import { ToggleSwitch } from '@components/system'
import { LocationType } from '@types'
import { mailman, showToast } from '@utils/helpers'
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

    setIsSaving(true)

    const res = await mailman(`maps/custom/${mapId}`, 'PUT', JSON.stringify({ locations, isPublished }))

    setIsSaving(false)

    if (res.error) {
      return showToast('error', res.error.message, 'mapEditor')
    }

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
