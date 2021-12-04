import type { NextPage } from 'next'
import React from 'react'
import { Layout } from '../../components/Layout'
import { Navbar2 } from '../../components/Layout/Navbar2'
import { Avatar, Button } from '../../components/System'
import StyledProfilePage from '../../styles/ProfilePage.Styled'

const ProfilePage: NextPage = () => {
  const banner = '/images/backgrounds/profileBanner1.jpeg'
  const avatar = '/images/mapPreviews/CanadaMap.jpg'
  const userName = 'BenZ'
  const userBio = 'Hey there, I am the best explorer on this application!'

  const stats = {
    bestGame: 25000,
    completedGames: 123,
    avgScore: 12467
  }

  return (
    <StyledProfilePage>
      <Layout>
        <section>
          <Navbar2 />

          <main>
            <section className="profileWrapper">
              <div className="userBanner">
                <img src={banner} alt="User Banner" />
              </div>

              <section className="profileTop">
                <div className="userAvatar">
                  <Avatar url={avatar} size={135} alt="User Avatar" customOutline="4px solid #171718" />
                </div> 

                <div className="buttonsWrapper">
                  <Button type="solidPurple">Add Friend</Button>                        
                </div>  
              </section>

              <section className="userDetails">
                <h2 className="userName">{userName}</h2>
                <span className="userBio">{userBio}</span>
              </section>

              <section className="userStats">
                <h3 className="sectionTitle">Statistics</h3>

                <div className="statRow">
                  <div className="statItem">
                    <div className="statContent">
                      <h2 className="statResult">{stats.completedGames}</h2>
                      <span className="statLabel">Completed Games</span>
                    </div>
                  </div>

                  <div className="statItem">
                    <div className="statContent">
                      <h2 className="statResult">{stats.bestGame}</h2>
                      <span className="statLabel">Best Game</span>
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
                    <Avatar url="/images/mapPreviews/Europe.jpg" size={80} alt="" customOutline="3px solid #fff"/>
                    <span className="badgeLabel">First Game</span>
                  </div>

                  <div className="badgeItem">
                    <Avatar url="/images/mapPreviews/Europe.jpg" size={80} alt="" customOutline="3px solid #fff"/>
                    <span className="badgeLabel">First Country</span>
                  </div>

                  <div className="badgeItem">
                    <Avatar url="/images/mapPreviews/Europe.jpg" size={80} alt="" customOutline="3px solid #fff"/>
                    <span className="badgeLabel">Perfect Score</span>
                  </div>

                  <div className="badgeItem">
                    <Avatar url="/images/mapPreviews/Europe.jpg" size={80} alt="" customOutline="3px solid #fff"/>
                    <span className="badgeLabel">Perfect Game</span>
                  </div>

                  <div className="badgeItem">
                    <Avatar url="/images/mapPreviews/Europe.jpg" size={80} alt="" customOutline="3px solid #fff"/>
                    <span className="badgeLabel">Bingo Win</span>
                  </div>

                  <div className="badgeItem">
                    <Avatar url="/images/mapPreviews/Europe.jpg" size={80} alt="" customOutline="3px solid #fff"/>
                    <span className="badgeLabel">Puzzle Win</span>
                  </div>

                  <div className="badgeItem">
                    <Avatar url="/images/mapPreviews/Europe.jpg" size={80} alt="" customOutline="3px solid #fff"/>
                    <span className="badgeLabel">Know Your Area</span>
                  </div>

                  <div className="badgeItem">
                    <Avatar url="/images/mapPreviews/Europe.jpg" size={80} alt="" customOutline="3px solid #fff"/>
                    <span className="badgeLabel">Know Your Area</span>
                  </div>             
                </div>
              </section>  
            </section>      
          </main> 
        </section>          
      </Layout>
    </StyledProfilePage>
  )
}

export default ProfilePage
