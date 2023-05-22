import styled from 'styled-components'

type StyledProps = {
  isForDisplayOnly?: boolean
}

const StyledMapPreviewCard = styled.div<StyledProps>`
  width: 100%;

  .large-card-wrapper {
    border-radius: 6px;
    background-color: ${({ theme }) => theme.color.gray[900]};
    border: 1px solid ${({ theme }) => theme.color.gray[800]};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: grid;
    gap: 1rem;
    max-height: 300px;

    ${({ isForDisplayOnly }) =>
      isForDisplayOnly &&
      `
      width: 100%;
    `}
    //height: 100%;

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
        background: linear-gradient(
          180deg,
          ${({ theme }) => theme.color.gray[900]}20 0%,
          ${({ theme }) => theme.color.gray[900]} 90%
        );
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
      font-size: 20px;
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
      color: ${({ theme }) => theme.color.gray[500]};
      font-weight: 400;
      line-height: 25px;
      text-align: center;
      padding: 0 1.7rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      -webkit-box-orient: vertical;
      word-break: break-word;
      height: 50px;

      /* @media (max-width: 1050px) {
        display: none;
      }

      @media (max-width: 700px) {
        display: block;
      } */
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
      gap: 1rem;
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

      ${({ isForDisplayOnly }) =>
        isForDisplayOnly &&
        `
         background-color: #222;
         color: #777;
      `}

      :hover {
        background-color: ${({ isForDisplayOnly }) => !isForDisplayOnly && 'var(--indigo-600)'};
      }
    }
  }

  .small-card-wrapper {
    border-radius: 5px;
    background-color: ${({ theme }) => theme.color.gray[900]};
    border: 1px solid ${({ theme }) => theme.color.gray[800]};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;

    .preview-image {
      position: relative;
      height: 120px;
      display: flex;
      align-items: flex-end;
      justify-content: center;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #191a1b 0%, transparent 90%);
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        object-fit: cover;
        height: 100%;
        width: 100%;
        opacity: 0.4;
        border-radius: 5px 5px 0 0;
        //background: linear-gradient(180deg, rgba(25, 26, 27, 0) 0%, rgba(25, 26, 27, 0.57) 47.4%, #222 100%);
      }
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
      position: relative;
      z-index: 1;
      margin-bottom: 4px;

      @media (max-width: 1500px) {
        font-size: 20px;
      }
    }

    .playWrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 10px;
      padding: 20px;
    }

    .mapEditBtn,
    .mapDeleteBtn {
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
        height: 20px;
        color: #fff;
      }

      &:hover {
        background-color: rgb(255, 255, 255, 0.15);

        &.mapDeleteBtn {
          background-color: #991b1b;
        }
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
      background-color: var(--mediumPurple);
      color: #fff;
      width: 100%;

      :hover {
        background-color: var(--indigo-600);
      }
    }
  }
`

export default StyledMapPreviewCard
