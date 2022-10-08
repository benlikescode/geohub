import styled from 'styled-components'

const StyledChallenge = styled.div`
  .inputLabel {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 10px;
    display: block;
    color: var(--color2);
  }

  .inputWrapper {
    position: relative;

    .copyBtnWrapper {
      position: absolute;
      right: 0;
      top: 0;

      .copyBtn {
        width: 60px;
        height: 38px;
        background-color: #303030;
        color: #fee2e2;
        border-radius: 5px;
        font-size: 14px;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          height: 22px;
        }
      }
    }
  }
`

export default StyledChallenge
