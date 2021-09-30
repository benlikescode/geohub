import styled from 'styled-components'

type StyledProps = {
  progress: number
  backgroundColor: string
}

const StyledProgressBar = styled.div<StyledProps>`
  height: 20px;
  width: 100%;
  border-radius: 50rem;
  background: var(--background3);

  .progress {
    width: ${({ progress }) => progress}%;
    height: 100%;
    border-radius: 50rem;
    background-color: ${({ backgroundColor }) => backgroundColor};
  }
  
`

export default StyledProgressBar
