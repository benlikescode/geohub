import styled from 'styled-components'

type StyledProps = {}

const StyledSkeletonMapInfo = styled.div<StyledProps>`
  display: flex;
  height: 100%;
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    border-radius: 0;
    border: none;
    background-color: transparent;
  }

  .mapDescriptionWrapper {
    display: flex;
    gap: 25px;
    padding: 25px 30px;
    flex-grow: 1;
    width: 100%;

    @media (max-width: 1550px) {
      flex-shrink: 1.25;
      padding: 1rem 1.5rem;
    }

    @media (max-width: 1200px) {
      padding: 1.5rem;
    }
  }

  .statsWrapper {
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1.25;
  }

  .descriptionColumnWrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 0.5rem;
  }

  .descriptionColumn {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .mapStats {
    background-color: #171718;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-left: 2rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 44px;
    width: 100%;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 940px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`

export default StyledSkeletonMapInfo
