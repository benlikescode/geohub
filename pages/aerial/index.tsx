import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { FC, useEffect, useState } from 'react'

import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Layout } from '@components/Layout'
import { WidthController } from '@components/Layout/WidthController'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { AerialSettings } from '@components/Modals/AerialSettings'
import { SkeletonCards } from '@components/SkeletonCards'
import SkeletonLeaderboard from '@components/SkeletonLeaderboard/SkeletonLeaderboard'
import { Avatar, Button } from '@components/System'
import StyledPlayAerial from '@styles/PlayAerial.Styled'
import { MapLeaderboardType, MapType } from '@types'

const PlayAerialPage: FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [otherMaps, setOtherMaps] = useState<MapType[] | null>()
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()

  settingsOpen ? disableBodyScroll(document as any) : enableBodyScroll(document as any)

  const fetchOtherMaps = async () => {
    const { status, res } = await mailman(`maps/browse/popular?count=4`)

    if (status === 400 || status === 500) {
      return setOtherMaps(null)
    }

    setOtherMaps(res)
  }

  const fetchMapScores = async () => {
    const { status, res } = await mailman(`scores/aerial`)

    if (status === 404 || status === 500) {
      return setLeaderboardData(null)
    }

    setLeaderboardData(res)
  }

  useEffect(() => {
    fetchOtherMaps()
    fetchMapScores()
  }, [])

  return (
    <StyledPlayAerial>
      <WidthController>
        <Head title="Play - Aerial" />

        <div className="mapDetailsSection">
          <div className="mapDescriptionWrapper">
            <div className="mapAvatar">
              <Avatar type="map" src="/images/mapPreviews/testAerial.jpg" size={100} />
            </div>

            <div className="descriptionColumnWrapper">
              <div className="descriptionColumn">
                <span className="name">Aerial</span>
                <span className="description">
                  The classic gamemode with a twist. Try to pinpoint the city looking down from above!
                </span>
              </div>
              <Button type="solidPurple" width="200px" callback={() => setSettingsOpen(true)}>
                Play Now
              </Button>
            </div>
          </div>
        </div>

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
      </WidthController>

      {settingsOpen && <AerialSettings closeModal={() => setSettingsOpen(false)} />}
    </StyledPlayAerial>
  )
}

export default PlayAerialPage
