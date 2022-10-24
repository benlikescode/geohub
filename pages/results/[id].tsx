import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { ObjectId } from 'mongodb'
import React from 'react'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { Head } from '@components/Head'
import { Navbar } from '@components/Layout/Navbar'
import { ResultMap } from '@components/ResultMap'
import { LeaderboardCard } from '@components/Results'
import { GameResultsSkeleton } from '@components/Skeletons/GameResultsSkeleton'
import { FlexGroup } from '@components/System'
import StyledResultPage from '@styles/ResultPage.Styled'
import { GameType, PageType } from '@types'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    await dbConnect()
    const gameId = query.id as string

    if (!gameId) {
      return {
        notFound: true,
      }
    }

    const gameQuery = await collections.games
      ?.aggregate([
        { $match: { _id: new ObjectId(gameId) } },
        {
          $lookup: {
            from: 'maps',
            localField: 'mapId',
            foreignField: '_id',
            as: 'mapDetails',
          },
        },
        {
          $unwind: '$mapDetails',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails',
        },
      ])
      .toArray()

    if (!gameQuery || gameQuery.length !== 1) {
      return {
        notFound: true,
      }
    }

    const game = gameQuery[0] as GameType

    if (game.round <= 5) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        game: JSON.parse(JSON.stringify(game)),
      },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

const ResultsPage: PageType = ({ game }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!game) {
    return <GameResultsSkeleton />
  }

  return (
    <StyledResultPage>
      <Head title="Game Results" />
      <section>
        <Navbar />

        <main>
          <ResultMap
            guessedLocations={game.guesses}
            actualLocations={game.rounds}
            round={game.round}
            isFinalResults
            isLeaderboard
            userAvatar={game.userDetails?.avatar}
          />

          <FlexGroup justify="center">
            <LeaderboardCard gameData={[game]} mapData={game.mapDetails} />
          </FlexGroup>
        </main>
      </section>
    </StyledResultPage>
  )
}

ResultsPage.noLayout = true

export default ResultsPage
