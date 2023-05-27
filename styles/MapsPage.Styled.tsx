import styled from 'styled-components'

const StyledMapsPage = styled.div`
  .page-wrapper {
    display: grid;
    gap: 40px;

    .section-title {
      font-weight: 600;
      color: #fff;
      position: sticky;
      top: 0;
      background-color: #0e0e0e;
      z-index: 12;
      padding: 24px 0 16px 0;
      font-size: 20px;
    }

    .maps-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.2rem;
    }

    .more-btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;

      button {
        background-color: #222;
        color: #fff;
        border-radius: 50rem;
        padding: 6px 16px;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }
`

export default StyledMapsPage
