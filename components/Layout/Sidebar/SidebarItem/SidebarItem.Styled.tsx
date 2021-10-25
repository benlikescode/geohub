import styled from 'styled-components'

type StyledProps = {
  isActive: boolean
}

const StyledSidebarItem = styled.div<StyledProps>`
  ${({ isActive }) => isActive && `
    background-color: var(--background4);
    border: 1px solid rgba(255, 255, 255, 0.03);
  `}
  
  border-radius: 3px;

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
      font-weight: 600;
    `}
  } 

  
`

export default StyledSidebarItem