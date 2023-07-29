import throttle from 'lodash/throttle'
import { useEffect, useState } from 'react'

const useBreakpoint = (breakpoint?: string) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  const checkBreakpoint = throttle(() => {
    setIsBreakpoint(!!window.matchMedia(`(max-width: ${breakpoint || '600px'})`)?.matches)
  }, 100)

  useEffect(() => {
    checkBreakpoint()

    window.addEventListener('resize', checkBreakpoint)

    return () => {
      window.removeEventListener('resize', checkBreakpoint)
    }
  }, [])

  return {
    isBreakpoint,
  }
}

export default useBreakpoint
