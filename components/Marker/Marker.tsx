import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Avatar } from '@components/System'
import { selectUser } from '@redux/user'

import { StyledMarker } from './'

const Marker = (props: any) => {
  const { color, name, id, callback } = props
  const user = useSelector(selectUser)

  return (
    <StyledMarker>
      <Avatar size={26} type="user" src={user.avatar.emoji} backgroundColor={user.avatar.color} />
    </StyledMarker>
  )
}

export default Marker
