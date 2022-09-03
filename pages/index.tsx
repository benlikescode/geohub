import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { GamemodeCard } from '@components/GamemodeCard'
import { Head } from '@components/Head'
import { Layout } from '@components/Layout/'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { Pill } from '@components/System/Pill'
import StyledHomePage from '@styles/HomePage.Styled'
import { GeoTipType } from '@types'
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
      <Layout isHome>
        <div className="bannerContent">
          <h2 className="bannerTitle">Today&apos;s Tip</h2>
          <div className="tipWrapper">
            <span className="tip">{geoTip.tip}</span>
          </div>
          <div className="pillsWrapper">
            {geoTip.tags.map((label, idx) => (
              <Pill key={idx} label={label} />
            ))}
          </div>
        </div>

        <div className="mapPreviewSection">
          {officialMaps.maps.map((map, idx) => (
            <MapPreviewCard key={idx} map={map} />
          ))}
        </div>

        <div className="gamemodesWrapper">
          <GamemodeCard
            title="Aerial Game"
            titleColor="var(--blue-500)"
            description="Can you pinpoint a city looking down from the sky?"
            buttonText="Play Now"
            href="/aerial"
          />

          <GamemodeCard
            title="Geo Learn"
            titleColor="var(--green-500)"
            description="Facts and fun quizes to improve your knowledge and up your game!"
            buttonText="Learn Now"
          />
        </div>
      </Layout>
    </StyledHomePage>
  )
}

export default Home
