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
  height: ${({ height }) => height ?? '35px'};
  width: ${({ width }) => width ?? 'fit-content'};
  padding: 0 16px;
  font-size: 1rem;
  font-weight: 400;
  user-select: none;
  position: relative;
  color: ${({ isLoading }) => isLoading && 'transparent !important'};
  flex-shrink: 0;

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ size }) =>
    size === 'sm' &&
    `
        height: 30px;
        font-size: 14px;
        border-radius: 3px;
        padding: 0 16px;
    `}

  ${({ size }) =>
    size === 'md' &&
    `
        height: 36px;
        font-size: 16px;
        border-radius: 3px;
        padding: 0 12px;
    `}

    ${({ variant, disabled }) =>
    variant === 'primary' &&
    `
        background-color: var(--mediumPurple);
        color: #fff;
        min-width: 60px;
        font-size: 15px;

        :hover {
          background-color: var(--indigo-600);
        }
    `}

    ${({ variant, disabled }) =>
    variant === 'solidGray' &&
    !disabled &&
    `
        background-color: rgb(255, 255, 255, 0.1);
        background-color: #353535;
        background-color: #171717;
        background-color: #000;

        color: #dcdcdc;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 400;
        user-select: none;

        &:hover {
          background-color: rgb(255, 255, 255, 0.15);
          background-color: #424242;
          background-color: #202020;
          background-color: #0e0e0e;

        }
    `}

    ${({ variant, disabled }) =>
    variant === 'destroy' &&
    !disabled &&
    `     
        color: #fff;
        background-color: #7f1d1d;
        background-color: #181818;

     

        &:hover {
          background-color: #991b1b;
          background-color: #242424;

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
        
        cursor: not-allowed !important;
       
    `}
`

export default StyledButton
