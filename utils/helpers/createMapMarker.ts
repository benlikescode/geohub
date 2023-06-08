import { LocationType } from '../../@types'

const createMapMarker = (position: LocationType, map: google.maps.Map, markerImage: string, markerSize?: number) => {
  const size = markerSize !== undefined ? markerSize : 30

  return new window.google.maps.Marker({
    position: position,
    map: map,
    icon: {
      url: markerImage,
      scaledSize: new google.maps.Size(size, size),
    },
  })
}

export default createMapMarker
