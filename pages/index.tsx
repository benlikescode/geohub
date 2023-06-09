import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { GamemodeCard } from '@components/GamemodeCard'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { Pill } from '@components/system'
import StyledHomePage from '@styles/HomePage.Styled'
import { GeoTipType, MapType } from '@types'
import geoTips from '@utils/constants/geotips.json'
import officialMaps from '@utils/constants/officialMaps.json'
import { COUNTRY_STREAK_DETAILS, DAILY_CHALLENGE_DETAILS } from '@utils/constants/random'

const Home: NextPage = () => {
  const [geoTip, setGeoTip] = useState<GeoTipType>(geoTips[22])

  useEffect(() => {
    const day = new Date().getDate()
    setGeoTip(geoTips[day - 1])
  }, [])

  return (
    <StyledHomePage>
      <div className="hero-section">
        <Image src="/images/backgrounds/hero.jpg" alt="Homes on a street in Japan" layout="fill" objectFit="cover" />
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
            <MapPreviewCard key={idx} map={map} showDescription />
          ))}
        </div>

        <div className="other-gamemodes">
          <GamemodeCard
            title={COUNTRY_STREAK_DETAILS.name}
            titleColor="var(--blue-500)"
            description={COUNTRY_STREAK_DETAILS.description}
            buttonText="Play Streaks"
            href="/streaks"
          />

          <GamemodeCard
            title={DAILY_CHALLENGE_DETAILS.name}
            titleColor="var(--green-500)"
            description={DAILY_CHALLENGE_DETAILS.description}
            buttonText="Play Challenge"
            href="/daily-challenge"
          />
        </div>
      </div>
    </StyledHomePage>
  )
}

export default Home
