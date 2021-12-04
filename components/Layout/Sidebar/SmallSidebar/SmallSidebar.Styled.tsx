import styled from 'styled-components'

const StyledSmallSidebar = styled.div`
  width: 80px;
  border-right: var(--border);
  height: 100vh;
  position: fixed;
  background-color: var(--background2);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 18px;
  gap: 1.5rem;

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

  .sidebarItemGrid {
    display: grid;
    gap: 1rem;
  }
`

export default StyledSmallSidebar
