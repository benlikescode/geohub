import styled from 'styled-components'

type StyledProps = {
  atTop?: boolean
}

const StyledNavbar2 = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  height: 76px;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: ${({ atTop }) => atTop ? 'transparent' : '#171718'};
  transition: 0.1s ease-in;
  box-shadow: ${({ atTop }) => !atTop && '0px 4px 4px 0px rgba(0, 0, 0, 0.35)'};
  
  .mainSection {
    max-width: ${({ theme }) => theme.breakpoint.l};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 0 3.5rem;
    margin: 0 auto;
  }

  .rightWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    justify-content: flex-end;
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .username {
    color: #BEC3C9;
    font-size: 18px;
  }
  
`

export default StyledNavbar2
