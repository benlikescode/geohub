import styled from 'styled-components'

const StyledMyMapsPage = styled.div`
  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .map-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;

    @media (max-width: 1350px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 850px) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  .create-map-card {
    border-radius: 5px;
    background-color: var(--background2);
    border: 1px solid rgba(255, 255, 255, 0.07);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    color: var(--color2);
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 150px;

    &:hover {
      background-color: #202020;
    }

    .create-map-plus {
      //border: 1px solid #333;
      background-color: rgb(255, 255, 255, 0.1);

      border-radius: 50%;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 20px;
        width: 20px;
        color: #fff;
      }
    }
  }
`

export default StyledMyMapsPage
