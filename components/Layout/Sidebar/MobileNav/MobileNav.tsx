import { HomeIcon, MapIcon, UsersIcon, HeartIcon, DesktopComputerIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { StyledMobileNav } from '.'
import { Item } from '@components/Layout/Sidebar/Sidebar/Item'

const MobileNav: FC = () => {
  return (
    <StyledMobileNav>
      <Item text="Home" icon={<HomeIcon />} route="/" />

      <Item text="My Maps" icon={<MapIcon />} route="/my-maps" />

      <Item text="Friends" icon={<UsersIcon />} route="/friends" />

      <Item text="Liked Maps" icon={<HeartIcon />} route="/liked" />

      <Item text="Ongoing Games" icon={<DesktopComputerIcon />} route="/ongoing" />
    </StyledMobileNav>
  )
}

export default MobileNav
