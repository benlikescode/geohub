import React, { FC, useEffect, useState } from 'react'
import { StreetView } from '../../components/StreetView'
import { mailman } from '../../backend/utils/mailman'
import { useRouter } from 'next/router'
import Game from '../../backend/models/game'
import StyledGamePage from '../../styles/GamePage.Styled'
import { ResultMap } from '../../components/ResultMap'
import { FinalResultsCard } from '../../components/FinalResultsCard'
import { ResultsCard } from '../../components/ResultsCard'
import { LoadingPage } from '../../components/Layout'
import { selectUser } from '../../redux/user'
import { useDispatch, useSelector } from 'react-redux'
import DefaultErrorPage from 'next/error'
import { ChallengeStart } from '../../components/ChallengeStart'
import { GameSettingsType, LocationType, ChallengeType } from '../../types'
import { updateStartTime } from '../../redux/game'

const ChallengePage: FC = () => {
  const [view, setView] = useState<'Start' | 'Game' | 'Result' | 'FinalResults'>('Game')
  const [challengeData, setChallengeData] = useState<ChallengeType | null>()
  const [gameData, setGameData] = useState<Game | null>()

  const router = useRouter()
  const challengeId = router.query.id as string
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const fetchChallenge = async () => {
    const { status, res } = await mailman(`challenges/${challengeId}?userId=${user.id}`)

    // If challenge not found, set gameData to null to display error page
    if (status === 404 || status === 500) {
      return setChallengeData(null)
    }
    setChallengeData(res)

    //console.log(res)

    const isThisUsersChallenge = res.creatorId === user.id
    //console.log(isThisUsersChallenge)
    const userHasStartedChallenge = res.playersGame !== null
    //console.log(userHasStartedChallenge)

    // If user is guest and has not started this challenge yet
    if (!isThisUsersChallenge && !userHasStartedChallenge) {
      setView('Start')
    }
    // Otherwise, if they have not started challenge, create a game object
    // If they have started challenge, set gameData with their current game state
    else {
      if (!userHasStartedChallenge) {
        await createGame(res)
      } else {
        if (res.playersGame.round > 5) {
          router.push(`/results/challenge/${challengeId}`)
        } else {
          const formattedGameData = { id: res.playersGame._id, ...res.playersGame }

          setGameData(formattedGameData)
        }
      }
    }
    //console.log(challengeData, gameData)
  }

  const createGame = async (challengeData: ChallengeType) => {
    const gameData = {
      mapId: challengeData.mapId,
      gameSettings: challengeData.gameSettings,
      userId: user.id,
      locations: challengeData.locations,
      challengeId,
    }

    // Store start time
    dispatch(updateStartTime({ startTime: new Date().getTime() }))

    const { status, res } = await mailman(
      `challenges/${challengeId}`,
      'POST',
      JSON.stringify(gameData)
    )

    if (status === 400) {
      alert('An error occured')
    }
    console.log(`GAME DATA: ${JSON.stringify(res)}`)
    setGameData(res)
  }

  useEffect(() => {
    if (!challengeId) {
      return
    }

    if (view === 'Game') {
      fetchChallenge()
    }
  }, [challengeId])

  if (view === 'Start' && challengeData) {
    return (
      <ChallengeStart
        challengeData={challengeData}
        handleStartChallenge={createGame}
        setView={setView}
      />
    )
  }

  if (challengeData === null || gameData === null) {
    return <DefaultErrorPage statusCode={500} />
  }

  if (!challengeData || !gameData) {
    return <LoadingPage />
  }

  return (
    <StyledGamePage>
      {view === 'Game' ? (
        <StreetView gameData={gameData} setGameData={setGameData} setView={setView} />
      ) : (
        <>
          {view === 'Result' && (
            <ResultMap
              guessedLocations={gameData.guesses}
              actualLocations={gameData.rounds}
              round={gameData.round}
            />
          )}

          {view === 'FinalResults' && (
            <ResultMap
              guessedLocations={gameData.guesses}
              actualLocations={gameData.rounds}
              round={gameData.round}
              isFinalResults
            />
          )}

          <div className="resultsWrapper">
            {view === 'FinalResults' ? (
              <FinalResultsCard gameData={gameData} />
            ) : (
              <ResultsCard
                round={gameData.round}
                distance={gameData.guesses[gameData.guesses.length - 1].distance}
                points={gameData.guesses[gameData.guesses.length - 1].points}
                setView={setView}
              />
            )}
          </div>
        </>
      )}
    </StyledGamePage>
  )
}

export default ChallengePage
