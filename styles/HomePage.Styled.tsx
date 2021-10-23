import styled from 'styled-components'

const StyledHomePage = styled.div`
  main {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .mapPreviewSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bannerTitle {
    font-size: 40px;
    font-weight: 700;
    line-height: 44px;
    color: var(--color1);
    max-width: 200px;
  }

  .bannerWrapper {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.41) 0%, rgba(0, 0, 0, 0) 100%), url('/images/backgrounds/HomeBanner.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 320px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 56px;
  }

  .tipWrapper {
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    color: rgba(255, 255, 255, 0.8);
    margin: 20px 0;
    max-width: 450px;
  }

  .pillsWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  

  
`

export default StyledHomePage
