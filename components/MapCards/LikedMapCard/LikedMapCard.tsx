import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { MapType } from '../../../@types'
import { mailman } from '../../../backend/utils/mailman'
import { showErrorToast, showSuccessToast } from '../../../utils/helpers/showToasts'
import { StyledLikedMapCard } from './'

type Props = {
  map: Pick<MapType, '_id' | 'name' | 'description' | 'previewImg'>
  reloadMaps: (mapId: string) => void
}

const LikedMapCard: FC<Props> = ({ map, reloadMaps }) => {
  const [isHoveringLike, setIsHoveringLike] = useState(false)

  const handleUnlike = async () => {
    const res = await mailman(`likes/${map._id}`, 'DELETE')

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    showSuccessToast(res.message)
    reloadMaps(map._id as string)
  }

  return (
    <StyledLikedMapCard>
      <div className="map-avatar">
        <Image src={`/images/mapAvatars/${map.previewImg}`} layout="fill" objectFit="cover" alt="" />
        <div className="image-gradient"></div>
      </div>

      <div className="content-wrapper">
        <div className="map-name-wrapper">
          <div className="map-name">{map.name}</div>
        </div>
        <div className="play-wrapper">
          <Link href={`/map/${map._id}`}>
            <a className="map-play-btn">Play</a>
          </Link>
          <button
            className="unlike-button"
            onClick={() => handleUnlike()}
            onMouseEnter={() => setIsHoveringLike(true)}
            onMouseLeave={() => setIsHoveringLike(false)}
          >
            {isHoveringLike ? <HeartIconOutline /> : <HeartIconSolid />}
          </button>
        </div>
      </div>
    </StyledLikedMapCard>
  )
}

export default LikedMapCard
