import React, { FC, useEffect, useState } from 'react'
import { StreetView } from '../../../components/StreetView'
import { mailman } from '../../../backend/utils/mailman'
import { useRouter } from 'next/router'
import Game from '../../../backend/models/game'
import StyledGamePage from '../../../styles/GamePage.Styled'
import { ResultMap } from '../../../components/ResultMap'
import { FinalResultsCard } from '../../../components/FinalResultsCard'
import { ResultsCard } from '../../../components/ResultsCard'
import { LoadingPage } from '../../../components/Layout'
import { selectUser } from '../../../redux/user'
import { useSelector } from 'react-redux'
import DefaultErrorPage from 'next/error'
import { Head } from '../../../components/Head'
import { Button } from '../../../components/System'
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'

const defaultGameValues = {
  gameSettings: {
    timeLimit: 61,
    canMove: true,
    canPan: true,
    canZoom: true,
  },
  guesses: [],
  rounds: [],
  round: 1,
  totalPoints: 0,
  totalDistance: 0,
  totalTime: 0,
  mapId: 'world',
}

const TestLocationsPage: FC = () => {
  const [view, setView] = useState<'Game' | 'Result' | 'FinalResults'>('Game')
  const [gameData, setGameData] = useState<any>(defaultGameValues)
  const router = useRouter()
  const user = useSelector(selectUser)

  /*
  const fetchGame = async () => {
    const { status, res } = await mailman(`games/${gameId}`)

    // if game not found, set gameData to null so an error page can be displayed
    console.log(`STATUS: ${status}`)
    if (status === 404 || status === 500) {
      return setGameData(null)
    }

    // To make it more secure, I could do this in gSSP (this is fine for now)
    if (res.userId !== user.id) {
      router.push('/')
    }

    // if game is completed, set view to Result
    if (res.round > 5) {
      setView('Result')
    }

    const gameData = {
      id: gameId,
      ...res,
    }

    setGameData(gameData)
  }
*/

  const showErrorToast = (message: string) =>
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: 'dark',
    })

  const showSuccessToast = (message: string) =>
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: 'dark',
    })

  const getLocations = async () => {
    const { status, res } = await mailman('games/testing', 'POST')
    //const { status, res } = await mailman('locations?count=16')

    setGameData({ ...gameData, rounds: [...gameData.rounds, ...res] })
  }

  const handleVote = async (vote: 'like' | 'dislike') => {
    if (vote === 'like') {
      // Submit location to DB
      const location = gameData.rounds[gameData.round - 1]
      const { status, res } = await mailman('locations', 'POST', JSON.stringify(location))

      if (status === 201) {
        showSuccessToast(res.message)
      } else {
        showErrorToast(res.message)
      }
    }

    const prevRound = gameData.round
    setGameData({ ...gameData, round: prevRound + 1 })
    setView('Game')
  }

  // fetches locations on first round and every subsequent 15
  useEffect(() => {
    if (gameData.round === 1 || gameData.round % 16 === 0) {
      getLocations()
    }
  }, [gameData.round])

  if (gameData === null) {
    return <DefaultErrorPage statusCode={500} />
  }

  if (!gameData) {
    return <LoadingPage />
  }

  return (
    <StyledGamePage>
      <Head title={`Game - Round ${gameData.round}`} />

      {view === 'Game' && <StreetView gameData={gameData} setGameData={setGameData} setView={setView} isTesting />}

      {view === 'Result' && (
        <div className="round-survey-wrapper">
          <div className="round-survey">
            <p className="round-survey-title">Do you want to save this location?</p>
            <div className="survey-buttons-wrapper">
              <Button
                callback={() => handleVote('dislike')}
                backgroundColor="#333"
                color="var(--color2)"
                type="iconRounded"
                hoverColor="#444"
              >
                <ThumbDownIcon color="var(--color2)" height={24} />
              </Button>
              <Button
                callback={() => handleVote('like')}
                backgroundColor="#333"
                color="var(--color2)"
                type="iconRounded"
                hoverColor="#444"
              >
                <ThumbUpIcon color="var(--color2)" height={24} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </StyledGamePage>
  )
}

export default TestLocationsPage
