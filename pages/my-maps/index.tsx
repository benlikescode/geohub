import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import GoogleMapReact from 'google-map-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { NoResults } from '@components/ErrorViews/NoResults'
import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { Marker } from '@components/Marker'
import { Auth } from '@components/Modals'
import { CreateMapModal } from '@components/Modals/CreateMapModal'
import { SkeletonCards } from '@components/SkeletonCards'
import { Button } from '@components/System'
import { PlusIcon } from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import StyledMyMapsPage from '@styles/MyMapsPage.Styled'
import { MapType } from '@types'
import { showErrorToast } from '@utils/helperFunctions'

import type { NextPage } from 'next'
const MyMapsPage: NextPage = () => {
  const [maps, setMaps] = useState<MapType[]>([])
  const [loading, setLoading] = useState(false)
  const [createMapModalOpen, setCreateMapModalOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const user = useSelector(selectUser)

  createMapModalOpen ? disableBodyScroll(document as any) : enableBodyScroll(document as any)

  const handleCreateMapClick = () => {
    if (user.id) {
      return setCreateMapModalOpen(true)
    }

    return setAuthModalOpen(true)
  }

  const getCustomMaps = async () => {
    setLoading(true)

    const { res } = await mailman(`/maps/custom?userId=${user.id}`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setMaps(res)
    setLoading(false)
  }

  useEffect(() => {
    if (!user.id) return

    getCustomMaps()
  }, [user.id])

  return (
    <StyledMyMapsPage>
      <Layout>
        <Head title="My Maps" />
        <div className="title-wrapper">
          <PageHeader removeMargin>My Maps</PageHeader>

          <Button type="solidPurple" callback={() => handleCreateMapClick()}>
            <span>Create New Map</span>
            <PlusIcon height={20} color="#fff" />
          </Button>
        </div>

        {loading && <SkeletonCards numCards={8} />}

        {/* Finished loading and No Results */}
        {!loading && (!user.id || maps.length === 0) && <NoResults message="Create a custom map for it to show here" />}

        <div className="map-wrapper">
          {maps.map((map, idx) => (
            <MapPreviewCard key={idx} map={map} type="small" />
          ))}
        </div>

        {createMapModalOpen && <CreateMapModal closeModal={() => setCreateMapModalOpen(false)} />}
        {authModalOpen && <Auth closeModal={() => setAuthModalOpen(false)} />}
      </Layout>
    </StyledMyMapsPage>
  )
}

export default MyMapsPage
