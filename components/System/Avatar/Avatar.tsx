import { FC, useState, useEffect } from 'react'
import { StyledAvatar } from '.'

type Props = {
  url: string
  size?: number
  alt?: string
  onClick?: any
  userId?: string
  outline?: boolean
}

const Avatar: FC<Props> = ({ url, size, alt, onClick, userId, outline }) => {
  const [currSrc, setCurrSrc] = useState(url || '')
  const fallback = 'https://muscathome.com/uploads/profile_images/default.png'

  useEffect(() => {
    setCurrSrc(url)
  }, [url])

  return (
    <StyledAvatar size={size} outline={outline}>
      <img src={currSrc || fallback} alt={alt} onError={() => setCurrSrc(fallback)} />       
    </StyledAvatar>
  )
}

export default Avatar