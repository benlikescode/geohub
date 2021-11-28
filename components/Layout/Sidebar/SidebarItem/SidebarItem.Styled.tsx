import styled from 'styled-components'

type StyledProps = {
  isActive: boolean
}

const StyledSidebarItem = styled.div<StyledProps>`
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
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    width: 100%;

    ${({ isActive }) => isActive && `
      color: var(--color2);
    `}

    :hover {
      color: var(--color2);
    }
  }  
`

export default StyledSidebarItem