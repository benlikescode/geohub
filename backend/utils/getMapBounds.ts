import bbox from '@turf/bbox'
import { featureCollection, point } from '@turf/helpers'
import { LocationType } from '@types'

const getMapBounds = (locations: LocationType[]) => {
  // Format locations for turfJS
  const coordinates = locations.map((x) => [x.lng, x.lat])
  const points = coordinates.map((coord) => point(coord))

  // Get bounding box around map's locations
  const fc = featureCollection(points)
  const box = bbox(fc)

  // Get the distance between the two bounding points
  const min = { lat: box[1], lng: box[0] }
  const max = { lat: box[3], lng: box[2] }

  return { min, max }
}

export default getMapBounds
