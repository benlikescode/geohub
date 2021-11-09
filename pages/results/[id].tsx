import type { NextPage } from 'next'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { Game } from '../../backend/models'
import { mailman } from '../../backend/utils/mailman'
import { Navbar, Layout, LoadingPage, Sidebar } from '../../components/Layout'
import { ResultMap } from '../../components/ResultMap'
import { LeaderboardCard } from '../../components/Results'
import { FlexGroup } from '../../components/System'
import StyledResultPage from '../../styles/ResultPage.Styled'
import { MapType } from '../../types'

const ResultsPage: NextPage = () => {
  const [gameData, setGameData] = useState<Game | null>()
  const [mapData, setMapData] = useState<MapType>()
  const [isCompleted, setIsCompleted] = useState(false)
  const gameId = router.query.id as string

  const fetchGame = async () => {
    const { status, res } = await mailman(`games/${gameId}`)

    // if game not found, set gameData to null so an error page can be displayed
    if (status === 404 || status === 500) {
      return setGameData(null)
    }

    if (res.round > 5) {
      setIsCompleted(true)
    }

    const gameData = {
      id: gameId, ...res
    }

    setGameData(gameData)
    fetchMap(gameData.mapId)
  }

  const fetchMap = async (mapId: string) => {
    const { res } = await mailman(`maps/${mapId}`)
    setMapData(res)
  }

  useEffect(() => {
    if (!gameId) {
      return
    }
  
    fetchGame()
 
  }, [gameId])

  if (!gameData || !mapData) {
    return <LoadingPage />
  }
  
  return (
    <StyledResultPage>
      {isCompleted && gameData !== null ?
        <>
          <Navbar variant/>
          <Layout>
            <ResultMap 
              guessedLocations={gameData.guesses} 
              actualLocations={gameData.rounds} 
              round={gameData.round} 
              isFinalResults 
            />
    
            <FlexGroup justify="center">
              <LeaderboardCard gameData={gameData} mapData={mapData}/>
            </FlexGroup>  
          </Layout>   
        </>

        :

        <>
          <Navbar />
          <Layout hasSidebar>
            <div>
              <Sidebar />
            </div>

            <main>
              <div className="errorContainer">
                <div className="errorContent">
                  <h1 className="errorPageTitle">Page not found</h1>
                  <span className="errorPageMsg">
                    {gameData === null ? 'This game does not exist' : 'This game has not been completed'}
                  </span>         
                </div>
                <div className="errorGif">
                  
                </div>
              </div>
                
            </main>     
          </Layout>  
        </>

      }
    </StyledResultPage>
 
  )
}

export default ResultsPage