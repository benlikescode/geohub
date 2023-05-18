import { FC, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { AuthModal } from '@components/Modals'
import { HeartIcon as HeartIconOutline, LocationMarkerIcon, ScaleIcon, UserIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { useAppSelector } from '@redux/hook'
import { MapType } from '@types'
import { formatLargeNumber } from '@utils/helperFunctions'
import { StyledMapStats } from './'

type Props = {
  map: MapType
  setMap: (map: MapType) => void
}

const MapStats: FC<Props> = ({ map, setMap }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isHoveringLike, setIsHoveringLike] = useState(false)
  const user = useAppSelector((state) => state.user)

  // modalOpen ? disableBodyScroll(document as any) : enableBodyScroll(document as any)

  const handleLike = async () => {
    if (!user.id) {
      return setModalOpen(true)
    }

    if (map.likes?.likedByUser === true) {
      await mailman(`likes/${map._id}`, 'DELETE')

      setMap({ ...map, likes: { likedByUser: false, numLikes: map.likes?.numLikes - 1 } })
      setIsHoveringLike(false)
    }

    if (map.likes?.likedByUser === false) {
      await mailman(`likes/${map._id}`, 'POST')
      setMap({ ...map, likes: { likedByUser: true, numLikes: map.likes?.numLikes + 1 } })
    }
  }

  return (
    <StyledMapStats isLiked={map.likes?.likedByUser}>
      <div className="stat-item">
        <div className="stat-icon">
          <ScaleIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Average Score</span>
          <span className="subLabel">{formatLargeNumber(map.avgScore || 0)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <UserIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Explorers</span>
          <span className="subLabel">{map.usersPlayed}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <LocationMarkerIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Locations</span>
          <span className="subLabel">
            {formatLargeNumber(
              (typeof map.locationCount !== 'undefined' ? map.locationCount : map.locations?.length) || 0
            )}
          </span>
        </div>
      </div>

      <div className="stat-item">
        <button
          className="likeBtn"
          onClick={() => handleLike()}
          onMouseEnter={() => setIsHoveringLike(true)}
          onMouseLeave={() => setIsHoveringLike(false)}
        >
          <div className="stat-icon">
            {map.likes?.likedByUser || isHoveringLike ? <HeartIconSolid /> : <HeartIconOutline />}
          </div>
        </button>

        <div className="textWrapper">
          <span className="mainLabel">Likes</span>
          <span className="subLabel">{map.likes?.numLikes}</span>
        </div>
      </div>

      <AuthModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
    </StyledMapStats>
  )
}

export default MapStats
