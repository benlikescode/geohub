import styled from 'styled-components'

const StyledMapStats = styled.div`
  background-color: #171717;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 30px 30px 30px 180px;
  clip-path: polygon(20% 0,0 100%,100% 100%,100% 0);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 44px;  
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

  .likeBtn {
    background-color: transparent;
    height: fit-content;
    width: fit-content;
  }
  
`

export default StyledMapStats
