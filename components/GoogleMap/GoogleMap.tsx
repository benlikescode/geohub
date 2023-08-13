import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import user from '@backend/models/user'
import { Marker } from '@components/Marker'
import { useAppSelector } from '@redux/hook'
import { GoogleMapsConfigType } from '@types'
import { GUESS_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { getMapsKey } from '@utils/helpers'
import { StyledGoogleMap } from './'

type Props = {
  googleMapsConfig: GoogleMapsConfigType | undefined
  setGoogleMapsConfig: (googleMapsConfig: GoogleMapsConfigType) => void
  type: 'guessMap' | 'resultMap' | 'finalResultMap'
}

// Experiment to make an "all in one" map component
const GoogleMap: FC<Props> = ({ googleMapsConfig, setGoogleMapsConfig, type }) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const user = useAppSelector((state) => state.user)

  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([])

  return (
    <StyledGoogleMap>
      <div className="map" ref={mapRef}>
        <GoogleMapReact
          bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
          defaultCenter={{ lat: 0, lng: 0 }}
          defaultZoom={1}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => setGoogleMapsConfig({ isLoaded: true, map, mapsApi: maps })}
          options={GUESS_MAP_OPTIONS}
        >
          {markers.map((marker, idx) => (
            <Marker
              key={idx}
              lat={marker.lat}
              lng={marker.lng}
              type="guess"
              userAvatar={user.avatar}
              isFinalResults={false}
            />
          ))}
        </GoogleMapReact>
      </div>
    </StyledGoogleMap>
  )
}

export default GoogleMap
