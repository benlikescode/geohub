import styled from 'styled-components'

type StyledProps = {}

const StyledStreakFinalResults = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;

  .streak-count {
    font-size: 20px;
    color: #a2a2a2;
    font-weight: 400;
    text-align: center;
  }

  .country-list {
    margin: 30px 0;
    border-bottom: 1px solid #333;
    padding-bottom: 16px;
  }

  .actionButtons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
`

export default StyledStreakFinalResults
