import styled from 'styled-components'

type StyledProps = {}

const StyledNoResults = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 4rem;

  .no-results-container {
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;

    img {
      filter: grayscale(1);
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
    }

    h3 {
      margin-top: 1.25rem;
      color: #ababab;
      font-size: 1.25rem;
      font-weight: 400;
    }
  }
`

export default StyledNoResults
