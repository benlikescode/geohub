import { ChevronRightIcon, LightBulbIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MapPreviewCard } from '../components/Home/MapPreviewCard'
import { Navbar, Sidebar, Layout, Banner } from '../components/Layout/'
import { Avatar, FlexGroup, Icon } from '../components/System'
import StyledHomePage from '../styles/HomePage.Styled'
import { GeoTipType, MapType } from '../types'
import { fireDb } from '../utils/firebaseConfig'
import { randomElement } from '../utils/functions/generateLocations'
import * as tips from '../utils/constants/geotips.json'
import { Pill } from '../components/System/Pill'
import { GamemodeCard } from '../components/GamemodeCard'
import { Badge } from '../components/System/Badge'

const Home: NextPage = () => {
  const [maps, setMaps] = useState<MapType[]>([])
  const randomTip: GeoTipType = randomElement(tips)

  const getMaps = async () => {
    fireDb.collection('maps')
    .where('creator', '==', 'GeoHub')
    .onSnapshot(({ docs }) => {
      setMaps(docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      })) as MapType[]
    )})
  }

  useEffect(() => {
    getMaps()
    
  }, [])

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
                <span className="tip">{randomTip.tip}</span>
              </div>
              <div className="pillsWrapper">
                {randomTip.tags.map((label, idx) => (
                  <Pill key={idx} label={label}/>
                ))}
              </div>
            </div>
          </div>

          <div className="mapPreviewSection">
            {maps.map((map, idx) => (
              <MapPreviewCard key={idx} map={map} />
            ))}  
            <MapPreviewCard map={testMap3}/>      
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
              <Badge image="/images/LandmarksMap.jfif" borderColor="bronze" hoverText="France Master"/>
              <Badge image="https://wallpaperaccess.com/full/355007.jpg" borderColor="silver" hoverText="France Master"/>
              <Badge image="https://wallpaperaccess.com/full/354966.jpg" borderColor="gold" hoverText="France Master"/>
              <Badge image="https://cdn.lifehack.org/wp-content/uploads/2015/05/rsz_taj_mahal_india.jpg" borderColor="bronze" hoverText="France Master"/>
              <Badge image="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg" borderColor="bronze" hoverText="France Master"/>
            </div>
          </Banner>      
        </main>     
      </Layout>   
    </StyledHomePage>
  )
}

export default Home
