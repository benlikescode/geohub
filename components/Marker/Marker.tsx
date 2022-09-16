import React, { FC } from 'react'

import { StyledMarker } from './'

const Marker = (props: any) => {
  const { color, name, id } = props
  return <div className="marker" style={{ backgroundColor: color, cursor: 'pointer' }} title={name} />
}

export default Marker
