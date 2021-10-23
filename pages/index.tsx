import { LightBulbIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MapPreviewCard } from '../components/Home/MapPreviewCard'
import { Navbar, Sidebar, Layout } from '../components/Layout/'
import { Icon } from '../components/System'
import StyledHomePage from '../styles/HomePage.Styled'
import { GeoTipType, MapType } from '../types'
import { fireDb } from '../utils/firebaseConfig'
import { randomElement } from '../utils/functions/generateLocations'
import * as tips from '../utils/constants/geotips.json'
import { Pill } from '../components/System/Pill'

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
          </div>

        </main>
       
       
      </Layout>
    
     
    </StyledHomePage>
  )
}

export default Home
