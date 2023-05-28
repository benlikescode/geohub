import styled from 'styled-components'

const StyledNoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: -80px;

  .no-results-container {
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;

    img {
      filter: grayscale(1);
    }

    h2 {
      font-size: 20px;
      color: #dadada;
      font-weight: 500;
      line-height: 35px;
      text-align: center;
      margin-top: -20px;
    }

    h3 {
      margin-top: 10px;
      color: #5c5c5c;
      font-size: 16px;
      font-weight: 400;
    }
  }

  @media (max-width: 600px) {
    .no-results-container {
      img {
        height: 150px !important;
      }

      h3 {
        margin-top: 6px;
      }
    }
  }
`

export default StyledNoResults
