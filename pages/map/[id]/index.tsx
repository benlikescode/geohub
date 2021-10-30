import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Navbar, Layout, Sidebar, Banner, LoadingPage } from '../../../components/Layout'
import { GameSettings } from '../../../components/Modals/GameSettings'
import { FC, useEffect, useState } from 'react'
import StyledMapPage from '../../../styles/MapPage.Styled'
import { Avatar, Button } from '../../../components/System'
import { GameSettingsType, MapLeaderboardType, MapType } from '../../../types'
import { MapStats } from '../../../components/MapStats'
import { MapLeaderboard } from '../../../components/MapLeaderboard'
import { MapPreviewCard } from '../../../components/Home/MapPreviewCard'
import { Modal } from '../../../components/Modals/Modal'
import router, { useRouter } from 'next/router'
import { mailman } from '../../../backend/utils/mailman'


const MapPage: FC = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()
  const mapId = router.query.id as string

  const closeModal = () => {
    setSettingsModalOpen(false)
  }

  const fetchMapData = async () => {
    const { status, res } = await mailman(`scores/${mapId}`)

    if (status === 404 || status === 500) {
      return setLeaderboardData(null)
    }

    setLeaderboardData(res)
  }

  const testMap2: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [{lat: 0, lng: 0}],
    previewImg: '/images/LandmarksMap.jfif',
    creator: 'GeoHub'
  }

  const testMap3: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [{lat: 0, lng: 0}],
    previewImg: '/images/CanadaMap.jpg',
    creator: 'GeoHub'
  }

  useEffect(() => {
    if (!mapId) {
      return
    }
  
    fetchMapData()
 
  }, [mapId])

  if (!leaderboardData) {
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
                <Avatar url={testMap2.previewImg || ''} alt="" size={100} outline/>

                <div className="descriptionColumnWrapper">
                  <div className="descriptionColumn">
                    <span className="name">{testMap2.name}</span>
                    <span className="description">{testMap2.description}</span>
                  </div>
                  <Button type="solidPurple" width="200px" callback={() => setSettingsModalOpen(true)}>Play Now</Button>
                </div>
              </div>

              <MapStats map={testMap2}/>
            </div>
          </Banner>
         
          <Banner >
            <MapLeaderboard leaderboard={leaderboardData} />
          </Banner>

          <div className="otherMapsWrapper">
            <span className="otherMapsTitle">Other Popular Maps</span>
            <div className="otherMaps">
              <MapPreviewCard map={testMap2} />
              <MapPreviewCard map={testMap3} />
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
