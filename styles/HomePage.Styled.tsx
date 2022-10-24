import styled from 'styled-components'

const StyledHomePage = styled.div`
  .hero-section {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 56px 0 256px 0;
    margin-bottom: -200px;

    @media (max-width: 500px) {
      padding: 30px 0 200px 0;
    }

    &::before {
      content: '';
      background-image: url('/images/backgrounds/newHero.jpg');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg, #0e0e10 10%, #0e0e1050);
      z-index: 1;
    }

    .hero-content {
      max-width: var(--mainMaxWidth);
      width: 100%;
      margin: 0 auto;
      padding: 0 40px;
      position: relative;
      z-index: 2;

      @media (max-width: 500px) {
        padding: 0 1rem;
      }

      .banner-title {
        font-size: 40px;
        font-weight: 600;
        line-height: 40px;
        color: #ffffff;

        @media (max-width: 1200px) {
          font-size: 28px;
          max-width: 500px;
        }
      }

      .tip-wrapper {
        font-weight: 400;
        font-size: 18px;
        line-height: 26px;
        color: rgb(191 191 191);
        max-width: 500px;
        margin: 18px 0;

        @media (max-width: 1200px) {
          font-size: 16px;
          max-width: 100%;
          margin-top: 0.5rem;
          font-weight: 500;
        }
      }

      .pills-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }

  .main-content {
    max-width: var(--mainMaxWidth);
    width: 100%;
    padding: 0 40px 40px 40px;
    display: grid;
    gap: 40px;
    margin: 0 auto;

    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }

    .map-preview-section {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
      z-index: 1;

      @media (max-width: 1350px) {
        grid-template-columns: 1fr 1fr;
      }

      @media (max-width: 700px) {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    .other-gamemodes {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;

      @media (max-width: 1200px) {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }
  }
`

export default StyledHomePage
