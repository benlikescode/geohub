import styled from 'styled-components'

const StyledLikedMapCard = styled.div`
  border-radius: 6px;
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: grid;
  gap: 1rem;
  max-height: 300px;

  .map-avatar {
    height: 125px;
    width: 100%;
    border-radius: 5px 5px 0 0;
    position: relative;

    span img {
      border-radius: 5px 5px 0 0;
    }

    .image-gradient {
      z-index: 1;
      position: absolute;
      height: 100%;
      width: 100%;
      background: linear-gradient(180deg, rgba(25, 26, 27, 0) 0%, rgba(25, 26, 27, 0.57) 47.4%, #191a1b 100%);
    }
  }

  .contentWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 18px;
    margin-top: -48px;
  }

  .mapName {
    font-size: 22px;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    -webkit-box-orient: vertical;
    word-break: break-word;
    white-space: pre-wrap;
    -moz-white-space: pre-wrap;
    padding: 0 1rem;
    z-index: 1;
    @media (max-width: 1500px) {
      font-size: 20px;
    }
  }

  .mapDescription {
    color: var(--color5);
    font-weight: 400;
    line-height: 25px;
    text-align: center;
    padding: 0 1.7rem;
    //height: 50px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    word-break: break-word;

    @media (max-width: 1050px) {
      display: none;
    }

    @media (max-width: 700px) {
      display: block;
    }
    /*
      @media (max-width: 1350px) {
        display: block;
        padding: 0 3.5rem;
      }

      @media (max-width: 1200px) {
        display: block;
        padding: 0 2.5rem;
      }

      @media (max-width: 1000px) {
        display: none;
      }
      
      @media (max-width: 850px) {
        display: block;
      }
      */
  }

  .playWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 1rem 1rem 2rem 1rem;
  }

  .mapEditBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 40px;
    padding: 0 25px;
    font-size: 1rem;
    font-weight: 500;
    user-select: none;
    width: clamp(120px, 70%, 300px);
    background-color: rgb(255, 255, 255, 0.1);
    color: rgb(255, 255, 255, 0.7);
    //border: 1px solid rgba(255, 255, 255, 0.19);

    &:hover {
      background-color: rgb(255, 255, 255, 0.15);
    }
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
    width: clamp(120px, 70%, 300px);
    background-color: var(--indigo-700);
    color: #fff;

    :hover {
      background-color: var(--indigo-600);
    }
  }

  .unlike-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 10px;
    font-size: 1rem;
    font-weight: 500;
    user-select: none;
    background-color: rgb(255, 255, 255, 0.1);
    color: rgb(255, 255, 255, 0.7);

    svg {
      height: 22px;
      color: var(--red-500);
    }

    &:hover {
      background-color: rgb(255, 255, 255, 0.15);
    }
  }
`

export default StyledLikedMapCard
