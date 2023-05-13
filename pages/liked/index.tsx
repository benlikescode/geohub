import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import { mailman } from '@backend/utils/mailman'
import { NoResults } from '@components/ErrorViews/NoResults'
import { Head } from '@components/Head'
import { PageHeader } from '@components/Layout'
import { WidthController } from '@components/Layout/WidthController'
import { SkeletonCards } from '@components/SkeletonCards'
import { useAppSelector } from '@redux/hook'
import StyledLikedMapsPage from '@styles/LikedMapsPage.Styled'

import { LikedMapCard } from '../../components/MapCards/LikedMapCard'
import { showErrorToast } from '../../utils/helpers/showToasts'

const LikedMapsPage: NextPage = () => {
  const [likedMaps, setLikedMaps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const user = useAppSelector((state) => state.user)

  const reloadMaps = (mapId: string) => {
    const filtered = likedMaps.filter((likedMap) => likedMap.mapId !== mapId)
    setLikedMaps(filtered)
  }

  const fetchLikedMaps = async () => {
    const res = await mailman('likes')

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setLikedMaps(res)
    setLoading(false)
  }

  useEffect(() => {
    if (!user.id) {
      return setLoading(false)
    }

    fetchLikedMaps()
  }, [user.id])

  return (
    <StyledLikedMapsPage>
      <WidthController>
        <Head title="Liked Maps" />
        <PageHeader>Liked Maps</PageHeader>

        {loading && <SkeletonCards numCards={8} />}

        {/* Finished loading and No Results */}
        {!loading && (!user.id || likedMaps.length === 0) && <NoResults message="Like a map for it to show here" />}

        <div className="map-wrapper">
          {likedMaps.map((map, idx) => (
            // <MapPreviewCard key={idx} map={map.mapDetails[0]} />
            <LikedMapCard key={idx} map={map.mapDetails} reloadMaps={reloadMaps} />
          ))}
        </div>
      </WidthController>
    </StyledLikedMapsPage>
  )
}

export default LikedMapsPage
