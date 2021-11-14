import styled from 'styled-components'

type StyledProps = {
  isVisible?: boolean
}

const StyledBingoCard = styled.div<StyledProps>`
  width: 400px;
  background-color: var(--background3);
  border-radius: 5px;
  padding: 20px;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 2s ease-out;
  display: ${({ isVisible }) => !isVisible ? 'none' : 'block'};

  .card {
    height: 100%;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 360px;
  }

  .lettersWrapper {
    display: flex;
    align-items: center;
    padding-bottom: 5px;
  }

  .bingoLetter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    font-size: 30px;
  }
`

export default StyledBingoCard
