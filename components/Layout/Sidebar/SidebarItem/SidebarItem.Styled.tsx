import styled from 'styled-components'

type StyledProps = {
  isActive: boolean
}

const StyledSidebarItem = styled.div<StyledProps>`
  a {
    color: inherit;
    text-decoration: none;
  }

  .item {
    background-color: transparent;
    padding: 6px 0;
    margin-right: 6px;
    color: var(--color2);
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &:hover {
      color: #fff;
    }

    ${({ isActive }) => isActive && `
      color: #fff;
      font-weight: 600;
    `}
  } 
`

export default StyledSidebarItem