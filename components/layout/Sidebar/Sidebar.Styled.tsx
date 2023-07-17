import styled from 'styled-components'

const StyledSidebar = styled.div`
  height: calc(100vh - var(--navbarHeight));

  .sidebar {
    width: var(--sidebarWidth);
    height: 100%;
    background-color: ${({ theme }) => theme.color.gray[900]};
    border-right: 1px solid ${({ theme }) => theme.color.gray[800]};
    z-index: 1;
    height: 100% !important;
    flex-shrink: 0 !important;
    display: grid;
    grid-template-rows: 1fr auto;

    @media (max-width: 1200px) {
      width: 60px;
    }

    @media (max-width: 600px) {
      display: none;
    }
  }

  .sidebar-scrollable {
    overflow: hidden auto;
  }

  .sidebarItemGrid {
    display: grid;
    gap: 4px;
    padding: 4px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[800]};

    @media (max-width: 1200px) {
      gap: 10px;
    }
  }

  .quickLinksSection {
    padding-top: 8px;
    //margin-bottom: 40px;
    padding-bottom: 4px;
    /* border-bottom: 1px solid ${({ theme }) => theme.color.gray[800]}; */

    /* @media (max-width: 1200px) {
      display: none;
    } */
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

    padding: 0.5rem 1rem;
    /* padding-bottom: 0.75rem; */
    color: #828080;
    font-weight: 600;
    font-size: 13px;
    padding-bottom: 8px;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  .recentMapsWrapper {
    padding: 0 4px;
    display: grid;
    gap: 4px;
    font-weight: 400;
    //transition: background-color 0.2s ease 0s, color 0.2s ease 0s;

    .recentMap {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      padding: 6px;
      color: #8b8f93;

      @media (max-width: 1200px) {
        justify-content: center;
      }

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

        @media (max-width: 1200px) {
          display: none;
        }
      }
    }

    .recent-map-skeleton {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
    }
  }

  .support-link {
    background-color: #333;
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #fff;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 5px;
    height: 40px;
    padding: 0 10px;
    font-size: 1rem;
    font-weight: 400;
    user-select: none;

    &:hover {
      background-color: #404040;
    }

    svg {
      height: 20px;
      position: relative;
      top: -1px;
    }
  }

  .sidebar-footer {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px;
    border-top: 1px solid #262626;
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 20px;

    .social-link {
      height: 20px;

      &:hover {
        svg {
          fill: #777;
        }
      }

      svg {
        height: 100%;
        fill: #555;
      }
    }
  }

  @media (max-width: 1200px) {
    .footer {
      flex-direction: column;
    }

    .support-link {
      background-color: transparent;
      border: none;
      color: #555;
      height: 20px;

      &:hover {
        background-color: transparent;
        color: #777;
      }

      svg {
        height: 24px;
      }

      span {
        display: none;
      }
    }

    .social-links {
      flex-direction: column;
    }
  }
`

export default StyledSidebar
