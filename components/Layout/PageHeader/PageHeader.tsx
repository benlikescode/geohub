import React, { FC } from 'react'

import { StyledPageHeader } from './'

type Props = {
  children: string
}

const PageHeader: FC<Props> = ({ children }) => {
  return <StyledPageHeader>{children}</StyledPageHeader>
}

export default PageHeader
