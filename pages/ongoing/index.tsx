import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { NoResults } from '@components/errorViews'
import { PageHeader, WidthController } from '@components/layout'
import { Meta } from '@components/Meta'
import { DestroyModal } from '@components/modals'
import { SkeletonOngoingGames } from '@components/skeletons'
import { Avatar, Pill, Spinner } from '@components/system'
import { ExclamationCircleIcon, TrashIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import StyledOngoingGamesPage from '@styles/OngoingGamesPage.Styled'
import { GameType, MapType } from '@types'
import { COUNTRY_STREAK_DETAILS, DAILY_CHALLENGE_DETAILS } from '@utils/constants/random'
import { formatMonthDayYear } from '@utils/dateHelpers'
import { formatOngoingScore, mailman, showToast } from '@utils/helpers'
import { useBreakpoint } from '@utils/hooks'

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
  const { isBreakpoint } = useBreakpoint()

  useEffect(() => {
    if (!user.id) {
      return setLoading(false)
    }

    fetchGames()
  }, [])

  const fetchGames = async () => {
    const res = await mailman(`games/unfinished?page=${gamesPage}`)

    if (res.error) {
      return showToast('error', res.error.message)
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

    setIsDeleting(false)

    if (res?.error) {
      return showToast('error', res.error.message)
    }

    setDeleteModalOpen(false)
    showToast('success', res.message)

    // Remove deleted game from state
    const filtered = games.filter((game) => game._id != deletingGameId)
    setGames(filtered)
  }

  return (
    <StyledOngoingGamesPage>
      <WidthController customWidth="1160px">
        <Meta title="Ongoing Games" />
        <PageHeader>Ongoing Games</PageHeader>

        <div className="ongoing-banner">
          <div className="message">
            <ExclamationCircleIcon />
            <span>Ongoing games are only saved for 30 days after they are created</span>
          </div>
        </div>

        {!loading && (!user.id || games.length === 0) ? (
          <NoResults message="You can find your unfinished games here." />
        ) : (
          <div className="ongoing-table">
            {loading ? (
              <SkeletonOngoingGames />
            ) : (
              <InfiniteScroll
                dataLength={games.length}
                next={() => fetchGames()}
                hasMore={hasMore || false}
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
                key={isBreakpoint ? 1 : 0}
                scrollableTarget={isBreakpoint ? undefined : 'main'}
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
                        />
                        <div className="mapNameWrapper">
                          <span className="mapName">
                            {game.mode === 'streak'
                              ? COUNTRY_STREAK_DETAILS.name
                              : game.isDailyChallenge
                              ? DAILY_CHALLENGE_DETAILS.name
                              : game.mapDetails?.[0]?.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-right">
                      {game.mode === 'standard' && (
                        <div className="game-info-pills">
                          <Pill label={`Round ${game.round}`} className="game-info-pill round" />
                          <Pill label={formatOngoingScore(game.totalPoints)} className="game-info-pill score" />
                          <Pill label={formatMonthDayYear(game.createdAt)} className="game-info-pill created" />
                        </div>
                      )}

                      {game.mode === 'streak' && (
                        <div className="game-info-pills">
                          <Pill label={`${game.streak} Streak`} className="game-info-pill round" />
                          <Pill label={formatMonthDayYear(game.createdAt)} className="game-info-pill created" />
                        </div>
                      )}

                      <div className="ongoing-buttons">
                        <button className="delete-button" onClick={() => openDeleteModal(game._id as string)}>
                          <TrashIcon />
                        </button>
                        <a className="play-button" href={`/game/${game._id}`}>
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
        )}

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
