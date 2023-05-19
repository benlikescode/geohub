import styled from 'styled-components'

type StyledProps = {
  titleColor: string
}

const StyledGamemodeCard = styled.div<StyledProps>`
  background-color: #181818;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 30px;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 55%);

  .gamemode-details {
    margin-bottom: 28px;

    h2 {
      color: #ffffff;

      font-weight: 500;
      margin-bottom: 12px;

      letter-spacing: -0.01rem;
      font-size: 26px;
    }

    p {
      color: ${({ theme }) => theme.color.gray[500]};
      font-size: 1rem;
      font-weight: 400;
    }
  }
`

export default StyledGamemodeCard
