import styled from 'styled-components'

const StyledMobileNav = styled.div`
  height: 70px;
  width: 100%;
  border-top: 1px solid #252525;
  position: fixed;
  bottom: 0;
  z-index: 20;
  background-color: #0e0e0ee3;
  backdrop-filter: blur(15px) saturate(2);
  display: none;

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

export default StyledMobileNav
