import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { MapPreviewCard } from '../components/Home/MapPreviewCard'
import StyledHomePage from '../styles/HomePage.Styled'
import { MapType } from '../types'

const Home: NextPage = () => {

  const testLocation = {
    lat: 10,
    lng: 10
  }

  const testMap: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/worldMap.jpg'
  }

  const testMap2: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/LandmarksMap.jfif'
  }

  const testMap3: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/CanadaMap.jpg'
  }

  const testMap4: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/UnitedStatesMap.jpg'
  }

  return (
    <StyledHomePage>
      <div className="mapPreviewSection">
        <MapPreviewCard map={testMap} />
        <MapPreviewCard map={testMap2} />
        <MapPreviewCard map={testMap3} />
        <MapPreviewCard map={testMap4} />
      </div>
     
    </StyledHomePage>
  )
}

export default Home
