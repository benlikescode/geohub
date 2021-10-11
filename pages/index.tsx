import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { MapPreviewCard } from '../components/Home/MapPreviewCard'
import { Navbar, Sidebar, Layout } from '../components/Layout/'
import StyledHomePage from '../styles/HomePage.Styled'
import { MapType } from '../types'

const Home: NextPage = () => {

  const testLocation = {
    lat: 10,
    lng: 10
  }

  const testMap: MapType = {
    id: 'world',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/worldMap.jpg',
    creator: 'GeoHub'
  }

  const testMap2: MapType = {
    id: 'famous-landmarks',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/LandmarksMap.jfif',
    creator: 'GeoHub'
  }

  const testMap3: MapType = {
    id: 'canada',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/CanadaMap.jpg',
    creator: 'GeoHub'
  }

  const testMap4: MapType = {
    id: 'usa',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/UnitedStatesMap.jpg',
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
          <div className="mapPreviewSection">
            <MapPreviewCard map={testMap} />
            <MapPreviewCard map={testMap2} />
            <MapPreviewCard map={testMap3} />
            <MapPreviewCard map={testMap4} />
          </div>
        </main>
       
       
      </Layout>
    
     
    </StyledHomePage>
  )
}

export default Home
