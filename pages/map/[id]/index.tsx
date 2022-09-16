import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import router from 'next/router'
import React, { FC, useEffect, useState } from 'react'

import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Layout, LoadingPage } from '@components/Layout'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { MapStats } from '@components/MapStats'
import { GameSettings } from '@components/Modals/GameSettings'
import { Modal } from '@components/Modals/Modal'
import { SkeletonCards } from '@components/SkeletonCards'
import { SkeletonLeaderboard } from '@components/SkeletonLeaderboard'
import { SkeletonMapInfo } from '@components/SkeletonMapInfo'
import { Avatar, Button } from '@components/System'
import StyledMapPage from '@styles/MapPage.Styled'
import { MapLeaderboardType, MapType } from '@types'
import { getMapName } from '@utils/helperFunctions'

const MapPage: FC = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [mapDetails, setMapDetails] = useState<MapType | null>()
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()
  const [otherMaps, setOtherMaps] = useState<MapType[] | null>()
  const [loading, setLoading] = useState(true)
  const mapId = router.query.id as string

  settingsModalOpen ? disableBodyScroll(document as any) : enableBodyScroll(document as any)

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
    const { status, res } = await mailman(`maps/browse/popular?count=3&mapId=${mapId}`)

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
              <div className="descriptionColumnWrapper">
                <div className="descriptionColumn">
                  <Avatar
                    type="map"
                    src={'https://c.tenor.com/4NKYe36DcE8AAAAj/taclan-world.gif'}
                    size={50}
                    outlineSize={0}
                  />
                  <div className="map-details">
                    <span className="name">{mapDetails.name}</span>
                    <span className="description">{mapDetails.description}</span>
                  </div>
                </div>
                <Button type="solidPurple" width="148px" height="52px" callback={() => setSettingsModalOpen(true)}>
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
          <div className="skeletonCards">
            <SkeletonCards />
          </div>
        )}
      </Layout>

      {settingsModalOpen && mapDetails && <GameSettings closeModal={closeModal} mapDetails={mapDetails} />}
    </StyledMapPage>
  )
}

export default MapPage
