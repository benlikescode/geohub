import styled from 'styled-components'

type StyledProps = {
  isActive?: boolean
}

const StyledBingoItem = styled.div<StyledProps>`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: var(--border);  
    height: 100%;
    width: 100%;
    color: #fff;
    background-color: var(--background2);

    ${({ isActive }) => isActive && `
      background-color: var(--mediumPurple);
      color: #fff;
      font-weight: 500;
    `}
  }

`

export default StyledBingoItem
