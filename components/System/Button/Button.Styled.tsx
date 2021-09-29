import styled from 'styled-components'

type StyledProps = {
  type: 'solidGreen' | 'solidPink' | 'solidBlack' | 'solidBlue' | 'ghost' | 'icon' | 'iconRounded'
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
    border-radius: ${({ isRound }) => isRound ? '20' : '3'}px;
    height: 35px;
    padding: 0 25px;
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    user-select: none;

    ${({ type, isDisabled }) => 
      type === 'solidGreen' && 
      !isDisabled && `
        background-color: #047857;
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'solidPink' && 
      !isDisabled && `
        background-color: #9D174D;
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'solidBlue' && 
      !isDisabled && `
        background-color: #0072FF;
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'solidBlack' && 
      !isDisabled && `
        background-color: #000;
        color: #fff;
    `}

    ${({ type, isDisabled }) => 
      type === 'ghost' && 
      !isDisabled && `
        background-color: transparent;
        border: 1px solid #6B7280;
        
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
      border: var(--border);
      background-color: transparent;
      height: 38px;
      width: 38px;
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
        background-color: var(--gray-800);
        color: #fff;
        pointer-events: none;
        opacity: 0.5;
    `}
  }
`

export default StyledButton