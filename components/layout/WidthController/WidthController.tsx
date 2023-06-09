import { FC, ReactNode } from 'react'
import { StyledWidthController } from './'

type Props = {
  children: ReactNode
  customWidth?: string
  mobilePadding?: string
}

const WidthController: FC<Props> = ({ children, customWidth, mobilePadding }) => {
  return (
    <StyledWidthController customWidth={customWidth} mobilePadding={mobilePadding}>
      {children}
    </StyledWidthController>
  )
}

export default WidthController
