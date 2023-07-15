import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Game from '@backend/models/game'
import { Head } from '@components/Head'
import { TestComp } from '@components/TestComp'
import { Loader } from '@googlemaps/js-api-loader'
import { useAppDispatch } from '@redux/hook'
import { updateRecentlyPlayed } from '@redux/slices'
import StyledGamePage from '@styles/GamePage.Styled'
import { PageType } from '@types'
import { GUESS_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { mailman } from '@utils/helpers'

const GEOHUB_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

const GamePage: PageType = () => {
  const [view, setView] = useState<'Game' | 'Result' | 'FinalResults'>('Game')
  const [gameData, setGameData] = useState<Game | null>()
  const [googleMap, setGoogleMap] = useState<any>()
  const [showSecond, setShowSecond] = useState(false)
  const router = useRouter()
  const gameId = router.query.id as string
  const dispatch = useAppDispatch()

  const mapRef = useRef<any>(null)

  const fetchGame = async () => {
    const res = await mailman(`games/${gameId}`)

    // If game not found -> show error page
    if (res.error) {
      return setGameData(null)
    }

    const { game, gameBelongsToUser } = res

    if (!gameBelongsToUser) {
      return setGameData(null)
    }

    // If game is completed, set view to Result
    if (game.state === 'finished') {
      setView('Result')
    }

    dispatch(updateRecentlyPlayed({ recentlyPlayed: [] }))

    // HALP -> update this to not need to use "id" -> should be using "_id"
    const gameData = {
      id: gameId,
      ...game,
    }

    setGameData(gameData)
  }

  useEffect(() => {
    if (!gameId) {
      return
    }

    if (view === 'Game') {
      fetchGame()
    }
  }, [gameId, view])

  useEffect(() => {
    // if (!mapRef || !mapRef.current) return

    const loader = new Loader({
      apiKey: GEOHUB_MAPS_KEY, // Replace with your own Google Maps API key
      version: 'weekly',
    })

    loader.load().then((google) => {
      console.log(mapRef.current)
      const map = new google.maps.Map(document.getElementById('herro') as HTMLElement, GUESS_MAP_OPTIONS)
      setGoogleMap(map)

      map.addListener('click', () => setShowSecond(true))
    })
  }, [])

  // if (gameData === null) {
  //   return <NotFound title="Game Not Found" message="This game likely does not exist or does not belong to you." />
  // }

  // if (!gameData) {
  //   return <LoadingPage />
  // }

  return (
    <StyledGamePage>
      <Head title={`Game - GeoHub`} />

      {!showSecond && <div id="herro" style={{ height: '100%', width: '100%' }}></div>}

      {showSecond && <TestComp googleMap={googleMap} />}
    </StyledGamePage>
  )
}

GamePage.noLayout = true

export default GamePage
