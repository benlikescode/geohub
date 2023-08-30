/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CountItem } from '@components/Admin/Analytics/CountItem'
import { Head } from '@components/Head'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { AvatarPickerModal } from '@components/modals'
import { SkeletonCards, SkeletonLeaderboard, SkeletonProfile } from '@components/skeletons'
import { Tab, Tabs } from '@components/system'
import { VerifiedBadge } from '@components/VerifiedBadge'
import { CameraIcon } from '@heroicons/react/outline'
import { PencilAltIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { logOutUser, updateAvatar, updateBio, updateUsername } from '@redux/slices'
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
type ProfileTabs = 'stats' | 'games' | 'maps' | 'settings' | 'challenges'

const ProfilePage: NextPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<UserGameHistoryType[] | null>(null)
  const [newProfileValues, setNewProfileValues] = useState<NewProfileValuesType>()
  const [isEditing, setIsEditing] = useState(false)
  const [userDetails, setUserDetails] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [leaderboardPage, setLeaderboardPage] = useState(0)
  const [leaderboardHasMore, setLeaderboardHasMore] = useState(true)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState<ProfileTabs>('stats')
  const [usersMaps, setUsersMaps] = useState<MapType[]>()
  const [usersStats, setUsersStats] = useState<UserStatsType>()

  const user = useAppSelector((state) => state.user)
  const router = useRouter()
  const userId = router.query.id
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  useEffect(() => {
    if (!userId) {
      return
    }

    fetchUserDetails()
  }, [userId])

  useEffect(() => {
    if (selectedTab === 'stats' && !usersStats) {
      getUsersStats()
    }

    if (selectedTab === 'games' && !leaderboardData) {
      fetchLeaderboard()
    }

    if (selectedTab === 'maps' && !usersMaps) {
      getUsersMaps()
    }
  }, [selectedTab])

  const fetchUserDetails = async () => {
    const res = await mailman(`users/${userId}`)

    setUserDetails(res)
    setNewProfileValues({ name: res.name, bio: res.bio, avatar: user.avatar })
    setLoading(false)
  }

  const fetchLeaderboard = async () => {
    const res = await mailman(`scores/user/${userId}?page=${leaderboardPage}`)

    if (res.error || !res.data) return

    setLeaderboardHasMore(res.hasMore)
    setLeaderboardData((prev) => [...(prev || []), ...res.data])
    setLeaderboardPage((prev) => prev + 1)
  }

  const getUsersMaps = async () => {
    const res = await mailman(`maps/custom?userId=${userId}`)

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setUsersMaps(res)
  }

  const getUsersStats = async () => {
    const res = await mailman(`users/stats?userId=${userId}`)

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setUsersStats(res)
  }

  const isThisUsersProfile = () => {
    return session?.user.id === userId
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })

    dispatch(logOutUser())
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

      {loading || !usersStats ? (
        <SkeletonProfile />
      ) : (
        <div>
          <div className="banner-image">
            <Image src="/images/backgrounds/profile-banner.png" alt="" layout="fill" quality={100} />

            {isThisUsersProfile() && (
              <Link href={`/user/settings`}>
                <a>
                  <button className="settings-button">
                    <CameraIcon />
                  </button>
                </a>
              </Link>
            )}
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
                    {/* <button className="logout-btn" onClick={() => handleLogout()}>
                      Logout
                    </button> */}
                  </div>
                )}

                {isThisUsersProfile() && isEditing && (
                  <div className="profile-actions">
                    <button onClick={() => updateUserInfo()}>Save Changes</button>
                    <button className="logout-btn" onClick={() => cancelEditing()}>
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
                    userDetails.bio
                  )}
                </span>
              )}
            </div>

            <div className="profile-tabs">
              <Tabs>
                <Tab isActive={selectedTab === 'stats'} onClick={() => setSelectedTab('stats')}>
                  <div className="filter-tab">
                    <span>Stats</span>
                  </div>
                </Tab>

                <Tab isActive={selectedTab === 'games'} onClick={() => setSelectedTab('games')}>
                  <div className="filter-tab">
                    <span>Games</span>
                  </div>
                </Tab>

                <Tab isActive={selectedTab === 'maps'} onClick={() => setSelectedTab('maps')}>
                  <div className="filter-tab">
                    <span>Maps</span>
                  </div>
                </Tab>

                {isThisUsersProfile() && (
                  <Tab isActive={selectedTab === 'settings'} onClick={() => router.push('/user/settings')}>
                    <div className="filter-tab">
                      <span>Settings</span>
                    </div>
                  </Tab>
                )}
              </Tabs>
            </div>

            {selectedTab === 'stats' && usersStats && (
              <div className="users-stats">
                {usersStats.map((statItem) => (
                  <CountItem key={statItem.label} title={statItem.label} count={statItem.data} />
                ))}
              </div>
            )}

            {selectedTab === 'games' && (
              <>
                {leaderboardData ? (
                  leaderboardData.length ? (
                    <MapLeaderboard
                      removeHeader
                      leaderboard={leaderboardData}
                      infiniteScrollCallback={fetchLeaderboard}
                      hasMore={leaderboardHasMore}
                    />
                  ) : (
                    <span className="no-games-message">{userDetails.name} has not finished any games yet</span>
                  )
                ) : (
                  <SkeletonLeaderboard removeHeader />
                )}
              </>
            )}

            {selectedTab === 'maps' && (
              <>
                {usersMaps ? (
                  usersMaps.length ? (
                    <div className="users-maps">
                      {usersMaps?.map((map, idx) => (
                        <MapPreviewCard key={idx} map={map} />
                      ))}
                    </div>
                  ) : (
                    <span className="no-games-message">{userDetails.name} has not created any maps yet</span>
                  )
                ) : (
                  <SkeletonCards />
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
  leaderboardData: null,
  leaderboardPage: 0,
  leaderboardHasMore: true,
  key: query.id,
})

export default ProfilePage
