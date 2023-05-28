import styled from 'styled-components'

const StyledSidebar = styled.div`
  height: calc(100vh - var(--navbarHeight));

  .sidebar {
    width: var(--sidebarWidth);
    height: 100%;
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

  .sidebar-item-grid {
    display: grid;
    gap: 4px;
    padding: 4px;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[800]};

    @media (max-width: 1200px) {
      gap: 10px;
    }
  }

  .quick-links-section {
    padding-top: 8px;
    padding-bottom: 4px;
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

  .recent-maps-wrapper {
    padding: 0 4px;
    display: grid;
    gap: 4px;
    font-weight: 400;

    .recent-map {
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

      .recent-map-name {
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
  }
`

export default StyledSidebar
