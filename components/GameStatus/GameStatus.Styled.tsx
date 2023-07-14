import styled from 'styled-components'

const StyledGameStatus = styled.div`
  background-color: #222;
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 2;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1rem;
  border: 1px solid #282828;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  .infoSection {
    padding: 10px 25px;
  }

  .streak-section {
    padding: 10px 20px;
    padding-left: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;

    svg {
      height: 24px;
      color: #fbbf24;
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
