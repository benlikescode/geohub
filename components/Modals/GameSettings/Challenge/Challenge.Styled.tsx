import styled from 'styled-components'

const StyledChallenge = styled.div`
  display: grid;
  gap: 40px;

  .inputWrapper {
    display: flex;
    align-items: center;
  }

  .copyBtn {
    width: 60px;
    height: 38px;
    background-color: #303030;
    color: #fee2e2;
    border-radius: 5px;
    margin-left: -40px;
    font-size: 14px;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 22px;
    }
  }

  .inputLabel {
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 10px;
    display: block;
    color: var(--color2);
  }
`

export default StyledChallenge
