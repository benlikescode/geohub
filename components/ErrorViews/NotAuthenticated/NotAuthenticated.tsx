import DefaultErrorPage from 'next/error'
import React, { FC } from 'react'

import { StyledNotAuthenticated } from './'

type Props = {}

const NotAuthenticated: FC<Props> = ({}) => {
  return <DefaultErrorPage statusCode={401} />
}

export default NotAuthenticated
