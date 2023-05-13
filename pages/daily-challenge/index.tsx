import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Link from 'next/link'
import router from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { DailyChallengeMapStats } from '@components/DailyChallengeMapStats'
import { DailyChallengeWinners } from '@components/DailyChallengeWinners'
import { Head } from '@components/Head'
import { WidthController } from '@components/Layout/WidthController'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { GameSettingsModal } from '@components/Modals'
import { SkeletonLeaderboard } from '@components/SkeletonLeaderboard'
import { SkeletonMapInfo } from '@components/SkeletonMapInfo'
import { Avatar, Button } from '@components/System'
import { VerifiedBadge } from '@components/VerifiedBadge'
import { CheckIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import StyledDailyChallengePage from '@styles/DailyChallengePage.Styled'
import { DailyChallengeStatsType, MapLeaderboardType, MapType } from '@types'
import { showErrorToast } from '@utils/helpers/showToasts'

const DailyChallengePage: FC = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [mapDetails, setMapDetails] = useState<MapType | null>()
  const [mapStats, setMapStats] = useState<DailyChallengeStatsType | null>()
  const [allTimeScores, setAllTimeScores] = useState<MapLeaderboardType[] | null>()
  const [todayScores, setTodayScores] = useState<MapLeaderboardType[] | null>()
  // const [otherMaps, setOtherMaps] = useState<MapType[] | null>()
  const [usersGameState, setUsersGameState] = useState<'started' | 'finished' | 'notStarted'>('notStarted')
  const [previousWinners, setPreviousWinners] = useState([])

  const user = useAppSelector((state) => state.user)

  // settingsModalOpen ? disableBodyScroll(document as any) : enableBodyScroll(document as any)

  useEffect(() => {
    fetchMapDetails()
    fetchMapScores()
    fetchPreviousWinners()
    //fetchOtherMaps()
  }, [])

  const fetchMapDetails = async () => {
    const res = await mailman(`challenges/daily`)

    if (res.error) {
      return setMapDetails(null)
    }

    setMapDetails(res.details)
    setMapStats(res.stats)
    setUsersGameState(res.usersGameState)
  }

  const fetchMapScores = async () => {
    const res = await mailman(`scores/challenges/daily/leaderboard`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setAllTimeScores(res.allTime)
    setTodayScores(res.today)
  }

  const fetchPreviousWinners = async () => {
    const res = await mailman(`scores/challenges/daily/previous`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setPreviousWinners(res)
  }

  // const fetchOtherMaps = async () => {
  //   const res = await mailman(`maps/browse/popular?count=8&mapId=${DAILY_CHALLENGE_ID}`)

  //   if (res.error) {
  //     return showErrorToast(res.error.message)
  //   }

  //   setOtherMaps(res)
  // }

  const startDailyChallenge = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    if (usersGameState === 'finished') {
      return showErrorToast(`You already played today's challenge`, { id: 'dc1' })
    }

    const res = await mailman('challenges/daily', 'POST')

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    router.push(`/challenge/${res.challengeId}`)
  }

  //   if (mapDetails === null) {
  //     return (
  //       <NotFound
  //         title="Page Not Found"
  //         message="This map either does not exist, has not been published, or was recently deleted"
  //       />
  //     )
  //   }

  return (
    <StyledDailyChallengePage>
      <WidthController customWidth="1400px" mobilePadding="0px">
        <Head title={mapDetails?.name ? `Play - ${mapDetails.name}` : 'GeoHub'} />

        <div className="daily-challenge-wrapper">
          <div>
            {mapDetails && mapStats ? (
              <div className="mapDetailsSection">
                <div className="mapDescriptionWrapper">
                  <div className="descriptionColumnWrapper">
                    <div className="descriptionColumn">
                      <Avatar type="map" src={mapDetails.previewImg} size={50} />
                      <div className="map-details">
                        <div className="name-wrapper">
                          <span className="name">{mapDetails.name}</span>
                          <VerifiedBadge size={20} />
                        </div>
                        {mapDetails.description && <span className="description">{mapDetails.description}</span>}
                        {!mapDetails.description && mapDetails.creatorDetails && (
                          <span className="map-creator">
                            {'Created by '}
                            <span className="map-creator-link">
                              <Link href={`/user/${mapDetails.creatorDetails._id}` || ''}>
                                <a>{mapDetails.creatorDetails.name}</a>
                              </Link>
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    <Button type="solidPurple" width="148px" height="52px" callback={() => startDailyChallenge()}>
                      {usersGameState === 'started' && 'Continue'}
                      {usersGameState === 'notStarted' && 'Play Now'}
                      {usersGameState === 'finished' && (
                        <div className="completed-wrapper">
                          <div className="completed-text">Completed</div>
                          <div className="completed-check">
                            <CheckIcon />
                          </div>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="statsWrapper">
                  <DailyChallengeMapStats dailyChallengeStats={mapStats} />
                </div>
              </div>
            ) : (
              <SkeletonMapInfo />
            )}

            {allTimeScores && todayScores ? (
              <div className="leaderboards-wrapper">
                <MapLeaderboard leaderboard={allTimeScores} title="All Time Leaderboard" />

                <MapLeaderboard
                  leaderboard={todayScores}
                  title="Today's Leaderboard"
                  noResultsMessage="Play now to be the first on the leaderboard!"
                />
              </div>
            ) : (
              <SkeletonLeaderboard />
            )}
          </div>

          <div className="previous-winners-container">
            {previousWinners ? <DailyChallengeWinners prevWinners={previousWinners} /> : <SkeletonLeaderboard />}
          </div>
        </div>

        {/* {otherMaps ? (
          <div className="otherMapsWrapper">
            <span className="otherMapsTitle">Other Popular Maps</span>
            <div className="otherMaps">
              {otherMaps.map((otherMap, idx) => (
                <MapPreviewCard key={idx} map={otherMap} showDescription />
              ))}
            </div>
          </div>
        ) : (
          <div className="skeletonCards">
            <SkeletonCards numCards={6} numColumns={3} />
          </div>
        )} */}
      </WidthController>

      {mapDetails && (
        <GameSettingsModal
          isOpen={settingsModalOpen}
          closeModal={() => setSettingsModalOpen(false)}
          mapDetails={mapDetails}
          gameMode="standard"
        />
      )}
    </StyledDailyChallengePage>
  )
}

export default DailyChallengePage
