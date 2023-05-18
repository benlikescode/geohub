import Link from 'next/link'
import { FC } from 'react'
import { Icon } from '@components/System'
import {
  DesktopComputerIcon,
  HeartIcon,
  HomeIcon,
  LocationMarkerIcon,
  MapIcon,
  UsersIcon,
} from '@heroicons/react/outline'
import { StyledSmallSidebar } from './'
import { Item } from './Item'

const SmallSidebar: FC = () => {
  return (
    <StyledSmallSidebar>
      <Link href="/">
        <a>
          <div className="logoWrapper">
            <div className="logo">
              <Icon size={28} fill="#fff">
                <LocationMarkerIcon />
              </Icon>
            </div>
          </div>
        </a>
      </Link>

      <div className="sidebarItemGrid">
        <Item text="Home" icon={<HomeIcon />} route="/" />

        <Item text="My Maps" icon={<MapIcon />} route="/my-maps" />

        <Item text="Friends" icon={<UsersIcon />} route="/friends" />

        <Item text="Liked Maps" icon={<HeartIcon />} route="/liked" />

        <Item text="Ongoing Games" icon={<DesktopComputerIcon />} route="/ongoing" />
      </div>
    </StyledSmallSidebar>
  )
}

export default SmallSidebar
