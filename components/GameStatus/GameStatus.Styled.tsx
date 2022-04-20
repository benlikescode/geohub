import styled from 'styled-components'

const StyledGameStatus = styled.div`
  background-color: var(--background1);
  border-radius: 4px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1rem;
  font-family: var(--font-family1);
  
  .infoSection {
    padding: 10px 25px;

    :not(:last-child) {
      border-right: 1px solid var(--background3);
    }
  }

  .label {
    color: var(--color2);
    font-size: 14px;
    margin-bottom: 8px;
  }
`

export default StyledGameStatus
