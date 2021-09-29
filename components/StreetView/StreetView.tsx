import { FC } from 'react'
import { StyledStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'

type Props = {
  location: LocationType
  zoom: number
}

const Map: FC<Props> = ({ location, zoom }) => {

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
    libraries: 'places'
  }

  const handleApiLoaded = (map: any, maps: any) => {
    var sv = new maps.StreetViewService()
    var panorama = new maps.StreetViewPanorama(
      document.getElementById('map'), {     
        disableDefaultUI: true, 
      }
    )
    sv.getPanorama({location: location, radius: 50}, processSVData)

    function processSVData(data: any, status: any) {
        var marker = new maps.Marker({
            position: data.location.latLng,
            map: map,
            title: data.location.description
        });
        panorama.setPano(data.location.pano)
        panorama.setPov({
            heading: 270,
            pitch: 0
        });
        panorama.setVisible(true)
    }
  };

  return (
    <StyledStreetView>
      <div id="map"></div>
      <GoogleMapReact 
        bootstrapURLKeys={GoogleMapConfig}
        defaultCenter={location} 
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </StyledStreetView>
  )
}

export default Map
