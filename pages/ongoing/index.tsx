import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import { mailman } from '@backend/utils/mailman'
import { NoResults } from '@components/ErrorViews/NoResults'
import { Head } from '@components/Head'
import { PageHeader } from '@components/Layout'
import { WidthController } from '@components/Layout/WidthController'
import { DestroyModal } from '@components/Modals/DestroyModal'
import { OngoingItemSkeleton } from '@components/Skeletons/OngoingItemSkeleton'
import { Avatar, Pill, Spinner } from '@components/System/'
import { TrashIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import StyledOngoingGamesPage from '@styles/OngoingGamesPage.Styled'
import { GameType, MapType } from '@types'
import { COUNTRY_STREAK_DETAILS, DAILY_CHALLENGE_DETAILS } from '@utils/constants/random'
import { formatMonthDayYear } from '@utils/dateHelpers'
import { getFormattedOngoingScore } from '@utils/helperFunctions'
import { showErrorToast } from '@utils/helpers/showToasts'

type OngoingGame = GameType & {
  mapDetails: MapType[]
}

const OngoingGamesPage: NextPage = () => {
  const [games, setGames] = useState<OngoingGame[]>([])
  const [loading, setLoading] = useState(true)
  const [gamesPage, setGamesPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingGameId, setDeletingGameId] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!user.id) {
      return setLoading(false)
    }

    fetchGames()
  }, [])

  const fetchGames = async () => {
    const res = await mailman(`games/unfinished?page=${gamesPage}`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setHasMore(res.hasMore)

    if (!games) {
      setGames(res.data)
    } else {
      setGames((prev) => prev.concat(res.data))
    }

    setGamesPage((prev) => prev + 1)
    setLoading(false)
  }

  const openDeleteModal = (gameId: string) => {
    setDeleteModalOpen(true)
    setDeletingGameId(gameId)
  }

  const handleDeleteGame = async () => {
    setIsDeleting(true)

    const res = await mailman(`games/${deletingGameId}`, 'DELETE')

    if (res?.error) {
      toast.error('Something went wrong')
    }

    if (res.message) {
      setDeleteModalOpen(false)
      toast.success(res.message)

      // Remove deleted game from state
      const filtered = games.filter((game) => game._id != deletingGameId)
      setGames(filtered)
    }

    setIsDeleting(false)
  }

  return (
    <StyledOngoingGamesPage>
      <WidthController customWidth="1160px">
        <Head title="Ongoing Games" />
        <PageHeader>Ongoing Games</PageHeader>

        {/* Finished loading and No Results */}
        {!loading && (!user.id || games.length === 0) && (
          <NoResults message="You can find your unfinished games here" />
        )}

        <div className="ongoing-table">
          {loading ? (
            <OngoingItemSkeleton />
          ) : (
            <InfiniteScroll
              dataLength={games.length}
              next={() => fetchGames()}
              hasMore={hasMore || false}
              scrollableTarget="main"
              loader={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '1rem',
                  }}
                >
                  <Spinner size={24} />
                </div>
              }
            >
              {games.map((game, idx) => (
                <div key={idx} className={`ongoing-item ${idx % 2 === 0 ? 'variant' : ''}`}>
                  <div className="flex-left">
                    <div className="map-details">
                      <Avatar
                        type="map"
                        src={
                          game.mode === 'streak'
                            ? COUNTRY_STREAK_DETAILS.previewImg
                            : game.isDailyChallenge
                            ? DAILY_CHALLENGE_DETAILS.previewImg
                            : game.mapDetails?.[0]?.previewImg
                        }
                        size={32}
                      />
                      <span className="mapName">
                        {game.mode === 'streak'
                          ? COUNTRY_STREAK_DETAILS.name
                          : game.isDailyChallenge
                          ? DAILY_CHALLENGE_DETAILS.name
                          : game.mapDetails?.[0]?.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex-right">
                    {game.mode === 'standard' && (
                      <div className="game-info-pills">
                        <Pill label={`Round ${game.round}`} className="game-info-pill round" />
                        <Pill label={getFormattedOngoingScore(game.totalPoints)} className="game-info-pill score" />
                        <Pill label={formatMonthDayYear(game.createdAt)} className="game-info-pill created" />
                      </div>
                    )}

                    {game.mode === 'streak' && (
                      <div className="game-info-pills">
                        <Pill label={`Current Streak ${game.streak}`} className="game-info-pill round" />
                        <Pill label={formatMonthDayYear(game.createdAt)} className="game-info-pill created" />
                      </div>
                    )}

                    <div className="ongoing-buttons">
                      <button className="mapDeleteBtn" onClick={() => openDeleteModal(game._id as string)}>
                        <TrashIcon />
                      </button>
                      <a className="mapEditBtn" href={`/game/${game._id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )}
        </div>

        <DestroyModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onAction={() => handleDeleteGame()}
          title="Delete Game"
          message="Are you sure you want to permanently delete this game?"
          isSubmitting={isDeleting}
        />
      </WidthController>
    </StyledOngoingGamesPage>
  )
}

export default OngoingGamesPage
