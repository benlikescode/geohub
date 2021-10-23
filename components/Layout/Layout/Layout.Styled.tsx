import styled from 'styled-components'

type StyledProps = {
  hasSidebar?: boolean
}

const StyledLayout = styled.div<StyledProps>`
  display: grid;
  grid-template-columns: ${({ hasSidebar }) => hasSidebar && '250px'} auto;
  min-height: calc(100vh - 60px);

  main {
   max-width: var(--maxWidth);
   width: 100%;
   padding: 56px 0;
   margin: 0 auto;
  }

  
`

export default StyledLayout
