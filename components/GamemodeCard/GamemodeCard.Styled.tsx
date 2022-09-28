import styled from 'styled-components'

type StyledProps = {
  titleColor: string
}

const StyledGamemodeCard = styled.div<StyledProps>`
  background-color: #141414;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.55);

  .gamemode-details {
    margin-bottom: 28px;

    h2 {
      color: ${({ titleColor }) => titleColor};
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 12px;
      letter-spacing: 2px;
    }

    p {
      color: var(--color5);
      font-size: 1rem;
      font-weight: 400;
    }
  }
`

export default StyledGamemodeCard
