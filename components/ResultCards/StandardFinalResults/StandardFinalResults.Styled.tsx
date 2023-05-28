import styled from 'styled-components'

type StyledProps = {
  showPoints?: boolean
}

const StyledStandardFinalResults = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;

  .points-wrapper {
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
    letter-spacing: 1px;
    color: #ababab;

    @media (max-width: 600px) {
      font-size: 18px;
    }
  }

  .progress-bar {
    margin-top: 10px;
    margin-bottom: 16px;
    max-width: 525px;
    width: 100%;
  }

  .finished-message {
    font-size: 16px;
    color: #808080;
    margin-bottom: 30px;

    @media (max-width: 600px) {
      font-size: 14px;
      text-align: center;
    }
  }

  .secondary-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    height: 40px;
    padding: 0 25px;
    user-select: none;
    background-color: #222;
    border: 1px solid #252525;
    color: #fff;
    font-weight: 400;

    :hover {
      background-color: #252525;
    }
  }
`

export default StyledStandardFinalResults
