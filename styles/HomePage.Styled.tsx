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

    @media (max-width: 1350px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 850px) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  .bannerWrapper {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 100%), url('/images/backgrounds/HomeBanner.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    border-radius: 12px;
    padding: 2.2rem;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border: var(--border);
    
    @media (max-width: 1600px) {
      padding: 2rem;
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
    color: #0EA5E9;
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

  .heroImage {
    background-image: linear-gradient(180deg, rgba(19, 19, 20, 0) 0%, #131314 100%), url('/images/backgrounds/hero1.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;  
    height: 60vh;
    position: relative;
  }

  .gradient {
    height: 170px;
    width: 100%;
    background: linear-gradient(180deg, rgba(19, 19, 20, 0) 0%, rgba(19, 19, 20, 0.75) 100%);
    transform: rotate(-180deg);
    position: absolute;
    top: 0;
  }
`

export default StyledHomePage
