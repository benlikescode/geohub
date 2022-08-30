import React, { FC } from 'react'
import { StyledNotAuthenticated } from '.'
import DefaultErrorPage from 'next/error'

type Props = {}

const NotAuthenticated: FC<Props> = ({}) => {
  return <DefaultErrorPage statusCode={401} />
}

export default NotAuthenticated
