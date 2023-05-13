import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

type StyledProps = {
  variant?: 'primary' | 'solidGray' | 'solidCustom' | 'ghost' | 'ghostLight' | 'icon' | 'iconRounded' | 'destroy'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  backgroundColor?: string
  hoverColor?: string
  width?: string
  height?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled.button<StyledProps>`
  display: flex;
  position: relative;
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
        color: #fee2e2;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 400;
        user-select: none;

        &:hover {
          background-color: rgb(255, 255, 255, 0.15);
        }
    `}

    ${({ variant, disabled }) =>
    variant === 'destroy' &&
    !disabled &&
    `     
        color: #fee2e2;
        background-color: #7f1d1d;
     

        &:hover {
          background-color: #991b1b;
        }
    `}

    ${({ variant, disabled }) =>
    variant === 'ghost' &&
    !disabled &&
    `
        background-color: transparent;
        color: #fff;
        box-shadow: 0 0 0 1px #2F3133;

        :hover {
          box-shadow: 0 0 0 2px #2F3133;
        }
    `}

    ${({ variant, disabled }) =>
    variant === 'ghostLight' &&
    !disabled &&
    `
        background-color: #222;
        border: 1px solid #252525;
        color: #fff;
        font-weight: 400;

        :hover {
          background-color: #252525;
        }
    `}
    // To Deprecate
    ${({ variant, disabled }) =>
    variant === 'icon' &&
    !disabled &&
    `
        padding: 0;
        background-color: transparent;
        height: fit-content;
        width: fit-content;
    `}

    ${({ variant, disabled }) =>
    variant === 'iconRounded' &&
    !disabled &&
    `
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.6);
      height: 48px;
      width: 48px;
      padding: 0;
      border: 1px solid rgba(255, 255, 255, 0.15);

      :hover {
          background-color: rgba(0, 0, 0, 0.75);
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
