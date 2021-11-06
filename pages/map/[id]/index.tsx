import { Navbar, Layout, Sidebar, Banner, LoadingPage } from '../../../components/Layout'
import { GameSettings } from '../../../components/Modals/GameSettings'
import { FC, useEffect, useState } from 'react'
import StyledMapPage from '../../../styles/MapPage.Styled'
import { Avatar, Button } from '../../../components/System'
import { MapLeaderboardType, MapType } from '../../../types'
import { MapStats } from '../../../components/MapStats'
import { MapLeaderboard } from '../../../components/MapLeaderboard'
import { MapPreviewCard } from '../../../components/Home/MapPreviewCard'
import { Modal } from '../../../components/Modals/Modal'
import router from 'next/router'
import { mailman } from '../../../backend/utils/mailman'

const MapPage: FC = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [mapDetails, setMapDetails] = useState<MapType | null>()
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()
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

  useEffect(() => {
    if (!mapId) {
      return
    }
  
    fetchMapDetails()
    fetchMapScores()
 
  }, [mapId])

  if (!mapDetails || !leaderboardData) {
    return <LoadingPage />
  }

  return (
    <StyledMapPage>
      <Navbar />
      <Layout hasSidebar>
        <div>
          <Sidebar />
        </div>

        <main>
          <Banner>
            <div className="mapDetailsSection">
              <div className="mapDescriptionWrapper">
                <Avatar url={mapDetails.previewImg || ''} alt="" size={100} outline/>

                <div className="descriptionColumnWrapper">
                  <div className="descriptionColumn">
                    <span className="name">{mapDetails.name}</span>
                    <span className="description">{mapDetails.description}</span>
                  </div>
                  <Button type="solidPurple" width="200px" callback={() => setSettingsModalOpen(true)}>Play Now</Button>
                </div>
              </div>

              <MapStats map={mapDetails}/>
            </div>
          </Banner>

          <Banner>
            <MapLeaderboard leaderboard={leaderboardData}/>
          </Banner>
         
          <div className="otherMapsWrapper">
            <span className="otherMapsTitle">Other Popular Maps</span>
            <div className="otherMaps">
              <MapPreviewCard map={mapDetails} />
              <MapPreviewCard map={mapDetails} />
            </div>
          </div>

        </main>     
      </Layout>

      {settingsModalOpen &&
        <Modal closeModal={closeModal}>
          <GameSettings closeModal={closeModal}/>
        </Modal>
      }
    </StyledMapPage>  
  )
}

export default MapPage
