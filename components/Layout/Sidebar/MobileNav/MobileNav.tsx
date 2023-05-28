import { FC } from 'react'
import { Item } from '@components/Layout/Sidebar/Sidebar/Item'
import { HeartIcon, HomeIcon, LightningBoltIcon, LocationMarkerIcon, MapIcon } from '@heroicons/react/outline'
import { StyledMobileNav } from './'

const MobileNav: FC = () => {
  return (
    <StyledMobileNav>
      <Item text="Home" icon={<HomeIcon />} route="/" />

      <Item text="My Maps" icon={<MapIcon />} route="/my-maps" />

      <Item text="Liked Maps" icon={<HeartIcon />} route="/liked" />

      <Item text="Country Streaks" icon={<LightningBoltIcon />} route="/streaks" />

      <Item text="Daily Challenge" icon={<LocationMarkerIcon />} route="/daily-challenge" />
    </StyledMobileNav>
  )
}

export default MobileNav
