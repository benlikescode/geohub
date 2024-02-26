import styled, { keyframes } from 'styled-components'

const check = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`

const StyledDailyChallengePage = styled.div`
  .daily-challenge-wrapper {
    display: grid;
    gap: 1rem;

    .mapDetailsSection {
      background-color: var(--background2);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;

      @media (max-width: 1200px) {
        flex-direction: column;
      }

      @media (max-width: 600px) {
        border-radius: 0;
        border: none;
        background-color: transparent;
      }

      .mapDescriptionWrapper {
        width: 100%;

        .descriptionColumnWrapper {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          width: 100%;

          @media (max-width: 600px) {
            flex-direction: column;
          }

          .play-button {
            width: 148px;
            height: 52px;
            padding: 0;

            @media (max-width: 600px) {
              width: 100%;
              margin-top: 35px;
            }

            .completed-wrapper {
              display: flex;
              align-items: center;
              gap: 6px;

              .completed-text {
                font-weight: 400;
                font-size: 14px;

                @media (max-width: 600px) {
                  font-size: 16px;
                }
              }

              .completed-check {
                height: 32px;
                width: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--indigo-800);
                border: 1px solid rgba(255, 255, 255, 0.12);

                svg {
                  height: 20px;
                  color: #fff;

                  path {
                    stroke-width: 2.2px;
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: 30s linear 0s 1 normal forwards running ${check};
                  }
                }
              }
            }
          }

          .descriptionColumn {
            display: flex;
            align-items: center;

            .map-details {
              margin-left: 16px;
              margin-top: 2px;
              display: grid;
              gap: 8px;

              .name-container {
                display: flex;
                align-items: center;

                .name-wrapper {
                  display: grid;

                  .name {
                    font-size: 22px;
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    @media (max-width: 800px) {
                      font-size: 18px;
                    }
                  }
                }
              }

              .description {
                color: var(--color3);
                font-weight: 400;

                @media (max-width: 1000px) {
                  display: none;
                }
              }
            }
          }
        }
      }

      .statsWrapper {
        display: contents;
      }
    }
  }
`

export default StyledDailyChallengePage
