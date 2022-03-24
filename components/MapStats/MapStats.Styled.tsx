import styled from 'styled-components'

const StyledMapStats = styled.div`
  background-color: #171718;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 2rem;

  @media (max-width: 1200px) {
    padding: 2rem 0 2rem 3rem;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-top-right-radius: 0;
    border-bottom-left-radius: 12px;
  }

  @media (max-width: 1050px) {
    padding: 2rem 0 2rem 1rem;
  }

  @media (max-width: 600px) {
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .statsGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 44px;  
    width: 100%;
    
    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 940px) {
      grid-template-columns: 1fr 1fr;
    }
  }

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
