import { FC, useState, useEffect } from 'react'
import { StyledAvatar } from '.'
import Image from 'next/image'

type Props = {
  url: string
  size?: number
  alt?: string
  onClick?: any
  userId?: string
  outline?: boolean
  customOutline?: string
}

const Avatar: FC<Props> = ({ url, size, alt, onClick, userId, outline, customOutline }) => {
  const [currSrc, setCurrSrc] = useState(url || '')
  const fallback = '/images/avatars/fallback.png'

  useEffect(() => {
    setCurrSrc(url)
  }, [url])

  return (
    <StyledAvatar size={size} outline={outline} customOutline={customOutline}>
      <Image 
        src={currSrc || fallback} 
        height={size || 32} 
        width={size || 32} 
        objectFit="cover"
        alt={alt} 
        onError={() => setCurrSrc(fallback)}
      />
    </StyledAvatar>
  )
}

export default Avatar