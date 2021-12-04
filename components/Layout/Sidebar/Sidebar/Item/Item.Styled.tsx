import styled from 'styled-components'

type StyledProps = {
  isActive: boolean
}

const StyledItem = styled.div<StyledProps>`
  border-radius: 3px;

  ${({ isActive }) => isActive && `
    background-color: var(--background4);
  `}
  
  a {
    color: inherit;
    text-decoration: none;
  }

  .item {
    background-color: transparent;
    padding: 6px 8px;
    margin-right: 6px;
    color: #8B8F93;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    width: 100%;

    ${({ isActive }) => isActive && `
      color: var(--color2);
    `}

    :hover {
      color: var(--color2);
    }
  }  

  .itemText {
    margin-top: 1px;
  }
`

export default StyledItem