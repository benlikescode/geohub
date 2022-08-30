import styled from 'styled-components'

const StyledCountItem = styled.div`
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
        text-transform: uppercase;
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
`

export default StyledCountItem
