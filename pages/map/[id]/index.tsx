import { Layout, LoadingPage } from '@components/Layout'
import { GameSettings } from '@components/Modals/GameSettings'
import React, { FC, useEffect, useState } from 'react'
import StyledMapPage from '@styles/MapPage.Styled'
import { Avatar, Button } from '@components/System'
import { MapLeaderboardType, MapType } from '@types'
import { MapStats } from '@components/MapStats'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { Modal } from '@components/Modals/Modal'
import router from 'next/router'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { getMapName } from '@utils/helperFunctions'
import { SkeletonMapInfo } from '@components/SkeletonMapInfo'
import { SkeletonLeaderboard } from '@components/SkeletonLeaderboard'
import { SkeletonCards } from '@components/SkeletonCards'

const MapPage: FC = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [mapDetails, setMapDetails] = useState<MapType | null>()
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()
  const [otherMaps, setOtherMaps] = useState<MapType[] | null>()
  const [loading, setLoading] = useState(true)
  const mapId = router.query.id as string

  const closeModal = () => {
    setSettingsModalOpen(false)
  }

  const fetchMapDetails = async () => {
    const { status, res } = await mailman(`maps/${mapId}`)

    if (status === 404 || status === 500) {
      return setMapDetails(null)
    }

    setMapDetails(res)
  }

  const fetchMapScores = async () => {
    const { status, res } = await mailman(`scores/${mapId}`)

    if (status === 404 || status === 500) {
      return setLeaderboardData(null)
    }

    setLeaderboardData(res)
  }

  const fetchOtherMaps = async () => {
    const { status, res } = await mailman(`maps/browse/popular?count=4&mapId=${mapId}`)

    if (status === 400 || status === 500) {
      return setOtherMaps(null)
    }

    setOtherMaps(res)
  }

  useEffect(() => {
    if (!mapId) {
      return
    }

    fetchMapDetails()
    fetchMapScores()
    fetchOtherMaps()
  }, [mapId])

  return (
    <StyledMapPage>
      <Layout>
        <Head title={`Play - ${getMapName(mapId)}`} />

        {mapDetails ? (
          <div className="mapDetailsSection">
            <div className="mapDescriptionWrapper">
              <div className="mapAvatar">
                <Avatar url={mapDetails.previewImg || ''} alt="" size={100} outline />
              </div>

              <div className="descriptionColumnWrapper">
                <div className="descriptionColumn">
                  <span className="name">{mapDetails.name}</span>
                  <span className="description">{mapDetails.description}</span>
                </div>
                <Button type="solidPurple" width="200px" callback={() => setSettingsModalOpen(true)}>
                  Play Now
                </Button>
              </div>
            </div>

            <div className="statsWrapper">
              <MapStats map={mapDetails} />
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
          <SkeletonCards />
        )}
      </Layout>

      {settingsModalOpen && mapDetails && (
        <Modal closeModal={closeModal}>
          <GameSettings closeModal={closeModal} mapDetails={mapDetails} />
        </Modal>
      )}
    </StyledMapPage>
  )
}

export default MapPage
