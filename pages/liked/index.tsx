import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { mailman } from '@backend/utils/mailman'
import { NoResults } from '@components/ErrorViews/NoResults'
import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { SkeletonCards } from '@components/SkeletonCards'
import { selectUser } from '@redux/user'
import StyledLikedMapsPage from '@styles/LikedMapsPage.Styled'

const LikedMapsPage: NextPage = () => {
  const [likedMaps, setLikedMaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
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
    <StyledLikedMapsPage>
      <Layout>
        <Head title="Liked Maps" />
        <PageHeader>Liked Maps</PageHeader>

        {loading && <SkeletonCards numCards={8} />}

        {/* Finished loading and No Results */}
        {!loading && (!user.id || likedMaps.length === 0) && <NoResults message="Like a map for it to show here" />}

        <div className="map-wrapper">
          {likedMaps.map((map, idx) => (
            <MapPreviewCard key={idx} map={map.mapDetails[0]} />
          ))}
        </div>
      </Layout>
    </StyledLikedMapsPage>
  )
}

export default LikedMapsPage
