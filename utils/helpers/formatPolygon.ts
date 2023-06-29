const formatPolygon = (coordinates: any[], properties: Object = {}, geometryType: string = 'Polygon') => {
  return {
    type: 'Feature',
    properties,
    geometry: { type: geometryType, coordinates },
  }
}

export default formatPolygon
