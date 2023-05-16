import styled from 'styled-components'

type StyledProps = {}

const StyledNotFound = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: calc(-1 * var(--navbarHeight));
  padding: 0 1rem;

  .no-results-container {
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;

    img {
      filter: grayscale(0.85);
    }

    h2 {
      font-size: 20px;
      color: #dadada;
      font-weight: 500;
      line-height: 35px;
      text-align: center;
      margin-top: 8px;
    }

    h3 {
      margin-top: 10px;
      color: #6a6a6a;
      font-size: 16px;
      font-weight: 400;
    }
  }
`

export default StyledNotFound
