import styled from 'styled-components'

type StyledProps = {
  size: 'hidden' | 'small' | 'normal'
}

const StyledLayout = styled.div<StyledProps>`
  display: grid;
  grid-template-columns: ${({ size }) => size === 'hidden' ? 'auto' : size === 'small' ? '80px auto' : '250px auto'};
  min-height: calc(100vh - 60px);

  main {
    max-width: ${({ theme }) => theme.breakpoint.l};
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 3.5rem;

    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }
  }

  .widthController {
    max-width: ${({ theme }) => theme.breakpoint.l};
    width: 100%;
    padding: 3.5rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
`

export default StyledLayout
