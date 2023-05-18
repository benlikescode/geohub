import { FC, useEffect, useState } from 'react'
import { Head } from '@components/Head'
import { MapType } from '../../@types'
import { mailman } from '../../backend/utils/mailman'
import { WidthController } from '../../components/Layout/WidthController'
import { MapPreviewCard } from '../../components/MapPreviewCard'
import { SkeletonCards } from '../../components/SkeletonCards'
import StyledMapsPage from '../../styles/MapsPage.Styled'
import { showErrorToast } from '../../utils/helpers/showToasts'

const MapsPage: FC = () => {
  const [officialMaps, setOfficialMaps] = useState<MapType[]>([])
  const [officialMapsPage, setOfficialMapsPage] = useState(0)
  const [officialMapsHasMore, setOfficialMapsHasMore] = useState(false)
  const [loadingOfficial, setLoadingOfficial] = useState(true)

  const [communityMaps, setCommunityMaps] = useState<MapType[]>([])
  const [communityMapsPage, setCommunityMapsPage] = useState(0)
  const [communityMapsHasMore, setCommunityMapsHasMore] = useState(false)
  const [loadingCommunity, setLoadingCommunity] = useState(true)

  const getOfficialMaps = async () => {
    const res = await mailman(`maps/browse/official?page=${officialMapsPage}`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setOfficialMaps((prev) => [...prev, ...res.data])
    setOfficialMapsHasMore(res.hasMore)
    setLoadingOfficial(false)
  }

  const getCommunityMaps = async () => {
    const res = await mailman(`maps/browse/custom?page=${communityMapsPage}`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setCommunityMaps((prev) => [...prev, ...res.data])
    setCommunityMapsHasMore(res.hasMore)
    setLoadingCommunity(false)
  }

  useEffect(() => {
    getOfficialMaps()
  }, [officialMapsPage])

  useEffect(() => {
    getCommunityMaps()
  }, [communityMapsPage])

  return (
    <StyledMapsPage>
      <WidthController>
        <Head title="Browse Maps" />

        <div className="page-wrapper">
          <div>
            <div className="section-title">Official Maps</div>

            {loadingOfficial ? (
              <SkeletonCards numCards={8} />
            ) : (
              <div className="maps-wrapper">
                {officialMaps.map((map, idx) => (
                  <MapPreviewCard key={idx} map={map} showDescription />
                ))}
              </div>
            )}

            {officialMapsHasMore && (
              <div className="more-btn-wrapper">
                <button onClick={() => setOfficialMapsPage((prev) => prev + 1)}>Show More...</button>
              </div>
            )}
          </div>

          <div>
            <div className="section-title">Community Maps</div>

            {loadingCommunity ? (
              <SkeletonCards numCards={8} />
            ) : (
              <div className="maps-wrapper">
                {communityMaps.map((map, idx) => (
                  <MapPreviewCard key={idx} map={map} />
                ))}
              </div>
            )}

            {communityMapsHasMore && (
              <div className="more-btn-wrapper">
                <button onClick={() => setCommunityMapsPage((prev) => prev + 1)}>Show More...</button>
              </div>
            )}
          </div>
        </div>
      </WidthController>
    </StyledMapsPage>
  )
}

export default MapsPage
