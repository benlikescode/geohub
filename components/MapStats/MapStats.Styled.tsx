import styled from 'styled-components'

const StyledMapStats = styled.div`
  background-color: var(--background2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 80px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 40px;
  margin-bottom: 50px;

  .textWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .mainLabel {
    color: var(--color2);
  }

  .subLabel {
    color: var(--color3);
    font-weight: 400;
    font-size: 14px;
  }
  
`

export default StyledMapStats
