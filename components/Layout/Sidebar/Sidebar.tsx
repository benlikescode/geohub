import React, { FC } from 'react'
import { StyledSidebar } from '.'
import { SidebarItem } from './SidebarItem'
import { ChatIcon, DesktopComputerIcon, HeartIcon, HomeIcon, MapIcon, UserCircleIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/outline'
import Link from 'next/link'

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
          text="My Maps"
          icon={<MapIcon />}
          route="/liked"
        />

        <SidebarItem 
          text="Friends"
          icon={<UsersIcon />}
          route="/friends"
        />

        <SidebarItem 
          text="Liked Maps"
          icon={<HeartIcon />}
          route="/liked"
        />
 
        <SidebarItem 
          text="Ongoing Games"
          icon={<DesktopComputerIcon />}
          route="/unfinished-games"
        />
   
      </div>

      <div className="quickLinksSection">
        <div className="title">
          <span>Quick Play</span>
        </div>

        <div className="quickLinkItemWrapper">
          <div className="linkItem">
            <span>Classic Game</span>
          </div>

          <div className="linkItem">
            <span>Battle Royale</span>
          </div>

          <div className="linkItem">
            <span>Streaks</span>
          </div>

          <div className="linkItem">
            <span>Challenges</span>
          </div>

          <Link href="/bingo">
            <a className="linkItem">
              <span>Geo-Bingo</span>
            </a>
          </Link>

          <Link href="/puzzles">
            <a className="linkItem">
              <span>Puzzles</span>
            </a>
          </Link>    
        </div>
      </div>

      <div className="quickLinksSection">
        <div className="title">
          <span>Learn</span>
        </div>

        <div className="quickLinkItemWrapper">
          <div className="linkItem">
            <span>Capitals</span>
          </div>

          <div className="linkItem">
            <span>Flags</span>
          </div>

          <div className="linkItem">
            <span>History</span>
          </div>

          <div className="linkItem">
            <span>License Plates</span>
          </div>

          <div className="linkItem">
            <span>Languages</span>
          </div>

          <div className="linkItem">
            <span>Bollards</span>
          </div>

          <div className="linkItem">
            <span>Area Codes</span>
          </div>
        </div>
      </div>

      {
        /*
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
        */
      }   
    </StyledSidebar>
  )
}

export default Sidebar