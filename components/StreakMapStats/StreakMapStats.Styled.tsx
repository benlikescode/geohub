import styled from 'styled-components'

const StyledStreakMapStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 15px 20px 20px;

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    background: #ffffff0a;
    border-radius: 6px;
    flex-shrink: 0;
    box-sizing: border-box;

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

    .text-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .main-label {
        color: var(--color2);

        @media (max-width: 600px) {
          font-size: 14px;
        }
      }

      .sub-label {
        color: var(--color3);
        font-weight: 400;
        font-size: 14px;

        @media (max-width: 600px) {
          font-size: 12px;
        }
      }
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
`

export default StyledStreakMapStats
