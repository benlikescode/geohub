import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Avatar } from '@components/System'
import { selectUser } from '@redux/user'

import { StyledMarker } from './'

const Marker = (props: any) => {
  const { color, name, id, callback } = props
  const user = useSelector(selectUser)

  return (
    <StyledMarker onClick={() => console.log('marker clicked')}>
      <Avatar size={26} type="user" src={user.avatar.emoji} backgroundColor={'#ceffdb'} />
    </StyledMarker>
  )
}

export default Marker
