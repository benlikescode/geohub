import { FC, useEffect } from 'react'
import { StyledTestComp } from './'

type Props = {
  googleMap: google.maps.Map
  // googleMapRef: any
}

const resetGoogleMap = (googleMap: google.maps.Map) => {
  googleMap.setCenter({ lat: 0, lng: 0 })
  googleMap.setZoom(2)
}

const TestComp: FC<Props> = ({ googleMap }) => {
  useEffect(() => {
    resetGoogleMap(googleMap)

    const sv = document.getElementById('streetview-map')
    sv?.append(googleMap.getDiv())
  }, [])

  return (
    <StyledTestComp>
      <div id="streetview-map" style={{ height: '200px', width: '300px' }}></div>
    </StyledTestComp>
  )
}

export default TestComp
