import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateGuessMapSize } from '@redux/slices'
import { getGuessMapSize } from '@utils/helpers'

const useGuessMap = () => {
  const [mapHeight, setMapHeight] = useState(15) // height in vh
  const [mapWidth, setMapWidth] = useState(15) // width in vw
  const [hovering, setHovering] = useState(false)
  const [isPinned, setIsPinned] = useState(false)

  const hoverDelay = useRef<any>()

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleMapHover = () => {
    clearInterval(hoverDelay.current)
    setHovering(true)

    const { width, height } = getGuessMapSize(user.guessMapSize as number)
    setMapHeight(height)
    setMapWidth(width)
  }

  const handleMapLeave = () => {
    if (isPinned) return

    hoverDelay.current = setTimeout(() => {
      setHovering(false)
      setMapHeight(15)
      setMapWidth(15)
    }, 700)
  }

  const changeMapSize = (change: 'increase' | 'decrease') => {
    let newMapSize = 1

    if (change === 'increase' && (user.guessMapSize as number) < 4) {
      newMapSize = (user.guessMapSize as number) + 1
    } else if (change === 'decrease' && (user.guessMapSize as number) > 1) {
      newMapSize = (user.guessMapSize as number) - 1
    }

    const { width, height } = getGuessMapSize(newMapSize)

    setMapHeight(height)
    setMapWidth(width)

    dispatch(updateGuessMapSize({ guessMapSize: newMapSize }))
  }

  return {
    mapHeight,
    mapWidth,
    hovering,
    isPinned,
    setMapHeight,
    setMapWidth,
    setHovering,
    setIsPinned,
    handleMapHover,
    handleMapLeave,
    changeMapSize,
  }
}

export default useGuessMap
