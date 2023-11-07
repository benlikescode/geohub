import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
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
  spinnerSize?: number
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
  spinnerSize,
  onClick,
  disabled,
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
      isLoading={isLoading}
      onClick={isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      <span className="button-content">{children}</span>

      {isLoading && (
        <div className="spinner">
          <Spinner size={spinnerSize || 20} />
        </div>
      )}
    </StyledButton>
  )
}

export default Button
