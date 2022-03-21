import styled from 'styled-components'

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 55px;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: #18181b;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0px 2px rgba(0, 0, 0, 0.9);

  .logoWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--darkPurple);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 2px 6px rgba(255, 255, 255, 0.25), inset 0px -3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    height: 34px;
    width: 34px;
  }

  .leftContainer {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .navLinks {
    display: flex;
    align-items: center;
    margin-left: 3rem;
    height: 100%;
  }
  
  .rightContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1100px;
   
  }

  .rightWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
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

export default StyledNavbar
