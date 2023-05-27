import { throttle } from 'lodash'
import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  const checkIsMobile = throttle(() => {
    setIsMobile(!!window.matchMedia('(max-width: 600px)')?.matches)
  }, 100)

  useEffect(() => {
    checkIsMobile()

    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  return {
    isMobile,
  }
}
