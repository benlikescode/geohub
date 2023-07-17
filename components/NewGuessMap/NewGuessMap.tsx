import { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@components/system'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateGuessMapSize } from '@redux/slices'
import { LocationType } from '@types'
import { USER_AVATAR_PATH } from '@utils/constants/random'
import { createMapMarker, getGuessMapSize } from '@utils/helpers'
import { StyledNewGuessMap } from './'

type Props = {
  currGuess: LocationType | null
  setCurrGuess: any
  mobileMapOpen?: boolean
  closeMobileMap: () => void
  handleSubmitGuess: () => void
  googleMap: google.maps.Map
}

const NewGuessMap: FC<Props> = ({
  currGuess,
  setCurrGuess,
  mobileMapOpen,
  closeMobileMap,
  handleSubmitGuess,
  googleMap,
}) => {
  const [mapHeight, setMapHeight] = useState(15) // height in vh
  const [mapWidth, setMapWidth] = useState(15) // width in vw
  const [hovering, setHovering] = useState(false)

  const dispatch = useAppDispatch()
  const hoverDelay = useRef<any>()
  const user = useAppSelector((state) => state.user)

  const markers = useRef<google.maps.Marker[]>([])

  const removeMarkers = () => markers.current.map((x) => x.setMap(null))

  useEffect(() => {
    const mapDiv = document.getElementById('guess-map')

    mapDiv?.append(googleMap.getDiv())

    googleMap.addListener('click', (e: google.maps.MapMouseEvent) => {
      const { latLng } = e

      if (!latLng) return

      const clickedLocation = { lat: latLng.lat(), lng: latLng.lng() }
      setCurrGuess(clickedLocation)

      removeMarkers()

      const newMarker = createMapMarker(clickedLocation, googleMap, `${USER_AVATAR_PATH}/${user.avatar.emoji}.svg`, 32)
      markers.current.push(newMarker)
    })
  }, [])

  const handleMapHover = () => {
    clearInterval(hoverDelay.current)
    setHovering(true)

    const { width, height } = getGuessMapSize(user.guessMapSize as number)
    setMapHeight(height)
    setMapWidth(width)
  }

  const handleMapLeave = () => {
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

  return (
    <StyledNewGuessMap mapHeight={mapHeight} mapWidth={mapWidth} mobileMapOpen={mobileMapOpen}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
        {hovering && (
          <div className="controls">
            <button
              className={`controlBtn increase ${user.guessMapSize === 4 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('increase')}
              disabled={user.guessMapSize === 4}
            >
              <ArrowRightIcon />
            </button>

            <button
              className={`controlBtn decrease ${user.guessMapSize === 1 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('decrease')}
              disabled={user.guessMapSize === 1}
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}

        <div id="guess-map"></div>

        <button className="close-map-button" onClick={closeMobileMap}>
          <XIcon />
        </button>

        <div className="submit-button-wrapper">
          <Button width="100%" disabled={currGuess === null} onClick={() => handleSubmitGuess()}>
            Submit Guess
          </Button>
        </div>
      </div>
    </StyledNewGuessMap>
  )
}

export default NewGuessMap
