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
        gap: 12px;

        .item-text-wrapper {
          .item-text-1 {
            display: block;
            cursor: pointer;
            font-weight: 400;

            &:hover {
              text-decoration: underline;
            }
          }

          .item-text-2 {
            display: block;
            font-size: 12px;
            font-weight: 500;
            color: #999;
            margin-top: 4px;
          }
        }
      }

      .item-created-date {
        color: rgb(255, 255, 255, 0.45);
        font-weight: 400;
      }
    }
  }

  @media (max-width: 600px) {
    .analytics-group-item {
      .analytics-data {
        .item-wrapper {
          flex-direction: column;
          align-items: flex-start;
        }

        .item-created-date {
          padding-left: 45px;
          font-size: 12px;
          margin-top: 12px;
        }
      }
    }
  }
`

export default StyledListItem
