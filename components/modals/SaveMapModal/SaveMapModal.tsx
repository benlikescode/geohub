import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { MainModal } from '@components/modals'
import { Pill, ToggleSwitch } from '@components/system'
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import { ChangesType, LocationType } from '@types'
import { mailman, showErrorToast, showSuccessToast } from '@utils/helpers'
import { StyledSaveMapModal } from './'

type Props = {
  isOpen: boolean
  closeModal: () => void
  changes: ChangesType
  locationsRef: React.MutableRefObject<LocationType[]>
  setLastSave: (lastSave: Date) => void
}

const SaveMapModal: FC<Props> = ({ isOpen, closeModal, changes, locationsRef, setLastSave }) => {
  const [isSaving, setIsSaving] = useState(false)

  const router = useRouter()
  const mapId = router.query.mapId as string

  const handleSaveMap = async () => {
    // if () {
    //   return showErrorToast('No changes since last save', {
    //     position: 'bottom-center',
    //     style: { backgroundColor: '#282828' },
    //   })
    // }

    setIsSaving(true)

    const res = await mailman(`maps/custom/${mapId}`, 'PUT', JSON.stringify({ locations: locationsRef.current }))

    setIsSaving(false)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setLastSave(new Date())
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
      onAction={handleSaveMap}
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
          <ToggleSwitch isActive={true} setIsActive={() => console.log('yo')} />
        </div>
      </StyledSaveMapModal>
    </MainModal>
  )
}

export default SaveMapModal
