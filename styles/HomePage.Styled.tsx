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

  .heroBannerWrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 296px;
    border-bottom: 1px solid #222;
  }

  .heroBanner {
    background-image: linear-gradient(180deg, rgba(19, 19, 20, 0) 0%, #131314 100%),
      url('/images/backgrounds/hero1.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    position: relative;
  }

  .heroGradient {
    height: 200px;
    width: 100%;
    background: linear-gradient(180deg, rgba(19, 19, 20, 0) 0%, rgba(19, 19, 20, 0.75) 100%);
    transform: rotate(-180deg);
    position: absolute;
    top: 0;
  }

  .main-content {
    max-width: var(--mainMaxWidth);
    width: 100%;
    padding: 3.5rem;
    display: grid;
    gap: 3rem;
    margin: 0 auto;
    padding-top: 4rem;

    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }
  }
`

export default StyledHomePage
