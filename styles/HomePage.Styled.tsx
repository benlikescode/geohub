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

  .bannerWrapper {
    background-color: var(--background2);
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px 40px;
  }

  .tipWrapper {
    margin-top: 25px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .tip {
    color: var(--color2);
    margin-left: 8px;
  }

  .pillsWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  

  
`

export default StyledHomePage
