import { LocationMarkerIcon, HomeIcon, MapIcon, UsersIcon, HeartIcon, DesktopComputerIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC } from 'react'
import { StyledSidebar } from '.'
import { Icon } from '../../../System'
import { Item } from './Item'

const Sidebar: FC = () => {
  return (
    <StyledSidebar>
      <Link href="/">
        <a>
          <div className="logoWrapper">
            <div className="logo">
              <Icon size={28} fill="#fff">
                <LocationMarkerIcon />
              </Icon>
            </div>
            <h2 className="appTitle">GeoHub</h2>
          </div>
        </a>          
      </Link>

      <div className="sidebarItemGrid">
        <Item 
          text="Home"
          icon={<HomeIcon />}
          route="/"
        />

        <Item 
          text="My Maps"
          icon={<MapIcon />}
          route="/my-maps"
        />

        <Item 
          text="Friends"
          icon={<UsersIcon />}
          route="/friends"
        />

        <Item 
          text="Liked Maps"
          icon={<HeartIcon />}
          route="/liked"
        />
 
        <Item 
          text="Ongoing Games"
          icon={<DesktopComputerIcon />}
          route="/ongoing"
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
        </div>
      </div> 
    </StyledSidebar>
  )
}

export default Sidebar
