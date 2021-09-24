import { FC, ReactNode } from 'react'
import { StyledButton } from '.'

type Props = {
  type: 'solidGreen' | 'solidPink' | 'solidBlack' | 'solidBlue' | 'ghost' | 'icon' | 'iconRounded'
  callback?: any
  primaryColor?: string
  secondaryColor?: string
  isDisabled?: boolean
  className?: string
  children?: ReactNode
  width?: string
}

const Button: FC<Props> = ({ type, callback, primaryColor, secondaryColor, isDisabled, className, children, width }) => {
  return (
    <StyledButton type={type} primaryColor={primaryColor} secondaryColor={secondaryColor} isDisabled={isDisabled} width={width}>
      <button onClick={callback ? (e) => callback(e) : undefined} className={className}>
        {children}
      </button>
    </StyledButton>
  )
}

export default Button