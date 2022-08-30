import React, { FC, useEffect, useState } from 'react'
import StyledPlayAerial from '../../styles/PlayAerial.Styled'
import { mailman } from '../../backend/utils/mailman'
import { MapPreviewCard } from '../../components/MapPreviewCard'
import { Layout, LoadingPage } from '../../components/Layout'
import { Modal } from '../../components/Modals/Modal'
import { Avatar, Button } from '../../components/System'
import { MapLeaderboard } from '../../components/MapLeaderboard'
import { AerialSettings } from '../../components/Modals/AerialSettings'
import { MapLeaderboardType, MapType } from '../../types'
import { Head } from '../../components/Head'

const PlayAerialPage: FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [otherMaps, setOtherMaps] = useState<MapType[] | null>()
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()

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

  if (!otherMaps || !leaderboardData) {
    return <LoadingPage />
  }

  return (
    <StyledPlayAerial>
      <Head title="Play - Aerial" />
      <Layout>
        <div className="mapDetailsSection">
          <div className="mapDescriptionWrapper">
            <div className="mapAvatar">
              <Avatar url="/images/mapPreviews/testAerial.jpg" alt="Satelite View" size={100} outline />
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

        <MapLeaderboard leaderboard={leaderboardData} />

        <div className="otherMapsWrapper">
          <span className="otherMapsTitle">Other Popular Maps</span>
          <div className="otherMaps">
            {otherMaps.map((otherMap, idx) => (
              <MapPreviewCard key={idx} map={otherMap} />
            ))}
          </div>
        </div>
      </Layout>

      {settingsOpen && (
        <Modal closeModal={() => setSettingsOpen(false)}>
          <AerialSettings closeModal={() => setSettingsOpen(false)} />
        </Modal>
      )}
    </StyledPlayAerial>
  )
}

export default PlayAerialPage
