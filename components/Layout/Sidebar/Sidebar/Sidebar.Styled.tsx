import styled from 'styled-components'

const StyledSidebar = styled.div`
  width: 230px;
  border-right: 1px solid #252525;
  height: 100%;
  position: fixed;
  background-color: var(--background2);
  //background-color: #1f1f23;
  z-index: 1;

  @media (max-width: 1000px) {
    width: 185px;
  }

  @media (max-width: 800px) {
    width: 57px;
  }

  .sidebarItemGrid {
    display: grid;
    gap: 0.5rem;
    padding: 1rem 0.5rem;

    @media (max-width: 800px) {
      gap: 1.5rem;
    }
  }

  .quickLinksSection {
    margin-top: 20px;
    margin-bottom: 40px;

    @media (max-width: 800px) {
      display: none;
    }
  }

  .quickLinkItemWrapper {
    padding-left: 1rem;
    display: grid;
    gap: 15px;
    font-weight: 400;
  }

  .linkItem {
    cursor: pointer;
    color: #878D93;
    font-size: 15px;

    :hover {
      color: var(--color2);
    }
  }

  .title {
    padding: 0.5rem 1rem;
    color: #e0e0e0;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    border-bottom: 1px solid #272727;
    margin-bottom: 0.5rem;
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
