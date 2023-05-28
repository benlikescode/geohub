import styled, { keyframes } from 'styled-components'

const check = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`

const StyledChallenge = styled.div`
  .input-label {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 10px;
    display: block;
    color: var(--color2);
  }

  .input-wrapper {
    position: relative;

    .copy-btn-wrapper {
      position: absolute;
      right: 0;
      top: 0;

      .copy-btn {
        width: 60px;
        height: 38px;
        background-color: #303030;
        color: #fff;
        border-radius: 5px;
        font-size: 14px;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          height: 20px;

          &.check {
            height: 24px;

            path {
              stroke-width: 2.2px;
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
              animation: 15s linear 0s 1 normal forwards running ${check};
            }
          }
        }
      }
    }
  }
`

export default StyledChallenge
