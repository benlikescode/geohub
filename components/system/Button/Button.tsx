import { ButtonHTMLAttributes } from 'hoist-non-react-statics/node_modules/@types/react'
import { FC, ReactNode } from 'react'
import { Spinner } from '@components/system'
import { StyledButton } from './'

type Props = {
  variant?: 'primary' | 'solidGray' | 'solidCustom' | 'destroy'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  backgroundColor?: string
  hoverColor?: string
  isLoading?: boolean
  children?: ReactNode
  width?: string
  height?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<Props> = ({
  variant,
  size,
  color,
  backgroundColor,
  hoverColor,
  isLoading,
  children,
  width,
  height,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant || 'primary'}
      size={size}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      width={width}
      height={height}
      {...rest}
    >
      {isLoading ? <Spinner size={20} /> : children}
    </StyledButton>
  )
}

export default Button
