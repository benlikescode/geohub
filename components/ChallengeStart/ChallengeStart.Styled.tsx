import styled from 'styled-components'

type StyledProps = {}

const StyledChallengeStart = styled.div<StyledProps>`
  .challengeStartWrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: fit-content;
    gap: 1.5rem;
    padding: 4rem 1rem;
    border-bottom: 1px solid #222;
    width: 100%;
    background-color: #121212;
  }

  .challengeTitle {
    font-size: 3rem;
    font-style: italic;
    text-align: center;
  }

  .challengeCreator {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    span {
      margin-left: 0.5rem;
    }
  }

  .challengeBtn {
    padding: 1rem 3rem;
    border-radius: 50rem;
    background-color: var(--mediumPurple);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    font-size: 1rem;
    font-weight: 500;

    :hover {
      background-color: var(--darkPurple);
      transform: scale(1.02);
    }
  }

  .challengeSettings {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem;
    flex-wrap: wrap;
  }

  .settingsItem {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 220px;
    border: 1px solid #202020;
    border-radius: 6px;
    padding: 1rem 0;
  }
`

export default StyledChallengeStart
