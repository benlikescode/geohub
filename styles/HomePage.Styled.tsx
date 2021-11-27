import styled from 'styled-components'

const StyledHomePage = styled.div`
  main {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .mapPreviewSection {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;

    @media (max-width: 1400px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .bannerWrapper {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.41) 0%, rgba(0, 0, 0, 0) 100%), url('/images/backgrounds/HomeBanner.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 3.5rem;

    @media (max-width: 1600px) {
      padding: 2.5rem;
    }

    @media (max-width: 1200px) {
      padding: 1.5rem;
    }
  }

  .bannerTitle {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 44px;
    color: var(--color1);
    max-width: 200px;

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
    margin: 20px 0;
    max-width: 450px;

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
    font-size: 40px;
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
    color: #0EA5E9;
    cursor: pointer;
  } 

  .gamemodesWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.2rem; 

    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
`

export default StyledHomePage
