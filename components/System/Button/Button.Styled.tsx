import styled from 'styled-components'

type StyledProps = {
  type: 'solidPurple' | 'ghost' | 'ghostLight' | 'icon' | 'iconRounded'
  primaryColor?: string
  secondaryColor?: string
  isDisabled?: boolean
  width?: string
  isRound?: boolean
}

const StyledButton = styled.div<StyledProps>`
  width: ${({ width }) => width ? width : 'fit-content'};
  cursor: ${({ isDisabled }) => isDisabled && 'not-allowed'};
  
  button {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: ${({ isRound }) => isRound ? '20' : '5'}px;
    height: 40px;
    padding: 0 25px;
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    user-select: none;

    ${({ type, isDisabled }) => 
      type === 'solidPurple' && 
      !isDisabled && `
        background-color: var(--mediumPurple);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.19);

        :hover {
          background-color: #703FFF;
        }
    `}

    ${({ type, isDisabled }) => 
      type === 'ghost' && 
      !isDisabled && `
        background-color: transparent;
        color: #fff;
        box-shadow: 0 0 0 1px #2F3133;

        :hover {
          box-shadow: 0 0 0 2px #2F3133;
        }
    `}

    ${({ type, isDisabled }) => 
      type === 'ghostLight' && 
      !isDisabled && `
        background-color: transparent;
        border: var(--borderLight);
        color: #fff;
        font-weight: 400;
    `}

    ${({ type, isDisabled }) => 
      type === 'icon' && 
      !isDisabled && `
        padding: 0;
        background-color: transparent;
        height: fit-content;
        width: fit-content;
    `}

    ${({ type, isDisabled }) => 
    type === 'iconRounded' && 
    !isDisabled && `
      border-radius: 50%;
      background-color: var(--background1);
      height: 40px;
      width: 40px;
      padding: 0;
    `}

    ${({ primaryColor, secondaryColor, isDisabled }) => 
      primaryColor && 
      secondaryColor && 
      !isDisabled && `
        background-color: ${ primaryColor };
        color: ${ secondaryColor };
    `}

    ${({ isDisabled }) => 
      isDisabled && `
        background-color: var(--background3);
        color: var(--color2);
        pointer-events: none;
        opacity: 0.5;
    `}
  }
`

export default StyledButton