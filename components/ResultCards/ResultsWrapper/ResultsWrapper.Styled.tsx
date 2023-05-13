import styled from 'styled-components'

type StyledProps = {
  showPoints?: boolean
}

const StyledResultsWrapper = styled.div<StyledProps>`
  margin-top: -20px;
  max-width: ${({ theme }) => theme.breakpoint.l};
  width: 100%;
  z-index: 1;
  background-color: #121212;
  border-radius: 6px;
  border: 1px solid #202020;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.55);

  @media (max-width: 600px) {
    border-radius: 0;
    border: none;
    margin-top: -25px;
  }
`

export default StyledResultsWrapper
