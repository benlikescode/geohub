import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

type StyledProps = {
  variant?: 'primary' | 'solidGray' | 'solidCustom' | 'destroy'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  backgroundColor?: string
  hoverColor?: string
  width?: string
  height?: string
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 5px;
  height: ${({ height }) => height ?? '40px'};
  width: ${({ width }) => width ?? 'fit-content'};
  padding: 0 25px;
  font-size: 1rem;
  font-weight: 400;
  user-select: none;
  position: relative;
  color: ${({ isLoading }) => isLoading && 'transparent !important'};
  flex-shrink: 0;

  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ size }) =>
    size === 'sm' &&
    `
    height: 36px;
    font-size: 16px;
    border-radius: 3px;
    padding: 0 12px;
  `}

  ${({ size }) =>
    size === 'md' &&
    `
        height: 38px;
        font-size: 15px;
        padding: 0 16px;

        .button-content {
          position: relative;
          top: 1px;
        }
    `}

  ${({ variant, disabled }) =>
    variant === 'primary' &&
    !disabled &&
    `
        background-color: var(--mediumPurple);
        color: #fff;
        min-width: 60px;

        :hover {
          background-color: var(--indigo-600);
        }
    `}

    ${({ variant, disabled }) =>
    variant === 'solidGray' &&
    !disabled &&
    `
        background-color: rgb(255, 255, 255, 0.1);
        color: #fff;

        &:hover {
          background-color: rgb(255, 255, 255, 0.15);
        }
    `}

    ${({ variant, disabled }) =>
    variant === 'destroy' &&
    !disabled &&
    `     
        color: #fff;
        background-color: #7f1d1d;
     

        &:hover {
          background-color: #991b1b;
        }
    `}

    ${({ color, backgroundColor, disabled }) =>
    color &&
    backgroundColor &&
    !disabled &&
    `
        background-color: ${backgroundColor};
        color: ${color};
    `}

    ${({ hoverColor, disabled }) =>
    hoverColor &&
    !disabled &&
    `
        :hover {
          background-color: ${hoverColor}
        }
    `}

    ${({ disabled }) =>
    disabled &&
    `
        background-color: var(--background3);
        color: var(--color2);
        cursor: not-allowed !important;
        opacity: 0.5;
    `}
`

export default StyledButton
