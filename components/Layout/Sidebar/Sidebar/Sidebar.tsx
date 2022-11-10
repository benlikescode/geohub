import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Avatar } from '@components/System'
import { Skeleton } from '@components/System/Skeleton'
import {
  DesktopComputerIcon,
  GlobeIcon,
  HeartIcon,
  HomeIcon,
  LocationMarkerIcon,
  MapIcon,
  PauseIcon,
  PlayIcon
} from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import { MapType } from '@types'

import { StyledSidebar } from './'
import { Item } from './Item'

const Sidebar: FC = () => {
  const [maps, setMaps] = useState<MapType[]>([])
  const [loading, setLoading] = useState(false)
  const user = useSelector(selectUser)

  useEffect(() => {
    getRecentMaps()
  }, [user.id])

  const getRecentMaps = async () => {
    setLoading(true)

    if (!user.id) {
      const { res } = await mailman(`maps/browse/popular?count=5`)

      if (!res?.error) {
        setMaps(res)
      }

      return setLoading(false)
    }

    const { res } = await mailman(`maps/recent?userId=${user.id}`)

    if (!res.error) {
      setMaps(res)
    }

    setLoading(false)
  }

  return (
    <StyledSidebar>
      <div className="sidebar">
        <div className="sidebarItemGrid">
          <Item text="Home" icon={<HomeIcon />} route="/" />

          <Item text="My Maps" icon={<MapIcon />} route="/my-maps" />

          <Item text="Liked Maps" icon={<HeartIcon />} route="/liked" />

          <Item text="Ongoing Games" icon={<PlayIcon />} route="/ongoing" />

          <Item text="Daily Challenge" icon={<LocationMarkerIcon />} route="/map/63349eb5090804522c2180b7" />

          {/*<Item text="Streaks" icon={<LightningBoltIcon />} route="/streaks" />*/}

          <Item text="Aerial" icon={<GlobeIcon />} route="/aerial" />
        </div>

        <div className="quickLinksSection">
          <div className="title">
            <span>Recently Played</span>
          </div>

          <div className="recentMapsWrapper">
            {maps?.map((map, idx) => (
              <Link key={idx} href={`/map/${map._id}`}>
                <a className="recentMap">
                  <Avatar type="map" src={map.previewImg} size={24} />
                  <span className="recentMapName">{map.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>

        {user.isAdmin && (
          <div className="quickLinksSection">
            <div className="title">
              <span>Admin</span>
            </div>

            <div className="quickLinkItemWrapper">
              <Link href="/admin/analytics">
                <a className="linkItem">
                  <span>Analytics</span>
                </a>
              </Link>

              <Link href="/admin/test">
                <a className="linkItem">
                  <span>Add Locations</span>
                </a>
              </Link>

              <Link href="/admin/create-map">
                <a className="linkItem">
                  <span>Create Map</span>
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </StyledSidebar>
  )
}

export default Sidebar
