import styled from 'styled-components'

type StyledProps = {
  customWidth?: string
  mobilePadding?: string
}

const StyledWidthController = styled.div<StyledProps>`
  max-width: ${({ customWidth }) => customWidth ?? 'var(--mainMaxWidth)'};
  width: 100%;
  padding: 3.5rem;
  margin: 0 auto;
  height: 100%;

  @media (max-width: 600px) {
    padding: ${({ mobilePadding }) => mobilePadding ?? '1rem'};
  }
`

export default StyledWidthController
