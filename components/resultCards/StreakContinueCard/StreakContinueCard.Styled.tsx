import styled from 'styled-components'

type StyledProps = {}

const StyledStreakContinueCard = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  height: 100%;
  width: 100%;
  /* background-color: #121212; */
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  /* background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(12 13 15 / 57%) 47.4%, #00274e 100%); */
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(8 8 8 / 57%) 47.4%, #000 100%);

  .result-wrapper {
    display: grid;
    gap: 14px;
    text-align: center;
    max-width: 600px;

    .correct-country {
      font-size: 18px;
      font-weight: 600;
      color: #ababab;

      img {
        height: 14px;
        margin: 0 6px;
      }
    }

    .streak-count {
      font-size: 16px;
      color: #808080;
      font-weight: 400;
      text-align: center;
      margin-bottom: 8px;
    }
  }

  .actionButton {
    margin-top: 12px;

    .next-round-btn {
      border-radius: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 56px;
      width: 180px;
      font-weight: 400;
      user-select: none;
      background-color: var(--mediumPurple);
      color: #fff;

      :hover {
        background-color: var(--indigo-600);
      }
    }
  }
`

export default StyledStreakContinueCard
