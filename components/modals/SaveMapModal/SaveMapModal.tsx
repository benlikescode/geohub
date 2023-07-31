import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { MainModal } from '@components/modals'
import { ToggleSwitch } from '@components/system'
import { LocationType } from '@types'
import { mailman, showErrorToast, showSuccessToast } from '@utils/helpers'
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
      return showErrorToast('No changes since last save', {
        position: 'bottom-center',
        style: { backgroundColor: '#282828' },
      })
    }

    setIsSaving(true)

    const res = await mailman(`maps/custom/${mapId}`, 'PUT', JSON.stringify({ locations, isPublished }))

    setIsSaving(false)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setLastSave(new Date())
    setInitiallyPublished(isPublished)
    setHaveLocationsChanged(false)

    closeModal()

    return showSuccessToast('Your changes have been saved', {
      position: 'bottom-center',
      style: { backgroundColor: '#282828' },
    })
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
        <div className="visibility-selection">
          <div className="cool">
            <div className="happy">Publish Map</div>
            <p>Make your map visible to others</p>
          </div>
          <ToggleSwitch isActive={isPublished} setIsActive={setIsPublished} />
        </div>
      </StyledSaveMapModal>
    </MainModal>
  )
}

export default SaveMapModal
