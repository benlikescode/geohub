import { FC } from 'react'
import { StyledPageHeader } from './'

type Props = {
  children: string
  removeMargin?: boolean
}

const PageHeader: FC<Props> = ({ children, removeMargin }) => {
  return <StyledPageHeader removeMargin={removeMargin}>{children}</StyledPageHeader>
}

export default PageHeader
