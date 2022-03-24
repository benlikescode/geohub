import styled from 'styled-components'

const StyledMobileNav = styled.div`
  height: 50px;
  width: 100%;
  border-top: 1px solid #252525;
  position: sticky;
  bottom: 0;
  z-index: 20;
  background-color: #18181b;
  display: none;

  @media (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

export default StyledMobileNav