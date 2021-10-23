import styled from 'styled-components'

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  height: 68px;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: var(--background3);
  border-bottom: var(--border);

  .title {
    color: #fff;
    font-weight: 500;
    font-size: 24px;
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

  .logoWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 250px;
    padding: 0 16px;
    height: 100%;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--darkPurple);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 2px 6px rgba(255, 255, 255, 0.25), inset 0px -3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    height: 45px;
    width: 45px;
  }

  .mainSection {
    width: calc(100% - 250px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--maxWidth);
    margin: 0 auto;
  }
`

export default StyledNavbar
