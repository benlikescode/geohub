import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { mailman } from '../../backend/utils/mailman'
import { Navbar, Layout, Sidebar } from '../../components/Layout'
import { Spinner } from '../../components/System/Spinner'
import { UnfinishedCard } from '../../components/UnfinishedCard'
import { selectUser } from '../../redux/user'

const StyledHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
`

const StyledGamesWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`

const StyledSpinnerWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
`

const UnfinishedGamesPage: NextPage = () => {
  const [games, setGames] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(selectUser)

  useEffect(() => {
    setLoading(true)

    const fetchGames = async () => {
      const { res } = await mailman(`games/unfinished?userId=${user.id}`)
      setGames(res)
      setLoading(false)
    }

    fetchGames()
  }, [])

  const reloadGames = (gameId: string) => {
    const filtered = games.filter(game => game._id != gameId)
    setGames(filtered)
  }

  return (
    <>
    <Navbar />
      <Layout hasSidebar>
        <div>
          <Sidebar />
        </div>

        <main>
          <StyledHeader>Ongoing Games</StyledHeader>
          {loading ? (
            <StyledSpinnerWrapper>
              <Spinner />
            </StyledSpinnerWrapper>        
          ) : 
          (
            <StyledGamesWrapper>
              {games.map((game, idx) => (
                <UnfinishedCard 
                  key={idx}
                  mapAvatar={game.mapDetails[0].previewImg}
                  mapName={game.mapDetails[0].name}
                  round={game.round}
                  points={game.totalPoints}
                  gameId={game._id}
                  reloadGames={reloadGames}
                />
              ))}
            </StyledGamesWrapper>
          )}       
        </main>      
      </Layout>
      </>
  )
}

export default UnfinishedGamesPage
