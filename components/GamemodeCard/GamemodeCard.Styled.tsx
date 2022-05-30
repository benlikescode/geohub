import styled from 'styled-components'

type StyledProps = {
  titleColor: string
}

const StyledGamemodeCard = styled.div<StyledProps>`
  background-color: #141414;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 30px 40px;
  display: grid;
  gap: 1.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.55);

  .gamemodeTitle {
    color: ${({ titleColor }) => titleColor};
    font-size: 2rem;
    font-weight: 600;
  }

  .gamemodeDescription {
    color: var(--color2);
    font-size: 1rem;
    font-weight: 400;
  }

  .titleWrapper {
    position: relative;
    width: fit-content;
  }

  .newTag {
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b0004e;
    width: 40px;
    height: 18px;
    font-size: 12px;
    position: absolute;
    top: -10px;
    right: -42px;
    font-weight: 400;
  }
`

export default StyledGamemodeCard
