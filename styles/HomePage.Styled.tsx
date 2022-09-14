import styled from 'styled-components'

const StyledHomePage = styled.div`
  .mapPreviewSection {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    z-index: 1;

    @media (max-width: 1350px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 850px) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  .bannerContent {
    z-index: 1;
  }

  .bannerTitle {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 44px;
    color: #e0e0e0;

    @media (max-width: 1200px) {
      font-size: 2.2rem;
      max-width: 500px;
    }
  }

  .tipWrapper {
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: rgba(255, 255, 255, 0.8);
    margin: 1rem 0;
    max-width: 500px;

    @media (max-width: 1200px) {
      font-size: 1rem;
      max-width: 100%;
    }
  }

  .pillsWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .badgesTitle {
    color: var(--mediumPurple);
    font-size: 32px;
    font-weight: 600;
  }

  .badgesWrapper {
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    gap: 10px;
    margin-top: 30px;
  }

  .viewAll {
    display: flex;
    align-items: center;
    background: transparent;
    color: #0ea5e9;
    cursor: pointer;
  }

  .gamemodesWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;

    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
`

export default StyledHomePage
