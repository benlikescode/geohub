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
  padding?: string
  disabledBackground?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 5px;
  height: ${({ height }) => height ?? '40px'};
  width: ${({ width }) => width ?? 'fit-content'};
  padding: ${({ padding }) => padding ?? '0 25px'};
  font-size: 1rem;
  font-weight: 400;
  user-select: none;
  position: relative;
  color: ${({ isLoading }) => isLoading && 'transparent !important'};
  flex-shrink: 0;

  ${({ size }) =>
    size === 'md' &&
    `
    padding: 0 16px;
    font-size: 15px;
    height: 39px;
  `}

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ variant, disabled }) =>
    variant === 'primary' &&
    `
        background-color: var(--mediumPurple);
        color: #fff;

        :hover {
          background-color: var(--indigo-600);
        }
    `}

  ${({ variant, disabled }) =>
    variant === 'solidGray' &&
    `
        background-color: rgb(255, 255, 255, 0.1);
        color: #fee2e2;

        &:hover {
          background-color: rgb(255, 255, 255, 0.15);
        }
    `}

    ${({ variant, disabled }) =>
    variant === 'destroy' &&
    `     
        color: #fee2e2;
        background-color: #7f1d1d;
     
        &:hover {
          background-color: #991b1b;
        }
    `}

    ${({ color, backgroundColor, disabled }) =>
    color &&
    backgroundColor &&
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

    ${({ disabledBackground }) =>
    disabledBackground &&
    `
        background-color: var(--background3);
        color: var(--color2);
        opacity: 0.5;

        &:hover {
          background-color: inherit;
        }
    `}
`

export default StyledButton
