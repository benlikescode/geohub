import { ButtonHTMLAttributes, FC, ReactNode, useEffect, useState } from 'react'
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
  const [showSpinner, setshowSpinner] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setshowSpinner(true)
    }

    // Show spinner a bit longer to avoid flash
    if (!isLoading && showSpinner) {
      const timeout = setTimeout(() => {
        setshowSpinner(false)
      }, 300)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [isLoading, showSpinner])

  return (
    <StyledButton
      variant={variant || 'primary'}
      size={size}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      width={width}
      height={height}
      showSpinner={showSpinner}
      {...rest}
    >
      {children}

      {showSpinner && (
        <div className="spinner">
          <Spinner size={20} />
        </div>
      )}
    </StyledButton>
  )
}

export default Button
