import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { NoResults } from '@components/errorViews'
import { Head } from '@components/Head'
import { PageHeader, WidthController } from '@components/layout'
import { LikedMapCard } from '@components/MapCards/LikedMapCard'
import { SkeletonCards } from '@components/skeletons'
import { useAppSelector } from '@redux/hook'
import StyledLikedMapsPage from '@styles/LikedMapsPage.Styled'
import { mailman, showErrorToast } from '@utils/helpers'

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
        {!loading && (!user.id || likedMaps.length === 0) && <NoResults message="Like a map for it to show here." />}

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
