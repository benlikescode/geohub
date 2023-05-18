import styled from 'styled-components'

const StyledCreateMapModal = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }

  .map-details-section {
    display: grid;
    gap: 40px;
    width: 100%;
    padding: 24px;

    .avatar-selection {
      .avatars {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;

        .avatar-item {
          height: 36px;
          width: 36px;
          position: relative;
          border-radius: 30%;
          outline: 1px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          cursor: pointer;
          background-color: #888888;

          &:hover {
            outline: 2px solid #ffffff;
          }
          &.selected {
            outline: 3px solid #ffffff;
          }

          img {
            border-radius: 50%;
          }
        }
      }
    }

    .section-title {
      font-size: 14px;
      font-weight: 400;
      color: #919191;
      margin-bottom: 12px;
    }
  }

  .map-preview-section {
    //background: rgb(12 12 12);
    height: 100%;
    padding: 25px;
    border-left: 1px solid #181818;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 750px) {
      //display: none;
      border-left: none;
      border-top: 1px solid #181818;
    }

    .mapPreviewCard {
      border-radius: 6px;
      background-color: var(--background2);
      border: 1px solid rgba(255, 255, 255, 0.07);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      display: grid;
      gap: 1rem;
      max-width: 400px;
      width: 100%;

      .mapImage {
        height: 125px;
        width: 100%;
        border-radius: 5px 5px 0 0;
        position: relative;

        span img {
          border-radius: 5px 5px 0 0;
        }
      }

      .contentWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 18px;
        margin-top: 10px;
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
        padding: 0px 1rem;

        @media (max-width: 1500px) {
          font-size: 20px;
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
        width: clamp(120px, 70%, 300px);
        background-color: #222;
        color: #777;
      }
    }
  }
`

export default StyledCreateMapModal
