import styled from 'styled-components'

const StyledSidebar = styled.div`
  width: 250px;
  border-right: var(--border);
  height: 100vh;
  position: fixed;
  background-color: var(--background2);

  .logoWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 18px 16px;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--darkPurple);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 2px 6px rgba(255, 255, 255, 0.25), inset 0px -3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    height: 38px;
    width: 38px;
  }

  .appTitle {
    color: #fff;
    font-weight: 500;
    font-size: 24px;
  }

  .sidebarItemGrid {
    display: grid;
    gap: 6px;
    padding: 8px 16px;
  }

  .quickLinksSection {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .quickLinkItemWrapper {
    padding-left: 25px;
    display: grid;
    gap: 15px;
    font-weight: 400;
  }

  .linkItem {
    cursor: pointer;
    color: #878D93;

    :hover {
      color: var(--color2);
    }
  }

  .title {
    padding: 20px 25px;
    color: #B6BEC7;
    font-weight: 600;
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 25px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: var(--border);
  }
  
`

export default StyledSidebar
