import styled from 'styled-components'

const StyledSidebar = styled.div`
  width: 250px;
  border-right: var(--border);
  height: calc(100vh - 60px);
  position: fixed;
  background-color: var(--background2);

  .sidebarItemGrid {
    display: grid;
    gap: 4px;
    padding: 15px 16px;
  }

  .quickLinksSection {
    margin-top: 10px;
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