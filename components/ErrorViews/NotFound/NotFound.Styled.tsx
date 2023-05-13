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
      filter: grayscale(1) drop-shadow(-5px 5px 5px #000000);
      height: 250px;
      width: 250px;
    }

    h2 {
      font-size: 1.75rem;
      margin-top: 1.5rem;
      color: #fff;
      font-weight: 500;
      line-height: 35px;
      text-align: center;

      @media (max-width: 600px) {
        font-size: 1.25rem;
      }
    }

    h3 {
      margin-top: 1.25rem;
      color: #ababab;
      font-size: 1.25rem;
      font-weight: 400;
      text-align: center;
      line-height: 30px;

      @media (max-width: 600px) {
        font-size: 1rem;
        line-height: 26px;
      }
    }
  }
`

export default StyledNotFound
