import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { Avatar } from '@components/System'
import {
  ArrowRightIcon,
  ChartPieIcon,
  HeartIcon,
  HomeIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
  MapIcon,
  PlayIcon,
  ViewGridIcon,
} from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateRecentlyPlayed } from '@redux/slices'
import { MapType } from '@types'
import { StyledSidebar } from './'
import { Item } from './Item'

const Sidebar: FC = () => {
  const [maps, setMaps] = useState<MapType[]>([])
  const user = useAppSelector((state) => state.user)
  const { data: session } = useSession()
  const dispatch = useAppDispatch()

  useEffect(() => {
    getRecentMaps()
  }, [user.id])

  const getRecentMaps = async () => {
    if (user.recentlyPlayed?.length > 0) {
      return setMaps(user.recentlyPlayed)
    }

    if (!user.id) {
      const res = await mailman(`maps/browse/popular?count=5`)

      if (!res?.error) {
        dispatch(updateRecentlyPlayed({ recentlyPlayed: res }))
        return setMaps(res)
      }
    }

    const res = await mailman(`maps/recent`)

    if (!res?.error) {
      dispatch(updateRecentlyPlayed({ recentlyPlayed: res }))
      setMaps(res)
    }
  }

  return (
    <StyledSidebar>
      <div className="sidebar">
        <div className="sidebar-item-grid">
          <Item text="Home" icon={<HomeIcon />} route="/" />

          <Item text="My Maps" icon={<MapIcon />} route="/my-maps" />

          <Item text="Liked Maps" icon={<HeartIcon />} route="/liked" />

          <Item text="Find Maps" icon={<ViewGridIcon />} route="/maps" />

          <Item text="Ongoing Games" icon={<PlayIcon />} route="/ongoing" />

          <Item text="Country Streaks" icon={<LightningBoltIcon />} route="/streaks" />

          <Item text="Daily Challenge" icon={<LocationMarkerIcon />} route="/daily-challenge" />

          {session?.user.isAdmin && <Item text="Analytics" icon={<ChartPieIcon />} route="/admin/analytics" />}
        </div>

        <div className="quick-links-section">
          <div className="recent-maps-wrapper">
            {maps?.map((map, idx) => (
              <Link key={idx} href={`/map/${map._id}`}>
                <a className="recent-map">
                  <Avatar type="map" src={map.previewImg} size={28} />
                  <span className="recent-map-name">{map.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </StyledSidebar>
  )
}

export default Sidebar
