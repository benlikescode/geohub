import { FC, ReactNode } from 'react'
import { StyledButton } from '.'

type Props = {
  type: 'solidPurple' | 'solidGray' | 'solidCustom' | 'ghost' | 'ghostLight' | 'icon' | 'iconRounded'
  callback?: any
  color?: string
  backgroundColor?: string
  isDisabled?: boolean
  className?: string
  children?: ReactNode
  width?: string
  isRound?: boolean
}

const Button: FC<Props> = ({ type, callback, color, backgroundColor, isDisabled, className, children, width, isRound }) => {
  return (
    <StyledButton type={type} color={color} backgroundColor={backgroundColor} isDisabled={isDisabled} width={width} isRound={isRound}>
      <button onClick={callback ? (e) => callback(e) : undefined} className={className}>
        {children}
      </button>
    </StyledButton>
  )
}

export default Button