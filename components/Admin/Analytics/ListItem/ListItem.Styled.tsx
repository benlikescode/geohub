import styled from 'styled-components'

const StyledListItem = styled.div`
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
      max-height: 450px;
      overflow-y: auto;

      .item-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;

        &:hover {
          background-color: rgb(255, 255, 255, 0.05);
        }

        &:not(:last-child) {
          border-bottom: 1px solid rgb(255, 255, 255, 0.075);
        }
      }

      .item-details {
        display: flex;
        align-items: center;
        gap: 1rem;

        .item-name {
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .item-created-date {
        color: rgb(255, 255, 255, 0.45);
        font-weight: 400;
      }
    }
  }
`

export default StyledListItem
