import Image from 'next/image'
import { FC, ImgHTMLAttributes } from 'react'
import { MAP_AVATAR_PATH, USER_AVATAR_PATH } from '@utils/constants/random'
import { StyledAvatar } from './'

type Props = {
  type: 'user' | 'map'
  size?: number
  backgroundColor?: string
} & ImgHTMLAttributes<HTMLDivElement>

const Avatar: FC<Props> = ({ type, size, backgroundColor, src, alt, className, ...rest }) => {
  if (type === 'user') {
    return (
      <StyledAvatar size={size || 32} backgroundColor={backgroundColor} {...rest}>
        <div className={className ?? 'user-avatar'}>
          <Image src={`${USER_AVATAR_PATH}/${src}.svg`} alt={alt || 'User Avatar'} layout="fill" className="emoji" />
        </div>
      </StyledAvatar>
    )
  }

  return (
    <StyledAvatar size={size || 32} {...rest}>
      <div className="map-avatar">
        <Image
          src={`${MAP_AVATAR_PATH}/${src}`}
          alt={alt || 'Map Avatar'}
          layout="fill"
          objectFit="cover"
          sizes="200px"
        />
      </div>
    </StyledAvatar>
  )
}

export default Avatar
