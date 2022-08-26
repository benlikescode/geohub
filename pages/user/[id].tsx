import { PencilAltIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mailman } from '../../backend/utils/mailman'
import { Layout, LoadingPage } from '../../components/Layout'
import { logOutUser, selectUser, updateBio, updateUsername } from '../../redux/user'
import StyledProfilePage from '../../styles/ProfilePage.Styled'

const ProfilePage: NextPage = () => {
  const banner = '/images/backgrounds/prettyImage2.jpeg'
  const [newProfileValues, setNewProfileValues] = useState<{ name: string, bio?: string }>()
  const [isEditing, setIsEditing] = useState(false)
  const [userDetails, setUserDetails] = useState<any>()
  const [loading, setLoading] = useState(true)
  const user = useSelector(selectUser)
  const router = useRouter()
  const userId = router.query.id
  const dispatch = useDispatch()

  const stats = {
    bestGame: '25,000',
    completedGames: 123,
    avgScore: '12,467'
  }

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

  const updateUserInfo = async () => {
    dispatch(updateBio(newProfileValues?.bio))
    dispatch(updateUsername(newProfileValues?.name))
    setUserDetails({
      ...userDetails,
      name: newProfileValues?.name,
      bio: newProfileValues?.bio
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

    // if this users profile use the cached data in redux store
    if (isThisUsersProfile()) {
      setUserDetails({name: user.name, bio: user.bio, avatar: user.avatar})
      setNewProfileValues({name: user.name, bio: user.bio})
      setLoading(false)
    }
    else {
      const fetchUserDetails = async () => {
        const { res } = await mailman(`users/${userId}`)
        setUserDetails(res)
        setNewProfileValues({name: res.name, bio: res.bio})
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
        <div>
          <div className="banner"/>
          <div className="profile-details">
            <div className="profile-heading">
              <div className="profile-avatar">
                <img src={`/images/avatars/${userDetails.avatar}.jpg`} alt={userDetails.name}/>
              </div>
              <h1 className="profile-name">{isEditing ? <input type="text" value={newProfileValues?.name}  onChange={(e) => setNewProfileValues({name: e.target.value, bio: newProfileValues?.bio})}/> : userDetails.name}</h1>
              {(userDetails.bio || isEditing) && <span className="profile-bio">{isEditing ? <textarea value={newProfileValues?.bio} onChange={(e) => setNewProfileValues({name: newProfileValues?.name || '', bio: e.target.value})}></textarea> : userDetails.bio}</span>}
              {isThisUsersProfile() && !isEditing && (
                <div className="profile-actions">
                  <button onClick={() => setIsEditing(true)}><PencilAltIcon/> Edit Profile</button>
                  <button className="logout-btn" onClick={() => handleLogout()}>Logout</button>
                </div>               
              )}
              {isEditing && (
                <div className="profile-actions">
                  <button onClick={() => updateUserInfo()}>Save Changes</button>
                  <button className="logout-btn" onClick={() => cancelEditing()}>Cancel</button>
                </div>               
              )}
            </div>
          </div>
        </div>
      </Layout>
      {/* <section className="profileWrapper">
        <div className="userBanner">
          <img src={banner} alt="User Banner" />
        </div>

        <section className="profileTop">
          <div className="userAvatar">
            <Avatar 
              url={`/images/avatars/${userDetails.avatar}.jpg`} 
              size={120} 
              alt="User Avatar" 
              customOutline="5px solid #0f0f0f" 
            />
          </div> 

          <FlexGroup gap={10}>
            {isThisUsersProfile() && (
              <>
                <Button type="ghostLight" callback={() => handleLogout()}>Logout</Button>
                <Button type="solidPurple">Edit Profile</Button>
              </>               
            )}

            {!isThisUsersProfile() && (
              <Button type="solidPurple">Add Friend</Button>                
            )}                  
          </FlexGroup>
        </section>

        <section className="userDetails">
          <h2 className="userName">{userDetails.name} <button className="edit-btn" onClick={() => setIsEditing(true)}><PencilIcon/></button></h2>
          <span className="userBio">{userDetails.bio || 'Hey there, I am the best explorer on this application!'} <button className="edit-btn" onClick={() => setIsEditing(true)}><PencilIcon/></button></span>
        </section>

        <section className="userStats">
          <h3 className="sectionTitle">Statistics</h3>

          <div className="statRow">
            <div className="statItem">
              <div className="statContent">
                <h2 className="statResult">{stats.completedGames}</h2>
                <span className="statLabel">Games Played</span>
              </div>
            </div>

            <div className="statItem">
              <div className="statContent">
                <h2 className="statResult">{stats.bestGame}</h2>
                <span className="statLabel">Best Score</span>
              </div>
            </div>

            <div className="statItem">
              <div className="statContent">
                <h2 className="statResult">{stats.avgScore}</h2>
                <span className="statLabel">Avg. Score</span>
              </div>
            </div>
          </div>             
        </section>

        <section className="userBadges">
          <h3 className="sectionTitle">Badges</h3>

          <div className="badgesRow">
            <div className="badgeItem">
              <Avatar url="/images/mapPreviews/europe.jpg" size={70} alt="" className="badgeImg" customOutline="1px solid rgba(255, 255, 255, 0.35)"/>
              <span className="badgeLabel">First Game</span>
            </div>

            <div className="badgeItem">
              <Avatar url="/images/mapPreviews/europe.jpg" size={70} alt="" className="badgeImg" customOutline="1px solid rgba(255, 255, 255, 0.35)"/>
              <span className="badgeLabel">First Country</span>
            </div>

            <div className="badgeItem">
              <Avatar url="/images/mapPreviews/europe.jpg" size={70} alt="" className="badgeImg" customOutline="1px solid rgba(255, 255, 255, 0.35)"/>
              <span className="badgeLabel">Perfect Score</span>
            </div>

            <div className="badgeItem">
              <Avatar url="/images/mapPreviews/europe.jpg" size={70} alt="" className="badgeImg" customOutline="1px solid rgba(255, 255, 255, 0.35)"/>
              <span className="badgeLabel">Perfect Game</span>
            </div>
         
            <div className="badgeItem">
              <Avatar url="/images/mapPreviews/europe.jpg" size={70} alt="" className="badgeImg" customOutline="1px solid rgba(255, 255, 255, 0.35)"/>
              <span className="badgeLabel">Challenge Win</span>
            </div>
         
            <div className="badgeItem">
              <Avatar url="/images/mapPreviews/europe.jpg" size={70} alt="" className="badgeImg" customOutline="1px solid rgba(255, 255, 255, 0.35)"/>
              <span className="badgeLabel">Perfect Game</span>
            </div>       
          </div>
        </section>  
      </section>           */}
    </StyledProfilePage>
  )
}

export default ProfilePage
