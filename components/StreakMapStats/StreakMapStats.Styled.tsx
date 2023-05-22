import styled from 'styled-components'

type StyledProps = {}

const StyledStreakMapStats = styled.div<StyledProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 15px 20px 20px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    background: #ffffff0a;
    border-radius: 6px;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .textWrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .mainLabel {
    color: var(--color2);

    @media (max-width: 600px) {
      font-size: 14px;
    }
  }

  .subLabel {
    color: var(--color3);
    font-weight: 400;
    font-size: 14px;

    @media (max-width: 600px) {
      font-size: 12px;
    }
  }

  .stat-icon {
    svg {
      height: 30px;
      color: var(--lightPurple);
      transition: transform 200ms ease 0ms;
      position: relative;

      path {
        stroke-width: 1.5;
      }

      @media (max-width: 600px) {
        height: 24px;
      }
    }
  }
`

export default StyledStreakMapStats
