/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react'

import { StyledAvatar } from './'

type Props = {
  type: 'user' | 'map'
  src: string | undefined
  backgroundColor?: string
  size?: number
  mobileSize?: number
  altText?: string
  outlineSize?: number
}

const FALLBACK_AVATAR = '/images/avatars/fallback.png'

const getUserAvatarUrl = (emojiCode: string | undefined) => {
  if (!emojiCode) {
    return FALLBACK_AVATAR
  }
  return `https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${emojiCode}.svg`
}

const Avatar: FC<Props> = ({ type, src, backgroundColor, size, mobileSize, altText, outlineSize }) => {
  const [currSrc, setCurrSrc] = useState(type === 'user' ? getUserAvatarUrl(src) : src)

  useEffect(() => {
    setCurrSrc(type === 'user' ? getUserAvatarUrl(src) : src)
  }, [src, type])

  if (type === 'user') {
    return (
      <StyledAvatar
        backgroundColor={backgroundColor}
        size={size || 32}
        mobileSize={mobileSize}
        outlineSize={outlineSize}
      >
        <div className="user-avatar">
          <img
            src={currSrc || FALLBACK_AVATAR}
            alt={altText || 'User Avatar'}
            onError={() => setCurrSrc(FALLBACK_AVATAR)}
          />
        </div>
      </StyledAvatar>
    )
  }

  return (
    <StyledAvatar backgroundColor={backgroundColor} size={size || 32} mobileSize={mobileSize} outlineSize={outlineSize}>
      <div className="map-avatar">
        <img
          src={currSrc || FALLBACK_AVATAR}
          alt={altText || 'User Avatar'}
          onError={() => setCurrSrc(FALLBACK_AVATAR)}
        />
      </div>
    </StyledAvatar>
  )
}

export default Avatar
