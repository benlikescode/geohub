import { LocationMarkerIcon, ScaleIcon, UserIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledMapStats } from '.'
import { mailman } from '../../backend/utils/mailman'
import { selectUser } from '../../redux/user'
import { MapType } from '../../types'
import { Auth } from '../Modals/Auth'
import { Modal } from '../Modals/Modal'
import { FlexGroup, Icon } from '../System'

type Props = {
  map: MapType
}

const MapStats: FC<Props> = ({ map }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [numLikes, setNumLikes] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const user = useSelector(selectUser)

  const handleLike = async () => {
    if (!user.id) {
      return setModalOpen(true)
    }

    if (isLiked) {
      const { res } = await mailman(`likes/${map.slug}?userId=${user.id}`, 'DELETE')
      setIsLiked(false)
      setNumLikes(numLikes - 1)
    }
    else {
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
        <FlexGroup>
          <Icon size={30} fill="var(--lightPurple)">
            <ScaleIcon />
          </Icon>
          <div className="textWrapper">
            <span className="mainLabel">Avg. Score</span>
            <span className="subLabel">{map.avgScore}</span>
          </div>
        </FlexGroup>

        <FlexGroup>
          <Icon size={30} fill="var(--lightPurple)">
            <UserIcon />
          </Icon>
          <div className="textWrapper">
            <span className="mainLabel">Explorers</span>
            <span className="subLabel">{map.usersPlayed}</span>
          </div>
        </FlexGroup>

        <FlexGroup>
          <Icon size={30} fill="var(--lightPurple)">
            <LocationMarkerIcon />
          </Icon>
          <div className="textWrapper">
            <span className="mainLabel">Locations</span>
            <span className="subLabel">
              {map.locationCount}
            </span>
          </div>
        </FlexGroup>

        <FlexGroup>
          <button className="likeBtn" onClick={() => handleLike()}>
            <Icon size={30} fill={isLiked ? 'var(--red-500)' : 'var(--lightPurple)'} hoverColor="var(--red-500)">
              <HeartIcon />
            </Icon>
          </button>
        
          <div className="textWrapper">
            <span className="mainLabel">Likes</span>
            <span className="subLabel">{numLikes}</span>
          </div>
        </FlexGroup>

        {modalOpen &&
          <Modal closeModal={() => setModalOpen(false)} width="450px">
            <Auth closeModal={() => setModalOpen(false)} />
          </Modal>
        }
      </div>
    </StyledMapStats>
  )
}

export default MapStats
