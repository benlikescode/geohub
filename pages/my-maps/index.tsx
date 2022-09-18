import GoogleMapReact from 'google-map-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { Marker } from '@components/Marker'
import { CreateMapModal } from '@components/Modals/CreateMapModal'
import { Button } from '@components/System'
import { PlusIcon } from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import StyledMyMapsPage from '@styles/MyMapsPage.Styled'

import type { NextPage } from 'next'
const MyMapsPage: NextPage = () => {
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const [likedMaps, setLikedMaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user.id) {
      return setLoading(false)
    }

    const fetchLikedMaps = async () => {
      const { res } = await mailman(`likes?userId=${user.id}`)
      setLikedMaps(res)
      setLoading(false)
    }

    fetchLikedMaps()
  }, [user.id])

  return (
    <StyledMyMapsPage>
      <Layout>
        <Head title="My Maps" />
        <div className="title-wrapper">
          <PageHeader removeMargin>My Maps</PageHeader>

          <Button type="solidPurple" callback={() => setModalOpen(true)}>
            <span>Create New Map</span>
            <PlusIcon height={20} color="#fff" />
          </Button>
        </div>

        <div className="map-wrapper">
          {likedMaps.map((map, idx) => (
            <MapPreviewCard key={idx} map={map.mapDetails[0]} />
          ))}
        </div>

        {modalOpen && <CreateMapModal closeModal={() => setModalOpen(false)} />}
      </Layout>
    </StyledMyMapsPage>
  )
}

export default MyMapsPage
