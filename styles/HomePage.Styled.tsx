import styled from 'styled-components'

const StyledHomePage = styled.div`
  .hero-section {
    width: 100%;
    height: 270px;
    border-bottom: 1px solid #202020;
    box-shadow: 0 1px 2px rgb(0 0 0 / 90%), 0 0px 2px rgb(0 0 0 / 90%);
    background: #0f0f0f;
    display: flex;
    align-items: center;

    .hero-content {
      max-width: var(--mainMaxWidth);
      width: 100%;
      margin: 0 auto;
      padding: 0 40px;

      @media (max-width: 500px) {
        padding: 3rem 1rem;
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
    padding: 40px;
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

      @media (max-width: 850px) {
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
