import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { FinalResultsCard } from '../../components/FinalResultsCard'
import { Navbar, Layout } from '../../components/Layout'
import { ResultMap } from '../../components/ResultMap'
import { LeaderboardCard } from '../../components/Results'
import { ResultsCard } from '../../components/ResultsCard'
import { FlexGroup } from '../../components/System'
import { selectGame } from '../../redux/game'
import { GameSettingsType, MapType } from '../../types'

const ResultsPage: NextPage = () => {
  const game = useSelector(selectGame)

  const leaderboard = [
    {
      user: {avatar: 'https://cdn.britannica.com/88/80588-050-8D944BFE/Leaning-Tower-of-Pisa-Italy.jpg', name: 'BenZ'},
      rounds: [
        {points: 3297, distance: 2215, time: '1:23'},
        {points: 4297, distance: 2215, time: '1:23'},
        {points: 3257, distance: 2215, time: '1:23'},
        {points: 2297, distance: 2215, time: '1:23'},
        {points: 4457, distance: 2215, time: '1:23'},
        {points: 14557, distance: 12215, time: '6:13'},
      ]
    },
    {
      user: {avatar: 'https://cdn.britannica.com/88/80588-050-8D944BFE/Leaning-Tower-of-Pisa-Italy.jpg', name: 'BenZ'},
      rounds: [
        {points: 3297, distance: 2215, time: '1:23'},
        {points: 4297, distance: 2215, time: '1:23'},
        {points: 3257, distance: 2215, time: '1:23'},
        {points: 2297, distance: 2215, time: '1:23'},
        {points: 4457, distance: 2215, time: '1:23'},
        {points: 14557, distance: 12215, time: '6:13'},
      ]
    },
  ]

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
    previewImg: '/images/worldMap.jpg',
    creator: 'GeoHub'
  }

  const testSettings: GameSettingsType = {
    timeLimit: 0,
    canMove: true,
    canPan: true,
    canZoom: true
  }

  

  return (
    <>
      <Navbar variant/>
      <Layout>
        <ResultMap guessedLocations={game.guessedLocations} actualLocations={game.actualLocations} isFinalResults />
        <FlexGroup justify="center">
          <LeaderboardCard leaderboard={leaderboard} map={testMap} gameSettings={testSettings}/>
        </FlexGroup>
       
      </Layout>
    
     
    </>
  )
}

export default ResultsPage
