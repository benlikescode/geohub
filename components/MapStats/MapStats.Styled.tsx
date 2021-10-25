import styled from 'styled-components'

const StyledMapStats = styled.div`
  background-color: #171717;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 30px 0 30px 180px;
  clip-path: polygon(20% 0,0 100%,100% 100%,100% 0);
  width: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 100%;
  

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
