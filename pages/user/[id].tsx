/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { AvatarPickerModal } from '@components/Modals'
import { SkeletonProfile } from '@components/SkeletonProfile'
import { VerifiedBadge } from '@components/VerifiedBadge'
import { CameraIcon } from '@heroicons/react/outline'
import { CogIcon, PencilAltIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { logOutUser, updateAvatar, updateBio, updateUsername } from '@redux/slices'
import StyledProfilePage from '@styles/ProfilePage.Styled'
import { MapLeaderboardType } from '@types'

import type { NextPage } from 'next'
type NewProfileValuesType = {
  name: string
  bio?: string
  avatar?: { emoji: string; color: string }
}

const ProfilePage: NextPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>(null)
  const [newProfileValues, setNewProfileValues] = useState<NewProfileValuesType>()
  const [isEditing, setIsEditing] = useState(false)
  const [userDetails, setUserDetails] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [leaderboardPage, setLeaderboardPage] = useState(0)
  const [leaderboardHasMore, setLeaderboardHasMore] = useState(true)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const user = useAppSelector((state) => state.user)
  const router = useRouter()
  const userId = router.query.id
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  const isThisUsersProfile = () => {
    return session?.user.id === userId
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })

    dispatch(logOutUser())
  }

  const fetchLeaderboard = async () => {
    const res = await mailman(`scores/user/${userId}?page=${leaderboardPage}`)

    if (res.error || !res.data) return

    setLeaderboardHasMore(res.hasMore)
    setLeaderboardData((prev) => [...(prev || []), ...res.data])
    setLeaderboardPage((prev) => prev + 1)
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

  useEffect(() => {
    if (!userId) {
      return
    }

    fetchLeaderboard()

    // If this users profile, use the cached data in redux store
    if (isThisUsersProfile()) {
      setUserDetails({ name: user.name, bio: user.bio, avatar: user.avatar, isAdmin: user.isAdmin })
      setNewProfileValues({ name: user.name, bio: user.bio, avatar: user.avatar })
      setLoading(false)
    } else {
      const fetchUserDetails = async () => {
        const res = await mailman(`users/${userId}`)
        setUserDetails(res)
        setNewProfileValues({ name: res.name, bio: res.bio, avatar: user.avatar })
        setLoading(false)
      }

      fetchUserDetails()
    }
  }, [userId])

  return (
    <StyledProfilePage isEditing={isEditing}>
      <Head title={userDetails ? userDetails.name : 'GeoHub'} />

      {loading || !leaderboardData ? (
        <SkeletonProfile />
      ) : (
        <div>
          <div className="banner-image">
            <img src="/images/backgrounds/profile-banner.png" alt="" />

            {isThisUsersProfile() && (
              <Link href={`/user/settings`}>
                <a>
                  <button>
                    <CogIcon />
                  </button>
                </a>
              </Link>
            )}
          </div>

          <div className="profile-details">
            <div className="profile-heading">
              {isEditing ? (
                <button
                  className="profile-avatar"
                  style={{ backgroundColor: newProfileValues?.avatar?.color }}
                  onClick={() => setAvatarModalOpen(true)}
                >
                  <img
                    src={`https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${newProfileValues?.avatar?.emoji}.svg`}
                    alt={`${userDetails.name}'s avatar`}
                  />
                  <div className="profile-avatar-editing-icon">
                    <CameraIcon />
                  </div>
                </button>
              ) : (
                <div className="profile-avatar" style={{ backgroundColor: userDetails.avatar?.color }}>
                  <img
                    src={`https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${userDetails.avatar?.emoji}.svg`}
                    alt={`${userDetails.name}'s avatar`}
                  />
                </div>
              )}

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
                    ></textarea>
                  ) : (
                    userDetails.bio
                  )}
                </span>
              )}

              {isThisUsersProfile() && !isEditing && (
                <div className="profile-actions">
                  <button onClick={() => setIsEditing(true)}>
                    <PencilAltIcon /> Edit Profile
                  </button>
                  <button className="logout-btn" onClick={() => handleLogout()}>
                    Logout
                  </button>
                </div>
              )}

              {isEditing && (
                <div className="profile-actions">
                  <button onClick={() => updateUserInfo()}>Save Changes</button>
                  <button className="logout-btn" onClick={() => cancelEditing()}>
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {leaderboardData.length ? (
              <MapLeaderboard
                removeHeader
                leaderboard={leaderboardData}
                infiniteScrollCallback={fetchLeaderboard}
                hasMore={leaderboardHasMore}
              />
            ) : (
              <span className="no-games-message">This user has not finished any games yet</span>
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
