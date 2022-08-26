import styled from 'styled-components'

export const StyledAnalytics = styled.div`
  .analytics-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
    
    .analytics-group-item {
      border-radius: 6px;
      width: 100%;
      background-color: rgb(255, 255, 255, 0.075);

      .analytics-heading {
        padding: 12px 20px;
        border-bottom: 1px solid rgb(255, 255, 255, 0.075);
        
        .analytics-heading-title {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05rem;
          color: rgb(255, 255, 255, 0.45);
        }
      }

      .analytics-data {
        padding: 20px;

        .analytics-amount {
          font-size: 32px;
          font-weight: 400;
        }
      }
    }
  }
`