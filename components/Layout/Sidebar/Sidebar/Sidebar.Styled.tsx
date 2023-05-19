import styled from 'styled-components'

const StyledSidebar = styled.div`
  position: sticky;
  top: var(--navbarHeight);
  height: calc(100vh - var(--navbarHeight));

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
    background-color: ${({ theme }) => theme.color.gray[900]};
    border-right: 1px solid ${({ theme }) => theme.color.gray[800]};
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
    gap: 4px;
    padding: 6px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[800]};

    @media (max-width: 1200px) {
      gap: 1.5rem;
    }
  }

  .quickLinksSection {
    padding-top: 8px;
    //margin-bottom: 40px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[800]};

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

  .view-more {
    a {
      color: #8b8b8b;
      font-weight: 400;
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 8px;
      margin: 8px;
      height: 40px;
      cursor: pointer;
      border-radius: 4px;
      user-select: none;
    }

    &:hover {
      background-color: #2a2a2f;
    }

    svg {
      height: 20px;
      width: 20px;
      margin-left: 6px;
    }
  }

  .title {
    padding: 0.5rem 1rem;
    padding-bottom: 0.75rem;
    color: #9f9f9f;
    font-weight: 600;
    font-size: 15px;
    //margin-bottom: 0.5rem;
    /* letter-spacing: 1px; */
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
    gap: 4px;
    font-weight: 400;
    //transition: background-color 0.2s ease 0s, color 0.2s ease 0s;

    .recentMap {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      padding: 8px;
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
        width: 150px;
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
