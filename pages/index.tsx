import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { GamemodeCard } from '@components/GamemodeCard'
import { Head } from '@components/Head'
import { Layout } from '@components/Layout/'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { Pill } from '@components/System/Pill'
import StyledHomePage from '@styles/HomePage.Styled'
import { GeoTipType, MapType } from '@types'
import geoTips from '@utils/constants/geotips.json'
import officialMaps from '@utils/constants/officialMaps.json'

const Home: NextPage = () => {
  const [geoTip, setGeoTip] = useState<GeoTipType>(geoTips[22])

  useEffect(() => {
    const day = new Date().getDate()
    setGeoTip(geoTips[day - 1])
  }, [])

  return (
    <StyledHomePage>
      <Layout removeWrapper>
        <div className="hero-section">
          <div className="hero-content">
            <h2 className="banner-title">Today&apos;s Tip</h2>
            <div className="tip-wrapper">
              <span className="tip">{geoTip.tip}</span>
            </div>
            <div className="pills-wrapper">
              {geoTip.tags.map((label, idx) => (
                <Pill key={idx} label={label} />
              ))}
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="map-preview-section">
            {(officialMaps.maps as MapType[]).map((map, idx) => (
              <MapPreviewCard key={idx} map={map} />
            ))}
          </div>

          <div className="other-gamemodes">
            <GamemodeCard
              title="Aerial Game"
              titleColor="var(--blue-500)"
              description="Can you pinpoint a city looking down from the sky?"
              buttonText="Play Aerial"
              href="/aerial"
            />

            <GamemodeCard
              title="The Daily Challenge"
              titleColor="var(--green-500)"
              description="One game everyday. Five new locations. Just one winner!"
              buttonText="Play Challenge"
            />
          </div>
        </div>
      </Layout>
    </StyledHomePage>
  )
}

export default Home
