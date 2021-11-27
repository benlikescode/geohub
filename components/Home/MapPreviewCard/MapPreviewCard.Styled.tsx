import styled from 'styled-components'

type StyledProps = {
  mapImage: string
}

const StyledMapPreviewCard = styled.div<StyledProps>`
  border-radius: 12px;
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: grid;
  gap: 1rem;
  max-height: 400px;
  height: 100%;
  
  .mapImage {
    height: 150px;
    width: 100%;
    border-radius: 11px;
    background: linear-gradient(180deg, rgba(25, 26, 27, 0) 0%, rgba(25, 26, 27, 0.57) 47.4%, #191A1B 100%), 
    url(${({ mapImage }) => mapImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    @media (max-width: 1600px) {
      height: 120px;
    }

    @media (max-width: 1500px) {
      height: 100px;
    }
  }

  .contentWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 18px;
    margin-top: -3rem;
  }

  .mapName {
    font-size: 22px;
    font-weight: 600;

    @media (max-width: 1500px) {
      font-size: 20px;
    }
  }

  .mapDescription {
    color: var(--color5);
    font-weight: 400;
    line-height: 25px;
    text-align: center;
    padding: 0 2rem;

    @media (max-width: 1580px) {
      display: none;
    }
  }

  .playWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 1rem 2rem 1rem;
  }

  .mapPlayBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 40px;
    padding: 0 25px;
    font-size: 1rem;
    font-weight: 500;
    user-select: none;
    width: clamp(120px, 60%, 200px);
    background-color: var(--mediumPurple);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.19);

    :hover {
      background-color: #703FFF;
    }
  }
`

export default StyledMapPreviewCard
