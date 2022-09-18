import styled from 'styled-components'

type StyledProps = {
  type: 'solidPurple' | 'solidGray' | 'solidCustom' | 'ghost' | 'ghostLight' | 'icon' | 'iconRounded'
  color?: string
  backgroundColor?: string
  hoverColor?: string
  isDisabled?: boolean
  width?: string
  height?: string
  isRound?: boolean
  isSmall?: boolean
}

const StyledButton = styled.div<StyledProps>`
  width: ${({ width }) => (width ? width : 'fit-content')};
  cursor: ${({ isDisabled }) => isDisabled && 'not-allowed'};

  button {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: ${({ isRound }) => (isRound ? '20' : '5')}px;
    height: ${({ height }) => (height ? height : '40px')};
    padding: 0 25px;
    font-size: 1rem;
    font-weight: 400;
    width: 100%;
    user-select: none;

    ${({ type, isDisabled }) =>
      type === 'solidPurple' &&
      !isDisabled &&
      `
        background-color: var(--mediumPurple);
        color: #fff;

        :hover {
          background-color: #732fe9;
        }
    `}

    ${({ isSmall, isDisabled }) =>
      isSmall &&
      !isDisabled &&
      `
        height: 30px;
        font-size: 14px;
        border-radius: 3px;
        padding: 0 1rem;
    `}

    ${({ type, isDisabled }) =>
      type === 'solidGray' &&
      !isDisabled &&
      `
        background-color: rgb(255, 255, 255, 0.1);
        color: rgb(255, 255, 255, 0.7);
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 400;
        user-select: none;
        padding: 10px 16px;

        &:hover {
          background-color: rgb(255, 255, 255, 0.15);
        }
    `}

    ${({ type, isDisabled }) =>
      type === 'ghost' &&
      !isDisabled &&
      `
        background-color: transparent;
        color: #fff;
        box-shadow: 0 0 0 1px #2F3133;

        :hover {
          box-shadow: 0 0 0 2px #2F3133;
        }
    `}

    ${({ type, isDisabled }) =>
      type === 'ghostLight' &&
      !isDisabled &&
      `
        background-color: #222;
        border: 1px solid #252525;
        color: #fff;
        font-weight: 400;

        :hover {
          background-color: #252525;
        }
    `}

    ${({ type, isDisabled }) =>
      type === 'icon' &&
      !isDisabled &&
      `
        padding: 0;
        background-color: transparent;
        height: fit-content;
        width: fit-content;
    `}

    ${({ type, isDisabled }) =>
      type === 'iconRounded' &&
      !isDisabled &&
      `
      border-radius: 50%;
      background-color: #222222;
      height: 48px;
      width: 48px;
      padding: 0;
    `}

    ${({ color, backgroundColor, isDisabled }) =>
      color &&
      backgroundColor &&
      !isDisabled &&
      `
        background-color: ${backgroundColor};
        color: ${color};
    `}

    ${({ hoverColor, isDisabled }) =>
      hoverColor &&
      !isDisabled &&
      `
        :hover {
          background-color: ${hoverColor}
        }
    `}

    ${({ isDisabled }) =>
      isDisabled &&
      `
        background-color: var(--background3);
        color: var(--color2);
        pointer-events: none;
        opacity: 0.5;
    `}

    ${({ isDisabled, type }) =>
      isDisabled &&
      type === 'solidGray' &&
      `
        background-color: var(--background3);
        color: #a5a5a5;
        border: 2px solid #4e4e4e;
        border-radius: 20px;
        pointer-events: none;
        opacity: 0.5;
    `}
  }
`

export default StyledButton
