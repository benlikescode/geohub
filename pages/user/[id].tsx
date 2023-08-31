/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CountItem } from '@components/Admin/Analytics/CountItem'
import { Head } from '@components/Head'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { AvatarPickerModal } from '@components/modals'
import { SkeletonCards, SkeletonLeaderboard, SkeletonProfile } from '@components/skeletons'
import { Tab, Tabs } from '@components/system'
import { TextWithLinks } from '@components/TextWithLinks'
import { VerifiedBadge } from '@components/VerifiedBadge'
import { CameraIcon } from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateAvatar, updateBio, updateUsername } from '@redux/slices'
import StyledProfilePage from '@styles/ProfilePage.Styled'
import { MapType, UserGameHistoryType } from '@types'
import { USER_AVATAR_PATH } from '@utils/constants/random'
import { mailman, showToast } from '@utils/helpers'

import type { NextPage } from 'next'
type NewProfileValuesType = {
  name: string
  bio?: string
  avatar?: { emoji: string; color: string }
}

type UserStatsType = { label: string; data: number }[]
type ProfileTabsType = 'stats' | 'games' | 'maps'
type UserGamesPaginationType = { page: number; hasMore: boolean }

const ProfilePage: NextPage = () => {
  const [userDetails, setUserDetails] = useState<any>()
  const [userStats, setUserStats] = useState<UserStatsType>()
  const [userGames, setUserGames] = useState<UserGameHistoryType[] | null>(null)
  const [userGamesPagination, setUserGamesPagination] = useState<UserGamesPaginationType>({ page: 0, hasMore: true })
  const [userMaps, setUserMaps] = useState<MapType[]>()
  const [newProfileValues, setNewProfileValues] = useState<NewProfileValuesType>()
  const [selectedTab, setSelectedTab] = useState<ProfileTabsType>('stats')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)

  const user = useAppSelector((state) => state.user)
  const router = useRouter()
  const userId = router.query.id
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  useEffect(() => {
    if (!userId) {
      return
    }

    getUserDetails()
  }, [userId])

  useEffect(() => {
    if (selectedTab === 'stats' && !userStats) {
      getUserStats()
    }

    if (selectedTab === 'games' && !userGames) {
      getUserGames()
    }

    if (selectedTab === 'maps' && !userMaps) {
      getUserMaps()
    }
  }, [selectedTab])

  const getUserDetails = async () => {
    const res = await mailman(`users/${userId}`)

    setUserDetails(res)
    setNewProfileValues({ name: res.name, bio: res.bio, avatar: user.avatar })
    setLoading(false)
  }

  const getUserGames = async () => {
    const res = await mailman(`scores/user/${userId}?page=${userGamesPagination.page}`)

    if (res.error || !res.data) return

    setUserGames((prev) => [...(prev || []), ...res.data])

    setUserGamesPagination({
      page: userGamesPagination.page + 1,
      hasMore: res.hasMore,
    })
  }

  const getUserMaps = async () => {
    const res = await mailman(`maps/custom?userId=${userId}`)

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setUserMaps(res)
  }

  const getUserStats = async () => {
    const res = await mailman(`users/stats?userId=${userId}`)

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setUserStats(res)
  }

  const isThisUsersProfile = () => {
    return session?.user.id === userId
  }

  const setNewUserDetails = (changedValues: any) => {
    setNewProfileValues({ ...newProfileValues, ...changedValues })
  }

  const updateUserInfo = async () => {
    dispatch(updateBio(newProfileValues?.bio))
    dispatch(updateUsername(newProfileValues?.name))
    dispatch(updateAvatar(newProfileValues?.avatar))

    setUserDetails({
      ...userDetails,
      name: newProfileValues?.name,
      bio: newProfileValues?.bio,
      avatar: newProfileValues?.avatar,
    })
    setIsEditing(false)

    await mailman('users/update', 'POST', JSON.stringify({ _id: user.id, ...newProfileValues }))
  }

  const cancelEditing = () => {
    setNewProfileValues({ name: userDetails.name, bio: userDetails.bio, avatar: userDetails.avatar })
    setIsEditing(false)
  }

  return (
    <StyledProfilePage isEditing={isEditing}>
      <Head title={userDetails ? userDetails.name : 'GeoHub'} />

      {loading || !userStats ? (
        <SkeletonProfile />
      ) : (
        <div>
          <div className="banner-image">
            <Image src="/images/backgrounds/profile-banner.png" alt="" layout="fill" quality={100} />
          </div>

          <div className="profile-details">
            <div className="profile-heading">
              <div className="avatar-wrapper">
                {isEditing ? (
                  <button
                    className="profile-avatar"
                    style={{ backgroundColor: newProfileValues?.avatar?.color }}
                    onClick={() => setAvatarModalOpen(true)}
                  >
                    <Image
                      src={`${USER_AVATAR_PATH}/${newProfileValues?.avatar?.emoji}.svg`}
                      alt=""
                      layout="fill"
                      className="emoji"
                    />
                    <div className="profile-avatar-editing-icon">
                      <CameraIcon />
                    </div>
                  </button>
                ) : (
                  <div className="profile-avatar" style={{ backgroundColor: userDetails.avatar?.color }}>
                    <Image
                      src={`${USER_AVATAR_PATH}/${userDetails.avatar?.emoji}.svg`}
                      alt=""
                      layout="fill"
                      className="emoji"
                    />
                  </div>
                )}

                {isThisUsersProfile() && !isEditing && (
                  <div className="profile-actions">
                    <button onClick={() => setIsEditing(true)}>
                      <PencilAltIcon /> Edit Profile
                    </button>
                  </div>
                )}

                {isThisUsersProfile() && isEditing && (
                  <div className="profile-actions">
                    <button onClick={() => updateUserInfo()}>Save Changes</button>
                    <button className="cancel-btn" onClick={() => cancelEditing()}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <h1 className="profile-name">
                {isEditing ? (
                  <input
                    type="text"
                    value={newProfileValues?.name}
                    onChange={(e) =>
                      setNewProfileValues({
                        name: e.target.value,
                        bio: newProfileValues?.bio,
                        avatar: newProfileValues?.avatar,
                      })
                    }
                    maxLength={30}
                  />
                ) : (
                  <div className="name-container">
                    <div className="name-wrapper">
                      <span className="name">{userDetails.name}</span>
                    </div>
                    {userDetails.isAdmin && <VerifiedBadge />}
                  </div>
                )}
              </h1>

              {(userDetails.bio || isEditing) && (
                <span className="profile-bio">
                  {isEditing ? (
                    <textarea
                      value={newProfileValues?.bio}
                      onChange={(e) =>
                        setNewProfileValues({
                          name: newProfileValues?.name || '',
                          bio: e.target.value,
                          avatar: newProfileValues?.avatar,
                        })
                      }
                      maxLength={200}
                    ></textarea>
                  ) : (
                    <TextWithLinks>{userDetails.bio}</TextWithLinks>
                  )}
                </span>
              )}
            </div>

            <div className="profile-tabs">
              <Tabs>
                <Tab isActive={selectedTab === 'stats'} onClick={() => setSelectedTab('stats')}>
                  Stats
                </Tab>

                <Tab isActive={selectedTab === 'games'} onClick={() => setSelectedTab('games')}>
                  Games
                </Tab>

                <Tab isActive={selectedTab === 'maps'} onClick={() => setSelectedTab('maps')}>
                  Maps
                </Tab>

                {isThisUsersProfile() && (
                  <Tab isActive={false} onClick={() => router.push('/user/settings')}>
                    Settings
                  </Tab>
                )}
              </Tabs>
            </div>

            {selectedTab === 'stats' && userStats && (
              <div className="user-stats">
                {userStats.map((statItem) => (
                  <CountItem key={statItem.label} title={statItem.label} count={statItem.data} />
                ))}
              </div>
            )}

            {selectedTab === 'games' && (
              <>
                {userGames ? (
                  userGames.length ? (
                    <MapLeaderboard
                      removeHeader
                      leaderboard={userGames}
                      infiniteScrollCallback={getUserGames}
                      hasMore={userGamesPagination.hasMore}
                    />
                  ) : (
                    <span className="no-results-message">{userDetails.name} has not finished any games yet</span>
                  )
                ) : (
                  <SkeletonLeaderboard removeHeader />
                )}
              </>
            )}

            {selectedTab === 'maps' && (
              <>
                {userMaps ? (
                  userMaps.length ? (
                    <div className="user-maps">
                      {userMaps?.map((map, idx) => (
                        <MapPreviewCard key={idx} map={map} />
                      ))}
                    </div>
                  ) : (
                    <span className="no-results-message">{userDetails.name} has not created any maps yet</span>
                  )
                ) : (
                  <SkeletonCards numCards={2} />
                )}
              </>
            )}
          </div>
        </div>
      )}

      <AvatarPickerModal
        isOpen={avatarModalOpen}
        closeModal={() => setAvatarModalOpen(false)}
        setNewUserDetails={setNewUserDetails}
      />
    </StyledProfilePage>
  )
}

// Fixes issue where state doesnt reset when navigating to same page
ProfilePage.getInitialProps = ({ query }) => ({
  userGames: null,
  leaderboardPage: 0,
  leaderboardHasMore: true,
  key: query.id,
})

export default ProfilePage
