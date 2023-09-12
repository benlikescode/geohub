import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { NotFound } from '@components/errorViews'
import { WidthController } from '@components/layout'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { MapStats } from '@components/MapStats'
import { Meta } from '@components/Meta'
import { GameSettingsModal } from '@components/modals'
import { SkeletonCards, SkeletonLeaderboard, SkeletonMapInfo } from '@components/skeletons'
import { Avatar, Button } from '@components/system'
import { TextWithLinks } from '@components/TextWithLinks'
import { VerifiedBadge } from '@components/VerifiedBadge'
import { useAppSelector } from '@redux/hook'
import StyledMapPage from '@styles/MapPage.Styled'
import { MapLeaderboardType, MapType } from '@types'
import { mailman, showToast } from '@utils/helpers'

const MapPage: FC = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [mapDetails, setMapDetails] = useState<MapType | null>()
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()
  const [otherMaps, setOtherMaps] = useState<MapType[] | null>()

  const router = useRouter()
  const mapId = router.query.id
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!mapId) {
      return
    }

    fetchMapDetails()
    fetchMapScores()
    fetchOtherMaps()
  }, [mapId])

  const fetchMapDetails = async () => {
    const res = await mailman(`maps/${mapId}?stats=true`)

    if (res.error) {
      return setMapDetails(null)
    }

    setMapDetails(res)
  }

  const fetchMapScores = async () => {
    const res = await mailman(`scores/${mapId}`)

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setLeaderboardData(res)
  }

  const fetchOtherMaps = async () => {
    const res = await mailman(`maps/browse/popular?count=6&mapId=${mapId}`)

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setOtherMaps(res)
  }

  const handleClickPlay = () => {
    if (!user.id) {
      return router.push('/register')
    }

    setSettingsModalOpen(true)
  }

  if (mapDetails === null) {
    // router.replace('/404')
    return (
      <NotFound
        title="Map Not Found"
        message="This map either does not exist, has not been published, or was recently deleted."
      />
    )
  }

  return (
    <StyledMapPage>
      <WidthController customWidth="1100px" mobilePadding="0px">
        <Meta title={mapDetails?.name ? `Play - ${mapDetails.name}` : 'GeoHub'} />

        {mapDetails ? (
          <div className="mapDetailsSection">
            <div className="mapDescriptionWrapper">
              <div className="descriptionColumnWrapper">
                <div className="descriptionColumn">
                  <Avatar type="map" src={mapDetails.previewImg} size={50} />
                  <div className="map-details">
                    <div className="name-wrapper">
                      <span className="name">{mapDetails.name}</span>
                      {mapDetails.creator === 'GeoHub' && <VerifiedBadge size={20} />}
                    </div>
                    {mapDetails.description && (
                      <span className="description">
                        <TextWithLinks>{mapDetails.description}</TextWithLinks>
                      </span>
                    )}
                    {!mapDetails.description && mapDetails.creatorDetails && (
                      <span className="map-creator">
                        {'Created by '}
                        <span className="map-creator-link">
                          <Link href={`/user/${mapDetails.creatorDetails._id}` || ''}>
                            <a>{mapDetails.creatorDetails.name}</a>
                          </Link>
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <Button className="play-button" onClick={() => handleClickPlay()}>
                  Play Now
                </Button>
              </div>
            </div>

            <div className="statsWrapper">
              <MapStats map={mapDetails} setMap={setMapDetails} />
            </div>
          </div>
        ) : (
          <SkeletonMapInfo />
        )}

        {leaderboardData ? <MapLeaderboard leaderboard={leaderboardData} /> : <SkeletonLeaderboard />}

        {otherMaps ? (
          <div className="otherMapsWrapper">
            <span className="otherMapsTitle">Other Popular Maps</span>
            <div className="otherMaps">
              {otherMaps.map((otherMap, idx) => (
                <MapPreviewCard key={idx} map={otherMap} />
              ))}
            </div>
          </div>
        ) : (
          <div className="skeletonCards">
            <SkeletonCards numCards={6} />
          </div>
        )}
      </WidthController>

      {mapDetails && (
        <GameSettingsModal
          isOpen={settingsModalOpen}
          closeModal={() => setSettingsModalOpen(false)}
          mapDetails={mapDetails}
          gameMode="standard"
        />
      )}
    </StyledMapPage>
  )
}

export default MapPage
