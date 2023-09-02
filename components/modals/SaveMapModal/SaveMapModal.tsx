import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { MainModal } from '@components/modals'
import { ToggleSwitch } from '@components/system'
import { ChangedLocationsType, LocationType } from '@types'
import { mailman, showToast } from '@utils/helpers'
import { StyledSaveMapModal } from './'

type Props = {
  isOpen: boolean
  closeModal: () => void
  changedLocations: ChangedLocationsType
  setChangedLocations: (changedLocations: ChangedLocationsType) => void
  setLastSave: (lastSave: Date) => void
  initiallyPublished: boolean
  setInitiallyPublished: (initiallyPublished: boolean) => void
  setInitialLocations: (initialLocations: LocationType[]) => void
}

const SaveMapModal: FC<Props> = ({
  isOpen,
  closeModal,
  changedLocations,
  setChangedLocations,
  setLastSave,
  initiallyPublished,
  setInitiallyPublished,
  setInitialLocations,
}) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isPublished, setIsPublished] = useState(initiallyPublished)

  const router = useRouter()
  const mapId = router.query.mapId as string

  const handleSaveMap = async () => {
    const publishedHasChanged = initiallyPublished !== isPublished

    if (!Object.values(changedLocations).reduce((acc, arr) => acc || arr.length > 0, false) && !publishedHasChanged) {
      return showToast('error', 'No changes since last save', 'mapEditor')
    }

    setIsSaving(true)

    const res = await mailman(
      `maps/custom/${mapId}`,
      'PUT',
      JSON.stringify({ locations: changedLocations, isPublished })
    )

    setIsSaving(false)

    if (res.error) {
      return showToast('error', res.error.message, 'mapEditor')
    }

    setLastSave(new Date())
    setInitiallyPublished(isPublished)
    setChangedLocations({ additions: [], modifications: [], deletions: [] })
    setInitialLocations(res?.locations)

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

        <div className="changes-wrapper">
          <div className="change-box" style={{ color: '#59a280' }}>
            {changedLocations.additions.length} Added
          </div>
          <div className="change-box" style={{ color: '#a29356' }}>
            {changedLocations.modifications.length} Edited
          </div>
          <div className="change-box" style={{ color: '#bf6c6c' }}>
            {changedLocations.deletions.length} Deleted
          </div>
        </div>
      </StyledSaveMapModal>
    </MainModal>
  )
}

export default SaveMapModal
