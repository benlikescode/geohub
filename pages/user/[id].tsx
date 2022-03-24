import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { mailman } from '../../backend/utils/mailman'
import { Layout, LoadingPage } from '../../components/Layout'
import { Avatar, Button, FlexGroup } from '../../components/System'
import { selectUser } from '../../redux/user'
import StyledProfilePage from '../../styles/ProfilePage.Styled'

const ProfilePage: NextPage = () => {
  const banner = '/images/backgrounds/prettyImage2.jpeg'
  const userBio = 'Hey there, I am the best explorer on this application!'
  const [userDetails, setUserDetails] = useState<any>()
  const [loading, setLoading] = useState(true)
  const user = useSelector(selectUser)
  const router = useRouter()
  const userId = router.query.id

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
  
  useEffect(() => {
    // if this users profile use the cached data in redux store
    if (isThisUsersProfile()) {
      setUserDetails({name: user.name, avatar: user.avatar})
      setLoading(false)
    }
    else {
      const fetchUserDetails = async () => {
        const { res } = await mailman(`users/${userId}`)
        setUserDetails(res)
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
      <Layout maxWidth="1000px">
        <section className="profileWrapper">
          <div className="userBanner">
            <img src={banner} alt="User Banner" />
          </div>

          <section className="profileTop">
            <div className="userAvatar">
              <Avatar url={`/images/avatars/${userDetails.avatar}.jpg`} size={120} alt="User Avatar" customOutline="5px solid #171718" />
            </div> 

            <FlexGroup gap={10}>
              {isThisUsersProfile() ?
                <Button type="solidPurple">Edit Profile</Button> :
                <Button type="solidPurple">Add Friend</Button>                
              }                  
            </FlexGroup>
          </section>

          <section className="userDetails">
            <h2 className="userName">{userDetails.name}</h2>
            <span className="userBio">{userBio}</span>
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
        </section>          
      </Layout>
    </StyledProfilePage>
  )
}

export default ProfilePage
