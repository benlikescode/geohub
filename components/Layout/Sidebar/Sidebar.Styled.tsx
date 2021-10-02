import styled from 'styled-components'

const StyledSidebar = styled.div`
  width: 250px;
  border-right: var(--border);
  height: calc(100vh - 60px);
  position: fixed;

  .sidebarItemGrid {
    display: grid;
    gap: 4px;
    padding: 15px 0;
    padding-left: 25px;
  }

  .playSection {
    margin-top: 40px;
  }

  .playItemsWrapper {
    padding-left: 25px;
    display: grid;
    gap: 12px;
    font-weight: 400;
    margin-top: 10px;
  }

  .playItem {
    cursor: pointer;
  }

  .title {
    border-bottom: var(--border);
    padding: 5px 25px;
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