import throttle from 'lodash/throttle'
import { useEffect, useState } from 'react'

const useIsMobile = () => {
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

export default useIsMobile
