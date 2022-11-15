import styled from 'styled-components'

const StyledGameStatus = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1rem;
  border: 1px solid #0e0e0e;

  .infoSection {
    padding: 10px 25px;

    &.mapName {
      @media (max-width: 600px) {
        display: none;
      }
    }
  }

  .label {
    color: var(--color2);
    font-size: 14px;
    margin-bottom: 8px;
  }

  .value {
    &.time {
      font-family: var(--font-mono);
      font-size: 18px;
      margin-top: -4px;
    }
  }
`

export default StyledGameStatus
