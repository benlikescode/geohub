import styled from 'styled-components'

export const StyledAnalytics = styled.div`
  .analytics-grid {
    display: grid;
    grid-gap: 40px;
  }

  .analytics-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
    grid-gap: 20px;
  }

  .analytics-lists {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    grid-gap: 20px;
  }

  .skeleton-group-item {
    border-radius: 6px;
    width: 100%;
    background-color: rgb(255, 255, 255, 0.075);

    .skeleton-heading {
      padding: 12px 20px;
      border-bottom: 1px solid rgb(255, 255, 255, 0.075);
    }

    .skeleton-data {
      .skeleton-user-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;

        &:not(:last-child) {
          border-bottom: 1px solid rgb(255, 255, 255, 0.075);
        }

        .skeleton-user-details {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      }
    }
  }

  @media (max-width: 600px) {
    .analytics-lists {
      grid-template-columns: 1fr;
    }

    .skeleton-user-created-date {
      display: none;
    }
  }
`
