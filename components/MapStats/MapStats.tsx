import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Auth, Modal } from '@components/Modals'
import { FlexGroup, Icon } from '@components/System'
import {
  LocationMarkerIcon,
  ScaleIcon,
  UserIcon
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { selectUser } from '@redux/user'
import { MapType } from '@types'

import { StyledMapStats } from './'

type Props = {
  map: MapType
}

const MapStats: FC<Props> = ({ map }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [numLikes, setNumLikes] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const user = useSelector(selectUser)

  modalOpen ? disableBodyScroll(document as any) : enableBodyScroll(document as any)

  const handleLike = async () => {
    if (!user.id) {
      return setModalOpen(true)
    }

    if (isLiked) {
      const { res } = await mailman(`likes/${map.slug}?userId=${user.id}`, 'DELETE')
      setIsLiked(false)
      setNumLikes(numLikes - 1)
    } else {
      const data = { mapId: map.slug, userId: user.id }
      const { res } = await mailman(`likes`, 'POST', JSON.stringify(data))
      setIsLiked(true)
      setNumLikes(numLikes + 1)
    }
  }

  const fetchLikes = async () => {
    const { res } = await mailman(`likes/${map.slug}?userId=${user.id}`)
    setIsLiked(res.likedByUser === 1)
    setNumLikes(res.numLikes)
  }

  useEffect(() => {
    if (!map.slug) return

    fetchLikes()
  }, [map.slug])

  return (
    <StyledMapStats>
      <div className="statsGrid">
        <div className="stat-item">
          <Icon size={30} fill="var(--lightPurple)">
            <ScaleIcon />
          </Icon>
          <div className="textWrapper">
            <span className="mainLabel">Avg. Score</span>
            <span className="subLabel">{map.avgScore}</span>
          </div>
        </div>

        <div className="stat-item">
          <Icon size={30} fill="var(--lightPurple)">
            <UserIcon />
          </Icon>
          <div className="textWrapper">
            <span className="mainLabel">Explorers</span>
            <span className="subLabel">{map.usersPlayed}</span>
          </div>
        </div>

        <div className="stat-item">
          <Icon size={30} fill="var(--lightPurple)">
            <LocationMarkerIcon />
          </Icon>
          <div className="textWrapper">
            <span className="mainLabel">Locations</span>
            <span className="subLabel">{map.locationCount}</span>
          </div>
        </div>

        <div className="stat-item">
          <button className="likeBtn" onClick={() => handleLike()}>
            <Icon size={30} fill={isLiked ? 'var(--red-500)' : 'var(--lightPurple)'} hoverColor="var(--red-500)">
              <HeartIcon />
            </Icon>
          </button>

          <div className="textWrapper">
            <span className="mainLabel">Likes</span>
            <span className="subLabel">{numLikes}</span>
          </div>
        </div>

        {modalOpen && <Auth closeModal={() => setModalOpen(false)} />}
      </div>
    </StyledMapStats>
  )
}

export default MapStats
