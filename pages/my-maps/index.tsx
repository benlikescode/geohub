import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { PageHeader, WidthController } from '@components/layout'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { AuthModal, CreateMapModal, DestroyModal } from '@components/modals'
import { SkeletonCards } from '@components/skeletons'
import { PlusIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import StyledMyMapsPage from '@styles/MyMapsPage.Styled'
import { MapType } from '@types'

import type { NextPage } from 'next'
const MyMapsPage: NextPage = () => {
  const [maps, setMaps] = useState<MapType[]>([])
  const [loading, setLoading] = useState(false)
  const [createMapModalOpen, setCreateMapModalOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingMapId, setDeletingMapId] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const user = useAppSelector((state) => state.user)

  // createMapModalOpen ? disableBodyScroll(document as any) : enableBodyScroll(document as any)

  const handleCreateMapClick = () => {
    if (user.id) {
      return setCreateMapModalOpen(true)
    }

    return setAuthModalOpen(true)
  }

  const getCustomMaps = async () => {
    setLoading(true)

    const res = await mailman('maps/custom')

    if (res.error) {
      return toast.error(res.error.message)
    }

    setMaps(res)
    setLoading(false)
  }

  const handleDeleteCustomMap = async () => {
    setIsDeleting(true)

    const res = await mailman(`maps/custom/${deletingMapId}`, 'DELETE')

    if (res.error) {
      toast.error('Something went wrong')
    }

    if (res.message) {
      setDeleteModalOpen(false)
      toast.success(res.message)

      // Remove deleted map from state
      const filteredMaps = maps.filter((map) => map._id !== deletingMapId)
      setMaps(filteredMaps)
    }

    setIsDeleting(false)
  }

  const openDeleteModal = (mapId: string) => {
    setDeleteModalOpen(true)
    setDeletingMapId(mapId)
  }

  useEffect(() => {
    if (!user.id) return

    getCustomMaps()
  }, [user.id])

  return (
    <StyledMyMapsPage>
      <WidthController>
        <Head title="My Maps" />
        <PageHeader>My Maps</PageHeader>

        {loading ? (
          <SkeletonCards numCards={8} />
        ) : (
          <div className="map-wrapper">
            <div className="create-map-card" onClick={() => handleCreateMapClick()} role="button">
              <div className="create-map-plus">
                <PlusIcon />
              </div>
              <span>Create New Map</span>
            </div>
            {maps.map((map, idx) => (
              <MapPreviewCard
                key={idx}
                map={map}
                type="small"
                openDeleteModal={() => openDeleteModal(map._id as string)}
              />
            ))}
          </div>
        )}

        <CreateMapModal isOpen={createMapModalOpen} closeModal={() => setCreateMapModalOpen(false)} />

        <AuthModal isOpen={authModalOpen} closeModal={() => setAuthModalOpen(false)} />

        <DestroyModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onAction={() => handleDeleteCustomMap()}
          title="Confirm Delete"
          message="This map and all it's locations will be permanently deleted."
          isSubmitting={isDeleting}
        />
      </WidthController>
    </StyledMyMapsPage>
  )
}

export default MyMapsPage
