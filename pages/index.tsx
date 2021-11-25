import { ChevronRightIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { MapPreviewCard } from '../components/Home/MapPreviewCard'
import { Navbar, Sidebar, Layout, Banner } from '../components/Layout/'
import { FlexGroup, Icon } from '../components/System'
import StyledHomePage from '../styles/HomePage.Styled'
import { GeoTipType } from '../types'
import geoTips from '../utils/constants/geotips.json'
import officialMaps from '../utils/constants/officialMaps.json'
import { Pill } from '../components/System/Pill'
import { GamemodeCard } from '../components/GamemodeCard'
import { Badge } from '../components/System/Badge'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [geoTip, setGeoTip] = useState<GeoTipType>(geoTips[0])

  useEffect(() => {
    const day = new Date().getDate()
    setGeoTip(geoTips[day - 1])
  }, [])
  
  return (
    <StyledHomePage>
      <Navbar />
      <Layout hasSidebar>
        <div>
          <Sidebar />
        </div>

        <main>
          <div className="bannerWrapper">
            <div className="bannerContent">
              <h2 className="bannerTitle">GeoTip of The day.</h2>
              <div className="tipWrapper">           
                <span className="tip">{geoTip.tip}</span>
              </div>
              <div className="pillsWrapper">
                {geoTip.tags.map((label, idx) => (
                  <Pill key={idx} label={label}/>
                ))}
              </div>
            </div>
          </div>

          <div className="mapPreviewSection">
            {officialMaps.maps.map((map, idx) => (
              <MapPreviewCard key={idx} map={map} />
            ))}               
          </div>

          <div className="mapPreviewSection">
            <GamemodeCard 
              title="Battle Royale"
              titleColor="var(--lightRed)"
              description="A competitive game mode, play against others and rank up!"
              buttonText="Play Now"
            />

            <GamemodeCard 
              title="Daily Challenge"
              titleColor="var(--blue-500)"
              description="A unique challenge everyday, play now and see how you compare."
              buttonText="Play Now"
            />

            <GamemodeCard 
              title="Geo Learn"
              titleColor="var(--green-500)"
              description="Facts and fun quizes to improve your knowledge and up your game!"
              buttonText="Learn Now"
            />          
          </div>

          <Banner hasPadding>
            <FlexGroup justify="space-between">
              <h2 className="badgesTitle">Your Badges</h2>
              <button className="viewAll">
                <span>View All Badges</span>
                <Icon size={24} fill="var(--color3)">
                  <ChevronRightIcon />
                </Icon>
              </button>             
            </FlexGroup>
                   
            <div className="badgesWrapper">
             
            </div>
          </Banner>      
        </main>     
      </Layout>   
    </StyledHomePage>
  )
}

export default Home
