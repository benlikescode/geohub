import styled from 'styled-components'

const StyledUpdatesPage = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 600;
  }

  .text-paragraph {
    margin-top: 24px;
    color: #bababa;
    font-weight: 400;
    line-height: 20px;
  }

  a {
    text-decoration: underline;
    color: #1d9bf0;
  }

  .feedback-wrapper {
    padding: 16px;
    border-radius: 6px;
    margin-top: 60px;
    border: 1px solid #222;
    background-color: #121212;
    display: grid;
    gap: 20px;

    .voting-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        color: #dcdcdc;
        font-size: 14px;
      }

      .vote-options {
        display: flex;
        align-items: center;
        gap: 16px;

        .vote-option {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 50rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #fff;
          background-color: #222;

          &.active {
            background-color: var(--green-800);

            &.bad {
              background-color: var(--red-800);
            }
          }

          &:hover {
            background-color: var(--green-800);

            &.bad {
              background-color: var(--red-800);
            }
          }

          svg {
            height: 20px;
            color: #dcdcdc;
          }
        }
      }
    }
  }
`

export default StyledUpdatesPage
