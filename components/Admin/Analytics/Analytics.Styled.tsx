import styled from 'styled-components'

export const StyledAnalytics = styled.div`
  display: grid;
  grid-gap: 40px;

  .analytics-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
`
