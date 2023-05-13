import { FC, ReactNode } from 'react'
import { Spinner } from '@components/System'
import { StyledButton } from './'

type Props = {
  type: 'solidPurple' | 'solidGray' | 'solidCustom' | 'ghost' | 'ghostLight' | 'icon' | 'iconRounded' | 'destroy'
  size?: 'sm' | 'md' | 'lg'
  callback?: any
  color?: string
  backgroundColor?: string
  hoverColor?: string
  isDisabled?: boolean
  className?: string
  children?: ReactNode
  width?: string
  height?: string
  isRound?: boolean
  loading?: boolean
}

const Button: FC<Props> = ({
  type,
  size,
  callback,
  color,
  backgroundColor,
  hoverColor,
  isDisabled,
  className,
  children,
  width,
  height,
  isRound,
  loading,
}) => {
  return (
    <StyledButton
      type={type}
      size={size}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      isDisabled={isDisabled}
      width={width}
      height={height}
      isRound={isRound}
    >
      <button onClick={callback ? (e) => callback(e) : undefined} className={className}>
        {loading ? <Spinner size={20} /> : children}
      </button>
    </StyledButton>
  )
}

export default Button
