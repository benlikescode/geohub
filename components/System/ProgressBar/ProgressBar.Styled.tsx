import styled from 'styled-components'

type StyledProps = {
  progress: number
  backgroundColor: string
}

const StyledProgressBar = styled.div<StyledProps>`
  height: 1.5rem;
  width: 100%;
  border-radius: 50rem;
  background: #202020;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.05);

  .progress {
    width: ${({ progress }) => progress}%;
    height: 100%;
    border-radius: 50rem;
    background-color: ${({ backgroundColor }) => backgroundColor};
  }
  
`

export default StyledProgressBar
