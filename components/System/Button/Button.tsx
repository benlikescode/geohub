import { FC, ReactNode } from 'react'

import { Spinner } from '@components/System'

import { StyledButton } from './'

type Props = {
  type: 'solidPurple' | 'solidGray' | 'solidCustom' | 'ghost' | 'ghostLight' | 'icon' | 'iconRounded'
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
  isSmall?: boolean
  loading?: boolean
}

const Button: FC<Props> = ({
  type,
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
  isSmall,
  loading,
}) => {
  return (
    <StyledButton
      type={type}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      isDisabled={isDisabled}
      width={width}
      height={height}
      isRound={isRound}
      isSmall={isSmall}
    >
      <button onClick={callback ? (e) => callback(e) : undefined} className={className}>
        {children}
        {loading && <Spinner size={20} />}
      </button>
    </StyledButton>
  )
}

export default Button
