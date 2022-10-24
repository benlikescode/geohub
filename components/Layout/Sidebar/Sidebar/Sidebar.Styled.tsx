import styled from 'styled-components'

const StyledSidebar = styled.div`
  .sidebar {
    width: var(--sidebarWidth);
    //border-right: 1px solid #252525;
    //border-right: 1px solid #181818;
    height: 100%;
    //position: fixed;
    //background-color: var(--background2);
    //background-color: #1f1f23;
    //background-color: #141416;
    //background-color: #1a1a1c;
    background-color: #1e1e21;
    z-index: 1;
    overflow: hidden auto;
    height: 100% !important;
    flex-shrink: 0 !important;

    @media (max-width: 1200px) {
      width: 60px;
    }

    @media (max-width: 600px) {
      display: none;
    }
  }

  .sidebarItemGrid {
    display: grid;
    gap: 6px;
    padding: 1rem 0.5rem;

    @media (max-width: 1200px) {
      gap: 1.5rem;
    }
  }

  .quickLinksSection {
    padding-top: 8px;
    //margin-bottom: 40px;
    padding-bottom: 16px;
    border-top: 1px solid #303033;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  .quickLinkItemWrapper {
    padding: 4px 1rem;
    display: grid;
    gap: 15px;
    font-weight: 400;
  }

  .linkItem {
    cursor: pointer;
    color: #878d93;
    font-size: 15px;

    :hover {
      color: var(--color2);
    }
  }

  .title {
    padding: 0.5rem 1rem;
    padding-bottom: 0.75rem;
    color: #e0e0e0;
    font-weight: 500;
    font-size: 14px;
    //margin-bottom: 0.5rem;
    letter-spacing: 1px;
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

  .recentMapsWrapper {
    padding: 0 8px;
    display: grid;
    gap: 8px;
    font-weight: 400;

    .recentMap {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      padding: 4px 8px;
      color: #8b8f93;

      &:hover {
        background-color: #2a2a2f;
        color: var(--color2);
      }

      .recentMapName {
        font-size: 14px;
        position: relative;
        top: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 160px;
      }
    }

    .recent-map-skeleton {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
    }
  }
`

export default StyledSidebar
