import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Layout, LoadingPage } from '@components/Layout'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { BadgeCheckIcon, PencilAltIcon } from '@heroicons/react/solid'
import { logOutUser, selectUser, updateBio, updateUsername } from '@redux/user'
import StyledProfilePage from '@styles/ProfilePage.Styled'
import { MapLeaderboardType } from '@types'

import type { NextPage } from 'next'
const ProfilePage: NextPage = () => {
  const banner = '/images/backgrounds/prettyImage2.jpeg'
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()
  const [newProfileValues, setNewProfileValues] = useState<{ name: string; bio?: string }>()
  const [isEditing, setIsEditing] = useState(false)
  const [userDetails, setUserDetails] = useState<any>()
  const [loading, setLoading] = useState(true)
  const user = useSelector(selectUser)
  const router = useRouter()
  const userId = router.query.id
  const dispatch = useDispatch()

  const isThisUsersProfile = () => {
    if (!user.id) {
      return false
    }

    return user.id === userId
  }

  const handleLogout = () => {
    router.push('/login')

    dispatch(logOutUser())
  }

  const fetchLeaderboard = async () => {
    const { status, res } = await mailman(`scores/user/${userId}`)

    if (status === 404 || status === 500) {
      return setLeaderboardData(null)
    }

    setLeaderboardData(res)
  }

  const updateUserInfo = async () => {
    dispatch(updateBio(newProfileValues?.bio))
    dispatch(updateUsername(newProfileValues?.name))
    setUserDetails({
      ...userDetails,
      name: newProfileValues?.name,
      bio: newProfileValues?.bio,
    })
    setIsEditing(false)

    await mailman('users/update', 'POST', JSON.stringify({ _id: user.id, ...newProfileValues }))
  }

  const cancelEditing = () => {
    setNewProfileValues({ name: userDetails.name, bio: userDetails.bio })
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
      setNewProfileValues({ name: user.name, bio: user.bio })
      setLoading(false)
    } else {
      const fetchUserDetails = async () => {
        const { res } = await mailman(`users/${userId}`)
        setUserDetails(res)
        setNewProfileValues({ name: res.name, bio: res.bio })
        setLoading(false)
      }

      fetchUserDetails()
    }
  }, [userId])

  if (loading) {
    return <LoadingPage />
  }

  return (
    <StyledProfilePage>
      <Layout>
        <Head title={userDetails.name} />
        <div>
          <div className="banner"></div>
          <div className="profile-details">
            <div className="profile-heading">
              <div className="profile-avatar">
                <img src={`/images/avatars/${userDetails.avatar}.jpg`} alt={userDetails.name} />
              </div>
              <h1 className="profile-name">
                {isEditing ? (
                  <input
                    type="text"
                    value={newProfileValues?.name}
                    onChange={(e) => setNewProfileValues({ name: e.target.value, bio: newProfileValues?.bio })}
                  />
                ) : (
                  <div className="name-container">
                    {userDetails.name}
                    {userDetails.isAdmin && (
                      <div className="verified">
                        <BadgeCheckIcon />
                      </div>
                    )}
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
            {leaderboardData && <MapLeaderboard removeHeader leaderboard={leaderboardData} />}
          </div>
        </div>
      </Layout>
    </StyledProfilePage>
  )
}

export default ProfilePage
