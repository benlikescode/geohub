import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { Avatar } from '@components/System'
import {
  ArrowRightIcon,
  HeartIcon,
  HomeIcon,
  LightningBoltIcon,
  LocationMarkerIcon,
  MapIcon,
  PlayIcon,
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
        <div className="sidebarItemGrid">
          <Item text="Home" icon={<HomeIcon />} route="/" />

          <Item text="My Maps" icon={<MapIcon />} route="/my-maps" />

          <Item text="Liked Maps" icon={<HeartIcon />} route="/liked" />

          <Item text="Ongoing Games" icon={<PlayIcon />} route="/ongoing" />

          <Item text="Country Streaks" icon={<LightningBoltIcon />} route="/streaks" />

          <Item text="Daily Challenge" icon={<LocationMarkerIcon />} route="/daily-challenge" />
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

        <div className="view-more">
          <Link href="/maps">
            <a>
              <span>View all maps</span>
              <ArrowRightIcon />
            </a>
          </Link>
        </div>

        {session?.user.isAdmin && (
          <>
            <div className="view-more">
              <Link href="/admin/analytics">
                <a>Analytics</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </StyledSidebar>
  )
}

export default Sidebar
