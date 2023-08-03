import throttle from 'lodash/throttle'
import { useEffect, useState } from 'react'

const useBreakpoint = (breakpoint?: number) => {
  const checkIsBreakpoint = () => {
    return document.body.clientWidth <= (breakpoint || 600)
  }

  const [isBreakpoint, setIsBreakpoint] = useState(checkIsBreakpoint())

  const handleResize = throttle(() => {
    setIsBreakpoint(checkIsBreakpoint)
  }, 100)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isBreakpoint,
  }
}

export default useBreakpoint
