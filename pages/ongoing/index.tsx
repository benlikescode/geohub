import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { mailman } from '@backend/utils/mailman'
import { NoResults } from '@components/ErrorViews/NoResults'
import { Head } from '@components/Head'
import { Layout, LoadingPage, PageHeader } from '@components/Layout'
import { WidthController } from '@components/Layout/WidthController'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { SkeletonCards } from '@components/SkeletonCards'
import { Avatar, BlockQuote, Button, Pill } from '@components/System/'
import { UnfinishedCard } from '@components/UnfinishedCard'
import { selectUser } from '@redux/user'
import StyledOngoingGamesPage from '@styles/OngoingGamesPage.Styled'
import { GameType, MapType } from '@types'
import { getFormattedDate, getFormattedOngoingScore } from '@utils/helperFunctions'
import { TrashIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import map from 'react-map-gl/dist/esm/components/map'

type OngoingGame = GameType & {
  mapDetails: MapType[]
}

const OngoingGamesPage: NextPage = () => {
  const [games, setGames] = useState<OngoingGame[]>([])
  const [loading, setLoading] = useState(true)
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user.id) {
      return setLoading(false)
    }

    const fetchGames = async () => {
      const { res } = await mailman(`games/unfinished?userId=${user.id}`)
      setGames(res)
      setLoading(false)
    }

    fetchGames()
  }, [user])

  const reloadGames = (gameId: string) => {
    const filtered = games.filter((game) => game._id != gameId)
    setGames(filtered)
  }

  if (loading) return <LoadingPage />

  return (
    <StyledOngoingGamesPage>
      <WidthController customWidth="960px">
        <Head title="Ongoing Games" />
        <PageHeader>Ongoing Games</PageHeader>

        {loading && <SkeletonCards numCards={8} />}

        {/* Finished loading and No Results */}
        {!loading && (!user.id || games.length === 0) && (
          <NoResults message="You can find your unfinished games here" />
        )}

        <div className="ongoing-table">
          {games.map((game, idx) => (
            <div key={idx} className="ongoing-item">
              <div className="flex-left">
                <div className="map-details">
                  <Avatar type="map" src={game.mapDetails[0].previewImg} size={40} />
                  <span className="mapName">{game.mapDetails[0].name}</span>
                </div>
              </div>

              <div className="ongoing-buttons">
                <div className="game-info-pills">
                  <Pill label={`Round ${game.round}`} className="game-info-pill" />
                  {/*
                  <Pill
                    label={getFormattedOngoingScore(idx === 1 ? 20000 : game.totalPoints)}
                    className="game-info-pill"
          />*/}
                  <Pill label={getFormattedDate(game.createdAt)} className="game-info-pill" />
                </div>

                <button className="mapDeleteBtn">
                  <TrashIcon />
                </button>
                <Link href={`/game/${game._id}`}>
                  <Button type="solidPurple">Resume</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </WidthController>
    </StyledOngoingGamesPage>
  )
}

export default OngoingGamesPage
