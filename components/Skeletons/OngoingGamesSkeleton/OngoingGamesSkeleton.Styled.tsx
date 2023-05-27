import styled from 'styled-components'

type StyledProps = {}

const StyledOngoingGamesSkeleton = styled.div<StyledProps>`
  .ongoing-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    &.variant {
      background-color: #181818;
    }

    &:not(:last-child) {
      border-bottom: 1px solid rgb(30 30 30);
    }

    .flex-left {
      display: flex;
      align-items: center;

      .map-details {
        display: flex;
        align-items: center;
        gap: 12px;
      }
    }

    .flex-right {
      display: flex;
      align-items: center;
      gap: 30px;

      .game-info-pills {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .ongoing-buttons {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  @media (max-width: 600px) {
    .ongoing-buttons {
      gap: 10px;
    }

    .map-name {
      width: 100px;
    }
  }

  @media (max-width: 650px) {
    .round-pill {
      display: none;
    }
  }

  @media (max-width: 800px) {
    .created-pill {
      display: none;
    }
  }

  @media (max-width: 900px) {
    .score-pill {
      display: none;
    }
  }
`

export default StyledOngoingGamesSkeleton
