import styled from 'styled-components'

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: var(--background3);
  border-bottom: var(--border);

  .variantWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--maxWidth);
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }

  .title {
    color: #fff;
    font-weight: 500;
    font-size: 24px;
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

  .logoWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 250px;
    padding: 0 16px;
    height: 100%;
  }

  .variantLogoWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
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
    height: 40px;
    width: 40px;
  }

  .mainSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    max-width: ${({ theme }) => theme.breakpoint.xl};
    width: 100%;
    padding: 0 3.5rem;
    margin: 0 auto;
  }
`

export default StyledNavbar
