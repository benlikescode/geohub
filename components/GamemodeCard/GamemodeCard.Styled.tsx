import styled from 'styled-components'

type StyledProps = {
  titleColor: string
}

const StyledGamemodeCard = styled.div<StyledProps>`
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 30px 40px;
  display: grid;
  gap: 1.5rem;

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
`

export default StyledGamemodeCard
