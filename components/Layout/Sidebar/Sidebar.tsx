import React, { FC } from 'react'
import { StyledSidebar } from '.'
import { SidebarItem } from './SidebarItem'
import { AcademicCapIcon, ChatIcon, HeartIcon, HomeIcon, UserCircleIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import { Button, Icon, Avatar } from '../../System'

const Sidebar: FC = () => {

  return (
    <StyledSidebar>
      <div className="sidebarItemGrid">
        <SidebarItem 
          text="Home"
          icon={<HomeIcon />}
          route="/"
        />
        <SidebarItem 
          text="Learn"
          icon={<AcademicCapIcon />}
          route="/learn"
        />
        <SidebarItem 
          text="Threads"
          icon={<ChatIcon />}
          route="/threads"
        />
        <SidebarItem 
          text="Liked Maps"
          icon={<HeartIcon />}
          route="/liked"
        />
        <SidebarItem 
          text="Clans"
          icon={<UserGroupIcon />}
          route="/clans"
        />
        <SidebarItem 
          text="Friends"
          icon={<UsersIcon />}
          route="/friends"
        />
        <SidebarItem 
          text="Profile"
          icon={<UserCircleIcon />}
          route="/user"
        />
      </div>

      <div className="playSection">
        <div className="title">
          <span>Quick Play</span>
        </div>

        <div className="playItemsWrapper">
          <div className="playItem">
            <span>Classic Game</span>
          </div>

          <div className="playItem">
            <span>Battle Royale</span>
          </div>

          <div className="playItem">
            <span>Streaks</span>
          </div>

          <div className="playItem">
            <span>Challenges</span>
          </div>

          <div className="playItem">
            <span>Hide and Guess</span>
          </div>

          <div className="playItem">
            <span>Geo-Bingo</span>
          </div>

          <div className="playItem">
            <span>Puzzles</span>
          </div>
        </div>
      </div>

      <div className="footer">
       <Icon size={24}>
         <img src="/images/socials/twitch.svg" alt="Twitch" />
       </Icon>

       <Icon size={24}>
         <img src="/images/socials/youtube.svg" alt="Youtube" />
       </Icon>

       <Icon size={24}>
         <img src="/images/socials/twitter.svg" alt="Twitter" />
       </Icon>
      </div>
    </StyledSidebar>
  )
}

export default Sidebar