import styled from 'styled-components'

const StyledMapStats = styled.div`
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-left: 1pxsolidrgba (255, 255, 255, 0.1);

  align-items: center;

  justify-content: center;
  height: 100%;

  padding: 20px;
  padding-top: 10px;

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
    grid-template-columns: repeat(4, 1fr);
    column-gap: 40px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 940px) {
      grid-template-columns: 1fr 1fr;
    }

    .stat-item {
      display: flex;

      align-items: center;
      gap: 8px;

      padding: 12px 14px;
      background: #ffffff0a;
      border-radius: 6px;
      flex-shrink: 0;

      box-sizing: border-box;
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
